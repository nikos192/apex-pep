import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "default-secret-change-in-production"
);

export const dynamic = "force-dynamic";

const ALLOWED_STATUSES = ["pending", "paid", "shipped", "cancelled"];

export async function PATCH(
  request: NextRequest,
  { params }: { params: { orderNumber: string } }
) {
  try {
    // Verify admin session
    const token = request.cookies.get("admin_session")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { status } = body;

    if (!status || !ALLOWED_STATUSES.includes(status)) {
      return NextResponse.json(
        { error: `Invalid status. Must be one of: ${ALLOWED_STATUSES.join(", ")}` },
        { status: 400 }
      );
    }

    // Update order in Supabase
    const supabase = createSupabaseServerClient();
    const { error: updateError } = await supabase
      .from("orders")
      .update({ status })
      .eq("order_number", params.orderNumber);

    if (updateError) {
      console.error("[UpdateStatus] Supabase error:", updateError);
      return NextResponse.json(
        { error: "Failed to update order status" },
        { status: 500 }
      );
    }

    // Re-fetch the updated order to return to the client for immediate UI sync
    const { data: updatedOrder, error: fetchError } = await supabase
      .from("orders")
      .select("*")
      .eq("order_number", params.orderNumber)
      .single();

    if (fetchError) {
      console.error("[UpdateStatus] Fetch updated order error:", fetchError);
      // Still return success but without order payload
      return NextResponse.json({ success: true, status }, { status: 200 });
    }

    return NextResponse.json({ success: true, status, order: updatedOrder }, { status: 200 });
  } catch (error) {
    console.error("[UpdateStatus] Error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
