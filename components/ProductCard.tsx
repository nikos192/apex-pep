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
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100)
    : 0;

  return (
    <Link href={`/peptides/${product.slug}`}>
      <div className="group cursor-pointer h-full flex flex-col bg-white rounded-2xl border border-slate-100 shadow-card hover:shadow-card-hover hover:-translate-y-1.5 transition-all duration-300 overflow-hidden animate-fade-in">
        {/* Product Image */}
        <div className="relative overflow-hidden bg-slate-50 aspect-square w-full">
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 z-10 bg-blue-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md animate-scale-in">
              Save {discountPercent}%
            </div>
          )}
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = "/images/placeholder.png";
            }}
          />
        </div>

        {/* Product Info */}
        <div className="p-4 md:p-5 flex-1 flex flex-col gap-3">
          {/* Badge */}
          <div className="inline-block w-fit px-2.5 py-1 bg-blue-50 text-xs font-semibold text-blue-600 rounded-full border border-blue-100">
            {product.badge}
          </div>

          {/* Product Name */}
          <h3 className="text-base md:text-lg font-semibold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
            {product.name}
          </h3>

          {/* Price */}
          <div className="mt-auto pt-2">
            {hasDiscount ? (
              <div className="flex items-baseline gap-2.5">
                <span className="text-xl md:text-2xl font-bold text-slate-900">
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
          <button className="w-full py-2.5 px-4 bg-slate-900 text-white text-sm font-semibold rounded-xl group-hover:bg-blue-600 transition-all duration-200 mt-1">
            View Details →
          </button>
        </div>
      </div>
    </Link>
  );
}
