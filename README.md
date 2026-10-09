# Apex Labs Australia - Premium Peptide Storefront

A production-ready, premium ecommerce storefront for research-grade peptides built with Next.js 14, TypeScript, and Tailwind CSS.

## Features

- 🏪 **Modern Product Catalog** - Automatic product scanning from image files
- 🛒 **Cart Management** - Client-side cart with localStorage persistence
- 📱 **Fully Responsive** - Mobile-first design for all devices
- ⚡ **Fast & Optimized** - Next.js 14 with static generation and image optimization
- 🔬 **Premium Design** - Scientific, pharmaceutical-grade aesthetic
- 📦 **No Dependencies** - Minimal external dependencies (React, Next.js only)
- 🎨 **Tailwind CSS** - Beautiful, customizable styling

## Project Structure

```
apex-pep/
├── app/
│   ├── layout.tsx              # Root layout with providers
│   ├── page.tsx                # Home page
│   ├── globals.css             # Global styles
│   ├── context/
│   │   └── CartContext.tsx      # Global cart state management
│   ├── hooks/
│   │   └── useCartActions.ts    # Cart action hooks
│   ├── peptides/
│   │   ├── page.tsx            # Peptides listing page
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail page
│   └── checkout/
│       └── page.tsx            # Checkout page
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx              # Footer
│   ├── ProductCard.tsx         # Product card component
│   ├── CartDrawer.tsx          # Shopping cart drawer
│   ├── QuantityPicker.tsx      # Quantity selector
│   ├── SortMenu.tsx            # Sort dropdown
│   └── Filters.tsx             # Product filters
├── lib/
│   ├── products.ts             # Product scanning & management
│   ├── types.ts                # TypeScript type definitions
│   └── utils.ts                # Utility functions
├── public/
│   └── images/                 # Product images (auto-scanned)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.ts
└── postcss.config.js
```

## Setup Instructions

### 1. Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### 2. Add Product Images

Place peptide product images in the `public/images/` folder:

```bash
mkdir -p public/images
```

Supported formats: `.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`

**Naming Convention:**
- Filenames automatically become product slugs (lowercase, hyphenated)
- Example: `bpc-157.jpg` → slug `bpc-157`, name `BPC-157`
- Example: `tb500.png` → slug `tb500`, name `TB-500`

**Example Images:**
```
public/images/
├── bpc-157.jpg
├── tb-500.png
├── ipamorelin.jpg
├── cjc-1295.jpg
├── epithalon.jpg
├── semax.jpg
├── selank.jpg
├── pt-141.jpg
├── aod-9604.jpg
└── hexarelin.jpg
```

### 3. Environment Variables

Create a `.env.local` file (already included `.env.example`):

```bash
cp .env.example .env.local
```

Currently not required for local development, but included for future API integration.

### 4. Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### 5. Production Build

```bash
npm run build
npm start
```

## How Product Detection Works

The `lib/products.ts` file automatically:

1. **Scans** the `public/images/` directory at build time
2. **Generates** product metadata from filenames:
   - `slug` - URL-friendly identifier
   - `name` - Formatted product name (e.g., `BPC-157`)
   - `price` - Deterministic pricing ($79-$249 AUD)
   - `image` - Reference to the image file
3. **Creates** descriptions from a lookup table (customizable)
4. **Provides** purity certificates and storage information

### Product Price Generation

Prices are generated deterministically based on the product slug, ensuring:
- Consistent pricing across rebuilds
- Range: $79 - $249 AUD
- Realistic peptide market pricing

To customize prices, edit `lib/products.ts`:

```typescript
function generatePrice(slug: string): number {
  // Modify the price range or calculation logic here
}
```

### Product Descriptions

Edit the `descriptions` object in `lib/products.ts` to customize product information:

```typescript
const descriptions: Record<string, string> = {
  "BPC-157": "Your custom description here...",
  // Add more products...
};
```

## Cart Functionality

### Features

- ✅ Add/remove products
- ✅ Quantity control (1-10)
- ✅ Total calculation
- ✅ localStorage persistence
- ✅ Responsive drawer UI

### Usage in Components

```tsx
import { useCartActions } from "@/app/hooks/useCartActions";

export function MyComponent() {
  const { addToCart } = useCartActions();

  const handleAdd = () => {
    addToCart({
      id: "product-slug",
      name: "Product Name",
      price: 129,
      image: "/images/product.jpg",
    });
  };

  return <button onClick={handleAdd}>Add to Cart</button>;
}
```

## Styling

### Tailwind CSS Classes

Common utility classes defined in `app/globals.css`:

