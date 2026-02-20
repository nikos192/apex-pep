import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import HeroSection from "@/components/HeroSection";
import { ShippingInfo } from "@/components/ShippingInfo";
import FAQSection from "@/components/FAQSection";

export const metadata = {
  title: "Apex Labs — Research Peptides Australia",
  description:
    "Premium research peptides supplied in Australia. ≥99% purity, precision manufactured, and securely shipped. Shop research-grade peptides from Apex Labs.",
  openGraph: {
    title: "Apex Labs — Research Peptides Australia",
    description:
      "Premium research peptides supplied in Australia. ≥99% purity, precision manufactured, and securely shipped.",
    url: "https://apexlabs.com.au",
    siteName: "Apex Labs Australia",
  },
};

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="w-full">
      <HeroSection />

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section-padding container-custom">
          <div className="mb-8 md:mb-12 text-center animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 md:mb-3">Featured Products</h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Explore our most popular research-grade peptide compounds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className={`animate-slide-up delay-${idx}`}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-8 md:mt-16 animate-fade-in">
            <Link href="/peptides" className="btn-primary text-sm md:text-base py-3 md:py-4">
              View All Products
            </Link>
          </div>
        </section>
      )}

      {/* Shipping Info on homepage */}
      <section className="section-padding container-custom">
        <ShippingInfo />
      </section>

      {/* FAQ Section (AEO + trust) */}
      <FAQSection />
    </div>
  );
}
