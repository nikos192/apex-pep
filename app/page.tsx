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

      {/* Bulk sales banner */}
      <section className="relative isolate overflow-hidden bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(59,130,246,0.28),transparent_38%),radial-gradient(circle_at_85%_20%,rgba(34,211,238,0.16),transparent_32%)]" />
        <div className="container-custom relative py-8 md:py-11">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-3xl">
              <div className="mb-3 flex items-center gap-3">
                <span className="rounded-full bg-cyan-300 px-3 py-1 text-xs font-black uppercase tracking-[0.18em] text-slate-950">
                  Bulk Sales
                </span>
                <span className="text-sm font-semibold text-cyan-200">10-vial packs &amp; mega bundles</span>
              </div>
              <h2 className="text-3xl font-black leading-tight text-white sm:text-4xl md:text-5xl">
                Save up to <span className="text-cyan-300">80% per vial</span>
              </h2>
              <p className="mt-3 max-w-2xl text-base text-slate-300 md:text-lg">
                Build a longer research program for less with bulk-only pricing across selected peptides and bundles.
              </p>
            </div>
            <Link
              href="/bulk-deals"
              className="group inline-flex min-h-[54px] items-center justify-center gap-3 self-start rounded-xl bg-white px-6 py-4 text-base font-black text-slate-950 shadow-xl shadow-blue-950/40 transition-all hover:-translate-y-1 hover:bg-cyan-300 hover:text-slate-950 md:self-auto"
            >
              Shop Now, Bulk Sales!
              <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>
      </section>

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
