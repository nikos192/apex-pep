'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { OWNER_SUPPLIED_REVIEWS, type Review } from '@/lib/reviews';

function Stars({ rating }: { rating: number }) {
  return <span aria-label={`${rating} out of 5 stars`} className="text-xl tracking-widest"><span aria-hidden="true" className="text-amber-500">{'★'.repeat(rating)}</span><span aria-hidden="true" className="text-slate-300">{'★'.repeat(5 - rating)}</span></span>;
}

export function CustomerReviews() {
  const [reviews, setReviews] = useState<Review[]>(OWNER_SUPPLIED_REVIEWS);
  const [accepting, setAccepting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [feedError, setFeedError] = useState('');
  const [filter, setFilter] = useState(0);
  const [rating, setRating] = useState(5);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const controller = new AbortController();
    async function refresh() {
      try {
        const response = await fetch('/api/reviews', { cache: 'no-store', signal: controller.signal });
        const data = await response.json();
        if (!response.ok) throw new Error(data.error);
        if (!controller.signal.aborted) { setReviews(data.reviews); setAccepting(data.acceptingReviews); setFeedError(''); }
      } catch (err) {
        if (!controller.signal.aborted) setFeedError(err instanceof Error ? err.message : 'Could not refresh reviews.');
      } finally { if (!controller.signal.aborted) setLoading(false); }
    }
    void refresh();
    const interval = setInterval(() => { void refresh(); }, 30000);
    return () => { controller.abort(); clearInterval(interval); };
  }, []);

  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setSending(true); setError(''); setNotice('');
    try {
      const response = await fetch('/api/reviews', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: data.get('name'), email: data.get('email'), message: data.get('message'), company: data.get('company'), rating }) });
      const result = await response.json();
      if (!response.ok) throw new Error(result.error);
      setNotice('Thank you! Your review has been submitted for moderation. Your email will remain private.');
      form.reset(); setRating(5);
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not submit your review.'); }
    finally { setSending(false); }
  }

  const average = reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : null;
  const visible = reviews.filter(review => filter === 0 || review.rating === filter);
  const inputClass = 'mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500';

  return <div className="container-custom py-12 md:py-16">
    <div className="grid items-start gap-10 lg:grid-cols-[1fr_380px]">
      <section aria-label="Customer feedback" className="min-w-0">
        <div className="mb-8 flex flex-wrap items-center gap-6 rounded-2xl border border-slate-200 bg-white p-6">
          <span className="text-5xl font-bold text-slate-900">{average ?? '—'}<span className="text-lg font-normal text-slate-500"> / 5</span></span>
          <div><p className="font-semibold text-slate-900">{reviews.length} customer {reviews.length === 1 ? 'review' : 'reviews'}</p><p className="mt-1 text-sm text-slate-500">All ratings welcome</p></div>
        </div>
        {feedError && <p role="alert" className="mb-5 text-sm text-red-700">{feedError} Showing previously loaded reviews.</p>}
        <label htmlFor="review-filter" className="mr-3 text-sm font-semibold text-slate-700">Filter reviews</label>
        <select id="review-filter" value={filter} onChange={event => setFilter(Number(event.target.value))} className="mb-6 rounded-lg border border-slate-300 bg-white p-3">
          <option value={0}>All ratings</option>{[5,4,3,2,1].map(value => <option key={value} value={value}>{value} {value === 1 ? 'star' : 'stars'}</option>)}
        </select>
        <div className="space-y-4">
          {visible.map(review => <article key={review.id} className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8">
            <Stars rating={review.rating} />
            <p className="mt-4 whitespace-pre-wrap break-words text-lg leading-relaxed text-slate-800">{review.message}</p>
            <p className="mt-6 text-sm font-semibold text-slate-600">{review.name}</p>
          </article>)}
          {!visible.length && <p className="rounded-2xl border border-dashed border-slate-300 p-8 text-slate-500">No reviews for this rating yet.</p>}
        </div>
        <Link href="/bulk-deals" className="mt-8 inline-flex font-semibold text-blue-600 hover:text-blue-800">Explore the Bulk Catalogue <span aria-hidden="true" className="ml-2">→</span></Link>
      </section>
      <section className="rounded-2xl border border-slate-200 bg-white p-6 md:p-8" aria-labelledby="write-review">
        <h2 id="write-review" className="text-2xl font-bold text-slate-900">Share your experience</h2>
        <p className="mt-3 text-sm leading-relaxed text-slate-600">Tell us about your order, service or delivery. Reviews are moderated before publication.</p>
        {loading ? <p className="mt-6 text-slate-500" role="status">Loading review form…</p> : !accepting ? <p className="mt-6 text-sm text-slate-600">To share a review, <Link href="/contact" className="font-semibold text-blue-600 underline">contact our team</Link>. Online submissions are coming soon.</p> :
          <form onSubmit={submit} className="mt-6 space-y-5">
            <label className="block text-sm font-semibold text-slate-700">Rating<select value={rating} onChange={event => setRating(Number(event.target.value))} className={inputClass}>{[5,4,3,2,1].map(value => <option value={value} key={value}>{value} {value === 1 ? 'star' : 'stars'}</option>)}</select></label>
            <label className="block text-sm font-semibold text-slate-700">Display name<input name="name" required maxLength={80} autoComplete="name" className={inputClass} /></label>
            <label className="block text-sm font-semibold text-slate-700">Email (kept private)<input name="email" type="email" required maxLength={254} autoComplete="email" className={inputClass} /></label>
            <label className="block text-sm font-semibold text-slate-700">Your review<textarea name="message" required minLength={10} maxLength={2000} rows={5} className={inputClass} /></label>
            <input name="company" aria-hidden="true" tabIndex={-1} autoComplete="off" className="hidden" />
            <button disabled={sending} className="btn-primary w-full disabled:opacity-50">{sending ? 'Submitting…' : 'Submit review'}</button>
            {notice && <p role="status" className="text-sm text-green-700">{notice}</p>}
            {error && <p role="alert" className="text-sm text-red-700">{error}</p>}
          </form>}
      </section>
    </div>
  </div>;
}
