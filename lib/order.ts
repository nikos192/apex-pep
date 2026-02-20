export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  email: string;
  address1: string;
  address2?: string;
  suburb: string;
  state: string;
  postcode: string;
  phone?: string;
  country: string;
}

export interface OrderPayload {
  email: string;
  shipping: ShippingAddress;
  note: string;
  promoCode?: string;
  promoPercent?: number;
  promoDiscount?: number;
  paymentMethod: "Direct bank transfer";
  shippingCost: number;
  items: CartItem[];
  subtotal: number;
  total: number;
}

export interface OrderResponse {
  success: boolean;
  orderNumber?: string;
  error?: string;
}

/**
 * Generate unique order number in format: APL-YYYYMMDD-ABCDE
 */
export function generateOrderNumber(): string {
  // Return a simple 5-digit numeric order number (10000-99999)
  const num = Math.floor(10000 + Math.random() * 90000);
  return String(num).padStart(5, "0");
}

/**
 * Format AUD currency
 */
export function formatAUD(amount: number): string {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: "AUD",
  }).format(amount);
}

/**
 * Validate order payload
 */
export function validateOrderPayload(payload: OrderPayload): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!payload.email || !payload.email.includes("@")) {
    errors.push("Valid email is required");
  }

  if (!payload.shipping.firstName?.trim()) {
    errors.push("First name is required");
  }

  if (!payload.shipping.lastName?.trim()) {
    errors.push("Last name is required");
  }

  if (!payload.shipping.address1?.trim()) {
    errors.push("Address is required");
  }

  if (!payload.shipping.suburb?.trim()) {
    errors.push("Suburb is required");
  }

  if (!payload.shipping.state?.trim()) {
    errors.push("State is required");
  }

  if (!payload.shipping.postcode?.trim()) {
    errors.push("Postcode is required");
  }

  if (!payload.items || payload.items.length === 0) {
    errors.push("Cart cannot be empty");
  }

  if (!payload.paymentMethod) {
    errors.push("Payment method is required");
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}
