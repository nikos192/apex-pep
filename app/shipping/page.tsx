import { ShippingInfo } from "@/components/ShippingInfo";

export const metadata = {
  title: "Shipping & Fulfillment — Apex Labs",
  description: "Orders processed within 24–48 hours. Estimated delivery 3–7 business days in Australia. Discreet, secure packaging and tracking provided.",
};

export default function ShippingPage() {
  return (
    <div className="w-full">
      <section className="section-padding container-custom">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Shipping & Fulfillment</h1>
        <p className="text-slate-700 mb-6">All orders are processed within 24–48 hours.</p>
        <p className="text-slate-700 mb-6">Estimated delivery time: 3–7 business days (Australia). Tracking will be provided on dispatch.</p>
        <ShippingInfo />
      </section>
    </div>
  );
}
