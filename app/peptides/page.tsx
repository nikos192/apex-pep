import { PRODUCTS } from "@/lib/catalog";
import { ProductCard } from "@/components/ProductCard";

export const metadata = {
  title: "Research-Grade Peptides | Apex Labs Australia",
  description: "Browse our complete catalog of research-grade peptides for laboratory use.",
};

export default function PeptidesPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="border-b border-brand-200 bg-gradient-to-b from-brand-50 to-white">
        <div className="container-custom py-16 animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-bold text-brand-900 mb-4">
            Research-Grade Peptides
          </h1>
          <p className="text-xl text-brand-600 max-w-3xl leading-relaxed">
            Premium purity peptide compounds for laboratory research. All products are pharmaceutical-grade and independently tested.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding container-custom">
        <div className="mb-10 animate-fade-in">
          <p className="text-brand-600 text-lg">
            <span className="font-bold text-brand-900">{PRODUCTS.length}</span> premium peptide products available
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product, idx) => (
            <div key={product.slug} className="animate-slide-up" style={{ animationDelay: `${(idx % 3) * 100}ms` }}>
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-brand-50 border-t border-brand-200 py-12">
        <div className="container-custom">
          <div className="bg-white border border-brand-300 rounded-xl p-8 shadow-card">
            <div className="flex items-start gap-4">
              <span className="text-2xl">📋</span>
              <div>
                <h3 className="font-bold text-brand-900 mb-2 text-lg">Research Use Only</h3>
                <p className="text-brand-600 text-sm leading-relaxed">
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
