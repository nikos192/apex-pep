"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const { cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartItemCount = cart.items.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <Image
                src="/logos/apex_logo_transparent.png"
                alt="Apex Labs Australia"
                width={40}
                height={40}
                priority
              />
              <span className="hidden sm:inline text-lg font-bold text-slate-900">Apex Labs</span>
            </Link>

            {/* Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/peptides"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Peptides
              </Link>
              <Link
                href="/about"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                About
              </Link>
              <Link
                href="/research"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Research
              </Link>
              <a
                href="#contact"
                className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Contact
              </a>
            </nav>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 text-slate-600 hover:text-slate-900 transition-colors"
              aria-label="Open cart"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>

              {/* Cart Count Badge */}
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-slate-900 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount > 9 ? "9+" : cartItemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
