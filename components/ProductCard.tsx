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
      <div className="group cursor-pointer h-full">
        <div className="relative mb-4 overflow-hidden rounded-lg bg-slate-50 border border-slate-200 shadow-sm hover:shadow-lg transition-all duration-300">
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-3 right-3 z-10 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
              -{discountPercent}%
            </div>
          )}

          {/* Image */}
          <div className="relative w-full aspect-square overflow-hidden bg-slate-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "/images/placeholder.png";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2">
          {/* Badge */}
          <div className="inline-block px-2 py-1 bg-slate-100 text-xs font-semibold text-slate-700 rounded">
            {product.badge}
          </div>

          {/* Name */}
          <h3 className="text-sm font-semibold text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-2">
            {product.name}
          </h3>

          {/* Price */}
          <div className="space-y-1">
            {hasDiscount ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-slate-500 line-through">
                  {formatAUD(product.regularPrice)}
                </span>
                <span className="text-lg font-bold text-slate-900">
                  {formatAUD(product.salePrice!)}
                </span>
              </div>
            ) : (
              <p className="text-lg font-bold text-slate-900">
                {formatAUD(product.regularPrice)}
              </p>
            )}
          </div>

          {/* CTA */}
          <div className="pt-2">
            <span className="inline-block text-xs font-medium text-slate-600 group-hover:text-slate-900 transition-colors">
              View Details →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
