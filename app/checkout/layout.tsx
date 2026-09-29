import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Apex Labs Australia",
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
