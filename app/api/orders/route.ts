import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOrderPayload, generateOrderNumber } from "@/lib/order";
import type { OrderPayload } from "@/lib/order";
import {
  OrderEmailTemplate,
  CustomerConfirmationEmailTemplate,
} from "@/lib/email-templates";

const resend = new Resend(process.env.RESEND_API_KEY);
const OWNER_EMAIL = process.env.OWNER_EMAIL || "nikos_192837@outlook.com";
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
