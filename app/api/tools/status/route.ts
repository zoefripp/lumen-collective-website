import { NextRequest, NextResponse } from "next/server";
import { TOOLS_COOKIE, isSetUpDevice, mailConfigured } from "@/lib/tools/auth";

export const dynamic = "force-dynamic";

// Lets the forms menu say whether this device can email PDFs.
export async function GET(request: NextRequest) {
  return NextResponse.json(
    {
      mail: mailConfigured(),
      device: await isSetUpDevice(request.cookies.get(TOOLS_COOKIE)?.value),
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
