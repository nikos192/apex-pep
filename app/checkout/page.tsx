"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useCartActions } from "@/app/hooks/useCartActions";
import { formatPrice } from "@/lib/utils";
import { validateOrderPayload } from "@/lib/order";
import type { OrderPayload } from "@/lib/order";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { clearCart } = useCartActions();
  const router = useRouter();

  // Form state
  const [formData, setFormData] = useState({
    // Contact
    email: "",
    // Shipping
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    suburb: "",
    state: "",
    postcode: "",
    phone: "",
    country: "Australia",
    // Payment & Notes
    shippingOption: "standard",
    note: "",
    acknowledgement: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const SHIPPING_COST = 20;

  // Calculate totals
  const subtotal = cart.total;
  const shippingCost = formData.shippingOption === "standard" ? SHIPPING_COST : 0;
  const total = subtotal + shippingCost;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    setIsLoading(true);

    try {
      // Validate acknowledgement
      if (!formData.acknowledgement) {
        setErrors({ acknowledgement: "You must acknowledge the research use disclaimer" });
        setIsLoading(false);
        return;
      }

      // Build order payload
      const orderPayload: OrderPayload = {
        email: formData.email,
        shipping: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          address1: formData.address1,
          address2: formData.address2,
          suburb: formData.suburb,
          state: formData.state,
          postcode: formData.postcode,
          phone: formData.phone,
          country: formData.country,
        },
        note: formData.note,
        paymentMethod: "Direct bank transfer",
        shippingCost,
        items: cart.items,
        subtotal,
        total,
      };

      // Validate order payload
      const validation = validateOrderPayload(orderPayload);
      if (!validation.valid) {
        setErrors({
          form: validation.errors.join("; "),
        });
        setIsLoading(false);
        return;
      }

      // Submit order to API
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderPayload),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setSubmitError(result.error || "Failed to process order");
        setIsLoading(false);
        return;
      }

      // Save order to localStorage for confirmation page
      const orderData = {
        orderNumber: result.orderNumber,
        ...orderPayload,
      };
      localStorage.setItem("lastOrder", JSON.stringify(orderData));

      // Clear cart and redirect
      clearCart();
      router.push(`/order-confirmation?order=${result.orderNumber}`);
    } catch (error) {
      console.error("Order submission error:", error);
      setSubmitError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="w-full">
        <div className="section-padding container-custom text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Your cart is empty
          </h1>
          <p className="text-slate-600 mb-8">
            Please add some peptides before checking out.
          </p>
          <Link href="/peptides" className="btn-primary">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-custom py-12">
          <h1 className="text-3xl font-bold text-slate-900">Checkout</h1>
          <p className="text-slate-600 mt-2">
            Review your order and complete your purchase
          </p>
        </div>
      </div>

      {/* Checkout Section */}
      <section className="section-padding container-custom">
        <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left Column - Order Content */}
          <div className="lg:col-span-2">
            {/* Global Error Message */}
            {submitError && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8 text-red-700">
                {submitError}
              </div>
            )}

            {/* Order Summary */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Order Summary
              </h2>

              <div className="space-y-6">
                {cart.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex gap-4 border-b border-slate-100 pb-6"
                  >
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg bg-slate-50 border border-slate-200">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={96}
                        height={96}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-slate-600 text-sm mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-slate-900">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                      <p className="text-slate-500 text-sm">
                        {formatPrice(item.price)} each
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Important Notice */}
            <div className="border border-amber-200 bg-amber-50 rounded-lg p-6 mb-8">
              <h3 className="font-semibold text-amber-900 mb-2">
                Important Information
              </h3>
              <ul className="text-sm text-amber-800 space-y-2">
                <li>
                  ✓ All products are intended for research purposes only
                </li>
                <li>✓ Products must be stored according to instructions</li>
                <li>✓ Third-party tested for purity and potency</li>
                <li>
                  ✓ We follow all Australian biosafety and export regulations
                </li>
              </ul>
            </div>

            {/* Contact Information */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Contact Information
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="your@email.com"
                    className={`input-field ${errors.email ? "border-red-500" : ""}`}
                    disabled={isLoading}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Details */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Shipping Address
              </h2>

              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      className={`input-field ${
                        errors.firstName ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                      required
                    />
                    {errors.firstName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.firstName}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      className={`input-field ${
                        errors.lastName ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                      required
                    />
                    {errors.lastName && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.lastName}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="address1"
                    value={formData.address1}
                    onChange={handleInputChange}
                    placeholder="123 Main Street"
                    className={`input-field ${
                      errors.address1 ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                    required
                  />
                  {errors.address1 && (
                    <p className="text-red-500 text-sm mt-1">
                      {errors.address1}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Apartment, suite, etc. (optional)
                  </label>
                  <input
                    type="text"
                    name="address2"
                    value={formData.address2}
                    onChange={handleInputChange}
                    placeholder="Apt 4B"
                    className="input-field"
                    disabled={isLoading}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Suburb/City *
                    </label>
                    <input
                      type="text"
                      name="suburb"
                      value={formData.suburb}
                      onChange={handleInputChange}
                      placeholder="Sydney"
                      className={`input-field ${
                        errors.suburb ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                      required
                    />
                    {errors.suburb && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.suburb}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      placeholder="NSW"
                      className={`input-field ${
                        errors.state ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                      required
                    />
                    {errors.state && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.state}
                      </p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Postcode *
                    </label>
                    <input
                      type="text"
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleInputChange}
                      placeholder="2000"
                      className={`input-field ${
                        errors.postcode ? "border-red-500" : ""
                      }`}
                      disabled={isLoading}
                      required
                    />
                    {errors.postcode && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.postcode}
                      </p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+61 2 XXXX XXXX"
                    className={`input-field ${
                      errors.phone ? "border-red-500" : ""
                    }`}
                    disabled={isLoading}
                    required
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                  )}
                </div>
              </div>
            </div>

            {/* Shipping Options */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Shipping Method
              </h2>

              <div className="space-y-3">
                <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="shippingOption"
                    value="standard"
                    checked={formData.shippingOption === "standard"}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <div>
                    <p className="font-medium text-slate-900">
                      Standard Shipping
                    </p>
                    <p className="text-sm text-slate-600">
                      Australia-wide delivery
                    </p>
                  </div>
                  <span className="ml-auto font-semibold text-slate-900">
                    ${SHIPPING_COST}
                  </span>
                </label>

                <label className="flex items-start gap-3 p-4 border border-slate-200 rounded-lg cursor-pointer hover:bg-slate-50">
                  <input
                    type="radio"
                    name="shippingOption"
                    value="local"
                    checked={formData.shippingOption === "local"}
                    onChange={handleInputChange}
                    disabled={isLoading}
                  />
                  <div>
                    <p className="font-medium text-slate-900">Local Pickup</p>
                    <p className="text-sm text-slate-600">
                      Brisbane, Queensland
                    </p>
                  </div>
                  <span className="ml-auto font-semibold text-slate-900">
                    Free
                  </span>
                </label>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Payment Method
              </h2>

              <div className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded border-2 border-blue-500 flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  </div>
                  <div>
                    <p className="font-medium text-slate-900">
                      Direct Bank Transfer
                    </p>
                    <p className="text-sm text-slate-600">
                      You will receive bank transfer details via email after order confirmation
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <h2 className="text-xl font-bold text-slate-900 mb-6">
                Order Notes
              </h2>

              <textarea
                name="note"
                value={formData.note}
                onChange={handleInputChange}
                placeholder="Add any special instructions or notes here (optional)"
                className="input-field"
                rows={4}
                disabled={isLoading}
              />
            </div>

            {/* Acknowledgement */}
            <div className="bg-white border border-slate-200 rounded-lg p-8 mb-8">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="acknowledgement"
                  checked={formData.acknowledgement}
                  onChange={handleInputChange}
                  className="mt-1"
                  disabled={isLoading}
                  required
                />
                <span className="text-sm text-slate-600">
                  I acknowledge that these products are for research purposes
                  only and not for human consumption. I understand the storage
                  and handling requirements and will comply with all applicable
                  laws and regulations. I also confirm that I am authorized to
                  receive these products in my location.
                </span>
              </label>
              {errors.acknowledgement && (
                <p className="text-red-500 text-sm mt-2">
                  {errors.acknowledgement}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Processing..." : "Complete Order"}
            </button>

            <Link href="/peptides" className="btn-secondary w-full text-center block mt-3">
              Continue Shopping
            </Link>
          </div>

          {/* Right Column - Order Total (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Order Total
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">
                    ${shippingCost}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-baseline">
                <span className="text-slate-600">Total</span>
                <span className="text-3xl font-bold text-blue-600">
                  {formatPrice(total)}
                </span>
              </div>

              <p className="text-xs text-slate-500 text-center mt-6">
                All prices in AUD. Bank transfer instructions will be sent to
                your email.
              </p>
            </div>
          </div>
        </form>
      </section>
    </div>
  );
}
