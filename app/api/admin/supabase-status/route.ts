import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

export async function GET() {
  try {
    const supabase = createSupabaseServerClient();

    // Try a simple select on the orders table to detect if it exists
    const { data, error } = await supabase.from("orders").select("order_number").limit(1);

    if (error) {
      return NextResponse.json(
        {
          ok: false,
          message: "Supabase query failed",
          error: {
            code: error.code,
            message: error.message,
            details: error.details,
            hint: error.hint,
          },
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ ok: true, message: "Connected to Supabase and orders table is accessible", sample: data || [] }, { status: 200 });
  } catch (err: any) {
    return NextResponse.json({ ok: false, message: "Supabase client error", error: String(err?.message || err) }, { status: 500 });
  }
}
