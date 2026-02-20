import { NextRequest } from "next/server";
import { jwtVerify } from "jose";
import { createSupabaseServerClient } from "@/lib/supabaseServer";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "default-secret-change-in-production"
);

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("admin_session")?.value;
    if (!token) return new Response("Unauthorized", { status: 401 });

    try {
      await jwtVerify(token, secret);
    } catch (err) {
      return new Response("Unauthorized", { status: 401 });
    }

    const supabase = createSupabaseServerClient();

    const stream = new ReadableStream({
      start(controller) {
        controller.enqueue(encodeSSE({ type: "connected", message: "ok" }));

        const channel = supabase
          .channel("orders:all")
          .on("postgres_changes", { event: "*", schema: "public", table: "orders" }, (payload: any) => {
            try {
              const evt = { type: "postgres_changes", payload };
              controller.enqueue(encodeSSE(evt));
            } catch (e) {
              // ignore
            }
          })
          .subscribe((status: any, err: any) => {
            controller.enqueue(encodeSSE({ type: "status", status: String(status), error: err ? String(err) : null }));
          });

        // store unsubscribe handler on controller so cancel can call it
        (controller as any).unsubscribe = () => {
          try { channel.unsubscribe?.(); } catch (e) {}
        };
      },
      cancel(reason) {
        // cleanup subscription
        try { (this as any).unsubscribe?.(); } catch (e) {}
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-store",
        Connection: "keep-alive",
      },
    });
  } catch (err: any) {
    console.error("[admin/orders/stream] error:", err);
    return new Response(String(err?.message || err), { status: 500 });
  }
}

function encodeSSE(data: any) {
  const payload = typeof data === "string" ? data : JSON.stringify(data);
  return new TextEncoder().encode(`data: ${payload}\n\n`);
}
