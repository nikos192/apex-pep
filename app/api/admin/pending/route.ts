import { NextResponse, NextRequest } from "next/server";
import fs from "fs";
import path from "path";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "default-secret-change-in-production"
);

export async function GET(request: NextRequest) {
  try {
    // verify admin session
    const token = request.cookies.get("admin_session")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    try {
      await jwtVerify(token, secret);
    } catch (err) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const filePath = path.resolve(process.cwd(), "data/pending-orders.json");
    if (!fs.existsSync(filePath)) {
      return NextResponse.json({ pending: [] }, { status: 200 });
    }

    const raw = fs.readFileSync(filePath, "utf8");
    const pending = raw ? JSON.parse(raw) : [];
    return NextResponse.json({ pending }, { status: 200 });
  } catch (err: any) {
    console.error("[PendingAPI] Error:", err);
    return NextResponse.json({ error: String(err?.message || err) }, { status: 500 });
  }
}
