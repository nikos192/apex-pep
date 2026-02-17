import { OrderPayload, generateOrderNumber } from "@/lib/order";

interface OrderEmailProps {
  orderNumber: string;
  payload: OrderPayload;
  orderDate: string;
}

export function OrderEmailTemplate({
  orderNumber,
  payload,
  orderDate,
}: OrderEmailProps) {
  const { firstName, lastName, email, address1, address2, suburb, state, postcode, phone } =
    payload.shipping;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; color: #111827; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
    .header h1 { margin: 0; color: #111827; font-size: 24px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 15px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .detail-label { color: #6b7280; }
    .detail-value { font-weight: 500; color: #111827; }
    table { width: 100%; border-collapse: collapse; margin: 15px 0; }
    th { background: #f3f4f6; padding: 12px; text-align: left; font-weight: 600; color: #111827; border: 1px solid #e5e7eb; }
    td { padding: 12px; border: 1px solid #e5e7eb; }
    .total-row { font-weight: 600; color: #111827; font-size: 16px; }
    .footer { background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; font-size: 12px; color: #6b7280; margin-top: 30px; }
    .status-badge { display: inline-block; background: #fef3c7; color: #b45309; padding: 6px 12px; border-radius: 4px; font-size: 12px; font-weight: 600; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>New Order Received</h1>
      <p style="margin: 10px 0 0 0; color: #6b7280;">Order #${orderNumber}</p>
    </div>

    <div class="section">
      <div class="section-title">Order Details</div>
      <div class="detail-row">
        <span class="detail-label">Order Number</span>
        <span class="detail-value">${orderNumber}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Order Date</span>
        <span class="detail-value">${orderDate}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payment Status</span>
        <span><span class="status-badge">Awaiting Payment</span></span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Payment Method</span>
        <span class="detail-value">Direct Bank Transfer</span>
      </div>
      ${
        payload.promoCode
          ? `<div class="detail-row">
        <span class="detail-label">Promo Code</span>
        <span class="detail-value">${payload.promoCode}</span>
      </div>`
          : ""
      }
    </div>

    <div class="section">
      <div class="section-title">Customer Information</div>
      <div class="detail-row">
        <span class="detail-label">Name</span>
        <span class="detail-value">${firstName} ${lastName}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Email</span>
        <span class="detail-value">${email}</span>
      </div>
      ${phone ? `<div class="detail-row"><span class="detail-label">Phone</span><span class="detail-value">${phone}</span></div>` : ""}
    </div>

    <div class="section">
      <div class="section-title">Shipping Address</div>
      <div class="detail-row">
        <span class="detail-label">Address</span>
        <span class="detail-value">${address1}${address2 ? " " + address2 : ""}<br/>${suburb} ${state} ${postcode}<br/>Australia</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Order Items</div>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th style="text-align: center;">Qty</th>
            <th style="text-align: right;">Unit Price</th>
            <th style="text-align: right;">Total</th>
          </tr>
        </thead>
        <tbody>
          ${payload.items
            .map(
              (item) => `
            <tr>
              <td>${item.name}</td>
              <td style="text-align: center;">${item.quantity}</td>
              <td style="text-align: right;">$${item.price.toFixed(2)}</td>
              <td style="text-align: right;">$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
          `
            )
            .join("")}
        </tbody>
      </table>
    </div>

    <div class="section" style="background: #f9fafb; padding: 15px; border-radius: 8px;">
      <div class="detail-row">
        <span class="detail-label">Subtotal</span>
        <span class="detail-value">$${payload.subtotal.toFixed(2)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Shipping (Flat Rate)</span>
        <span class="detail-value">$${payload.shippingCost.toFixed(2)}</span>
      </div>
      <div class="detail-row" style="border: none; padding-top: 15px;">
        <span style="font-size: 16px; color: #111827;">Order Total</span>
        <span style="font-size: 18px; font-weight: 700; color: #111827;">$${payload.total.toFixed(2)}</span>
      </div>
    </div>

    ${
      payload.note
        ? `<div class="section">
      <div class="section-title">Order Note</div>
      <div style="background: #f9fafb; padding: 15px; border-radius: 8px; color: #4b5563;">
        ${payload.note}
      </div>
    </div>`
        : ""
    }

    <div class="section">
      <div class="section-title">Next Steps</div>
      <p style="color: #4b5563; margin: 0;">1. Verify customer's identity and delivery address</p>
      <p style="color: #4b5563; margin: 10px 0 0 0;">2. Send bank transfer instructions to customer</p>
      <p style="color: #4b5563; margin: 10px 0 0 0;">3. Upon payment received, prepare and dispatch order</p>
      <p style="color: #4b5563; margin: 10px 0 0 0;">4. Send tracking information to customer</p>
    </div>

    <div class="footer">
      <p>Apex Labs Australia - Research Grade Peptides<br/>
      This is an automated order notification. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
  `;
}

export function CustomerConfirmationEmailTemplate({
  orderNumber,
  payload,
  orderDate,
}: OrderEmailProps) {
  const { firstName } = payload.shipping;

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: Inter, -apple-system, BlinkMacSystemFont, Segoe UI, sans-serif; color: #111827; line-height: 1.6; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #f9fafb; padding: 30px; border-radius: 8px; margin-bottom: 30px; text-align: center; }
    .header h1 { margin: 0; color: #111827; font-size: 24px; }
    .section { margin-bottom: 30px; }
    .section-title { font-size: 16px; font-weight: 600; color: #111827; margin-bottom: 15px; }
    .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }
    .detail-label { color: #6b7280; }
    .detail-value { font-weight: 500; color: #111827; }
    .bank-details { background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; border-radius: 8px; margin: 15px 0; }
    .bank-label { font-size: 12px; color: #1e40af; font-weight: 600; text-transform: uppercase; margin-bottom: 5px; }
    .bank-value { font-size: 14px; color: #111827; font-weight: 500; margin-bottom: 15px; font-family: monospace; }
    .footer { background: #f9fafb; padding: 20px; border-radius: 8px; text-align: center; font-size: 12px; color: #6b7280; margin-top: 30px; }
    .cta-button { display: inline-block; background: #3b82f6; color: white; padding: 12px 24px; border-radius: 6px; text-decoration: none; font-weight: 600; margin: 20px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Order Confirmed</h1>
      <p style="margin: 10px 0 0 0; color: #6b7280;">Thank you, ${firstName}!</p>
    </div>

    <div class="section">
      <p style="font-size: 16px; color: #4b5563;">We've received your order and it's being processed. Below are your order details and payment instructions.</p>
    </div>

    <div class="section">
      <div class="section-title">Order Reference</div>
      <div class="detail-row">
        <span class="detail-label">Order Number</span>
        <span class="detail-value" style="font-family: monospace; font-size: 16px;">${orderNumber}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Order Date</span>
        <span class="detail-value">${orderDate}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">Order Items (${payload.items.length})</div>
      <ul style="margin: 0; padding: 0; list-style: none;">
        ${payload.items
          .map(
            (item) => `
          <li style="padding: 10px 0; border-bottom: 1px solid #e5e7eb;">
            <div style="display: flex; justify-content: space-between;">
              <div>
                <strong>${item.name}</strong><br/>
                <span style="color: #6b7280; font-size: 14px;">Quantity: ${item.quantity}</span>
              </div>
              <div style="text-align: right; font-weight: 600;">$${(item.price * item.quantity).toFixed(2)}</div>
            </div>
          </li>
        `
          )
          .join("")}
      </ul>
    </div>

    <div class="section" style="background: #f9fafb; padding: 15px; border-radius: 8px;">
      <div class="detail-row">
        <span class="detail-label">Subtotal</span>
        <span class="detail-value">$${payload.subtotal.toFixed(2)}</span>
      </div>
      <div class="detail-row">
        <span class="detail-label">Shipping</span>
        <span class="detail-value">$${payload.shippingCost.toFixed(2)}</span>
      </div>
      <div class="detail-row" style="border: none; padding-top: 15px;">
        <span style="font-size: 16px; color: #111827;">Order Total</span>
        <span style="font-size: 18px; font-weight: 700; color: #111827;">$${payload.total.toFixed(2)}</span>
      </div>
    </div>

    <div class="section">
      <div class="section-title">How to Pay</div>
      <p style="color: #4b5563; margin: 0 0 15px 0;">Please transfer the order total to the account below. <strong>Include your order number</strong> (${orderNumber}) in the transfer reference so we can match your payment.</p>
      
      <div class="bank-details">
        <div class="bank-label">Account Name</div>
        <div class="bank-value">Apex Labs Australia Pty Ltd</div>
        
        <div class="bank-label">BSB Number</div>
        <div class="bank-value">XXX XXX</div>
        
        <div class="bank-label">Account Number</div>
        <div class="bank-value">XXXX XXXX</div>
        
        <div class="bank-label">Reference</div>
        <div class="bank-value">${orderNumber}</div>
      </div>

      <p style="color: #6b7280; font-size: 14px; margin: 15px 0 0 0;"><strong>Note:</strong> Bank details have been removed for security. You'll receive complete transfer instructions via email or phone shortly.</p>
    </div>

    <div class="section">
      <p style="color: #4b5563; margin: 0;"><strong>Once we receive your payment, we'll:</strong></p>
      <ul style="color: #4b5563; margin: 10px 0 0 0; padding-left: 20px;">
        <li>Verify and prepare your order</li>
        <li>Send you tracking information</li>
        <li>Ensure proper cold chain handling and temperature control</li>
      </ul>
    </div>

    <div class="footer">
      <p>Questions? Contact us or reply to this email.<br/>
      Apex Labs Australia - Research Grade Peptides<br/>
      <em>All products are for research purposes only.</em></p>
    </div>
  </div>
</body>
</html>
  `;
}
