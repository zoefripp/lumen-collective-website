import { NextResponse } from "next/server";
import { getMailConfig, sendMailText } from "@/lib/mail";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Body = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown; // honeypot
};

export async function POST(request: Request) {
  const config = getMailConfig();
  if (!config) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(`contact:${ip}`)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true }); // silently discard honeypot hit

  const name    = str(body.name, 200);
  const email   = str(body.email, 200);
  const phone   = str(body.phone, 50);
  const topic   = str(body.topic, 100);
  const message = str(body.message, 5000);

  if (!name || !email || !topic || !message) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const subject = `New enquiry: ${topic} - ${name}`;
  const emailBody = [
    `Name: ${name}`,
    `Email: ${email}`,
    `Phone: ${phone || "Not provided"}`,
    `Topic: ${topic}`,
    "",
    "Message:",
    message,
    "",
    "---",
    "Sent from lumencollective.com.au",
  ].join("\n");

  const result = await sendMailText(config, subject, emailBody);
  if (result === "ok") return NextResponse.json({ ok: true });
  console.error("api/contact:", result);
  return NextResponse.json({ error: result }, { status: 502 });
}

function str(v: unknown, max: number): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}
