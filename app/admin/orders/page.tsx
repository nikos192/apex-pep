import { createSupabaseServerClient } from "@/lib/supabaseServer";
import Link from "next/link";
import AdminHeader from "@/components/AdminHeader";
import AdminOrdersClient from "@/components/AdminOrdersClient";

export const dynamic = "force-dynamic";

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
      // Provide actionable hint
      if (fetchError.details && fetchError.details.includes("getaddrinfo")) {
        error += " — Check NEXT_PUBLIC_SUPABASE_URL in your environment variables.";
      }
    } else {
      orders = data || [];
    }
  } catch (err: any) {
    console.error("[AdminOrders] Error:", err);
    error = String(err?.message || err) || "An error occurred while fetching orders";
    if (error.includes("Missing Supabase environment variables")) {
      error += " — Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) are set.";
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <AdminHeader />

      <main className="container-custom py-8">
        <AdminOrdersClient />
      </main>
    </div>
  );
}
