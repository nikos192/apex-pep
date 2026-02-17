"use client";

import { Suspense } from "react";
import OrderConfirmationContent from "./content";

export default function OrderConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full">
          <div className="section-padding container-custom text-center">
            <p className="text-slate-600">Loading your order...</p>
          </div>
        </div>
      }
    >
      <OrderConfirmationContent />
    </Suspense>
  );
}
