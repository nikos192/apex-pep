// SAMPLE PRODUCTS REFERENCE
// This file documents the structure of auto-generated products

// Auto-Generated Product Structure:
// Each image in public/images/ becomes a Product object with this shape:

export interface Product {
  id: string;                  // Unique identifier, same as slug
  slug: string;                // URL-friendly name, from filename
  name: string;                // Display name, formatted from filename
  price: number;               // AUD price, deterministically generated
  image: string;               // Path to image: /images/filename
  description: string;         // Product description
  purityCertificate: string;   // Purity/certificate info
  storageInstructions: string; // How to store
  researchOnly: boolean;       // Always true for peptides
}

// EXAMPLE: File "bpc-157.jpg" becomes:
const exampleProduct: Product = {
  id: "bpc-157",
  slug: "bpc-157",
  name: "BPC-157",
  price: 127,
  image: "/images/bpc-157.jpg",
  description:
    "BPC-157 (Body Protection Compound-157) is a 15 amino acid pentadecapeptide. Research suggests potential benefits for tissue repair and healing processes.",
  purityCertificate:
    "BPC-157 has been third-party tested for purity and potency. Certificate of analysis available upon request.",
  storageInstructions:
    "Store in a cool, dry place. Keep sealed and protected from light. Store at 2-8°C for extended shelf life.",
  researchOnly: true,
};

// AUTO-NAMING RULES:
// Input Filename      → ID          → Name       → Price
// ─────────────────────────────────────────────────────
// bpc-157.jpg         → bpc-157     → BPC-157    → $127
// tb500.jpg           → tb500       → TB-500     → $89
// ipamorelin.jpg      → ipamorelin  → IPAMORELIN → $149
// cjc-1295.jpg        → cjc-1295    → CJC-1295   → $139
// epithalon.jpg       → epithalon   → EPITHALON  → $169
// semax.jpg           → semax       → SEMAX      → $99
// selank.jpg          → selank      → SELANK     → $105
// pt-141.jpg          → pt-141      → PT-141     → $159
// aod-9604.jpg        → aod-9604    → AOD-9604   → $119
// hexarelin.jpg       → hexarelin   → HEXARELIN  → $139

// SUGGESTED PRODUCT IMAGES TO ADD:
// Create or acquire images and save as:

const suggestedImages = [
  "bpc-157.jpg",      // $127 AUD - Tissue repair research
  "tb-500.jpg",       // $89 AUD  - Flexibility & repair
  "ipamorelin.jpg",   // $149 AUD - Growth hormone secretion
  "cjc-1295.jpg",     // $139 AUD - Growth hormone analog
  "epithalon.jpg",    // $169 AUD - Telomerase activity
  "semax.jpg",        // $99 AUD  - Cognitive enhancement
  "selank.jpg",       // $105 AUD - Anxiolytic properties
  "pt-141.jpg",       // $159 AUD - Melanin production
  "aod-9604.jpg",     // $119 AUD - Fat metabolism
  "hexarelin.jpg",    // $139 AUD - Growth hormone secretagogue
];

// HOW TO CUSTOMIZE PRODUCTS:

// 1. CHANGE DESCRIPTIONS
// Edit lib/products.ts → descriptions object
const descriptions = {
  "BPC-157": "Your custom description here...",
  "TB-500": "Another description...",
  // Add more as needed
};

// 2. ADJUST PRICES
// Edit lib/products.ts → generatePrice() function
// Or create a customPrices lookup:
const customPrices = {
  "bpc-157": 129,
  "tb-500": 99,
  // Override specific prices
};

// 3. MODIFY INFO
// Edit lib/products.ts → return statement in getProducts()
purityCertificate:
  "Custom purity statement for " + name + "...",
storageInstructions:
  "Custom storage instructions...",

// LINKING IMAGES:
// All images MUST be in: public/images/
// Supported formats: .jpg, .jpeg, .png, .webp, .gif
// The system builds product URLs as: /images/[filename]

// ADDING NEW PRODUCTS:
// 1. Save image to public/images/my-peptide.jpg
// 2. System auto-detects at build time
// 3. Optionally customize description in lib/products.ts
// 4. Rebuild: npm run build
// 5. New product appears on /peptides page

// REMOVING PRODUCTS:
// 1. Delete image from public/images/
// 2. Rebuild: npm run build
// 3. Product is gone (no database to update!)

// API FUNCTIONS (from lib/products.ts):

// Get all products
export function getProducts(): Product[] {
  // Returns array of all products from public/images/
}

// Get single product by slug
export function getProduct(slug: string): Product | null {
  // Returns specific product or null if not found
}

// Get featured products (first 6)
export function getFeaturedProducts(): Product[] {
  // Used on home page
}

// Search products by name or slug
export function searchProducts(query: string): Product[] {
  // Fuzzy search - used on /peptides page
}

// Sort products multiple ways
export function sortProducts(
  products: Product[],
  sortBy: "featured" | "price-asc" | "price-desc" | "name"
): Product[] {
  // Sort array by different criteria
}

// EXAMPLE USAGE IN COMPONENTS:

import { getProducts, getProduct, getFeaturedProducts } from "@/lib/products";

// In a Server Component or Page:
const allProducts = getProducts();
const product = getProduct("bpc-157");
const featured = getFeaturedProducts();

// In a Client Component:
"use client";
import { useState } from "react";
import { getProducts, sortProducts, searchProducts } from "@/lib/products";

export default function PeptidesList() {
  const [query, setQuery] = useState("");

  const products = searchProducts(query);

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <img src={product.image} alt={product.name} />
          <h2>{product.name}</h2>
          <p>${product.price} AUD</p>
        </div>
      ))}
    </div>
  );
}

// PRICING ALGORITHM:
// Prices are deterministically generated based on product slug
// This ensures consistent pricing without database

function generatePrice(slug: string): number {
  const hash = slug.split("").reduce((acc, char) => {
    return acc + char.charCodeAt(0);
  }, 0);

  const minPrice = 79;
  const maxPrice = 249;
  const range = maxPrice - minPrice;
  const normalized = (hash % 170) / 170;

  return Math.round(minPrice + normalized * range);
  // Result: $79 - $249 AUD for peptide products
}

// To set custom prices, override in getProducts():
const customPriceMap = new Map([
  ["bpc-157", 129],
  ["tb-500", 99],
]);

// Then in getProducts():
let price = customPriceMap.get(slug) || generatePrice(slug);

// CART SYSTEM:
// localStorage-based, no backend required
// Structure:
interface Cart {
  items: CartItem[];
  total: number;
}

interface CartItem {
  id: string;                    // Unique per cart session
  productId: string;             // Product slug
  name: string;                  // Product name
  price: number;                 // Price at time of add
  quantity: number;              // 1-10
  image: string;                 // Product image path
}

// Usage:
import { useCartActions } from "@/app/hooks/useCartActions";

const { addToCart, cart } = useCartActions();

// Add to cart:
addToCart({
  id: "bpc-157",
  name: "BPC-157",
  price: 127,
  image: "/images/bpc-157.jpg",
});

// Cart is auto-saved to localStorage and persists across sessions
