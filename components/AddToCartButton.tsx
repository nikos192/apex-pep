"use client";

import { useState } from "react";
import { useCartActions } from "@/app/hooks/useCartActions";
import type { Product } from "@/lib/catalog";

interface AddToCartButtonProps {
  product: Product;
}

export function AddToCartButton({ product }: AddToCartButtonProps) {
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);
  const { addToCart } = useCartActions();

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.salePrice ?? product.regularPrice,
      image: product.image,
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Quantity Selector */}
      <div className="flex items-center gap-4 pb-4 border-b border-brand-100">
        <label htmlFor="quantity" className="text-sm font-bold text-brand-900">
          Quantity:
        </label>
        <div className="flex items-center border border-brand-200 rounded-lg overflow-hidden">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-brand-600 hover:text-brand-900 hover:bg-brand-50 transition-colors font-semibold"
          >
            −
          </button>
          <input
            id="quantity"
            type="number"
            min="1"
            max="100"
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-16 text-center border-l border-r border-brand-200 py-2 focus:outline-none text-brand-900 font-semibold bg-white"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-brand-600 hover:text-brand-900 hover:bg-brand-50 transition-colors font-semibold"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-3.5 px-6 rounded-lg font-bold text-white transition-all duration-200 text-lg shadow-subtle hover:shadow-card-hover ${
          isAdded
            ? "bg-emerald-500 hover:bg-emerald-600"
            : "bg-brand-primary hover:bg-blue-600 active:scale-95"
        }`}
      >
        {isAdded ? "✓ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
