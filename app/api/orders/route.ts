import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOrderPayload, generateOrderNumber } from "@/lib/order";
import type { OrderPayload } from "@/lib/order";
import {
  OrderEmailTemplate,
  CustomerConfirmationEmailTemplate,
} from "@/lib/email-templates";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const resend = new Resend(process.env.RESEND_API_KEY);
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

    // Generate unique order number
    const orderNumber = generateOrderNumber();

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

    // Send owner notification email
    const ownerEmailResponse = await resend.emails.send({
      from: "Apex Labs <onboarding@resend.dev>",
      to: OWNER_EMAIL,
      subject: `New Order ${orderNumber} - ${SHOP_NAME}`,
      html: ownerEmailHtml,
      replyTo: payload.email,
    });

    if (ownerEmailResponse.error) {
      console.error("[OrderAPI] Owner email failed:", {
        error: ownerEmailResponse.error,
        to: OWNER_EMAIL,
        orderNumber,
      });
      return NextResponse.json(
        {
          success: false,
          error: "Order created but email notification failed. Contact support.",
        },
        { status: 500 }
      );
    }

    // Insert order into Supabase
    const supabase = createSupabaseServerClient();
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

      return NextResponse.json(
        {
          success: false,
          error: "Failed to save order to database. Please contact support.",
        },
        { status: 500 }
      );
    }

    // Send customer confirmation email (optional, don't fail if this fails)
    try {
      await resend.emails.send({
        from: "Apex Labs <onboarding@resend.dev>",
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

    // Return success response with order number
    return NextResponse.json(
      {
        success: true,
        orderNumber,
      },
      { status: 200 }
    );
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