```tsx
<button className="btn-primary">Primary Action</button>
<button className="btn-secondary">Secondary Action</button>
<input className="input-field" />
<div className="section-padding container-custom">
  Centered content with max-width
</div>
```

### Color Palette

- Primary: `slate-900` (black)
- Secondary: `slate-600` (gray)
- Accents: `slate-50` to `slate-200` (backgrounds)
- Premium feel: Minimal colors, lots of whitespace

### Customization

Edit `tailwind.config.ts` to modify:
- Colors
- Spacing
- Typography
- Border radius
- Shadows

## Pages

### Home Page (`/`)

- Hero section with call-to-action
- Featured products grid
- "Why Apex Labs" feature section
- Responsive design

### Peptides Page (`/peptides`)

- Product grid (3 columns on desktop, 1 on mobile)
- Search filter (real-time)
- Sort by: Featured, Price (low/high), Name
- Research use disclaimer

### Product Detail Pages (`/peptides/[slug]`)

- Large product image
- Product name & price
- Quantity selector
- Add to cart button
- Expandable sections:
  - Purity certificate information
  - Storage instructions
  - Research-use disclaimer
- Related products carousel

### Checkout Page (`/checkout`)

- Order summary with images
- Shipping form
- Order total
- Important information disclaimer
- Complete order button (clears cart)

## API & Data Layer

### `lib/products.ts` Functions

```typescript
// Get all products
getProducts(): Product[]

// Get single product by slug
getProduct(slug: string): Product | null

// Get first 6 products
getFeaturedProducts(): Product[]

// Search products by name/slug
searchProducts(query: string): Product[]

// Sort products
sortProducts(products: Product[], sortBy): Product[]
```

### Product Interface

```typescript
interface Product {
  id: string;
  slug: string;
  name: string;
  price: number;
  image: string;
  description: string;
  purityCertificate: string;
  storageInstructions: string;
  researchOnly: boolean;
}
```

## Performance Optimizations

- ✅ **Image Optimization** - Next.js Image component with lazy loading
- ✅ **Static Generation** - Products pre-generated at build time
- ✅ **No External APIs** - Everything local for instant performance
- ✅ **Code Splitting** - Dynamic imports for modals/drawers
- ✅ **Responsive Images** - Automatic srcset generation

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel
3. Deploy with one click

The site is fully compatible with Vercel's serverless platform.

### Other Platforms

Works on any platform that supports:
- Node.js 16+
- Static file serving
- Next.js build output

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT - Feel free to modify for your use case.

## Support

For questions about:
- **Product setup** - Add images to `public/images/`
- **Customization** - Edit `lib/products.ts` and component files
- **Styling** - Modify `tailwind.config.ts` or `app/globals.css`
- **Functionality** - Review component code and hooks

## Troubleshooting

### No products showing

1. Check that `public/images/` directory exists
2. Verify image files are in supported format (.jpg, .png, .webp)
3. Rebuild: `npm run build`
4. Check browser console for errors

### Cart not persisting

- Check browser localStorage is enabled
- Check browser console for errors
- Clear cache and reload

### Styling issues

- Clear Next.js cache: `rm -rf .next`
- Rebuild: `npm run build`
- Check Tailwind config is correct

## Future Enhancements

- [ ] Payment integration (Stripe)
- [ ] Email notifications
- [ ] Admin dashboard
- [ ] Inventory management
- [ ] Customer accounts
- [ ] Order history
- [ ] Product ratings/reviews
- [ ] Blog section
- [ ] Newsletter signup

---

Built with ❤️ for premium research-grade peptides.

### Customer reviews

The `/customer-reviews` page displays the nine customer reviews supplied by the store owner, plus approved database reviews. No other reviews are generated. It accepts all star ratings and refreshes approved reviews every 30 seconds. Names, ratings and review text are public; email addresses remain server-side. The supplied reviews use anonymous attribution because no customer names were provided.

To activate live submissions:
1. Create a Supabase project and run `scripts/reviews-schema.sql` in its SQL editor.
2. Set `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` in the hosting environment (and `.env.local` for local development). Keep the service role key private.
3. Restart/redeploy. Submit a review, check it in the Supabase table editor, then set `approved` to `true` to publish it. Moderate consistently across ratings.

Without these settings, the provided reviews remain visible and customers are directed to Contact to share feedback. No database has been provisioned by this change. The feed includes the latest 500 approved database reviews; the average reflects the displayed feed. For a high-volume launch, add infrastructure-level rate limiting/CAPTCHA to the submission route; a honeypot and input validation are already included.
