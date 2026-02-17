import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-1">
            <h3 className="text-lg font-bold text-slate-900 mb-3">Apex Labs Australia</h3>
            <p className="text-sm text-slate-600 leading-relaxed mb-4">
              Research peptide compounds for laboratory use.
            </p>
            <div className="space-y-2 text-sm">
              <p>
                <span className="text-slate-600">Email:</span>{" "}
                <a href="mailto:andy@peptideapex" className="text-blue-600 hover:text-blue-700">
                  andy@peptideapex
                </a>
              </p>
              <p>
                <span className="text-slate-600">Telegram:</span>{" "}
                <a
                  href="https://t.me/apexlabs_aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-700"
                >
                  @apexlabs_aus
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5 text-sm">Navigation</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/peptides"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Peptides
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5 text-sm">Support</h4>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="/research"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Research Info
                </Link>
              </li>
              <li>
                <a
                  href="https://t.me/apexlabs_aus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-slate-600 hover:text-slate-900 transition-colors"
                >
                  Telegram Support
                </a>
              </li>
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="font-bold text-slate-900 mb-5 text-sm">Information</h4>
            <ul className="space-y-3">
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

        {/* Divider */}
        <div className="border-t border-slate-200 pt-8">
          {/* Compliance Notice */}
          <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-6">
            <p className="text-xs text-slate-900 font-semibold mb-1">RESEARCH USE ONLY</p>
            <p className="text-xs text-slate-700 leading-relaxed">
              All products supplied by Apex Labs Australia are intended for research purposes only and are not for human consumption. Customers are responsible for compliance with all applicable laws and regulations.
            </p>
          </div>

          {/* Bottom Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-slate-700">
              &copy; {currentYear} Apex Labs Australia. All rights reserved.
            </p>
            <p className="text-xs text-slate-600">
              🇦🇺 Australia
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
