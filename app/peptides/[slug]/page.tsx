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
      <div className="border-b border-brand-300 bg-brand-200">
        <div className="container-custom py-4 animate-fade-in">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-brand-600 hover:text-brand-primary transition-colors">
              Home
            </Link>
            <span className="text-brand-300">/</span>
            <Link href="/peptides" className="text-brand-600 hover:text-brand-primary transition-colors">
              Peptides
            </Link>
            <span className="text-brand-300">/</span>
            <span className="font-bold text-brand-900">{product.name}</span>
          </div>
        </div>
      </div>

      {/* Product Detail Section */}
      <section className="section-padding container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start animate-fade-in">
          {/* Product Image */}
          <div className="flex items-center justify-center sticky top-24">
            <div className="w-full max-w-md aspect-square overflow-hidden rounded-xl bg-brand-100 border border-brand-300 shadow-card relative">
              {hasDiscount && (
                <div className="absolute top-4 right-4 z-10 bg-brand-primary text-white px-4 py-2 rounded-full font-bold text-sm">
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
            <div className="inline-block w-fit px-3 py-1 bg-brand-100 text-xs font-bold text-brand-primary rounded-full mb-5">
              {product.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-brand-900 mb-6 leading-tight">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-brand-100">
              {hasDiscount ? (
                <div className="flex items-center gap-4">
                  <span className="text-5xl font-bold text-brand-900">
                    {formatAUD(product.salePrice!)}
                  </span>
                  <span className="text-2xl text-brand-400 line-through">
                    {formatAUD(product.regularPrice)}
                  </span>
                </div>
              ) : (
                <p className="text-5xl font-bold text-brand-900">
                  {formatAUD(product.regularPrice)}
                </p>
              )}
              {product.dosageForm && (
                <p className="text-sm text-brand-600 mt-3 font-medium">{product.dosageForm}</p>
              )}
            </div>

            {/* Quick Description */}
            <p className="text-brand-700 mb-8 leading-relaxed text-base">
              {product.description.substring(0, 200)}...
            </p>

            {/* Key Points */}
            {product.bullets.length > 0 && (
              <div className="mb-8 bg-brand-100 border border-brand-300 rounded-lg p-5">
                <h3 className="font-bold text-brand-900 mb-4 text-sm">
                  Research Applications
                </h3>
                <ul className="space-y-2.5">
                  {product.bullets.map((bullet, idx) => (
                    <li key={idx} className="flex gap-3 text-sm text-brand-700">
                      <span className="text-brand-primary font-bold flex-shrink-0">✓</span>
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Add to Cart */}
            <AddToCartButton product={product} />

            {/* Research Disclaimer */}
            <div className="mt-8 p-5 bg-brand-100 border border-brand-300 rounded-lg">
              <p className="text-xs text-brand-700 leading-relaxed">
                <strong>Research Use Only:</strong> This product is for laboratory research only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Details Section */}
      <section className="section-padding container-custom bg-gradient-to-b from-brand-50 to-brand-100 border-y border-brand-300 animate-fade-in">
        <h2 className="text-4xl font-bold text-brand-900 mb-10">Product Information</h2>
        <Accordion
          items={[
            {
              title: "Full Description",
              defaultOpen: true,
              children: (
                <div className="space-y-4 text-brand-700">
                  <p className="leading-relaxed">{product.description}</p>
                  {product.bullets.length > 0 && (
                    <div>
                      <h4 className="font-bold text-brand-900 mb-3">
                        Commonly Studied For:
                      </h4>
                      <ul className="space-y-2.5">
                        {product.bullets.map((bullet, idx) => (
                          <li key={idx} className="flex gap-3">
                            <span className="text-brand-primary font-bold flex-shrink-0">•</span>
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
              children: <p className="text-brand-700 leading-relaxed">{product.storage}</p>,
            },
            {
              title: "Shipping Information",
              children: <p className="text-brand-700 leading-relaxed">{product.shipping}</p>,
            },
            {
              title: "Research Use Disclaimer",
              children: (
                <div className="space-y-3 text-sm text-brand-700 leading-relaxed">
                  <p>
                    <strong className="text-brand-900">
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
        <section className="section-padding container-custom animate-slide-up">
          <h2 className="text-4xl font-bold text-brand-900 mb-10">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relProduct, idx) => (
              <div key={relProduct.slug} style={{ animationDelay: `${idx * 100}ms` }}>
                <ProductCard product={relProduct} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
