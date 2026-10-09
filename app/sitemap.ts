import type { MetadataRoute } from "next";
import { BULK_PRODUCTS, PRODUCTS } from "@/lib/catalog";
import { SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL },
    { url: `${SITE_URL}/peptides` },
    { url: `${SITE_URL}/bulk-deals` },
    { url: `${SITE_URL}/test-reports` },
    { url: `${SITE_URL}/customer-reviews` },
    { url: `${SITE_URL}/research` },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/shipping` },
    { url: `${SITE_URL}/contact` },
  ];

  const products: MetadataRoute.Sitemap = [...PRODUCTS, ...BULK_PRODUCTS].map((product) => ({
    url: `${SITE_URL}/peptides/${product.slug}`,
  }));

  return [...pages, ...products];
}
