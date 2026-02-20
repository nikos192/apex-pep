import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();
    const { data, error, count } = await supabase
      .from("orders")
      .select("id, order_number, created_at, updated_at, email, total, status", { count: "exact" })
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("[DebugOrders] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ count: count ?? (data ? data.length : 0), orders: data || [] }, { status: 200 });
  } catch (err: any) {
    console.error("[DebugOrders] Error:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
