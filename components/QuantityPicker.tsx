"use client";

import { cn } from "@/lib/utils";

interface QuantityPickerProps {
  quantity: number;
  onQuantityChange: (quantity: number) => void;
  disabled?: boolean;
  max?: number;
  min?: number;
}

export function QuantityPicker({
  quantity,
  onQuantityChange,
  disabled = false,
  max = 10,
  min = 1,
}: QuantityPickerProps) {
  const handleDecrement = () => {
    if (quantity > min) {
      onQuantityChange(quantity - 1);
    }
  };

  const handleIncrement = () => {
    if (quantity < max) {
      onQuantityChange(quantity + 1);
    }
  };

  return (
    <div className="flex items-center border border-slate-300 rounded-lg w-fit">
      <button
        type="button"
        onClick={handleDecrement}
        disabled={disabled || quantity <= min}
        className={cn(
          "px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Decrease quantity"
      >
        −
      </button>
      <input
        type="number"
        min={min}
        max={max}
        value={quantity}
        onChange={(e) => {
          const val = parseInt(e.target.value, 10);
          if (!isNaN(val) && val >= min && val <= max) {
            onQuantityChange(val);
          }
        }}
        disabled={disabled}
        className={cn(
          "w-12 text-center border-0 py-2 text-sm font-medium",
          "focus:outline-none focus:ring-0",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Quantity"
      />
      <button
        type="button"
        onClick={handleIncrement}
        disabled={disabled || quantity >= max}
        className={cn(
          "px-3 py-2 text-slate-600 hover:text-slate-900 transition-colors",
          "disabled:opacity-50 disabled:cursor-not-allowed"
        )}
        aria-label="Increase quantity"
      >
        +
      </button>
    </div>
  );
}
