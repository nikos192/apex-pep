"use client";

import { useEffect } from "react";
import { createGoAffProOrder, GOAFFPRO_STORE_KEY } from "@/lib/goaffpro";
import type { CompletedOrder, GoAffProOrder } from "@/lib/goaffpro";

declare global {
  interface Window {
    goaffproTrackConversion?: (order: GoAffProOrder) => void;
  }
}

const TRACKED_ORDER_PREFIX = "goaffpro:tracked-order:";
const MAX_ATTEMPTS = 40;
const RETRY_DELAY_MS = 250;

export default function GoAffProConversion({ order }: { order: CompletedOrder }) {
  useEffect(() => {
    if (!GOAFFPRO_STORE_KEY) {
      return;
    }

    const storageKey = `${TRACKED_ORDER_PREFIX}${order.orderNumber}`;
    if (localStorage.getItem(storageKey)) {
      return;
    }

    const conversion = createGoAffProOrder(order);

    const sendConversion = () => {
      if (typeof window.goaffproTrackConversion !== "function") {
        return false;
      }

      try {
        window.goaffproTrackConversion(conversion);
        localStorage.setItem(storageKey, new Date().toISOString());
        return true;
      } catch (error) {
        console.error("[GoAffPro] Conversion tracking failed:", error);
        return false;
      }
    };

    if (sendConversion()) {
      return;
    }

    let attempts = 0;
    const interval = window.setInterval(() => {
      attempts += 1;

      if (sendConversion() || attempts >= MAX_ATTEMPTS) {
        window.clearInterval(interval);

        if (attempts >= MAX_ATTEMPTS && typeof window.goaffproTrackConversion !== "function") {
          console.warn("[GoAffPro] Tracking SDK did not become available.");
        }
      }
    }, RETRY_DELAY_MS);

    return () => window.clearInterval(interval);
  }, [order]);

  return null;
}
