import { NextRequest, NextResponse } from "next/server";
import { TOOLS_COOKIE, isValidToolsCookie } from "@/lib/tools/auth";

// Everything under /tools and /api/tools needs the passcode cookie,
// except the login page and the login endpoint themselves.
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname === "/tools/login" || pathname === "/api/tools/login") {
    return NextResponse.next();
  }

  const ok = await isValidToolsCookie(request.cookies.get(TOOLS_COOKIE)?.value);
  if (ok) return NextResponse.next();

  if (pathname.startsWith("/api/")) {
    return NextResponse.json({ error: "unauthorised" }, { status: 401 });
  }
  return NextResponse.redirect(new URL("/tools/login", request.url));
}

export const config = {
  matcher: ["/tools/:path*", "/api/tools/:path*"],
};
