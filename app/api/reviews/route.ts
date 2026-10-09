import { NextResponse } from 'next/server';
import { OWNER_SUPPLIED_REVIEWS } from '@/lib/reviews';

export const dynamic = 'force-dynamic';

function database() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url: `${url.replace(/\/$/, '')}/rest/v1/customer_reviews`, headers: { apikey: key, Authorization: `Bearer ${key}` } };
}

export async function GET() {
  const db = database();
  if (!db) return NextResponse.json({ reviews: OWNER_SUPPLIED_REVIEWS, acceptingReviews: false });
  try {
    const response = await fetch(`${db.url}?approved=eq.true&select=id,name,rating,message&order=created_at.desc&limit=500`, { headers: db.headers, cache: 'no-store', signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Review database unavailable');
    return NextResponse.json({ reviews: [...OWNER_SUPPLIED_REVIEWS, ...await response.json()], acceptingReviews: true });
  } catch {
    return NextResponse.json({ error: 'Reviews are temporarily unavailable. Please try again.' }, { status: 503 });
  }
}

export async function POST(request: Request) {
  const db = database();
  if (!db) return NextResponse.json({ error: 'Online submissions are not available yet. Please contact us to share your review.' }, { status: 503 });
  if (Number(request.headers.get('content-length')) > 12000) return NextResponse.json({ error: 'Review is too long.' }, { status: 413 });
  let body;
  try { body = await request.json(); } catch { return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 }); }
  if (!body || typeof body !== 'object') return NextResponse.json({ error: 'Invalid submission.' }, { status: 400 });
  if (body.company) return NextResponse.json({ success: true });
  const { name, email, rating, message } = body;
  if (typeof name !== 'string' || !name.trim() || name.length > 80 || typeof email !== 'string' || email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !Number.isInteger(rating) || rating < 1 || rating > 5 || typeof message !== 'string' || message.trim().length < 10 || message.length > 2000) {
    return NextResponse.json({ error: 'Please provide a name, valid email, 1–5 star rating and a review of 10–2,000 characters.' }, { status: 400 });
  }
  try {
    const response = await fetch(db.url, { method: 'POST', headers: { ...db.headers, 'Content-Type': 'application/json', Prefer: 'return=minimal' }, body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), rating, message: message.trim(), approved: false }), signal: AbortSignal.timeout(10000) });
    if (!response.ok) throw new Error('Review could not be saved');
    return NextResponse.json({ success: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Your review could not be saved. Please try again later.' }, { status: 503 });
  }
}
