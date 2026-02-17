"use client";

import { cn } from "@/lib/utils";

interface SortOption {
  label: string;
  value: "featured" | "price-asc" | "price-desc" | "name";
}

interface SortMenuProps {
  currentSort: "featured" | "price-asc" | "price-desc" | "name";
  onSortChange: (sort: "featured" | "price-asc" | "price-desc" | "name") => void;
}

const SORT_OPTIONS: SortOption[] = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Name: A - Z", value: "name" },
];

export function SortMenu({ currentSort, onSortChange }: SortMenuProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor="sort" className="text-sm font-medium text-slate-900">
        Sort by:
      </label>
      <select
        id="sort"
        value={currentSort}
        onChange={(e) => onSortChange(e.target.value as "featured" | "price-asc" | "price-desc" | "name")}
        className={cn(
          "input-field px-3 py-2 text-sm",
          "bg-white appearance-none cursor-pointer"
        )}
      >
        {SORT_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}
