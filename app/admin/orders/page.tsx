import { createSupabaseServerClient } from "@/lib/supabaseServer";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import OrdersTable from "@/components/OrdersTable";

interface Order {
  id: string;
  order_number: string;
  created_at: string;
  email: string;
  total: number;
  status: string;
}

export default async function AdminOrdersPage() {
  const supabase = createSupabaseServerClient();

  let orders: Order[] = [];
  let error: string | null = null;

  try {
    const { data, error: fetchError } = await supabase
      .from("orders")
      .select("id, order_number, created_at, email, total, status")
      .order("created_at", { ascending: false })
      .limit(100);

    if (fetchError) {
      error = `Failed to fetch orders: ${fetchError.message}`;
      console.error("[AdminOrders] Supabase error:", fetchError);
    } else {
      orders = data || [];
    }
  } catch (err) {
    error = "An error occurred while fetching orders";
    console.error("[AdminOrders] Error:", err);
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="container-custom py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Orders</h1>
          <p className="text-slate-600">
            {orders.length} order{orders.length !== 1 ? "s" : ""} in system
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Orders Table */}
        {orders.length === 0 ? (
          <div className="bg-white rounded-lg border border-slate-200 p-8 text-center">
            <p className="text-slate-600">No orders found.</p>
          </div>
        ) : (
          <OrdersTable orders={orders} />
        )}
      </main>
    </div>
  );
}
