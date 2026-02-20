import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "default-secret-change-in-production"
);

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("admin_session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const since = request.nextUrl.searchParams.get("since");
    if (!since) {
      return NextResponse.json({ error: "Missing since param" }, { status: 400 });
    }

    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from("orders")
      .select("id, order_number, created_at, updated_at, email, total, status")
      .or(`updated_at.gt.${since},created_at.gt.${since}`)
      .order("created_at", { ascending: false })
      .limit(200);

    if (error) {
      console.error("[AdminOrdersUpdates] Supabase error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orders: data || [] }, { status: 200, headers: { "Cache-Control": "no-store" } });
  } catch (err: any) {
    console.error("[AdminOrdersUpdates] Error:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
