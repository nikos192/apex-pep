"use client";

import { useEffect, useState, useRef } from "react";
import supabaseClient from "@/lib/supabaseClient";
import OrdersTable from "@/components/OrdersTable";
import AdminHeader from "@/components/AdminHeader";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  email: string;
  total: number;
  status: string;
}

export default function AdminOrdersClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const intervalRef = useRef<number | null>(null);
  // keep a short-lived map of recent updates so fetches don't overwrite optimistic changes
  const recentUpdatesRef = useRef<Record<string, any>>({});
  const lastCheckRef = useRef<string>(new Date().toISOString());

  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/orders-list", {
        // ensure cookies are sent for authentication and bypass any client cache
        credentials: "same-origin",
        cache: "no-store",
      });
      const json = await res.json();
      console.debug("AdminOrdersClient: fetchOrders response status", res.status);
      if (!res.ok) {
        setError(json?.error || "Failed to load orders");
        setOrders([]);
      } else {
        let fetched = json.orders || [];
        console.debug("AdminOrdersClient: fetched orders count", fetched.length);
        // re-apply any recent optimistic/realtime updates so UI doesn't flip back
        try {
          const recent = recentUpdatesRef.current || {};
          if (Object.keys(recent).length > 0) {
            // Build quick lookup maps for fetched rows
            const fetchedById = new Map<string, any>(
              fetched.map((o: any) => [String(o.id), o])
            );
            const fetchedByNumber = new Map<string, any>(
              fetched.map((o: any) => [String(o.order_number), o])
            );

            // Apply recent updates: update existing rows or prepend new ones
            Object.values(recent).forEach((upd: any) => {
              if (!upd) return;
              const id = upd?.id ? String(upd.id) : null;
              const num = upd?.order_number;

              if (id && fetchedById.has(id)) {
                const existing = fetchedById.get(id);
                const merged = { ...existing, ...upd };
                fetchedById.set(id, merged);
                if (existing.order_number) fetchedByNumber.set(existing.order_number, merged);
              } else if (num && fetchedByNumber.has(num)) {
                const existing = fetchedByNumber.get(num);
                const merged = { ...existing, ...upd };
                fetchedByNumber.set(num, merged);
                if (merged.id) fetchedById.set(String(merged.id), merged);
              } else {
                // new order: add to front
                fetched.unshift(upd);
                if (upd.id) fetchedById.set(String(upd.id), upd);
                if (upd.order_number) fetchedByNumber.set(upd.order_number, upd);
              }
            });

            // Deduplicate and prefer merged versions
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
      }
    } catch (err: any) {
      setError(String(err?.message || err));
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // Log presence of public Supabase env vars (these are inlined at build time)
    try {
      console.debug("NEXT_PUBLIC_SUPABASE_URL present:", !!process.env.NEXT_PUBLIC_SUPABASE_URL);
      console.debug("NEXT_PUBLIC_SUPABASE_ANON_KEY present:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
    } catch (e) {
      // process may not be available in some runtimes; ignore
    }
    // Poll every 20 seconds
    intervalRef.current = window.setInterval(fetchOrders, 20000);

    // Handler to apply an updated order payload
    const applyUpdatedOrder = (updatedOrder: any) => {
      if (!updatedOrder) return;
      // choose a stable key for recent updates: prefer order_number, fall back to id
      const key = updatedOrder.order_number ?? updatedOrder.order_number_text ?? updatedOrder.id;
      try {
        recentUpdatesRef.current = {
          ...recentUpdatesRef.current,
          [key]: updatedOrder,
        };
        // prune entries older than ~60s
        const now = Date.now();
        Object.keys(recentUpdatesRef.current).forEach((k) => {
          const entry = recentUpdatesRef.current[k];
          const ts = new Date(entry?.updated_at || now).getTime();
          if (now - ts > 60 * 1000) delete recentUpdatesRef.current[k];
        });
      } catch (e) {
        // ignore
      }

      setOrders((prev) => {
        // if order exists by id -> update, else if exists by order_number -> update, otherwise prepend
        const byId = prev.find((o) => o.id === updatedOrder.id);
        if (byId) {
          return prev.map((o) => (o.id === updatedOrder.id ? { ...o, ...updatedOrder } : o));
        }
        const byNumber = updatedOrder.order_number
          ? prev.find((o) => o.order_number === updatedOrder.order_number)
          : null;
        if (byNumber) {
          return prev.map((o) => (o.order_number === updatedOrder.order_number ? { ...o, ...updatedOrder } : o));
        }
        // new order: add to top
        return [updatedOrder, ...prev];
      });

      console.log("AdminOrdersClient: applied updated order", key, updatedOrder.status ?? updatedOrder.operation);
    };

    // Listen for CustomEvent dispatched in-page
    const handler = (e: any) => {
      try {
        const updatedOrder = e?.detail?.order;
        if (updatedOrder) {
          applyUpdatedOrder(updatedOrder);
          // Also fetch fresh list immediately to ensure ordering/aggregates are correct
          fetchOrders();
        } else {
          fetchOrders();
        }
      } catch (err) {
        console.error("AdminOrdersClient event handler error:", err);
        fetchOrders();
      }
    };
    window.addEventListener("order-updated", handler);

    // Listen for BroadcastChannel messages from other tabs/pages
    let bc: BroadcastChannel | null = null;
    try {
      bc = new BroadcastChannel("orders");
      bc.onmessage = (ev) => {
        try {
          applyUpdatedOrder(ev.data?.order);
        } catch (err) {
          console.error("BroadcastChannel handler error:", err);
          fetchOrders();
        }
      };
    } catch (e) {
      // ignore if unsupported
    }

    // Supabase Realtime: subscribe to orders table updates and broadcast messages.
    let supChannel: any = null;
    try {
      if (typeof window !== "undefined") {
        const supabase = supabaseClient;

        // Attach auth token if available (helps private channels)
        try {
          supabase.auth.getSession().then(({ data }) => {
            if (data?.session) console.debug("Supabase realtime: session present");
          }).catch(() => {});

          try {
            supabase.auth.onAuthStateChange((_event, session) => {
              console.debug("Supabase auth change", _event);
              if (session?.access_token) fetchOrders().catch(() => {});
            });
          } catch (e) {
            // ignore if not available
          }
        } catch (e) {
          // ignore
        }

        supChannel = supabase
          .channel("orders:all", { config: { broadcast: { self: true } } })
          .on(
            "postgres_changes",
            { event: "*", schema: "public", table: "orders" },
            (payload: any) => {
              try {
                console.debug("Supabase postgres_changes payload:", payload);
                if (payload?.new) {
                  applyUpdatedOrder(payload.new);
                  fetchOrders().catch(() => {});
                } else if (payload?.old && !payload?.new) {
                  applyUpdatedOrder({ ...payload.old, __deleted: true });
                  fetchOrders().catch(() => {});
                }
              } catch (err) {
                console.error("Supabase postgres_changes handler error:", err);
              }
            }
          )
          .on(
            "broadcast",
            { event: "orders_broadcast" },
            (payload: any) => {
                try {
                  console.debug("Supabase broadcast payload:", payload);
                  const p = payload?.payload ?? payload?.data ?? payload;

                  // common shapes:
                  // { payload: { new: {...}, old: {...}, operation: 'UPDATE' } }
                  // { payload: { order: {...} } }
                  // { order: {...} }
                  let order: any = null;
                  if (p?.order) order = p.order;
                  else if (p?.new) order = p.new;
                  else if (p?.payload && p.payload.new) order = p.payload.new;
                  else if (p?.payload && p.payload.order) order = p.payload.order;
                  else if (p?.id && (p?.new || p?.old)) order = p.new ?? p.old;
                  else if (p?.id && !p.new && !p.order) order = p; // payload may already be the order

                  if (order) {
                    applyUpdatedOrder(order);
                    fetchOrders().catch(() => {});
                  } else {
                    // as a fallback, refresh the full list
                    fetchOrders().catch(() => {});
                  }
                } catch (err) {
                  console.error("Supabase broadcast handler error:", err);
                }
              }
          )
          .subscribe((status: any, err: any) => {
            console.log("Supabase orders channel status:", status);
            if (err) console.error("Supabase channel subscribe error:", err);
            if (status === "SUBSCRIBED") fetchOrders().catch(() => {});
          });
      }
    } catch (e) {
      console.warn("Supabase realtime error:", e);
    }

    // Listen to storage events (other tabs)
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
          <button
            className="btn-outline"
            onClick={() => fetchOrders()}
            disabled={loading}
          >
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
 