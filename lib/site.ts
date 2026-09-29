import type { Metadata } from "next";

export const SITE_URL = "https://www.apexlabaus.com";
export const SITE_NAME = "Apex Labs Australia";

interface PageMetadataOptions {
  title: string;
  description: string;
  path: string;
  image?: string;
  imageAlt?: string;
}

export function createPageMetadata({
  title,
  description,
  path,
  image,
  imageAlt,
}: PageMetadataOptions): Metadata {
  const images = image ? [{ url: image, alt: imageAlt ?? title }] : undefined;

  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      type: "website",
      locale: "en_AU",
      url: path,
      siteName: SITE_NAME,
      title,
      description,
      images,
    },
    twitter: {
      card: image ? "summary_large_image" : "summary",
      title,
      description,
      images: image ? [image] : undefined,
    },
  };
}
