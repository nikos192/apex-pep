import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getRelatedProducts, formatAUD } from "@/lib/catalog";
import { Accordion } from "@/components/Accordion";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";
import { ShippingInfo } from "@/components/ShippingInfo";
import StorageInstructions from "@/components/StorageInstructions";

interface ProductDetailPageProps {
  params: {
    slug: string;
  };
}

export const dynamicParams = true;

export async function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }: ProductDetailPageProps) {
  const product = getProduct(params.slug);
  if (!product) return {};

  return {
    title: `${product.name} | Apex Labs Australia`,
    description: product.description.substring(0, 160),
  };
}

export default function ProductDetailPage({ params }: ProductDetailPageProps) {
  const product = getProduct(params.slug);

  if (!product) {
    notFound();
  }

  const hasDiscount = product.salePrice && product.salePrice < product.regularPrice;
  const discountPercent = hasDiscount
    ? Math.round(((product.regularPrice - product.salePrice!) / product.regularPrice) * 100)
    : 0;

  const relatedProducts = getRelatedProducts(product.slug, 4);

  return (
    <div className="w-full">
      {/* Breadcrumb */}
      <div className="border-b border-slate-200 bg-white">
        <div className="container-custom py-4 animate-fade-in">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900 transition-colors">
              Home
            </Link>
            <span className="text-slate-300">/</span>
            <Link href="/peptides" className="text-slate-600 hover:text-slate-900 transition-colors">
              Peptides
            </Link>
            <span className="text-slate-300">/</span>
            <span className="font-bold text-slate-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="section-padding container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in">
          {/* Product Image */}
          <div className="flex items-center justify-center sticky top-16 lg:top-24 h-fit">
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-lg bg-slate-100 border border-slate-200 shadow-sm relative">
              {hasDiscount && (
                <div className="absolute top-4 right-4 z-10 bg-blue-600 text-white px-4 py-2 rounded font-bold text-sm">
                  Save {discountPercent}%
                </div>
              )}
              <ProductImage
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-start">
            {/* Badge */}
            <div className="inline-block w-fit px-3 py-1 bg-slate-100 text-xs font-bold text-slate-700 rounded mb-5">
              {product.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-slate-200">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-slate-900">
                    {formatAUD(product.salePrice!)}
                  </span>
                  <span className="text-2xl text-slate-400 line-through">
                    {formatAUD(product.regularPrice)}
                  </span>
                </div>
              ) : (
                <p className="text-5xl font-bold text-slate-900">
                  {formatAUD(product.regularPrice)}
                </p>
              )}
              {product.dosageForm && (
                <p className="text-sm text-slate-600 mt-3 font-medium">{product.dosageForm}</p>
              )}
            </div>

            {/* Quick Description */}
            <p className="text-slate-700 mb-8 leading-relaxed text-base">
              {product.description}
            </p>

            {/* Key Points */}
            {product.bullets.length > 0 && (
              <div className="mb-8 bg-slate-50 border border-slate-200 rounded-lg p-5">
                <h3 className="font-bold text-slate-900 mb-4 text-sm">
                  Research Applications
                </h3>
                <ul className="space-y-2.5">
                  {product.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-slate-700">
                      <span className="text-blue-600 font-bold flex-shrink-0">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Research Disclaimer */}
            <div className="mt-8 p-5 bg-slate-50 border border-slate-200 rounded-lg">
              <p className="text-xs text-slate-700 leading-relaxed">
                <strong>Research Use Only:</strong> This product is for laboratory research only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="section-padding container-custom bg-white border-y border-slate-200 animate-fade-in">
        <h2 className="text-4xl font-bold text-slate-900 mb-10">Product Information</h2>
        <Accordion
          items={[
            {
              title: "Overview",
              defaultOpen: true,
              children: (
                <div className="space-y-4 text-slate-700">
                  <p className="leading-relaxed">{product.description}</p>
                  {product.bullets.length > 0 && (
                    <div>
                      <h4 className="font-bold text-slate-900 mb-3">
                        Commonly Studied In:
                      </h4>
                      <ul className="space-y-2.5">
                        {product.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="text-blue-600 font-bold flex-shrink-0">•</span>
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ),
            },
            {
              title: "Storage & Handling",
              children: <div className="py-2"><StorageInstructions /></div>,
            },
            {
              title: "Shipping",
              children: <ShippingInfo />,
            },
            {
              title: "Disclaimer",
              children: (
                <div className="space-y-3 text-sm text-slate-700 leading-relaxed">
                  <p>
                    <strong className="text-slate-900">
                      This product is intended for research use only in laboratory settings.
                    </strong>
                  </p>
                  <p>
                    This compound is not approved for human consumption and is not a pharmaceutical product.
                  </p>
                  <p>
                    Not intended to diagnose, treat, cure, mitigate, or prevent any disease or medical condition.
                  </p>
                  <p>
                    Purchase and use are restricted to qualified researchers and educational institutions. Buyer assumes full responsibility for legal and ethical compliance.
                  </p>
                </div>
              ),
            },
          ]}
        />
      </section>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section className="section-padding container-custom border-t border-slate-200 animate-slide-up">
          <h2 className="text-4xl font-bold text-slate-900 mb-10">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relProduct, idx) => (
              <div key={relProduct.slug} className={`animate-slide-up delay-${idx}`}>
                <ProductCard product={relProduct} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
