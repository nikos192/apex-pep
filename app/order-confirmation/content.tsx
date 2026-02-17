"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import SuccessHeader from "@/components/SuccessHeader";
import BankDetailsCard from "@/components/BankDetailsCard";
import OrderSummaryCard from "@/components/OrderSummaryCard";
import type { OrderPayload } from "@/lib/order";

interface OrderData extends OrderPayload {
  orderNumber: string;
  warnings?: string[];
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
            <div className="text-center">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-10 h-10 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-2">
                No Order Found
              </h1>
              <p className="text-slate-600 mb-6">
                We couldn't find your order details. This page is best viewed immediately after checkout completion.
              </p>
              <Link href="/peptides" className="inline-block bg-blue-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors">
                Return to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Format order date
  const orderDate = new Date().toLocaleDateString("en-AU", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Format currency
  const formatAUD = (amount: number) => {
    return new Intl.NumberFormat("en-AU", {
      style: "currency",
      currency: "AUD",
    }).format(amount);
  };

  return (
    <div className="w-full bg-slate-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-white border-b border-slate-200">
        <div className="container-custom py-16">
          <div className="max-w-3xl mx-auto">
            <SuccessHeader />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="section-padding container-custom">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Order Summary Info Card */}
          {order.warnings && order.warnings.length > 0 && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-amber-900">
              <h3 className="font-semibold mb-1">Notice</h3>
              <ul className="text-sm">
                {order.warnings.map((w: string, i: number) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
          <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Order Number
                </p>
                <p className="text-2xl font-bold text-slate-900 font-mono">
                  {order.orderNumber}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Order Date
                </p>
                <p className="text-2xl font-bold text-slate-900">{orderDate}</p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Total Amount
                </p>
                <p className="text-2xl font-bold text-blue-600">
                  {formatAUD(order.total)}
                </p>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
                  Payment Method
                </p>
                <p className="text-2xl font-bold text-slate-900">
                  Direct Bank Transfer
                </p>
              </div>
            </div>
          </div>

          {/* Bank Details Card */}
          <BankDetailsCard
            orderNumber={order.orderNumber}
            total={formatAUD(order.total)}
          />

          {/* Order Details */}
          <OrderSummaryCard
            items={order.items}
            subtotal={order.subtotal}
            shipping={order.shippingCost}
            total={order.total}
          />

          {/* Customer Details */}
          <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-6">
              Delivery Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Shipping Address */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Shipping Address
                </h3>
                <div className="text-slate-700 space-y-1">
                  <p>
                    {order.shipping.firstName} {order.shipping.lastName}
                  </p>
                  <p>{order.shipping.address1}</p>
                  {order.shipping.address2 && <p>{order.shipping.address2}</p>}
                  <p>
                    {order.shipping.suburb} {order.shipping.state}{" "}
                    {order.shipping.postcode}
                  </p>
                  <p>{order.shipping.country}</p>
                </div>
              </div>

              {/* Contact Email */}
              <div>
                <h3 className="font-semibold text-slate-900 mb-3">
                  Contact Details
                </h3>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Email</p>
                    <p className="text-slate-900">{order.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Phone</p>
                    <p className="text-slate-900">{order.shipping.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Support Section */}
          <div className="bg-white rounded-lg border border-slate-200 p-8 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">
              Need Assistance?
            </h2>

            <p className="text-slate-700 mb-6">
              If you have questions regarding your order or payment, please contact our support team.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email Support */}
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                  Email
                </p>
                <a
                  href="mailto:andy@peptideapex.com"
                  className="text-blue-600 hover:text-blue-700 font-medium text-lg"
                >
                  andy@peptideapex.com
                </a>
              </div>

              {/* Telegram Support */}
              <div className="border border-slate-200 rounded-lg p-4">
                <p className="text-sm font-semibold text-slate-600 mb-2 uppercase tracking-wide">
                  Telegram
                </p>
                <a
                  href="https://t.me/apexlabs_aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700 font-medium text-lg"
                >
                  @apexlabs_aus
                </a>
              </div>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="bg-slate-50 rounded-lg border border-slate-200 p-6 text-center">
            <p className="text-sm text-slate-600">
              All products supplied by Apex Labs Australia are intended strictly for laboratory research purposes only. Not for human consumption.
            </p>
          </div>

          {/* Return to Shop */}
          <div className="text-center pt-4">
            <Link
              href="/peptides"
              className="inline-block bg-blue-600 text-white font-medium py-3 px-8 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
