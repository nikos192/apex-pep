import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
// New visual/env name: SUPABASE_SECRET_KEY. Keep backward compatibility with SUPABASE_SERVICE_ROLE_KEY.
const supabaseServerKey = process.env.SUPABASE_SECRET_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServerKey) {
  throw new Error("Missing Supabase environment variables");
}

const keyStr = String(supabaseServerKey || "");
const preview12 = keyStr.slice(0, 12);

// Accept explicit server-side key formats: `service_role_...` or Supabase Secret API keys `sb_secret_...`.
// Reject publishable/public keys or JWTs that cannot be used as a server API key.
if (preview12.startsWith("service_role_") || preview12.startsWith("sb_secret_")) {
  // looks good
} else if (preview12.startsWith("sb_pub") || preview12.toLowerCase().includes("anon") || keyStr.startsWith("eyJ")) {
  throw new Error(
    `SUPABASE secret key looks like a public/anon or JWT key (prefix: ${preview12}). Please set SUPABASE_SECRET_KEY or SUPABASE_SERVICE_ROLE_KEY to a server-side key (service_role_... or sb_secret_...).`
  );
} else {
  throw new Error(
    `SUPABASE secret key does not look like a recognised server key (preview: ${preview12}). Use a key starting with 'service_role_' or 'sb_secret_'.`
  );
}

export const createSupabaseServerClient = () => {
  return createClient(supabaseUrl, supabaseServerKey);
};
