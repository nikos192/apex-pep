# Quick Start Guide - Apex Labs Australia Storefront

## Getting Started in 5 Minutes

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Add Product Images

The storefront **automatically detects products from images** in the `public/images/` folder.

1. Create the images directory:
   ```bash
   mkdir -p public/images
   ```

2. Add peptide product images with meaningful names:
   ```
   public/images/
   ├── bpc-157.jpg
   ├── tb-500.jpg
   ├── ipamorelin.jpg
   ├── cjc-1295.jpg
   ├── epithalon.jpg
   ├── semax.jpg
   ├── selank.jpg
   ├── pt-141.jpg
   ├── aod-9604.jpg
   └── hexarelin.jpg
   ```

**Image Requirements:**
- Size: Recommend at least 400x400px (will be optimized automatically)
- Format: `.jpg`, `.jpeg`, `.png`, `.webp`, `.gif`
- Name format: lowercase, hyphenated (e.g., `bpc-157.jpg`)

### Step 3: Run Development Server

```bash
npm run dev
```

Visit: http://localhost:3000

## What Gets Auto-Generated

For each image file, the system automatically creates:

| From Filename | Generated | Example |
|---|---|---|
| `bpc-157.jpg` | slug | `bpc-157` |
| `bpc-157.jpg` | name | `BPC-157` |
| `bpc-157.jpg` | price | `$127 AUD` (deterministic) |
| - | image path | `/images/bpc-157.jpg` |
| - | description | Smart lookup from product name |
| - | purity info | Auto-generated based on name |
| - | storage tips | Generic + name-specific |

## Site Structure

```
Home (/)
├── Hero with CTA
├── Featured Products (first 6 from images)
├── Why Choose Us (4 benefits)
└── Call to Action

Peptides (/peptides)
├── Search box (real-time)
├── Sort dropdown (Featured, Price, Name)
└── Product Grid

Product Detail (/peptides/[slug])
├── Large image
├── Price & quantity selector
├── Add to cart
├── Expandable info sections
└── Related products

Checkout (/checkout)
└── Order review & form
```

## Project Organization

```
src/
├── app/
│   ├── layout.tsx           ← Root layout + providers
│   ├── page.tsx             ← Home page
│   ├── globals.css          ← Global styles
│   ├── context/
│   │   └── CartContext.tsx  ← Cart state
│   ├── hooks/
│   │   └── useCartActions.ts  ← Cart functions
│   ├── peptides/
│   │   ├── page.tsx         ← Product listing
│   │   └── [slug]/
│   │       └── page.tsx     ← Product detail
│   └── checkout/
│       └── page.tsx         ← Checkout
├── components/              ← Reusable UI
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── CartDrawer.tsx
│   ├── QuantityPicker.tsx
│   └── SortMenu.tsx
├── lib/
│   ├── products.ts          ← Product scanner & helpers
│   ├── types.ts             ← TypeScript types
│   └── utils.ts             ← Utility functions
└── public/
    └── images/              ← Your product images
```

## Customizing Products

### Edit Product Descriptions

File: `lib/products.ts`

```typescript
const descriptions: Record<string, string> = {
  "BPC-157": "Your custom description here...",
  "TB-500": "Another description...",
  // Add more...
};
```

### Change Price Range

File: `lib/products.ts`, function `generatePrice()`:

```typescript
const minPrice = 79;      // Change minimum
const maxPrice = 249;     // Change maximum
```

### Customize Product Info

File: `lib/products.ts`:

```typescript
storageInstructions: "Your custom storage info..."
purityCertificate: "Your custom purity info..."
```

## Customizing Styling

### Colors

File: `tailwind.config.ts`

Default palette: Slate (black/gray) with white background. Premium, minimal feel.

### Typography

File: `app/globals.css` and `tailwind.config.ts`

Modify font sizes, weights, and spacing.

### Buttons

Predefined classes in `app/globals.css`:
- `.btn-primary` - Black button, main action
- `.btn-secondary` - White with border, secondary action
- `.btn-ghost` - Text only

## Building for Production

```bash
npm run build
npm start
```

The build process:
1. Scans `public/images/` folder
2. Generates product database from filenames
3. Pre-renders all pages
4. Optimizes images

## Deployment

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

Select your project, and it's deployed. Simple!

### Other Hosts

The site is fully static after build, so it works anywhere:
- Netlify
- GitHub Pages (with configuration)
- AWS S3 + CloudFront
- Traditional web hosting

## Testing Locally

### Test with Sample Images

Since you don't have real peptide images yet, you can:

1. Use placeholder images:
   ```bash
   # Using macOS
   for i in {1..10}; do
     python3 -c "
   from PIL import Image
   img = Image.new('RGB', (400, 400), color='lightgray')
   img.save('public/images/peptide-$i.jpg')
   "
   done
   ```

2. Or download sample images from Unsplash/Pexels and rename them

3. Or use your own product photography

### Verify Product Detection

The development server logs which products were found:

```bash
npm run dev
# Watch terminal output during startup
```

## Common Tasks

### Add a New Product

1. Add image: `public/images/new-peptide.jpg`
2. (Optional) Add description in `lib/products.ts`
3. Rebuild: `npm run build`
4. Done! Product appears automatically

### Edit Product Price

Prices are deterministically generated from slug. To set custom price:

In `lib/products.ts`, modify `generatePrice()` function or create a price lookup table:

```typescript
const customPrices: Record<string, number> = {
  "bpc-157": 129,
  "tb-500": 149,
};
```

### Change Cart Behavior

File: `app/context/CartContext.tsx`

Default: localStorage persistence, qty 1-10, no payment processing.

Hooks available: `useCart()`, `useCartActions()` in any component.

### Add Payment Gateway

1. In `app/checkout/page.tsx`, replace "Complete Order" button
2. Integrate Stripe, PayPal, or your provider
3. Process payments on backend
4. Clear cart on success

## Troubleshooting

### Products not showing?

```bash
# Check directory exists
ls -la public/images/

# Check permissions
chmod 755 public/images/

# Rebuild
rm -rf .next && npm run build
```

### Styling not loading?

```bash
# Clear Next.js cache
rm -rf .next

# Rebuild
npm run build
```

### Cart not persisting?

- Browser localStorage might be disabled
- Check DevTools → Application → Local Storage
- Incognito/Private mode disables localStorage

## Next Steps

1. ✅ Add product images
2. ✅ Run `npm run dev`
3. ✅ Test the storefront
4. ✅ Customize styling (optional)
5. ✅ Deploy to Vercel

## Support

See **README.md** for comprehensive documentation, API reference, and advanced topics.

---

**Ready?** Start with Step 2 above and add your first product image! 🚀
