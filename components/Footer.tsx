import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-brand-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-brand-900 mb-3">Apex Labs</h3>
            <p className="text-sm text-brand-600 leading-relaxed mb-4">
              Research-grade peptides. Premium purity. Precision manufacturing.
            </p>
            <div className="flex gap-2 flex-wrap">
              <span className="inline-block px-3 py-1 bg-brand-50 border border-brand-100 text-xs font-semibold text-brand-700 rounded-full">
                99%+ Purity
              </span>
              <span className="inline-block px-3 py-1 bg-brand-50 border border-brand-100 text-xs font-semibold text-brand-700 rounded-full">
                3P Tested
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-brand-900 mb-5 text-sm">Products</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/peptides"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Browse Peptides
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-bold text-brand-900 mb-5 text-sm">Resources</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Research Guidelines
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Purity Certificates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Shipping & Storage
                </a>
              </li>
            </ul>
          </div>

          {/* Legal & Compliance */}
          <div>
            <h4 className="font-bold text-brand-900 mb-5 text-sm">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-brand-600 hover:text-brand-primary transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-brand-100 pt-8">
          {/* Compliance Notice */}
          <div className="bg-brand-50 border border-brand-100 rounded-lg p-4 mb-6">
            <p className="text-xs text-brand-700 font-semibold mb-1">RESEARCH USE ONLY</p>
            <p className="text-xs text-brand-600 leading-relaxed">
              Products are intended for research purposes only and are not for human consumption. All customers agree to use products in compliance with applicable laws and regulations.
            </p>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-brand-600">
              &copy; {currentYear} Apex Labs Australia. All rights reserved.
            </p>
            <p className="text-xs text-brand-500">
              🇦🇺 Made in Australia | Premium Research Grade
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
