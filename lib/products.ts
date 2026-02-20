import fs from "fs";
import path from "path";
import type { Product } from "./products-utils";

export type { Product } from "./products-utils";

const IMAGES_DIR = path.join(process.cwd(), "public", "images");

/**
 * Generate a deterministic price based on slug hash
 * Range: $79 - $249 AUD
 */
function generatePrice(slug: string): number {
  const hash = slug.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);
  
  const minPrice = 79;
  const maxPrice = 249;
  const range = maxPrice - minPrice;
  const normalized = (hash % 170) / 170;
  
  return Math.round(minPrice + normalized * range);
}

/**
 * Convert filename to product name
 * Examples: "bpc-157.jpg" → "BPC-157", "tb500.png" → "TB-500"
 */
function filenameToProductName(filename: string): string {
  // Remove extension
  const name = filename.replace(/\.[^/.]+$/, "");
  
  // Convert to uppercase with hyphens
  // Handle cases like bpc157 → BPC-157
  let result = name.toUpperCase();
  
  // If it looks like text+numbers, try to add hyphen
  if (/^([A-Z]+)(\d+)$/.test(result)) {
    result = result.replace(/^([A-Z]+)(\d+)$/, "$1-$2");
  }
  
  return result;
}

/**
 * Generate scientific description based on product name
 */
function generateDescription(productName: string): string {
  const descriptions: Record<string, string> = {
    "BPC-157":
      "BPC-157 (Body Protection Compound-157) is a 15 amino acid pentadecapeptide. Research suggests potential benefits for tissue repair and healing processes.",
    "TB-500":
      "TB-500 (Thymosin Beta 4) is a naturally occurring peptide that may support tissue repair and flexibility. Commonly used in research settings for regenerative studies.",
    "IPAMORELIN":
      "Ipamorelin is a growth hormone-releasing peptide (GHRP) that selectively stimulates GH secretion. Research indicates potential for studying body composition changes.",
    "CJC-1295":
      "CJC-1295 is a growth hormone-releasing hormone (GHRH) analog. Research applications focus on studying growth hormone secretion patterns.",
    "EPITHALON":
      "Epithalon is a tetrapeptide that may support telomerase activity. Research suggests potential for studying cellular aging processes.",
    "SEMAX":
      "Semax is a synthetic hexapeptide fragment of ACTH. Research indicates potential cognitive and neurological applications.",
    "SELANK":
      "Selank is a heptapeptide analog of tuftsin. Research suggests anxiolytic properties and cognitive enhancement potential.",
    "PT-141":
      "PT-141 is a melanocyte-stimulating hormone (MSH) analog. Research focuses on studying melanin production and related physiological processes.",
    "AOD-9604":
      "AOD-9604 is a fragment of human growth hormone (HGH). Research suggests potential for studying fat metabolism and body composition.",
    "HEXARELIN":
      "Hexarelin is a growth hormone secretagogue. Research applications include studying GH secretion and growth-related processes.",
  };

  return (
    descriptions[productName] ||
    `${productName} is a research-grade peptide compound. This product is intended for research purposes only in properly equipped laboratories with qualified personnel.`
  );
}

/**
 * Custom pricing map - maps product names to { original, sale }
 */
const PRICING_MAP: Record<string, { original: number; sale: number }> = {
  "BPC-157": { original: 100, sale: 90 },
  "RETA 10MG": { original: 160, sale: 149 },
  
  "GHK-CU 100MG": { original: 170, sale: 160 },
  "MT-2 10MG": { original: 90, sale: 75 },
  "BAC WATER 3ML": { original: 30, sale: 20 },
  "BAC WATER 10ML": { original: 40, sale: 30 },
  "SEMAX 11MG": { original: 130, sale: 85 },
  "GHK-CU 50MG": { original: 115, sale: 100 },
  "CJC+IPA": { original: 160, sale: 150 },
  "TB-500 10MG": { original: 140, sale: 120 },
  "MT 1": { original: 100, sale: 90 },
  "RETA X10, GHK X10 (MEGA DEAL!)": { original: 2600, sale: 1250 },
};

/**
 * Get pricing for a product
 */
function getPrices(
  productName: string
): { price: number; originalPrice?: number } {
  const prices = PRICING_MAP[productName];
  if (prices) {
    return { price: prices.sale, originalPrice: prices.original };
  }
  // Fallback to generated price if not in map
  const generatedPrice = generatePrice(productName.toLowerCase());
  return { price: generatedPrice };
}

/**
 * Get all products from images folder
 */
export function getProducts(): Product[] {
  if (!fs.existsSync(IMAGES_DIR)) {
    return [];
  }

  const files = fs.readdirSync(IMAGES_DIR);
  const imageFiles = files.filter((file) =>
    /\.(jpg|jpeg|png|gif|webp)$/i.test(file)
  );

  return imageFiles.map((filename) => {
    const slug = filename
      .replace(/\.[^/.]+$/, "")
      .toLowerCase()
      .replace(/\s+/g, "-");

    const name = filenameToProductName(filename);
    const { price, originalPrice } = getPrices(name);
    const description = generateDescription(name);

    return {
      id: slug,
      slug,
      name,
      price,
      originalPrice,
      image: `/images/${filename}`,
      description,
      purityCertificate: `${name} has been third-party tested for purity and potency. Certificate of analysis available upon request.`,
      storageInstructions:
        "Store in a cool, dry place. Keep sealed and protected from light. Store at 2-8°C for extended shelf life.",
      researchOnly: true,
    };
  });
}

/**
 * Get a single product by slug
 */
export function getProduct(slug: string): Product | null {
  const products = getProducts();
  return products.find((p) => p.slug === slug) || null;
}

/**
 * Get featured products (first 6)
 */
export function getFeaturedProducts(): Product[] {
  return getProducts().slice(0, 6);
}
