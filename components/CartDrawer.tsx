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
          "fixed right-0 top-0 h-screen w-full max-w-sm bg-white z-50",
          "transform transition-transform duration-300 flex flex-col",
          "border-l border-slate-200 shadow-lg",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <h2 className="text-lg font-semibold text-slate-900">Cart</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 transition-colors"
            aria-label="Close cart"
          >
            <span className="text-2xl leading-none">×</span>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {isEmpty && (
            <div className="flex flex-col items-center justify-center h-full gap-4">
              <p className="text-slate-500 text-center">Your cart is empty</p>
              <Link
                href="/peptides"
                onClick={onClose}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                Continue shopping
              </Link>
            </div>
          )}

          {!isEmpty && (
            <div className="space-y-4">
              {cart.items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-slate-100 pb-4"
                >
                  {/* Image */}
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md bg-slate-50 border border-slate-200">
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
                      <h3 className="text-sm font-medium text-slate-900">
                        {item.name}
                      </h3>
                      <p className="text-xs text-slate-500 mt-0.5">
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
                    className="text-slate-400 hover:text-slate-600 transition-colors"
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
          <div className="border-t border-slate-200 p-6 space-y-4 bg-slate-50">
            {/* Total */}
            <div className="flex justify-between items-baseline">
              <span className="text-slate-600">Total</span>
              <span className="text-2xl font-bold text-slate-900">
                {formatPrice(cart.total)}
              </span>
            </div>

            {/* Buttons */}
            <Link
              href="/checkout"
              onClick={onClose}
              className="block w-full text-center bg-slate-900 text-white font-medium py-2.5 rounded-lg hover:bg-slate-800 transition-colors"
            >
              Checkout
            </Link>

            <button
              onClick={onClose}
              className="w-full border border-slate-300 text-slate-900 font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
