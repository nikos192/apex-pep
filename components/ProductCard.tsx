"use client";

import Image from "next/image";
import Link from "next/link";
import { formatAUD } from "@/lib/catalog";
import type { Product } from "@/lib/catalog";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
  const isAvailable = product.available !== false;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100)
    : 0;

  const card = (
      <div
        className={`group h-full flex flex-col bg-white rounded-2xl border border-slate-100 shadow-card transition-all duration-300 overflow-hidden animate-fade-in ${
          isAvailable
            ? "cursor-pointer hover:shadow-card-hover hover:-translate-y-1.5"
            : "cursor-not-allowed"
        }`}
      >
        {/* Product Image */}
        <div className="relative overflow-hidden aspect-square w-full">
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 z-10 rounded-full bg-rose-600 px-3 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-lg shadow-rose-900/20 animate-scale-in">
              Sale · Save {discountPercent}%
            </div>
          )}
          {product.image ? (
            <div className="relative w-full h-full bg-slate-50">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className={`object-cover transition-transform duration-500 ${isAvailable ? "group-hover:scale-105" : ""}`}
              />
            </div>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-blue-900 text-white p-6 text-center">
              <span className="text-[10px] tracking-[0.28em] uppercase font-semibold text-blue-200/80 mb-3">
                {product.badge}
              </span>
              <span className="text-2xl md:text-3xl font-extrabold leading-tight">
                {product.name}
              </span>
              <span className="mt-3 inline-block h-px w-10 bg-blue-300/60" />
              <span className="mt-3 text-xs text-blue-100/70">Apex Labs Australia</span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-5 flex-1 flex flex-col gap-3">
          {/* Badge */}
          <div className="inline-block w-fit px-2.5 py-1 bg-blue-50 text-xs font-semibold text-blue-600 rounded-full border border-blue-100">
            {product.badge}
          </div>

          {/* Product Name */}
          <h3 className={`text-base md:text-lg font-semibold text-slate-900 transition-colors leading-snug ${isAvailable ? "group-hover:text-blue-600" : ""}`}>
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-auto pt-2">
            {hasDiscount ? (
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl md:text-2xl font-black text-rose-600">
                  {formatAUD(product.salePrice!)}
                </span>
                <span className="text-sm text-slate-400 line-through">
                  {formatAUD(product.regularPrice)}
                </span>
              </div>
            ) : (
              <p className="text-xl md:text-2xl font-bold text-slate-900">
                {formatAUD(product.regularPrice)}
              </p>
            )}
          </div>

          {/* CTA */}
          <span
            className={`w-full py-2.5 px-4 text-center text-sm font-semibold rounded-xl transition-all duration-200 mt-1 ${
              isAvailable
                ? "bg-slate-900 text-white group-hover:bg-blue-600"
                : "border border-slate-200 bg-slate-100 text-slate-500"
            }`}
          >
            {isAvailable ? "View Details →" : "Available Soon"}
          </span>
        </div>
      </div>
  );

  if (!isAvailable) {
    return (
      <div aria-disabled="true" title={`${product.name} is coming soon`} className="h-full">
        {card}
      </div>
    );
  }

  return (
    <Link href={`/peptides/${product.slug}`} className="block h-full">
      {card}
    </Link>
  );
}
