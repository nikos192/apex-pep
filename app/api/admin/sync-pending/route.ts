import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { jwtVerify } from "jose";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "default-secret-change-in-production"
);

export async function POST(request: NextRequest) {
  try {
    // verify admin session
    const token = request.cookies.get("admin_session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filePath = path.resolve(process.cwd(), "data/pending-orders.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ success: true, synced: 0 }, { status: 200 });
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const pending = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(pending) || pending.length === 0) {
      return NextResponse.json({ success: true, synced: 0 }, { status: 200 });
    }

    const supabase = createSupabaseServerClient();
    let synced = 0;
    const failures: any[] = [];

    for (const entry of pending) {
      try {
        const { orderNumber, payload } = entry;
        const { error } = await supabase.from("orders").insert({
          order_number: orderNumber,
          email: payload.email,
          first_name: payload.shipping.firstName,
          last_name: payload.shipping.lastName,
          phone: payload.shipping.phone,
          country: payload.shipping.country,
          address1: payload.shipping.address1,
          address2: payload.shipping.address2,
          suburb: payload.shipping.suburb,
          state: payload.shipping.state,
          postcode: payload.shipping.postcode,
          note: payload.note,
          payment_method: "bank_transfer",
          status: "pending",
          items: payload.items,
          subtotal: payload.subtotal,
          shipping: payload.shippingCost,
          total: payload.total,
        });

        if (error) {
          failures.push({ orderNumber, error });
          console.error("[SyncPending] Failed to insert:", orderNumber, error);
        } else {
          synced += 1;
        }
      } catch (err) {
        failures.push({ entry, err });
      }
    }

    // Remove successfully synced entries
    const remaining = pending.filter((p: any) => !failures.find((f) => f.orderNumber === p.orderNumber));
    if (remaining.length === 0) {
      fs.unlinkSync(filePath);
    } else {
      fs.writeFileSync(filePath, JSON.stringify(remaining, null, 2));
    }

    return NextResponse.json({ success: true, synced, failures }, { status: 200 });
  } catch (err: any) {
    console.error("[SyncPending] Error:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
