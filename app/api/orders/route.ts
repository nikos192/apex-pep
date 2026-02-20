import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOrderPayload, generateOrderNumber } from "@/lib/order";
import type { OrderPayload } from "@/lib/order";
import {
  OrderEmailTemplate,
  CustomerConfirmationEmailTemplate,
} from "@/lib/email-templates";
import { createSupabaseServerClient } from "@/lib/supabaseServer";
import fs from "fs";
import path from "path";

const resend = new Resend(process.env.RESEND_API_KEY!);
const OWNER_EMAIL = process.env.OWNER_EMAIL || "andy@peptideapex.com";
const SHOP_NAME = "Apex Labs Australia";

export async function POST(request: NextRequest) {
  try {
    const payload: OrderPayload = await request.json();

    // Validate order payload
    const validation = validateOrderPayload(payload);
    if (!validation.valid) {
      return NextResponse.json(
        {
          success: false,
          error: validation.errors.join("; "),
        },
        { status: 400 }
      );
    }

    // Create Supabase client early so we can check uniqueness of order number
    const supabase = createSupabaseServerClient();

    // Generate unique order number (try a few times to avoid collisions)
    let orderNumber = "";
    for (let i = 0; i < 5; i++) {
      const candidate = generateOrderNumber();
      const { data: exists, error: existsErr } = await supabase
        .from("orders")
        .select("id")
        .eq("order_number", candidate)
        .limit(1);

      if (existsErr) {
        console.warn("[OrderAPI] Error checking existing order_number:", existsErr);
        // If we can't check, assume candidate is fine
        orderNumber = candidate;
        break;
      }

      if (!exists || (Array.isArray(exists) && exists.length === 0)) {
        orderNumber = candidate;
        break;
      }
    }

    // Fallback: if still empty, generate a timestamp-based fallback
    if (!orderNumber) {
      orderNumber = String(Math.floor(Date.now() / 1000) % 100000).padStart(5, "0");
    }

    // Get current date/time in Australian timezone
    const orderDate = new Date().toLocaleString("en-AU", {
      timeZone: "Australia/Brisbane",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    // Generate email content
    const ownerEmailHtml = OrderEmailTemplate({
      orderNumber,
      payload,
      orderDate,
    });

    const customerEmailHtml = CustomerConfirmationEmailTemplate({
      orderNumber,
      payload,
      orderDate,
    });

    // Send owner notification email. If this fails, log and continue
    // so the order is still recorded; include a warning in the response.
    let ownerEmailFailed = false;
    let ownerEmailError: any = null;
    try {
      const ownerEmailResponse = await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL!,
        to: OWNER_EMAIL,
        subject: `New Order ${orderNumber} - ${SHOP_NAME}`,
        html: ownerEmailHtml,
        replyTo: payload.email,
      });

      if (ownerEmailResponse?.error) {
        ownerEmailFailed = true;
        ownerEmailError = ownerEmailResponse.error;
        console.error("[OrderAPI] Owner email failed:", {
          error: ownerEmailResponse.error,
          to: OWNER_EMAIL,
          orderNumber,
        });
      }
    } catch (err) {
      ownerEmailFailed = true;
      ownerEmailError = err;
      console.error("[OrderAPI] Owner email threw error:", err);
    }

    // Insert order into Supabase
    const { error: supabaseError } = await supabase
      .from("orders")
      .insert({
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

    if (supabaseError) {
      console.error("[OrderAPI] Supabase insert failed:", {
        error: supabaseError,
        orderNumber,
      });

      // Detect missing table error (PostgREST schema cache)
      if (supabaseError.code === "PGRST205" || (supabaseError.message || "").includes("Could not find the table")) {
        const hint = `Supabase error PGRST205: table \"public.orders\" not found. Run the provided SQL in your Supabase project's SQL editor (see instructions) and then refresh the API schema.`;
        return NextResponse.json(
          {
            success: false,
            error: "Failed to save order to database: orders table missing",
            details: hint,
          },
          { status: 500 }
        );
      }
      // Save order to local pending queue so orders are not lost
      try {
        const dataDir = path.resolve(process.cwd(), "data");
        if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
        const filePath = path.join(dataDir, "pending-orders.json");
        let pending: any[] = [];
        if (fs.existsSync(filePath)) {
          const raw = fs.readFileSync(filePath, "utf8");
          pending = raw ? JSON.parse(raw) : [];
        }
        pending.push({ orderNumber, payload, createdAt: new Date().toISOString() });
        fs.writeFileSync(filePath, JSON.stringify(pending, null, 2));
        console.warn(`[OrderAPI] Order ${orderNumber} saved to pending queue: ${filePath}`);
      } catch (fileErr) {
        console.error("[OrderAPI] Failed to write pending order:", fileErr);
      }

      // Do not fail checkout for the customer; return success but include notices
      const warnings: string[] = [];
      warnings.push("Order saved locally and will be synced to the database when available.");
      if (ownerEmailFailed) {
        warnings.push("Owner notification email failed to send.");
      }
      return NextResponse.json(
        {
          success: true,
          orderNumber,
          warnings,
        },
        { status: 200 }
      );
    }

    // Send customer confirmation email (optional, don't fail if this fails)
    try {
      await resend.emails.send({
        from: process.env.CONTACT_FROM_EMAIL!,
        to: payload.email,
        subject: `Order Confirmation - ${orderNumber}`,
        html: customerEmailHtml,
      });
    } catch (customerEmailError) {
      console.warn(
        "[OrderAPI] Customer confirmation email failed:",
        customerEmailError
      );
      // Don't fail the order if customer email fails
    }

    // Return success response with order number. If owner email failed,
    // include a warning so admins know to check notifications.
    if (ownerEmailFailed) {
      return NextResponse.json(
        {
          success: true,
          orderNumber,
          warnings: ["Owner notification email failed to send."],
        },
        { status: 200 }
      );
    }

    return NextResponse.json({ success: true, orderNumber }, { status: 200 });
  } catch (error) {
    console.error("[OrderAPI] Unexpected error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process order. Please try again later.",
      },
      { status: 500 }
    );
  }
}
