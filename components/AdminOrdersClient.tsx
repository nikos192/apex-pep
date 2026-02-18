"use client";

import { useEffect, useState, useRef } from "react";
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
        setOrders(json.orders || []);
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
    // Poll every 10 seconds
    intervalRef.current = window.setInterval(fetchOrders, 10000);

    // Handler to apply an updated order payload
    const applyUpdatedOrder = (updatedOrder: any) => {
      if (!updatedOrder) return;
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
 