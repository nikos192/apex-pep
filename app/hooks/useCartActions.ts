"use client";

import { useCallback } from "react";
import { useCart } from "@/app/context/CartContext";
import type { CartItem } from "@/lib/types";

export function useCartActions() {
  const { cart, addItem, removeItem, updateQuantity, clearCart } = useCart();

  const addToCart = useCallback(
    (product: { id: string; name: string; price: number; image: string }) => {
      const cartItem: CartItem = {
        id: `${product.id}-${Date.now()}`,
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      };

      addItem(cartItem);
      console.log("[Analytics] Added to cart:", product);
    },
    [addItem]
  );

  const updateItemQuantity = useCallback(
    (productId: string, quantity: number) => {
      updateQuantity(productId, quantity);
    },
    [updateQuantity]
  );

  const removeItemFromCart = useCallback(
    (productId: string) => {
      removeItem(productId);
      console.log("[Analytics] Removed from cart:", productId);
    },
    [removeItem]
  );

  return {
    cart,
    addToCart,
    updateItemQuantity,
    removeItemFromCart,
    clearCart,
  };
}
