import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS, getProduct, getRelatedProducts, formatAUD } from "@/lib/catalog";
import { Accordion } from "@/components/Accordion";
import { ProductCard } from "@/components/ProductCard";
import { ProductImage } from "@/components/ProductImage";
import { AddToCartButton } from "@/components/AddToCartButton";

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
      <div className="border-b border-slate-200 bg-slate-50">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-slate-600 hover:text-slate-900">
              Home
            </Link>
            <span className="text-slate-400">/</span>
            <Link href="/peptides" className="text-slate-600 hover:text-slate-900">
              Peptides
            </Link>
            <span className="text-slate-400">/</span>
            <span className="font-medium text-slate-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="section-padding container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center">
            <div className="w-full aspect-square overflow-hidden rounded-lg bg-slate-50 border border-slate-200 shadow-sm relative">
              {hasDiscount && (
                <div className="absolute top-4 right-4 z-10 bg-red-500 text-white px-4 py-2 rounded-full font-bold text-sm">
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
          <div className="flex flex-col justify-center">
            {/* Badge */}
            <div className="inline-block w-fit px-3 py-1 bg-slate-100 text-xs font-semibold text-slate-700 rounded mb-4">
              {product.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-6">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatAUD(product.salePrice!)}
                  </span>
                  <span className="text-xl text-slate-500 line-through">
                    {formatAUD(product.regularPrice)}
                  </span>
                </div>
              ) : (
                <p className="text-4xl font-bold text-slate-900">
                  {formatAUD(product.regularPrice)}
                </p>
              )}
              {product.dosageForm && (
                <p className="text-sm text-slate-600 mt-2">{product.dosageForm}</p>
              )}
            </div>

            {/* Quick Description */}
            <p className="text-slate-700 mb-8 leading-relaxed text-sm">
              {product.description.substring(0, 200)}...
            </p>

            {/* Key Points */}
            {product.bullets.length > 0 && (
              <div className="mb-8 bg-slate-50 border border-slate-200 rounded-lg p-4">
                <h3 className="font-semibold text-slate-900 mb-3 text-sm">
                  Research Applications
                </h3>
                <ul className="space-y-2">
                  {product.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-2 text-sm text-slate-700">
                      <span className="text-slate-400 font-bold">•</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Research Disclaimer */}
            <div className="mt-8 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-900">
                <strong>Research Use Only:</strong> This product is for laboratory research only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="section-padding container-custom bg-slate-50 border-y border-slate-200">
        <h2 className="text-3xl font-bold text-slate-900 mb-8">Product Information</h2>
        <Accordion
          items={[
            {
              title: "Full Description",
              defaultOpen: true,
              children: (
                <div className="space-y-4">
                  <p>{product.description}</p>
                  {product.bullets.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-slate-900 mb-3">
                        Commonly Studied For:
                      </h4>
                      <ul className="space-y-2">
                        {product.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-2">
                            <span className="text-slate-400 font-bold">•</span>
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
              children: <p>{product.storage}</p>,
            },
            {
              title: "Shipping Information",
              children: <p>{product.shipping}</p>,
            },
            {
              title: "Research Use Disclaimer",
              children: (
                <div className="space-y-3 text-sm">
                  <p>
                    <strong>
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
        <section className="section-padding container-custom">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relProduct) => (
              <ProductCard key={relProduct.slug} product={relProduct} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
