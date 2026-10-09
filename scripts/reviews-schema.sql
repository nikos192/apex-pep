-- Run once in your Supabase SQL editor. No public database access is granted.
create table if not exists public.customer_reviews (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 80),
  email text not null check (char_length(email) <= 254),
  rating integer not null check (rating between 1 and 5),
  message text not null check (char_length(message) between 10 and 2000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.customer_reviews enable row level security;
revoke all on public.customer_reviews from anon, authenticated;
create index if not exists customer_reviews_approved_date on public.customer_reviews (created_at desc) where approved = true;
-- Review submissions in the table editor; set approved = true to publish.
-- Apply the same moderation standards to every star rating.
