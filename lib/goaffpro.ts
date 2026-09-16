import type { OrderPayload } from "@/lib/order";

export const GOAFFPRO_STORE_KEY = "vwvwrobnpu";

export interface CompletedOrder extends OrderPayload {
  orderNumber: string;
  createdAt?: string;
}

export interface GoAffProOrder {
  id: string;
  number: string;
  total: number;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  currency: "AUD";
  date: string;
  customer: {
    first_name: string;
    last_name: string;
    email: string;
    phone?: string;
  };
  coupons: string[];
  line_items: Array<{
    name: string;
    quantity: number;
    price: number;
    sku: string;
    product_id: string;
    tax: number;
  }>;
  forceSDK: true;
}

export function createGoAffProOrder(order: CompletedOrder): GoAffProOrder {
  const discount = (order.promoDiscount || 0) + (order.bundleDiscount || 0);

  return {
    id: order.orderNumber,
    number: order.orderNumber,
    total: order.total,
    subtotal: Math.max(0, order.total - order.shippingCost),
    discount,
    tax: 0,
    shipping: order.shippingCost,
    currency: "AUD",
    date: order.createdAt || new Date().toISOString(),
    customer: {
      first_name: order.shipping.firstName,
      last_name: order.shipping.lastName,
      email: order.email,
      ...(order.shipping.phone && { phone: order.shipping.phone }),
    },
    coupons: order.promoCode ? [order.promoCode] : [],
    line_items: order.items.map((item) => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price,
      sku: item.productId,
      product_id: item.productId,
      tax: 0,
    })),
    forceSDK: true,
  };
}
