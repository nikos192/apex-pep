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
      <section className="border-b border-slate-200 bg-slate-50">
        <div className="container-custom py-12">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Research-Grade Peptides
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl">
            Premium purity peptide compounds for laboratory research. All products are for research use only.
          </p>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section-padding container-custom">
        <div className="mb-8">
          <p className="text-slate-600">
            Showing{" "}
            <span className="font-semibold text-slate-900">{PRODUCTS.length}</span> products
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {PRODUCTS.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-blue-50 border-t border-blue-200 py-8">
        <div className="container-custom">
          <div className="bg-blue-100 border border-blue-300 rounded-lg p-6">
            <h3 className="font-semibold text-blue-900 mb-2">Research Use Only</h3>
            <p className="text-sm text-blue-800">
              All products are intended for research purposes in qualified laboratory environments only.
              Not for human consumption. Not intended to diagnose, treat, cure, or prevent any disease.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
