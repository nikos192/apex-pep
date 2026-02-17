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
      <div className="flex items-center gap-4">
        <label htmlFor="quantity" className="text-sm font-medium text-slate-700">
          Quantity:
        </label>
        <div className="flex items-center border border-slate-300 rounded-lg">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
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
            className="w-16 text-center border-l border-r border-slate-300 py-2 focus:outline-none"
          />
          <button
            onClick={() => setQuantity(quantity + 1)}
            className="px-4 py-2 text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors"
          >
            +
          </button>
        </div>
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
          isAdded
            ? "bg-green-600 hover:bg-green-700"
            : "bg-slate-900 hover:bg-slate-800 active:scale-95"
        }`}
      >
        {isAdded ? "✓ Added to Cart" : "Add to Cart"}
      </button>
    </div>
  );
}
