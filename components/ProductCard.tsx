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
      <div className="group cursor-pointer h-full flex flex-col animate-fade-in">
        {/* Product Image Container - Square AR */}
        <div className="relative mb-5 overflow-hidden rounded-xl bg-brand-100 border border-brand-200 shadow-card hover-lift aspect-square w-full">
          {/* Discount Badge */}
          {hasDiscount && (
            <div className="absolute top-4 right-4 z-10 bg-brand-primary text-white text-sm font-bold px-3 py-1.5 rounded-full animate-scale-in">
              Save {discountPercent}%
            </div>
          )}

          {/* Image */}
          <div className="relative w-full h-full overflow-hidden bg-brand-100">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "/images/placeholder.png";
              }}
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-3 flex-1 flex flex-col justify-between">
          {/* Badge */}
          <div className="inline-block w-fit px-2.5 py-1 bg-blue-100 text-xs font-semibold text-brand-primary rounded-full">
            {product.badge}
          </div>

          {/* Product Name */}
          <div>
            <h3 className="text-lg font-semibold text-brand-900 group-hover:text-brand-primary transition-colors">
              {product.name}
            </h3>
          </div>

          {/* Price */}
          <div className="space-y-1">
            {hasDiscount ? (
              <div className="flex items-center gap-3">
                <span className="text-2xl font-bold text-brand-900">
                  {formatAUD(product.salePrice!)}
                </span>
                <span className="text-sm text-brand-600 line-through">
                  {formatAUD(product.regularPrice)}
                </span>
              </div>
            ) : (
              <p className="text-2xl font-bold text-brand-900">
                {formatAUD(product.regularPrice)}
              </p>
            )}
          </div>

          {/* CTA */}
          <button className="w-full mt-4 py-2.5 px-4 bg-brand-primary text-white text-sm font-semibold rounded-lg hover:bg-blue-600 transition-all duration-200 shadow-subtle hover:shadow-card-hover group-hover:translate-y-0 translate-y-1 opacity-90 group-hover:opacity-100">
            View Details →
          </button>
        </div>
      </div>
    </Link>
  );
}
