import { NextRequest, NextResponse } from "next/server";
import { TOOLS_COOKIE, TOOLS_COOKIE_MAX_AGE, deviceKey, deviceToken } from "@/lib/tools/auth";

export const dynamic = "force-dynamic";

// One-off setup link for a device: /api/tools/setup?key=<TOOLS_DEVICE_KEY>
export async function GET(request: NextRequest) {
  const expected = deviceKey();
  const given = request.nextUrl.searchParams.get("key")?.trim() ?? "";
  const menu = new URL("/tools", request.url);

  if (!expected || given !== expected) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    menu.searchParams.set("setup", expected ? "wrong-key" : "not-configured");
    return NextResponse.redirect(menu, { status: 303 });
  }

  menu.searchParams.set("setup", "done");
  const response = NextResponse.redirect(menu, { status: 303 });
  response.cookies.set(TOOLS_COOKIE, await deviceToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOOLS_COOKIE_MAX_AGE,
  });
  return response;
}
