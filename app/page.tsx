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
        <div className="container-custom py-12 md:py-20 text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
            Research-Grade Peptides
          </h1>
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            Premium purity. Precision manufactured. Australian supplied.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
            <Link href="/peptides" className="btn-primary text-sm md:text-base py-3 md:py-4">
              Browse Peptides
            </Link>
            <a href="#why-us" className="inline-flex items-center justify-center px-4 sm:px-6 py-3 md:py-4 border border-white text-white text-sm md:text-base font-semibold rounded-lg hover:bg-white hover:text-slate-900 transition-all duration-200 min-h-[48px] sm:min-h-[auto]">
              Learn More
            </a>
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
              <div key={product.id} className="animate-slide-up" style={{ animationDelay: `${idx * 100}ms` }}>
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

      {/* Why Apex Labs */}
      <section
        id="why-us"
        className="section-padding bg-white border-t border-slate-200"
      >
        <div className="container-custom">
          <div className="text-center mb-8 md:mb-16 animate-fade-in">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-2 md:mb-3">
              Laboratory Handling Standards
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto px-4">
              Designed for professional research environments
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                icon: "🔬",
                title: "Research-Grade Preparation",
                description: "Manufactured using strict quality-controlled processes suitable for laboratory research applications.",
              },
              {
                icon: "📦",
                title: "Secure Packaging",
                description: "Products are securely packaged to maintain integrity during storage and transport.",
              },
              {
                icon: "🇦🇺",
                title: "Australian Distribution",
                description: "Supplied locally from Australia with rapid delivery to research facilities.",
              },
              {
                icon: "❄️",
                title: "Proper Storage",
                description: "Handled and stored according to laboratory-grade standards to ensure product quality.",
              },
            ].map((item, idx) => (
              <div
                key={item.title}
                className="group border border-slate-200 rounded-lg p-6 md:p-8 bg-white hover:shadow-md transition-shadow animate-scale-in"
                style={{ animationDelay: `${idx * 150}ms` }}
              >
                <div className="text-4xl md:text-5xl mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">{item.icon}</div>
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 md:mb-3">
                  {item.title}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding container-custom text-center animate-fade-in">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-3 md:mb-4 px-4">
          Ready to explore our products?
        </h2>
        <p className="text-base md:text-lg text-slate-600 mb-6 md:mb-10 max-w-2xl mx-auto px-4">
          Browse our complete catalog of research peptide compounds.
        </p>
        <Link href="/peptides" className="btn-primary inline-block text-sm md:text-base py-3 md:py-4 px-6 md:px-8">
          Shop Now
        </Link>
      </section>
    </div>
  );
}
