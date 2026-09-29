import type { MetadataRoute } from "next";
import { BULK_PRODUCTS, PRODUCTS } from "@/lib/catalog";

const SITE_URL = "https://www.apexlabaus.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/peptides`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/bulk-deals`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/test-reports`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/research`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/shipping`, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const products: MetadataRoute.Sitemap = [...PRODUCTS, ...BULK_PRODUCTS].map((product) => ({
    url: `${SITE_URL}/peptides/${product.slug}`,
    changeFrequency: "weekly",
    priority: product.available === false ? 0.5 : 0.8,
  }));

  return [...pages, ...products];
}
