import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { CartProvider } from "@/app/context/CartContext";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import "@/app/globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Apex Labs Australia - Research-Grade Peptides",
  description:
    "Premium, research-grade peptides from Australia. Third-party tested. Pharmaceutical precision. Highest purity standards.",
  keywords:
    "peptides, research, Australian, BPC-157, TB-500, Ipamorelin, CJC-1295",
  openGraph: {
    type: "website",
    locale: "en_AU",
    url: "https://apexlabs.com.au",
    siteName: "Apex Labs Australia",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="alternate icon" href="/logos/apex_logo_transparent.png" />
        <link rel="icon" href="/logos/apex_logo_transparent.png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/logos/apex_logo_transparent.png" />
      </head>
      <body className={`${inter.className} bg-white text-slate-900 antialiased`}>
        <CartProvider>
          <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
