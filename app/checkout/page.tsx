"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import { useCartActions } from "@/app/hooks/useCartActions";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const { cart } = useCart();
  const { clearCart } = useCartActions();
  const router = useRouter();

  const handleCompleteOrder = () => {
    // Simulate order completion
    clearCart();

    // Show success message
    alert(
      "Order received! Thank you for your purchase. We will be in touch soon with tracking information."
    );

    router.push("/");
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
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Order Summary */}
          <div className="lg:col-span-2">
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

            {/* Form Section */}
            <div className="bg-white border border-slate-200 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">
                Shipping Details
              </h2>

              <div className="space-y-4 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="input-field"
                  />
                </div>

                <input
                  type="email"
                  placeholder="Email Address"
                  className="input-field"
                />

                <input
                  type="text"
                  placeholder="Street Address"
                  className="input-field"
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    type="text"
                    placeholder="City"
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="State"
                    className="input-field"
                  />
                  <input
                    type="text"
                    placeholder="Postcode"
                    className="input-field"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="input-field"
                />
              </div>

              {/* Acknowledgement */}
              <div className="mb-8">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input type="checkbox" className="mt-1" />
                  <span className="text-sm text-slate-600">
                    I acknowledge that these products are for research purposes
                    only and not for human consumption. I understand the storage
                    and handling requirements and will comply with all applicable
                    laws and regulations.
                  </span>
                </label>
              </div>

              <button
                onClick={handleCompleteOrder}
                className="btn-primary w-full"
              >
                Complete Order
              </button>
            </div>
          </div>

          {/* Order Total (Sticky) */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white border border-slate-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-6">
                Order Total
              </h3>

              <div className="space-y-3 mb-6 pb-6 border-b border-slate-200">
                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span>{formatPrice(cart.total)}</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Shipping</span>
                  <span className="font-semibold text-slate-900">TBD</span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Tax (if applicable)</span>
                  <span className="font-semibold text-slate-900">TBD</span>
                </div>
              </div>

              <div className="flex justify-between items-baseline mb-6">
                <span className="text-slate-600">Total</span>
                <span className="text-3xl font-bold text-slate-900">
                  {formatPrice(cart.total)}
                </span>
              </div>

              <p className="text-xs text-slate-500 text-center mb-4">
                Shipping and tax will be calculated based on your location.
              </p>

              <Link href="/peptides" className="btn-secondary w-full text-center block">
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
