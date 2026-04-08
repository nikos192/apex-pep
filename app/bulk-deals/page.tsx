import { BULK_PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { ShippingInfo } from "@/components/ShippingInfo";

export const metadata = {
  title: "Bulk Mega Deals | Apex Labs Australia",
  description:
    "Bulk peptide research packs at massive savings — up to 60% off per vial. BPC-157, GHK-Cu, Retatrutide and combined bundles.",
};

export default function BulkDealsPage() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-custom py-12 md:py-16 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Bulk Mega Deals — Up to 60% Off Per Vial
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-6">
            Stock up and save big on research-grade peptide bulk packs. Perfect for extended laboratory protocols.
          </p>

          {/* Info Strip */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-lg">📦</span>
              <span>10-vial bulk packs</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">💰</span>
              <span>Up to 60% off per vial</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🇦🇺</span>
              <span>Australian express shipping</span>
            </div>
          </div>

          <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-900">
            <span className="rounded-full bg-emerald-700 px-2 py-1 text-xs font-bold tracking-[0.18em] text-white">
              EXTRA 10% OFF
            </span>
            <span>
              Use code <span className="font-mono font-bold">PEPPER</span> at checkout.
            </span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding container-custom">
        <div className="mb-10 animate-fade-in">
          <p className="text-slate-600 text-sm md:text-base">
            Showing <span className="font-bold text-slate-900">{BULK_PRODUCTS.length}</span> bulk
            deals
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {BULK_PRODUCTS.map((product, idx) => (
            <div key={product.slug} className={`animate-slide-up delay-${idx % 3}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Shipping & Handling */}
      <section className="section-padding container-custom border-t border-slate-200">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">
            Shipping & Handling
          </h2>
          <ShippingInfo />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-slate-50 border-t border-slate-200 py-12">
        <div className="container-custom">
          <div className="bg-white border border-slate-200 rounded-lg p-6 md:p-8">
            <div className="flex items-start gap-4">
              <span className="text-2xl flex-shrink-0">📋</span>
              <div>
                <h3 className="font-bold text-slate-900 mb-2 text-lg">Research Use Only</h3>
                <p className="text-slate-700 text-sm leading-relaxed">
                  All products are intended for research purposes in qualified laboratory
                  environments only. Not for human consumption. Not intended to diagnose, treat,
                  cure, or prevent any disease. Users are responsible for compliance with all
                  applicable laws and regulations in their jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
