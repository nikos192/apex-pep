import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Apex Labs Australia</h3>
            <p className="text-sm text-slate-600">
              Research-grade peptides. Premium purity. Precision manufacturing.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/peptides"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Browse Peptides
                </Link>
              </li>
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm">Information</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Research Use Only
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Purity Certificates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Shipping Info
                </a>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4 text-sm">Legal</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Disclaimer
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-slate-200 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-600">
              &copy; {currentYear} Apex Labs Australia. All rights reserved.
            </p>
            <p className="text-xs text-slate-500 text-center max-w-md">
              Products are intended for research purposes only. Not for human consumption.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
