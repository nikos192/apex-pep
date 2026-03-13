import Link from "next/link";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <Image
        src="/hero/hero-image.png"
        alt="Apex Labs Hero"
        fill
        className="object-cover"
        priority
        unoptimized
      />
      {/* Layered gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/45 to-black/80" />

      <div className="container-custom py-12 md:py-20 text-center relative z-10">
        {/* Eyebrow badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-blue-500/20 backdrop-blur-sm border border-blue-400/30 rounded-full text-blue-200 text-sm font-medium mb-6 md:mb-8 animate-fade-in">
          <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse flex-shrink-0"></span>
          Premium Research Grade · Australia
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight animate-slide-up">
          Australian-Supplied Research Peptides
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed px-4 animate-slide-up">
          ≥99% purity. Precision manufactured. Shipped domestically with secure, discreet handling.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4 animate-fade-in">
          <Link href="/peptides" className="btn-primary text-sm md:text-base py-3 md:py-4 shadow-lg shadow-blue-900/30">
            Shop Peptides
          </Link>
          <Link
            href="/peptides"
            className="inline-flex items-center justify-center px-4 sm:px-6 py-3 md:py-4 border-2 border-white/60 text-white text-sm md:text-base font-semibold rounded-xl hover:bg-white hover:text-slate-900 transition-all duration-200 min-h-[48px] backdrop-blur-sm"
          >
            View All Products
          </Link>
        </div>

        {/* Trust badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3 mt-8 md:mt-12 animate-fade-in">
          {["≥99% Purity", "Australian Supplied", "Discreet Shipping", "Fast Dispatch"].map((label) => (
            <span
              key={label}
              className="px-3 md:px-4 py-1 md:py-1.5 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-xs md:text-sm text-white/90 font-medium"
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
