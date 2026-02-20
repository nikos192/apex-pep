#!/usr/bin/env node
import fs from "fs";
import path from "path";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_KEY) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY (or SUPABASE_SERVICE_ROLE_KEY) in environment");
  process.exit(2);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: { persistSession: false },
});

const filePath = path.resolve(process.cwd(), "data/pending-orders.json");
if (!fs.existsSync(filePath)) {
  console.log("No pending orders file found; nothing to sync.");
  process.exit(0);
}

const raw = fs.readFileSync(filePath, "utf8");
const pending = raw ? JSON.parse(raw) : [];
if (!Array.isArray(pending) || pending.length === 0) {
  console.log("No pending orders to sync.");
  process.exit(0);
}

(async () => {
  console.log(`Found ${pending.length} pending order(s). Attempting sync...\n`);
  const failures = [];
  let synced = 0;

  for (const entry of pending) {
    try {
      const { orderNumber, payload } = entry;
      const { error } = await supabase.from("orders").insert({
        order_number: orderNumber,
        email: payload.email,
        first_name: payload.shipping.firstName,
        last_name: payload.shipping.lastName,
        phone: payload.shipping.phone,
        country: payload.shipping.country,
        address1: payload.shipping.address1,
        address2: payload.shipping.address2,
        suburb: payload.shipping.suburb,
        state: payload.shipping.state,
        postcode: payload.shipping.postcode,
        note: payload.note,
        payment_method: "bank_transfer",
        status: "pending",
        items: payload.items,
        subtotal: payload.subtotal,
        shipping: payload.shippingCost,
        total: payload.total,
      });

      if (error) {
        failures.push({ orderNumber, error });
        console.error("Failed to insert order", orderNumber, error);
      } else {
        synced += 1;
        console.log("Synced order", orderNumber);
      }
    } catch (err) {
      failures.push({ entry, err });
      console.error("Unexpected error syncing entry", entry.orderNumber, err);
    }
  }

  // Remove successfully synced entries
  const remaining = pending.filter((p) => !failures.find((f) => f.orderNumber === p.orderNumber));
  if (remaining.length === 0) {
    fs.unlinkSync(filePath);
    console.log(`All ${synced} orders synced. Removed pending file.`);
  } else {
    fs.writeFileSync(filePath, JSON.stringify(remaining, null, 2));
    console.log(`${synced} orders synced. ${remaining.length} remaining.`);
  }

  if (failures.length > 0) {
    console.error("Some orders failed to sync:", failures);
    process.exit(3);
  }
})();
