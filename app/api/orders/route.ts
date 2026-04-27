import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { validateOrderPayload, generateOrderNumber, normalizeOrderPayload } from "@/lib/order";
import type { OrderPayload } from "@/lib/order";
import {
  OrderEmailTemplate,
  CustomerConfirmationEmailTemplate,
} from "@/lib/email-templates";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY!);
const OWNER_EMAIL = process.env.OWNER_EMAIL || "andy@peptideapex.com";
const SHOP_NAME = "Apex Labs Australia";

export async function POST(request: NextRequest) {
  try {
    const rawPayload: OrderPayload = await request.json();
    const payload = normalizeOrderPayload(rawPayload);

    const validation = validateOrderPayload(payload);
    if (!validation.valid) {
      return NextResponse.json(
        { success: false, error: validation.errors.join("; ") },
        { status: 400 }
      );
    }

    const orderNumber = generateOrderNumber();

    const orderDate = new Date().toLocaleString("en-AU", {
      timeZone: "Australia/Brisbane",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });

    const ownerEmailHtml = OrderEmailTemplate({ orderNumber, payload, orderDate });
    const customerEmailHtml = CustomerConfirmationEmailTemplate({
      orderNumber,
      payload,
      orderDate,
    });

    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    if (!fromEmail) {
      console.error("[OrderAPI] CONTACT_FROM_EMAIL not set");
      return NextResponse.json(
        { success: false, error: "Email service is not configured." },
        { status: 500 }
      );
    }

    const warnings: string[] = [];

    let ownerEmailFailed = false;
    try {
      const ownerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: OWNER_EMAIL,
        subject: `New Order ${orderNumber} - ${SHOP_NAME}`,
        html: ownerEmailHtml,
        replyTo: payload.email,
      });

      if (ownerEmailResponse?.error) {
        ownerEmailFailed = true;
        console.error("[OrderAPI] Owner email failed:", ownerEmailResponse.error);
      }
    } catch (err) {
      ownerEmailFailed = true;
      console.error("[OrderAPI] Owner email threw error:", err);
    }

    if (ownerEmailFailed) {
      warnings.push("Owner notification email failed to send.");
    }

    try {
      const customerEmailResponse = await resend.emails.send({
        from: fromEmail,
        to: payload.email,
        subject: `Order Confirmation - ${orderNumber}`,
        html: customerEmailHtml,
      });

      if (customerEmailResponse?.error) {
        console.warn(
          "[OrderAPI] Customer confirmation email returned error:",
          customerEmailResponse.error
        );
        warnings.push("Customer confirmation email failed to send.");
      }
    } catch (customerEmailError) {
      console.warn(
        "[OrderAPI] Customer confirmation email threw error:",
        customerEmailError
      );
      warnings.push("Customer confirmation email failed to send.");
    }

    return NextResponse.json(
      {
        success: true,
        orderNumber,
        ...(warnings.length > 0 && { warnings }),
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
