export interface Review {
  id: string;
  name: string;
  rating: number;
  message: string;
}

// Supplied by the store owner. No customer names were provided.
export const OWNER_SUPPLIED_REVIEWS: Review[] = [
  {
    id: 'owner-supplied-easy-ordering',
    name: 'Anonymous customer',
    rating: 5,
    message: 'Easy ordering process and everything arrived securely packaged. Clear labelling and a straightforward experience overall.',
  },
  {
    id: 'owner-supplied-australian-supplier',
    name: 'Anonymous customer',
    rating: 5,
    message: 'Really appreciated being able to order from an Australian supplier. The website was easy to navigate and everything arrived in good condition.',
  },
  {
    id: 'owner-supplied-helpful-communication',
    name: 'Anonymous customer',
    rating: 5,
    message: 'Helpful communication and a smooth purchase from start to finish. Questions about the research documentation were answered clearly.',
  },
  {
    id: 'owner-supplied-neatly-packaged',
    name: 'Anonymous customer',
    rating: 5,
    message: 'Everything was accounted for, neatly packaged and clearly labelled. Happy with the overall experience.',
  },
  {
    id: 'owner-supplied-product-selection',
    name: 'Anonymous customer',
    rating: 4,
    message: 'Good overall experience. Ordering was simple and everything arrived well packaged. A wider product selection would be a welcome addition.',
  },
  {
    id: 'owner-supplied-product-test-reports',
    name: 'Anonymous customer',
    rating: 4,
    message: 'Everything arrived in good condition and matched the order. Having test reports directly on each product page would make browsing easier.',
  },
  {
    id: 'owner-supplied-product-descriptions',
    name: 'Anonymous customer',
    rating: 4,
    message: 'Clear website, straightforward checkout and secure packaging. More detailed product descriptions would be helpful.',
  },
  {
    id: 'owner-supplied-smaller-bundles',
    name: 'Anonymous customer',
    rating: 4,
    message: 'Happy with the ordering process and presentation. Would appreciate more options for smaller research bundles.',
  },
  {
    id: 'owner-supplied-bulk-review',
    name: 'Anonymous customer',
    rating: 1,
    message: "It's annoying that bulk is so well priced — I just want to order everything!",
  },
];
