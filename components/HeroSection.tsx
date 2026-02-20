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
      <div className="absolute inset-0 bg-black/45" />

      <div className="container-custom py-12 md:py-20 text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 md:mb-6 tracking-tight">
          Australian-Supplied Research Peptides
        </h1>
        <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-100 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
          ≥99% purity. Precision manufactured. Shipped domestically with secure, discreet handling.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
          <Link href="/peptides" className="btn-primary text-sm md:text-base py-3 md:py-4">
            Shop Peptides
          </Link>
          <Link href="/peptides" className="btn-outline text-sm md:text-base py-3 md:py-4">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
