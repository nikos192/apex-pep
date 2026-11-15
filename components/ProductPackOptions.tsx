import Link from "next/link";
import { formatAUD, getBulkProduct, type Product } from "@/lib/catalog";

export function ProductPackOptions({ product }: { product: Product }) {
  const bulkProduct = getBulkProduct(product.slug);
  if (!bulkProduct) return null;

  const singlePrice = product.salePrice ?? product.regularPrice;
  const bulkPrice = bulkProduct.salePrice ?? bulkProduct.regularPrice;
  const savingsPercent = Math.round((1 - bulkPrice / (singlePrice * 10)) * 100);

  return (
    <section aria-labelledby="pack-size-heading" className="mb-8">
      <h2 id="pack-size-heading" className="mb-3 text-xs font-bold uppercase tracking-wider text-slate-500">
        Choose pack size
      </h2>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <div className="rounded-xl border-2 border-blue-600 bg-blue-50/50 p-4">
          <div className="flex items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-blue-700">Single vial</h3>
            <span className="text-xs font-semibold text-blue-600">Selected</span>
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">{formatAUD(singlePrice)}</p>
          <p className="mt-1 text-xs text-slate-600">1 vial</p>
        </div>
        <Link
          href={`/peptides/${bulkProduct.slug}`}
          aria-label={`View ${bulkProduct.name}`}
          className="group rounded-xl border-2 border-emerald-200 bg-emerald-50/50 p-4 transition-colors hover:border-emerald-500 hover:bg-emerald-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-emerald-600"
        >
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="text-sm font-bold text-emerald-800">10 Pack</h3>
            {savingsPercent > 0 && (
              <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                Save {savingsPercent}%
              </span>
            )}
          </div>
          <p className="mt-3 text-2xl font-black text-slate-900">{formatAUD(bulkPrice)}</p>
          <p className="mt-1 text-xs text-emerald-800">{formatAUD(bulkPrice / 10)} per vial · 10 vials</p>
          <p className="mt-3 text-xs font-bold text-emerald-800 group-hover:underline">View bulk product →</p>
        </Link>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-slate-500">
        Bulk packs have $50 flat-rate shipping. Savings compared with 10 single vials.
      </p>
    </section>
  );
}
