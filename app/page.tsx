import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/catalog";

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 6);

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <Image
          src="/hero/ChatGPT Image Feb 17, 2026, 10_25_01 PM.png"
          alt="Apex Labs Hero"
          fill
          className="object-cover"
          priority
        />
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />
        
        {/* Content */}
        <div className="container-custom py-20 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight">
            Research-Grade Peptides
          </h1>
          <p className="text-xl md:text-2xl text-slate-100 mb-8 max-w-3xl mx-auto leading-relaxed">
            Premium purity. Precision manufactured. Australian supplied.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/peptides" className="btn-primary">
              Browse Peptides
            </Link>
            <a href="#why-us" className="btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="section-padding container-custom">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">Featured Products</h2>
            <p className="text-slate-600">
              Explore our most popular research-grade peptide compounds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/peptides" className="btn-primary">
              View All Products
            </Link>
          </div>
        </section>
      )}

      {/* Why Apex Labs */}
      <section
        id="why-us"
        className="section-padding bg-slate-50 border-t border-slate-200"
      >
        <div className="container-custom">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
            Why Choose Apex Labs
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🔬",
                title: "High Purity",
                description: "Pharmaceutical-grade purity standards",
              },
              {
                icon: "✓",
                title: "Third-Party Tested",
                description: "All products independently certified",
              },
              {
                icon: "🇦🇺",
                title: "Australian Supplier",
                description: "Locally manufactured and supplied",
              },
              {
                icon: "📋",
                title: "Research Grade",
                description: "Precision formulated for research use",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="border border-slate-200 rounded-lg p-6 bg-white hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding container-custom text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">
          Ready to get started?
        </h2>
        <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
          Browse our complete collection of research-grade peptides with
          guaranteed purity and quality.
        </p>
        <Link href="/peptides" className="btn-primary">
          Shop Now
        </Link>
      </section>
    </div>
  );
}
