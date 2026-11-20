import { NextResponse } from "next/server";
import { getMailConfig, sendMailText } from "@/lib/mail";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Body = {
  feedbackType?: unknown;
  anonymous?: unknown;
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  contactMethod?: unknown;
  aboutWho?: unknown;
  aboutService?: unknown;
  whatHappened?: unknown;
  whenDate?: unknown;
  whatNext?: unknown;
  advocate?: unknown;
  website?: unknown; // honeypot
};

function str(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function line(label: string, value: string | undefined): string | null {
  return value ? `${label}: ${value}` : null;
}

export async function POST(request: Request) {
  const config = getMailConfig();
  if (!config) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(`feedback:${ip}`, 5)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true });

  const feedbackType  = str(body.feedbackType, 50);
  const anonymous     = str(body.anonymous, 10);
  const whatHappened  = str(body.whatHappened, 5000);

  if (!feedbackType || !anonymous || !whatHappened) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }

  const name          = str(body.name, 200);
  const email         = str(body.email, 200);
  const phone         = str(body.phone, 50);
  const contactMethod = str(body.contactMethod, 50);
  const aboutWho      = str(body.aboutWho, 100);
  const aboutService  = str(body.aboutService, 100);
  const whenDate      = str(body.whenDate, 20);
  const whatNext      = str(body.whatNext, 2000);
  const advocate      = str(body.advocate, 300);

  if (anonymous === "No") {
    if (!name || !email) {
      return NextResponse.json({ error: "missing_fields" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "invalid_email" }, { status: 400 });
    }
  }

  const displayName = anonymous === "No" && name ? name : "Anonymous";
  const subject = `New feedback: ${feedbackType.toLowerCase()} - ${displayName}`;

  const sections: string[] = [];

  sections.push(
    "FEEDBACK DETAILS",
    `Type: ${feedbackType}`,
    `Anonymous: ${anonymous}`,
  );

  if (anonymous === "No" && name) {
    sections.push(
      "",
      "CONTACT DETAILS",
      `Name: ${name}`,
      `Email: ${email}`,
      ...([
        line("Phone", phone),
        line("Best contact method", contactMethod),
      ].filter(Boolean) as string[]),
    );
  }

  sections.push(
    "",
    "ABOUT",
    ...([
      line("Who this is about", aboutWho),
      line("Which service", aboutService),
    ].filter(Boolean) as string[]),
  );
  if (!aboutWho && !aboutService) sections.push("(Not specified)");

  sections.push(
    "",
    "WHAT HAPPENED",
    whatHappened,
  );

  if (whenDate) sections.push("", `When: ${whenDate}`);
  if (whatNext) sections.push("", "WHAT THEY WOULD LIKE TO HAPPEN", whatNext);
  if (advocate) sections.push("", `Advocate or support person: ${advocate}`);

  sections.push("", "---", "Sent from lumencollective.com.au");

  const result = await sendMailText(config, subject, sections.join("\n"));
  if (result === "ok") return NextResponse.json({ ok: true });
  console.error("api/feedback:", result);
  return NextResponse.json({ error: result }, { status: 502 });
}
