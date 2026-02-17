import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const response = NextResponse.json({ success: true });
    response.cookies.delete("admin_session");
    response.headers.set("Location", "/admin/login");

    return response;
  } catch (error) {
    console.error("[AdminLogout] Error:", error);
    return NextResponse.json(
      { error: "An error occurred" },
      { status: 500 }
    );
  }
}
