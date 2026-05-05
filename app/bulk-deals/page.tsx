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
      {/* Telegram Hero — much wider stock available off-site */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="container-custom py-10 md:py-14">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="max-w-3xl">
              <span className="inline-block rounded-full bg-white/15 backdrop-blur px-3 py-1 text-xs font-bold tracking-[0.18em] uppercase mb-4">
                More stock available
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight">
                Looking for supplies not listed?
              </h2>
              <p className="mt-3 text-lg md:text-xl text-blue-50/90 leading-relaxed">
                DM our Telegram —  we carry much more stock than what&apos;s shown here.
              </p>
            </div>
            <a
              href="https://t.me/apexlabaus"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-base md:text-lg font-bold text-blue-700 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200 whitespace-nowrap self-start lg:self-auto"
            >
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
              </svg>
              <span>@apexlabaus on Telegram</span>
            </a>
          </div>
        </div>
      </section>

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
              <span className="text-lg">🚚</span>
              <span>$50 flat-rate AU express shipping</span>
            </div>
          </div>
        </div>
      </section>

      {/* Bulk Dispatch Notice */}
      <section className="container-custom pt-8 md:pt-10">
        <div
          role="alert"
          className="flex items-start gap-4 rounded-2xl border-2 border-amber-300 bg-amber-50 p-5 md:p-6 shadow-sm"
        >
          <span className="text-3xl md:text-4xl flex-shrink-0 leading-none">⏱️</span>
          <div>
            <h2 className="text-lg md:text-xl font-extrabold text-amber-900 uppercase tracking-wide mb-1">
              Heads up — bulk orders may be delayed
            </h2>
            <p className="text-sm md:text-base text-amber-900/90 leading-relaxed">
              Bulk packs are dispatched separately from our regular peptide stock and can take{" "}
              <strong>a few extra business days</strong> to ship while we batch and QC the order.
              If you need it urgently, DM us on{" "}
              <a
                href="https://t.me/apexlabaus"
                target="_blank"
                rel="noopener noreferrer"
                className="underline font-bold hover:text-amber-700"
              >
                Telegram @apexlabaus
              </a>{" "}
              before placing the order.
            </p>
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
