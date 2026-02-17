"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { formatPrice } from "@/lib/utils";
import type { OrderPayload } from "@/lib/order";

interface OrderData extends OrderPayload {
  orderNumber: string;
}

export default function OrderConfirmationContent() {
  const searchParams = useSearchParams();
  const [order, setOrder] = useState<OrderData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Try to get order from query param or localStorage
    const orderParam = searchParams.get("order");

    if (orderParam) {
      // Load from localStorage
      const stored = localStorage.getItem("lastOrder");
      if (stored) {
        try {
          const orderData = JSON.parse(stored);
          if (orderData.orderNumber === orderParam) {
            setOrder(orderData);
          }
        } catch (error) {
          console.error("Failed to parse stored order:", error);
        }
      }
    } else {
      // Try to load any stored order
      const stored = localStorage.getItem("lastOrder");
      if (stored) {
        try {
          const orderData = JSON.parse(stored);
          setOrder(orderData);
        } catch (error) {
          console.error("Failed to parse stored order:", error);
        }
      }
    }

    setIsLoading(false);
  }, [searchParams]);

  if (isLoading) {
    return (
      <div className="w-full">
        <div className="section-padding container-custom text-center">
          <p className="text-slate-600">Loading your order...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="w-full">
        <div className="section-padding container-custom">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚠️</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                Order Not Found
              </h1>
              <p className="text-slate-600 mb-8">
                We couldn't find your order. This page is best viewed right after order
                completion.
              </p>
              <Link href="/peptides" className="btn-primary">
                Return to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Success Header */}
      <div className="border-b border-slate-200 bg-green-50">
        <div className="container-custom py-12 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-200 rounded-full mb-4">
            <span className="text-3xl">✓</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Order Confirmed</h1>
          <p className="text-slate-600 mt-2">
            Thank you for your order! We've received it and are processing your
            request.
          </p>
        </div>
      </div>

      {/* Confirmation Content */}
      <section className="section-padding container-custom">
        <div className="max-w-2xl mx-auto">
          {/* Order Number */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8 text-center">
            <p className="text-sm text-slate-600 mb-2">Order Number</p>
            <p className="text-4xl font-bold text-blue-600 font-mono mb-4">
              {order.orderNumber}
            </p>
            <p className="text-sm text-slate-500">
              Please save this number for your records. You'll need it for payment and inquiries.
            </p>
          </div>

          {/* Order Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {/* Customer Info */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Contact Information
              </h3>
              <div className="space-y-2 text-sm">
                <p className="text-slate-600">
                  <strong>{order.shipping.firstName} {order.shipping.lastName}</strong>
                </p>
                <p className="text-slate-600">{order.email}</p>
                <p className="text-slate-600">{order.shipping.phone}</p>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Shipping Address
              </h3>
              <div className="text-sm text-slate-600 space-y-1">
                <p>{order.shipping.address1}</p>
                {order.shipping.address2 && <p>{order.shipping.address2}</p>}
                <p>
                  {order.shipping.suburb} {order.shipping.state}{" "}
                  {order.shipping.postcode}
                </p>
                <p>{order.shipping.country}</p>
              </div>
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-6">
              Order Items
            </h3>

            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center py-4 border-b border-slate-100 last:border-0"
                >
                  <div>
                    <p className="font-medium text-slate-900">{item.name}</p>
                    <p className="text-sm text-slate-600">
                      Quantity: {item.quantity}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-900">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                    <p className="text-sm text-slate-500">
                      {formatPrice(item.price)} each
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Totals */}
            <div className="mt-8 pt-8 border-t border-slate-200 space-y-2">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>Shipping</span>
                <span>{formatPrice(order.shippingCost)}</span>
              </div>
              <div className="flex justify-between items-baseline pt-4 border-t border-slate-200">
                <span className="text-lg text-slate-900">Order Total</span>
                <span className="text-2xl font-bold text-blue-600">
                  {formatPrice(order.total)}
                </span>
              </div>
            </div>
          </div>

          {/* Payment Instructions */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-8 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              How to Pay
            </h3>

            <div className="space-y-4">
              <p className="text-slate-600">
                We've sent bank transfer details to your email. Please complete the
                payment transfer with the following information:
              </p>

              <div className="bg-white border border-blue-200 rounded p-4 font-mono text-sm space-y-2">
                <div>
                  <span className="text-slate-600">Order Reference:</span>
                  <strong className="block text-slate-900">
                    {order.orderNumber}
                  </strong>
                </div>
                <div>
                  <span className="text-slate-600">Amount Due:</span>
                  <strong className="block text-blue-600">
                    {formatPrice(order.total)}
                  </strong>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded p-4">
                <p className="text-sm text-amber-900">
                  <strong>Important:</strong> Include your order number in the payment
                  reference so we can match your transfer. Once we receive payment, we'll
                  confirm it and prepare your order for dispatch.
                </p>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">
              What Happens Next
            </h3>

            <ol className="space-y-3 text-slate-600">
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  1
                </span>
                <span>
                  <strong className="text-slate-900">Verify Payment</strong> — We'll
                  confirm your bank transfer
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  2
                </span>
                <span>
                  <strong className="text-slate-900">Prepare Order</strong> — Your
                  products will be carefully prepared with proper temperature control
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  3
                </span>
                <span>
                  <strong className="text-slate-900">Dispatch</strong> — Your order
                  will be dispatched with tracking information
                </span>
              </li>
              <li className="flex gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
                  4
                </span>
                <span>
                  <strong className="text-slate-900">Delivery</strong> — Products
                  arrive in secure packaging with handling instructions
                </span>
              </li>
            </ol>
          </div>

          {/* Order Note */}
          {order.note && (
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Your Order Note
              </h3>
              <p className="text-slate-600">{order.note}</p>
            </div>
          )}

          {/* Contact Support */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">
              Questions?
            </h3>
            <p className="text-slate-600 mb-4">
              Check your email for detailed bank transfer instructions and our
              contact information.
            </p>
            <p className="text-sm text-slate-500">
              Order#{" "}
              <strong className="text-slate-700 font-mono">
                {order.orderNumber}
              </strong>
            </p>
          </div>

          {/* Return to Shop */}
          <div className="text-center">
            <Link href="/peptides" className="btn-primary">
              Return to Shop
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
