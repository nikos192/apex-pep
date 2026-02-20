import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";
import { ShippingInfo } from "@/components/ShippingInfo";

export const metadata = {
  title: "Shop now | Apex Labs Australia",
  description: "Browse our catalog of research peptide compounds for laboratory use.",
};

export default function PeptidesPage() {
  return (
    <div className="w-full">
      {/* Header Section */}
      <section className="border-b border-slate-200 bg-white">
        <div className="container-custom py-12 md:py-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 mb-4">
            Shop now
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed mb-6">
            Premium research compounds supplied for laboratory use.
          </p>
          
          {/* Info Strip */}
          <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-slate-700">
            <div className="flex items-center gap-2">
              <span className="text-lg">🇦🇺</span>
              <span>Australian distribution</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">📦</span>
              <span>Secure packaging</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-lg">🔬</span>
              <span>Research use only</span>
            </div>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding container-custom">
        <div className="mb-10 animate-fade-in">
          <p className="text-slate-600 text-sm md:text-base">
            Showing <span className="font-bold text-slate-900">{PRODUCTS.length}</span> products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, idx) => (
            <div key={product.slug} className={`animate-slide-up delay-${idx % 3}`}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Shipping & Handling */}
      <section className="section-padding container-custom border-t border-slate-200">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-6">Shipping & Handling</h2>
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
                  All products are intended for research purposes in qualified laboratory environments only. Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease. Users are responsible for compliance with all applicable laws and regulations in their jurisdiction.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
