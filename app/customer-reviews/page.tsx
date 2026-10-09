import { CustomerReviews } from '@/components/CustomerReviews';
import { createPageMetadata } from '@/lib/site';

export const metadata = createPageMetadata({ title: 'Customer Reviews | Apex Labs Australia', description: 'Customer feedback on Apex Labs Australia. Read reviews and share your experience.', path: '/customer-reviews' });

export default function CustomerReviewsPage() {
  return <div className="bg-slate-50">
    <section className="border-b border-slate-200 bg-slate-950 text-white">
      <div className="container-custom py-16 md:py-24">
        <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-300">Apex Labs Australia</p>
        <h1 className="text-4xl font-bold tracking-tight text-white md:text-6xl">Customer Reviews</h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-300">Your experience matters. Read customer feedback and tell us about your order.</p>
      </div>
    </section>
    <CustomerReviews />
  </div>;
}
