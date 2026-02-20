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
      if (!res.ok) {
        setError(json?.error || "Failed to load orders");
        setOrders([]);
      } else {
        let fetched = json.orders || [];
        // re-apply any recent optimistic updates so UI doesn't flip back
        try {
          const recent = recentUpdatesRef.current || {};
          if (Object.keys(recent).length > 0) {
            fetched = fetched.map((o: any) =>
              recent[o.order_number] ? { ...o, ...recent[o.order_number] } : o
            );
          }
        } catch (e) {
          // ignore
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
    // Poll every 5 seconds (reduced for faster updates)
    intervalRef.current = window.setInterval(fetchOrders, 5000);

    // Handler to apply an updated order payload
    const applyUpdatedOrder = (updatedOrder: any) => {
      if (!updatedOrder) return;
      // record recent update to avoid being overwritten by a subsequent fetch
      try {
        recentUpdatesRef.current = {
          ...recentUpdatesRef.current,
          [updatedOrder.order_number]: updatedOrder,
        };
        // prune entries older than ~60s
        const now = Date.now();
        Object.keys(recentUpdatesRef.current).forEach((k) => {
          const entry = recentUpdatesRef.current[k];
          const ts = new Date(entry.updated_at || now).getTime();
          if (now - ts > 60 * 1000) delete recentUpdatesRef.current[k];
        });
      } catch (e) {
        // ignore
      }
      setOrders((prev) =>
        prev.map((o) => (o.order_number === updatedOrder.order_number ? { ...o, ...updatedOrder } : o))
      );
      console.log("AdminOrdersClient: applied updated order", updatedOrder.order_number, updatedOrder.status);
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
              if (data?.session) {
                console.debug("Supabase realtime: session present");
              }
            }).catch(() => {});

          // Listen for auth changes and refetch on change (helps when user logs in/out)
          try {
            supabase.auth.onAuthStateChange((_event, session) => {
              console.debug("Supabase auth change", _event);
              if (session?.access_token) {
                fetchOrders().catch(() => {});
              }
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
            (payload) => {
              try {
                console.debug("Supabase postgres_changes payload:", payload);
                if (payload?.new) applyUpdatedOrder(payload.new);
                else if (payload?.old && String(payload.event).toUpperCase().includes("DELETE")) applyUpdatedOrder({ ...payload.old, __deleted: true });
              } catch (err) {
                console.error("Supabase postgres_changes handler error:", err);
              }
            }
          )
          .on(
            "broadcast",
            { event: "orders_broadcast" },
            (payload) => {
              try {
                console.debug("Supabase broadcast payload:", payload);
                // payload may contain nested shapes depending on trigger
                const p = payload?.payload ?? payload?.data ?? payload;
                // Expecting { action: 'INSERT'|'UPDATE'|'DELETE', order: {...} }
                if (p?.action && p?.order) {
                  applyUpdatedOrder(p.order);
                } else if (p?.order) {
                  // fallback
                  applyUpdatedOrder(p.order);
                }
              } catch (err) {
                console.error("Supabase broadcast handler error:", err);
              }
            }
          )
          .subscribe((status, err) => {
            console.log("Supabase orders channel status:", status);
            if (err) console.error("Supabase channel subscribe error:", err);
            if (status === "SUBSCRIBED") {
              // Optionally refetch to ensure no missed rows
              fetchOrders().catch(() => {});
            }
          });
      }
    } catch (e) {
      console.warn("Supabase realtime error:", e);
    }

    // Read any localStorage fallback written before navigation
    try {
      const stored = localStorage.getItem("order-updated");
      console.log("AdminOrdersClient: read localStorage order-updated", stored);
      if (stored) {
        const parsed = JSON.parse(stored);
        console.log("AdminOrdersClient: parsed stored update", parsed);
        if (parsed?.order) {
          applyUpdatedOrder(parsed.order);
        }
        // remove after reading
        localStorage.removeItem("order-updated");
      }
    } catch (e) {
      // ignore
    }

    // Also listen to storage events (other tabs)
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
      if (bc) {
        bc.close();
      }
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
 