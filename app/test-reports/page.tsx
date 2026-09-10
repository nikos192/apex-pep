import Link from "next/link";

export const metadata = {
  title: "Product Test Reports | Apex Labs Australia",
  description:
    "Request Apex Labs Australia product test reports directly through our official Telegram account.",
};

export default function TestReportsPage() {
  return (
    <div className="w-full bg-slate-50">
      <section className="relative isolate overflow-hidden border-b border-slate-800 bg-slate-950 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_35%,rgba(37,99,235,0.38),transparent_38%),radial-gradient(circle_at_82%_25%,rgba(34,211,238,0.18),transparent_30%)]" />
        <div className="container-custom relative py-20 md:py-28">
          <div className="max-w-4xl">
            <span className="inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-black uppercase tracking-[0.22em] text-cyan-200">
              Quality documentation
            </span>
            <h1 className="mt-6 text-5xl font-black leading-[0.98] tracking-tight text-white md:text-7xl">
              Test reports for
              <span className="block text-cyan-300">every product.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300 md:text-xl">
              Product test reports are available directly from Apex Labs Australia. Message our official Telegram account and tell us which product report you need.
            </p>
          </div>
        </div>
      </section>

      <section className="container-custom py-14 md:py-20">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-3xl border border-slate-200 bg-white p-7 shadow-card md:p-10">
            <p className="text-sm font-black uppercase tracking-[0.2em] text-blue-600">How to request a report</p>
            <h2 className="mt-3 text-3xl font-black text-slate-900 md:text-4xl">Contact us on Telegram</h2>
            <p className="mt-4 text-base text-slate-600 md:text-lg">
              Send a message with the exact product name and strength. Our team will provide the available testing documentation for that product and can help match the report to your order or batch where applicable.
            </p>

            <a
              href="https://t.me/apexlabaus"
              target="_blank"
              rel="noopener noreferrer"
              className="group mt-8 inline-flex min-h-[58px] items-center justify-center gap-3 rounded-xl bg-blue-600 px-7 py-4 text-base font-black text-white shadow-lg shadow-blue-900/20 transition-all hover:-translate-y-1 hover:bg-blue-700 hover:text-white"
            >
              Message @apexlabaus
              <span aria-hidden="true" className="text-xl transition-transform group-hover:translate-x-1">→</span>
            </a>

            <p className="mt-5 text-sm text-slate-500">
              Please verify the username is exactly <strong className="text-slate-700">@apexlabaus</strong> before sending your message.
            </p>
          </div>

          <aside className="rounded-3xl bg-blue-50 p-7 ring-1 ring-blue-100 md:p-10">
            <h2 className="text-2xl font-black text-slate-900">Include in your message</h2>
            <ol className="mt-6 space-y-5">
              {[
                ["01", "Product", "The full product name and strength shown in our store."],
                ["02", "Batch or order", "Your batch number or order reference, if you have one."],
                ["03", "Report request", "Let us know which testing documentation you are looking for."],
              ].map(([number, title, detail]) => (
                <li key={number} className="flex gap-4">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-slate-950 text-xs font-black text-cyan-300">
                    {number}
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">{title}</h3>
                    <p className="mt-1 text-sm text-slate-600">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </aside>
        </div>

        <div className="mt-8 flex flex-col items-start justify-between gap-5 rounded-2xl border border-slate-200 bg-white p-6 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Looking for a product?</h2>
            <p className="mt-1 text-sm text-slate-600">Browse the full catalogue, then request the matching report by name.</p>
          </div>
          <Link href="/peptides" className="btn-secondary shrink-0">
            Browse all products
          </Link>
        </div>
      </section>
    </div>
  );
}
