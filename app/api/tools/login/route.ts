import { NextResponse } from "next/server";
import { TOOLS_COOKIE, TOOLS_COOKIE_MAX_AGE, passcodeToken } from "@/lib/tools/auth";

export async function POST(request: Request) {
  const expected = process.env.TOOLS_PASSCODE;
  if (!expected) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let passcode = "";
  try {
    const body = await request.json();
    passcode = typeof body?.passcode === "string" ? body.passcode : "";
  } catch {
    // fall through with an empty passcode
  }

  if (passcode !== expected) {
    // Slow down guessing.
    await new Promise((resolve) => setTimeout(resolve, 1200));
    return NextResponse.json({ error: "wrong_passcode" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(TOOLS_COOKIE, await passcodeToken(expected), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: TOOLS_COOKIE_MAX_AGE,
  });
  return response;
}
