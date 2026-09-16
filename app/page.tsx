import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";
import HeroSection from "@/components/HeroSection";
import { ShippingInfo } from "@/components/ShippingInfo";
import FAQSection from "@/components/FAQSection";

export const metadata = {
  title: "Apex Lab — Research Peptides Australia",
  description:
    "Premium research peptides supplied in Australia. ≥99% purity, precision manufactured, and securely shipped. Shop research-grade peptides from Apex Lab.",
  openGraph: {
    title: "Apex Lab — Research Peptides Australia",
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

      {/* High-visibility bulk sales feature */}
      <section className="relative isolate overflow-hidden border-y-4 border-cyan-300 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(37,99,235,0.48),transparent_42%),radial-gradient(circle_at_85%_15%,rgba(34,211,238,0.24),transparent_34%)]" />
        <div className="absolute -right-8 top-1/2 hidden -translate-y-1/2 select-none text-[11rem] font-black leading-none text-white/[0.035] lg:block">
          BULK
        </div>
        <div className="container-custom relative py-14 md:py-20">
          <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
            <div className="max-w-4xl">
              <div className="mb-5 flex flex-wrap items-center gap-3">
                <span className="relative flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-300 opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-cyan-300" />
                </span>
                <span className="text-sm font-black uppercase tracking-[0.24em] text-cyan-200">
                  Bulk pricing is live
                </span>
              </div>
              <h2 className="max-w-3xl text-4xl font-black leading-[0.98] tracking-tight text-white sm:text-5xl md:text-7xl">
                Bigger packs.
                <span className="block text-cyan-300">Serious savings.</span>
              </h2>
              <p className="mt-6 max-w-2xl text-base font-medium text-slate-300 md:text-xl">
                Save up to 80% per vial with 10-vial packs and exclusive mega bundles built for extended research programs.
              </p>
              <div className="mt-8 flex flex-wrap gap-x-7 gap-y-3 text-sm font-bold text-white">
                <span>✓ 10-vial packs</span>
                <span>✓ Mega bundles</span>
                <span>✓ Best per-vial value</span>
              </div>
            </div>

            <div className="flex flex-col items-stretch gap-4 sm:flex-row lg:flex-col">
              <div className="flex min-w-48 items-center justify-center rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-7 py-5 text-center backdrop-blur-sm">
                <div>
                  <span className="block text-xs font-black uppercase tracking-[0.22em] text-cyan-200">Save up to</span>
                  <span className="block text-6xl font-black leading-none text-cyan-300">80%</span>
                  <span className="mt-1 block text-sm font-bold text-white">per vial</span>
                </div>
              </div>
              <Link
                href="/bulk-deals"
                className="group inline-flex min-h-[62px] items-center justify-center gap-3 rounded-xl bg-cyan-300 px-7 py-4 text-base font-black text-slate-950 shadow-2xl shadow-cyan-950/50 transition-all hover:-translate-y-1 hover:bg-white hover:text-slate-950"
              >
                Explore Bulk Deals
                <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </div>
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
