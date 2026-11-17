import { NextRequest, NextResponse } from "next/server";
import { TOOLS_COOKIE, isSetUpDevice } from "@/lib/tools/auth";

// Only a device that has opened the setup link can email PDFs.
// The forms themselves stay open (see lib/tools/auth.ts).
export async function middleware(request: NextRequest) {
  if (await isSetUpDevice(request.cookies.get(TOOLS_COOKIE)?.value)) {
    return NextResponse.next();
  }
  return NextResponse.json({ error: "device_not_set_up" }, { status: 401 });
}

export const config = {
  matcher: ["/api/tools/send"],
};
