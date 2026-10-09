export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
}

// Supplied by the store owner, who confirmed this is a genuine customer review.
export const OWNER_SUPPLIED_REVIEWS: Review[] = [{
  id: 'owner-supplied-bulk-review',
  name: 'Anonymous customer',
  rating: 1,
  message: "It's annoying that bulk is so well priced — I just want to order everything!",
}];
