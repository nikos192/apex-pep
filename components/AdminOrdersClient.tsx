"use client";

import { useEffect, useState, useRef } from "react";
import supabaseClient from "@/lib/supabaseClient";
import OrdersTable from "@/components/OrdersTable";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  updated_at?: string;
  email: string;
  total: number;
  status: string;
}

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  const recentUpdatesRef = useRef<Record<string, { order: any; receivedAt: number; updatedAtMs: number }>>({});
  const skipFetchUntilRef = useRef<number>(0);

  const fetchOrders = async () => {
    if (Date.now() < skipFetchUntilRef.current) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders-list", { credentials: "same-origin", cache: "no-store" });
      const json = await res.json();
      if (!res.ok) {
        setError(json?.error || "Failed to load orders");
        setOrders([]);
        return;
      }

      let fetched: any[] = json.orders || [];

      try {
        const recent = recentUpdatesRef.current || {};
        if (Object.keys(recent).length > 0) {
          const fetchedById = new Map(fetched.map((o: any) => [String(o.id), o]));
          const fetchedByNumber = new Map(fetched.map((o: any) => [String(o.order_number), o]));

          Object.values(recent).forEach((entry) => {
            const upd = entry?.order;
            const updUpdatedAt = entry?.updatedAtMs || Date.now();
            if (!upd) return;
            const id = upd?.id ? String(upd.id) : null;
            const num = upd?.order_number;

            if (id && fetchedById.has(id)) {
              const existing = fetchedById.get(id);
              const existingUpdatedAt = existing?.updated_at ? new Date(existing.updated_at).getTime() : 0;
              const final = existingUpdatedAt >= updUpdatedAt ? existing : { ...existing, ...upd };
              fetchedById.set(id, final);
              if (existing.order_number) fetchedByNumber.set(existing.order_number, final);
            } else if (num && fetchedByNumber.has(num)) {
              const existing = fetchedByNumber.get(num);
              const existingUpdatedAt = existing?.updated_at ? new Date(existing.updated_at).getTime() : 0;
              const final = existingUpdatedAt >= updUpdatedAt ? existing : { ...existing, ...upd };
              fetchedByNumber.set(num, final);
              if (final.id) fetchedById.set(String(final.id), final);
            } else {
              fetched.unshift(upd);
              if (upd.id) fetchedById.set(String(upd.id), upd);
              if (upd.order_number) fetchedByNumber.set(upd.order_number, upd);
            }
          });

          const seen = new Set<string>();
          const mergedArr: any[] = [];
          for (const o of fetched) {
            const id = o?.id ? String(o.id) : null;
            const key = id ?? o?.order_number;
            if (!key) {
              mergedArr.push(o);
              continue;
            }
            if (seen.has(key)) continue;
            seen.add(key);
            const final = id && fetchedById.has(id) ? fetchedById.get(id) : (o.order_number && fetchedByNumber.has(o.order_number) ? fetchedByNumber.get(o.order_number) : o);
            mergedArr.push(final);
          }
          fetched = mergedArr;
        }
      } catch (e) {
        // ignore merge errors
      }

      setOrders(fetched);
    } catch (err: any) {
      setError(String(err?.message || err));
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    intervalRef.current = window.setInterval(fetchOrders, 60 * 1000);

    const applyUpdatedOrder = (updatedOrder: any) => {
      if (!updatedOrder) return;
      const key = updatedOrder.order_number ?? updatedOrder.id;
      try {
        const now = Date.now();
        const updatedAtMs = updatedOrder?.updated_at ? new Date(updatedOrder.updated_at).getTime() : now;
        recentUpdatesRef.current = { ...recentUpdatesRef.current, [key]: { order: updatedOrder, receivedAt: now, updatedAtMs } };
        skipFetchUntilRef.current = Date.now() + 1500;
        Object.keys(recentUpdatesRef.current).forEach((k) => {
          const entry = recentUpdatesRef.current[k];
          if (!entry) return;
          if (now - (entry.receivedAt || now) > 60 * 1000) delete recentUpdatesRef.current[k];
        });
      } catch (e) {
        // ignore
      }

      setOrders((prev) => {
        const byId = prev.find((o) => o.id === updatedOrder.id);
        if (byId) return prev.map((o) => (o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o));
        const byNumber = updatedOrder.order_number ? prev.find((o) => o.order_number === updatedOrder.order_number) : null;
        if (byNumber) return prev.map((o) => (o.order_number === updatedOrder.order_number ? { ...o, ...updatedOrder } : o));
        return [updatedOrder, ...prev];
      });

      console.log("AdminOrdersClient: applied updated order", key, updatedOrder.status ?? updatedOrder.operation);
    };

    const handler = (e: any) => {
      try {
        const updatedOrder = e?.detail?.order;
        if (updatedOrder) {
          applyUpdatedOrder(updatedOrder);
        }
      } catch (err) {
        console.error("AdminOrdersClient event handler error:", err);
        fetchOrders();
      }
    };
    window.addEventListener("order-updated", handler);

    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("orders");
      bc.onmessage = (ev) => {
        try {
          applyUpdatedOrder(ev.data?.order);
        } catch (err) {
          console.error("BroadcastChannel handler error:", err);
        }
      };
    } catch (e) {
      // ignore
    }

    let supChannel: any = null;
    let es: EventSource | null = null;
    let usingSSE = false;

    if (typeof window !== "undefined") {
      const supabase = supabaseClient;

      (async () => {
        // Try server-sent events relay first (server subscribes with service key)
        try {
          const url = '/api/admin/orders/stream';
          es = new EventSource(url);

          const sseConnected = await new Promise<boolean>((resolve) => {
            let resolved = false;
            const onOpen = () => { if (!resolved) { resolved = true; resolve(true); } };
            const onError = () => { if (!resolved) { resolved = true; resolve(false); } };
            es!.onopen = onOpen;
            es!.onmessage = (ev) => {
              try {
                const d = JSON.parse(ev.data);
                if (d?.type === 'postgres_changes' && d.payload) {
                  const payload = d.payload;
                  if (payload?.new) applyUpdatedOrder(payload.new);
                  else if (payload?.old && !payload?.new) applyUpdatedOrder({ ...payload.old, __deleted: true });
                }
              } catch (err) {
                console.error('Admin SSE parse error:', err);
              }
            };
            es!.onerror = (err) => {
              console.warn('Admin SSE error (early):', err);
              if (!resolved) { resolved = true; resolve(false); }
            };

            setTimeout(() => { if (!resolved) { resolved = true; resolve(false); } }, 800);
          });

          if (sseConnected) {
            usingSSE = true;
            console.debug('Admin SSE: connected');
            es.onmessage = (ev) => {
              try {
                const d = JSON.parse(ev.data);
                if (d?.type === 'postgres_changes' && d.payload) {
                  const payload = d.payload;
                  if (payload?.new) applyUpdatedOrder(payload.new);
                  else if (payload?.old && !payload?.new) applyUpdatedOrder({ ...payload.old, __deleted: true });
                }
              } catch (err) {
                console.error('Admin SSE parse error:', err);
              }
            };
            es.onerror = (err) => {
              console.warn('Admin SSE error, falling back to client realtime', err);
              try { es?.close(); } catch (e) {}
              es = null;
              usingSSE = false;
            };
          } else {
            try { es?.close(); } catch (e) {}
            es = null;
            usingSSE = false;
          }
        } catch (e) {
          try { es?.close(); } catch (er) {}
          es = null;
          usingSSE = false;
        }

        // If SSE isn't available, fall back to direct Supabase realtime (dev-only fallback)
        if (!usingSSE) {
          try {
            const { data } = await supabase.auth.getSession();
            const accessToken = data?.session?.access_token;
            if (accessToken) {
              try { await supabase.realtime.setAuth(accessToken); console.debug('Supabase realtime: setAuth OK'); } catch (e) { console.warn('Supabase realtime.setAuth failed:', e); }
            } else {
              console.debug('Supabase realtime: no session access token');
            }
          } catch (e) {
            console.debug('Supabase auth.getSession failed:', e);
          }

          const makeChannel = (isPrivate: boolean) => {
            return supabase
              .channel("orders:all", isPrivate ? { config: { private: true, broadcast: { self: true } } } : { config: { broadcast: { self: true } } })
              .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload: any) => {
                try {
                  if (payload?.new) {
                    applyUpdatedOrder(payload.new);
                  } else if (payload?.old && !payload?.new) {
                    applyUpdatedOrder({ ...payload.old, __deleted: true });
                  }
                } catch (err) {
                  console.error("Supabase postgres_changes handler error:", err);
                }
              })
              .on("broadcast", { event: "orders_broadcast" }, (payload: any) => {
                try {
                  const p = payload?.payload ?? payload?.data ?? payload;
                  let order: any = null;
                  if (p?.order) order = p.order;
                  else if (p?.new) order = p.new;
                  else if (p?.payload && p.payload.new) order = p.payload.new;
                  else if (p?.payload && p.payload.order) order = p.payload.order;
                  else if (p?.id && (p?.new || p?.old)) order = p.new ?? p.old;
                  else if (p?.id && !p.new && !p.order) order = p;

                  if (order) {
                    applyUpdatedOrder(order);
                  }
                } catch (err) {
                  console.error("Supabase broadcast handler error:", err);
                }
              });
          };

          const isProd = (process.env.NODE_ENV === "production") || (process.env.NEXT_PUBLIC_VERCEL_ENV === "production");
          let attemptedPublicFallback = false;
          let subscribeAttempt = 0;
          const trySubscribe = (isPrivate = true) => {
            subscribeAttempt++;
            const ch = makeChannel(isPrivate).subscribe((status: any, err: any) => {
              console.log("Supabase orders channel status:", status);
              if (err) console.error("Supabase channel subscribe error:", err);
              if (status === "SUBSCRIBED") { subscribeAttempt = 0; fetchOrders().catch(() => {}); }

              if (status === "CHANNEL_ERROR" && err && /Unauthorized/i.test(String(err?.message || err))) {
                if (!isProd && isPrivate && !attemptedPublicFallback) {
                  console.warn("Realtime private subscribe unauthorized — falling back to public channel (dev only)");
                  attemptedPublicFallback = true;
                  try { ch.unsubscribe?.(); } catch (e) {}
                  supChannel = trySubscribe(false);
                } else {
                  console.error("Realtime private subscribe unauthorized; no fallback in production.");
                }
              }

              if (status === "CHANNEL_ERROR" && !/Unauthorized/i.test(String(err?.message || err))) {
                const backoffMs = Math.min(1000 * 2 ** subscribeAttempt, 30000);
                console.warn(`Realtime subscribe failed, retrying in ${backoffMs}ms`);
                setTimeout(() => { try { ch.unsubscribe?.(); } catch (e) {} ; supChannel = trySubscribe(isPrivate); }, backoffMs);
              }
            });
            return ch;
          };

          supChannel = trySubscribe(true);
        }
      })();
    }

    const storageHandler = (e: StorageEvent) => {
      if (e.key === "order-updated" && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (parsed?.order) applyUpdatedOrder(parsed.order);
        } catch (err) {
          console.error("storage event handler error:", err);
          fetchOrders();
        }
      }
    };
    window.addEventListener("storage", storageHandler);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      window.removeEventListener("order-updated", handler);
      window.removeEventListener("storage", storageHandler);
      if (bc) bc.close();
      try { supChannel?.unsubscribe?.(); } catch (e) {}
      try { es?.close?.(); } catch (e) {}
    };
  }, []);

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 mb-1">Orders</h1>
          <p className="text-slate-600">{orders.length} order{orders.length !== 1 ? "s" : ""} in system</p>
        </div>
        <div className="flex gap-3">
          <button className="btn-outline" onClick={() => fetchOrders()} disabled={loading}>
            {loading ? "Refreshing…" : "Refresh"}
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
          <p className="text-slate-600">No orders found.</p>
        </div>
      ) : (
        <OrdersTable orders={orders} />
      )}
    </div>
  );
}
