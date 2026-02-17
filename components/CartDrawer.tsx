"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useCartActions } from "@/app/hooks/useCartActions";
import { QuantityPicker } from "./QuantityPicker";
import { formatPrice, cn } from "@/lib/utils";

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { cart } = useCart();
  const { updateItemQuantity, removeItemFromCart } = useCartActions();

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const isEmpty = cart.items.length === 0;

  return (
    <>
      {/* Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 transition-opacity duration-300",
          isOpen ? "bg-black/50 opacity-100" : "bg-black/0 opacity-0 pointer-events-none"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-full max-w-sm z-50",
          "transform transition-all duration-300 flex flex-col",
          "bg-brand-200/95 backdrop-blur-xl border-l border-brand-300 shadow-card-hover",
          isOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        )}
      >
        {/* Header */}
        <div className="sticky top-0 flex items-center justify-between p-6 border-b border-brand-300 bg-brand-200/80 backdrop-blur-sm">
          <h2 className="text-xl font-bold text-brand-900">Shopping Cart</h2>
          <button
            onClick={onClose}
            className="text-brand-400 hover:text-brand-600 transition-colors p-2 -mr-2"
            aria-label="Close cart"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isEmpty && (
            <div className="flex flex-col items-center justify-center h-full gap-4 animate-fade-in">
              <p className="text-brand-500 text-center text-lg">Your cart is empty</p>
              <Link
                href="/peptides"
                onClick={onClose}
                className="text-brand-primary hover:text-blue-600 text-sm font-semibold transition-colors"
              >
                Continue shopping
              </Link>
            </div>
          )}

          {!isEmpty && (
            <div className="space-y-4 animate-fade-in">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-brand-300 pb-4 last:border-0 last:pb-0"
                >
                  {/* Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg bg-brand-100 border border-brand-300">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-sm font-semibold text-brand-900">
                        {item.name}
                      </h3>
                      <p className="text-xs text-brand-600 mt-0.5">
                        {formatPrice(item.price)} each
                      </p>
                    </div>

                    {/* Quantity */}
                    <QuantityPicker
                      quantity={item.quantity}
                      onQuantityChange={(qty) =>
                        updateItemQuantity(item.productId, qty)
                      }
                      min={1}
                      max={10}
                    />
                  </div>

                  {/* Remove */}
                  <button
                    onClick={() => removeItemFromCart(item.productId)}
                    className="text-brand-300 hover:text-brand-600 transition-colors font-bold text-lg"
                    aria-label="Remove item"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {!isEmpty && (
          <div className="border-t border-brand-300 p-6 space-y-4 bg-brand-200/80 backdrop-blur-sm">
            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="text-brand-600 font-medium">Subtotal</span>
              <span className="text-3xl font-bold text-brand-900">
                {formatPrice(cart.total)}
              </span>
            </div>
            
            <p className="text-xs text-brand-500">Shipping & GST calculated at checkout</p>

            {/* Buttons */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-brand-primary text-white font-semibold py-3 rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-subtle hover:shadow-card-hover"
            >
              Proceed to Checkout
            </Link>

            <button
              onClick={onClose}
              className="w-full border border-brand-400 text-brand-900 font-semibold py-2.5 rounded-lg hover:bg-brand-100 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
