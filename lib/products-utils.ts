/**
 * Client-safe product utilities (no file system access)
 */

export interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  purityCertificate: string;
  storageInstructions: string;
  researchOnly: boolean;
}

/**
 * Sort products
 */
export function sortProducts(
  products: Product[],
  sortBy: "price-asc" | "price-desc" | "name" | "featured" = "featured"
): Product[] {
  const sorted = [...products];

  switch (sortBy) {
    case "price-asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price-desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "featured":
    default:
      return sorted;
  }
}

/**
 * Search products by name or slug
 */
export function searchProducts(products: Product[], query: string): Product[] {
  if (!query.trim()) {
    return products;
  }

  const q = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.slug.toLowerCase().includes(q)
  );
}
