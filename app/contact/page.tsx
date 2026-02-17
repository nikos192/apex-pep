import Link from 'next/link';
import { ContactForm } from '@/components/ContactForm';

export const metadata = {
  title: 'Contact | Apex Labs Australia',
  description:
    'Get in touch with Apex Labs Australia for research enquiries, order support, and general assistance.',
};

export default function ContactPage() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-blue-50 border-b border-slate-200">
        <div className="container-custom py-20 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 mb-6 tracking-tight">
            Contact Apex Labs Australia
          </h1>
          <p className="text-xl md:text-2xl text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            For research enquiries, order support, and general assistance.
          </p>
        </div>
      </section>

      {/* Contact Details Section */}
      <section className="section-padding bg-white border-b border-slate-200">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {/* Email Contact */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Email</h3>
              <a
                href="mailto:andy@peptideapex"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                andy@peptideapex
              </a>
            </div>

            {/* Telegram Contact */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center hover:shadow-md transition-shadow">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a11.955 11.955 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.365-1.337.175-.437-.148-1.33-.514-1.98-.942-.797-.541-.128-.83.562-1.01 2.203-.595 4.031-1.08 4.8-1.084z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Telegram</h3>
              <a
                href="https://t.me/apexlabs_aus"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:text-blue-700 font-medium transition-colors"
              >
                @apexlabs_aus
              </a>
            </div>

            {/* Support Hours */}
            <div className="bg-slate-50 border border-slate-200 rounded-lg p-8 text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                <svg
                  className="w-6 h-6 text-blue-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">Support Hours</h3>
              <div className="text-slate-600 text-sm">
                <p className="font-medium">Monday — Friday</p>
                <p>9:00 AM — 5:00 PM AEST</p>
              </div>
            </div>
          </div>

          {/* Location */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 text-center">
            <p className="text-slate-700 font-medium">
              <span className="font-semibold text-slate-900">Based in:</span> Australia
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="section-padding bg-gradient-to-b from-white to-slate-50">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto mb-12 text-center">
            <h2 className="text-4xl font-bold text-slate-900 mb-4">Send us a Message</h2>
            <p className="text-lg text-slate-600">
              Fill out the form below and we'll get back to you as soon as possible.
            </p>
          </div>
          <ContactForm />
        </div>
      </section>

      {/* FAQ Help Section */}
      <section className="section-padding bg-white border-t border-slate-200">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl font-bold text-slate-900 mb-8">Frequently Asked Questions</h2>

          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                How long does it take to receive a response?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                During business hours (Monday—Friday, 9:00 AM—5:00 PM AEST), we typically respond to
                all enquiries within 24 hours. For faster response, contact us via Telegram.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What should I include in my order enquiry?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Please provide your order number (if available), the specific peptide compounds
                you're interested in, and any questions about specifications, pricing, or delivery
                timelines.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Can I reach you for urgent matters?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                For urgent matters, Telegram (@apexlabs_aus) is the fastest way to reach us. You
                can also call or email with "URGENT" in the subject line for priority handling.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Do you provide technical support for research protocols?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Yes, our team can provide guidance on product specifications, storage requirements,
                and general research applications. Contact us with your specific questions.
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                What's the best way to track my order?
              </h3>
              <p className="text-slate-600 leading-relaxed">
                Order tracking information is sent via email upon dispatch. If you have your order
                number, include it in your contact form for quick reference.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
