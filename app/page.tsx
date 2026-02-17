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
          src="/hero/hero-image.png"
          alt="Apex Labs Hero"
          fill
          className="object-cover"
          priority
          unoptimized
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
          <div className="mb-12 text-center animate-fade-in">
            <h2 className="text-4xl font-bold text-brand-900 mb-3">Featured Products</h2>
            <p className="text-lg text-brand-600 max-w-2xl mx-auto">
              Explore our most popular research-grade peptide compounds
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, idx) => (
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-16 animate-fade-in">
            <Link href="/peptides" className="btn-primary">
              View All Products
            </Link>
          </div>
        </section>
      )}

      {/* Why Apex Labs */}
      <section
        id="why-us"
        className="section-padding bg-gradient-to-b from-brand-50 to-white border-t border-brand-100"
      >
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl font-bold text-brand-900 mb-3">
              Why Choose Apex Labs
            </h2>
            <p className="text-lg text-brand-600 max-w-2xl mx-auto">
              Premium quality, trusted standards, and scientific excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: "🔬",
                title: "High Purity",
                description: "Pharmaceutical-grade purity standards exceeding 99% for all formulations",
              },
              {
                icon: "✓",
                title: "Third-Party Tested",
                description: "All products independently certified by accredited laboratories",
              },
              {
                icon: "🇦🇺",
                title: "Australian Supplier",
                description: "Locally manufactured and supplied with strict quality control",
              },
              {
                icon: "📋",
                title: "Research Grade",
                description: "Precision formulated specifically for research applications",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="group border border-brand-100 rounded-xl p-8 bg-white hover-lift shadow-card hover:shadow-card-hover animate-scale-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-xl font-bold text-brand-900 mb-3 group-hover:text-brand-primary transition-colors">
                  {item.title}
                </h3>
                <p className="text-brand-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding container-custom text-center animate-fade-in">
        <h2 className="text-4xl font-bold text-brand-900 mb-4">
          Ready to get started?
        </h2>
        <p className="text-lg text-brand-600 mb-10 max-w-2xl mx-auto">
          Browse our complete collection of research-grade peptides with guaranteed purity and quality.
        </p>
        <Link href="/peptides" className="btn-primary inline-block">
          Shop Now
        </Link>
      </section>
    </div>
  );
}
