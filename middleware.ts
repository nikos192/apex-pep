import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(
  process.env.ADMIN_SESSION_SECRET || "default-secret-change-in-production"
);

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Only protect /admin routes except /admin/login
  if (pathname.startsWith("/admin") && !pathname.startsWith("/admin/login")) {
    const token = request.cookies.get("admin_session")?.value;

    if (!token) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }

    try {
      await jwtVerify(token, secret);
      // Token is valid, continue to next middleware/handler
    } catch (error) {
      // Token is invalid or expired
      const loginUrl = new URL("/admin/login", request.url);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("admin_session");
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
