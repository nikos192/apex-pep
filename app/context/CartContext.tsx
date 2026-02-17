"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type { Cart, CartItem } from "@/lib/types";

interface CartContextType {
  cart: Cart;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = "apex-labs-cart";

function loadCartFromStorage(): Cart {
  if (typeof window === "undefined") {
    return { items: [], total: 0 };
  }

  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error("Error loading cart from storage:", error);
  }

  return { items: [], total: 0 };
}

function saveCartToStorage(cart: Cart) {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error("Error saving cart to storage:", error);
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<Cart>({ items: [], total: 0 });
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate from localStorage on mount
  useEffect(() => {
    const loaded = loadCartFromStorage();
    setCart(loaded);
    setIsHydrated(true);
  }, []);

  const calculateTotal = (items: CartItem[]): number => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const addItem = (newItem: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.items.find(
        (item) => item.productId === newItem.productId
      );

      let updatedItems;
      if (existingItem) {
        updatedItems = prevCart.items.map((item) =>
          item.productId === newItem.productId
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      } else {
        updatedItems = [...prevCart.items, newItem];
      }

      const updatedCart = {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };

      saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const removeItem = (productId: string) => {
    setCart((prevCart) => {
      const updatedItems = prevCart.items.filter(
        (item) => item.productId !== productId
      );
      const updatedCart = {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };

      saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setCart((prevCart) => {
      const updatedItems = prevCart.items.map((item) =>
        item.productId === productId ? { ...item, quantity } : item
      );

      const updatedCart = {
        items: updatedItems,
        total: calculateTotal(updatedItems),
      };

      saveCartToStorage(updatedCart);
      return updatedCart;
    });
  };

  const clearCart = () => {
    const emptyCart = { items: [], total: 0 };
    setCart(emptyCart);
    saveCartToStorage(emptyCart);
  };

  // Prevent hydration mismatch
  if (!isHydrated) {
    return (
      <CartContext.Provider
        value={{ cart: { items: [], total: 0 }, addItem, removeItem, updateQuantity, clearCart }}
      >
        {children}
      </CartContext.Provider>
    );
  }

  return (
    <CartContext.Provider
      value={{ cart, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
