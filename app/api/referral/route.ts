import { NextResponse } from "next/server";
import { getMailConfig, sendMailText } from "@/lib/mail";
import { checkRateLimit } from "@/lib/rate-limit";

export const runtime = "nodejs";

type Body = {
  referrerType?: unknown;
  referrerName?: unknown;
  referrerOrganisation?: unknown;
  referrerEmail?: unknown;
  referrerPhone?: unknown;
  services?: unknown;
  personFullName?: unknown;
  personPreferredName?: unknown;
  personDob?: unknown;
  personSuburb?: unknown;
  personPostcode?: unknown;
  personPhone?: unknown;
  personEmail?: unknown;
  personContactMethod?: unknown;
  personContactNote?: unknown;
  ndisNumber?: unknown;
  ndisPlanStart?: unknown;
  ndisPlanEnd?: unknown;
  planManagement?: unknown;
  planManager?: unknown;
  nomineeContactName?: unknown;
  nomineeContactPhone?: unknown;
  nomineeContactEmail?: unknown;
  consentStatus?: unknown;
  urgency?: unknown;
  hearAboutUs?: unknown;
  anythingElse?: unknown;
  website?: unknown; // honeypot
};

function str(v: unknown, max = 500): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function strArr(v: unknown): string[] {
  if (!Array.isArray(v)) return [];
  return v.filter((x): x is string => typeof x === "string").map((s) => s.trim().slice(0, 200));
}

function line(label: string, value: string | undefined): string | null {
  return value ? `${label}: ${value}` : null;
}

export async function POST(request: Request) {
  const config = getMailConfig();
  if (!config) return NextResponse.json({ error: "not_configured" }, { status: 503 });

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (!checkRateLimit(`referral:${ip}`, 3)) {
    return NextResponse.json({ error: "rate_limited" }, { status: 429 });
  }

  let body: Body;
  try { body = await request.json(); }
  catch { return NextResponse.json({ error: "bad_request" }, { status: 400 }); }

  if (body.website) return NextResponse.json({ ok: true });

  const referrerType         = str(body.referrerType);
  const referrerName         = str(body.referrerName);
  const referrerOrganisation = str(body.referrerOrganisation);
  const referrerEmail        = str(body.referrerEmail);
  const referrerPhone        = str(body.referrerPhone);
  const services             = strArr(body.services);
  const consentStatus        = str(body.consentStatus);
  const urgency              = str(body.urgency);
  const hearAboutUs          = str(body.hearAboutUs);

  if (!referrerType || !referrerName || !referrerEmail || !referrerPhone ||
      services.length === 0 || !consentStatus || !urgency || !hearAboutUs) {
    return NextResponse.json({ error: "missing_fields" }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(referrerEmail)) {
    return NextResponse.json({ error: "invalid_email" }, { status: 400 });
  }

  const urgencyShort = urgency.split(",")[0];
  const subject = `New referral: ${services.join(", ")} - ${urgencyShort}`;

  const sections: string[] = [];

  sections.push(
    "ABOUT THE REFERRER",
    `Who: ${referrerType}`,
    `Name: ${referrerName}`,
    ...([line("Organisation", referrerOrganisation)].filter(Boolean) as string[]),
    `Email: ${referrerEmail}`,
    `Phone: ${referrerPhone}`,
  );

  sections.push("", "SERVICES REQUESTED", ...services.map((s) => `- ${s}`));

  const person = [
    line("Full name",     str(body.personFullName)),
    line("Preferred name",str(body.personPreferredName)),
    line("Date of birth", str(body.personDob)),
    line("Suburb",        str(body.personSuburb)),
    line("Postcode",      str(body.personPostcode)),
    line("Phone",         str(body.personPhone)),
    line("Email",         str(body.personEmail)),
    line("Best contact",  str(body.personContactMethod)),
    line("Contact note",  str(body.personContactNote, 1000)),
  ].filter(Boolean) as string[];

  sections.push("", "THE PERSON BEING REFERRED");
  sections.push(person.length > 0 ? person.join("\n") : "(No details provided)");

  const showNdis = services.some((s) => s !== "Not sure");
  if (showNdis) {
    const ndis = [
      line("NDIS number",           str(body.ndisNumber)),
      line("Plan start",            str(body.ndisPlanStart)),
      line("Plan end",              str(body.ndisPlanEnd)),
      line("Plan management",       str(body.planManagement)),
      line("Plan manager",          str(body.planManager)),
      line("Nominee name",          str(body.nomineeContactName)),
      line("Nominee phone",         str(body.nomineeContactPhone)),
      line("Nominee email",         str(body.nomineeContactEmail)),
    ].filter(Boolean) as string[];

    sections.push("", "NDIS DETAILS");
    sections.push(ndis.length > 0 ? ndis.join("\n") : "(No details provided)");
  }

  sections.push(
    "",
    "CONSENT AND TIMING",
    `Consent: ${consentStatus}`,
    `How soon: ${urgency}`,
  );

  sections.push(
    "",
    "HOW THEY HEARD ABOUT US",
    `Via: ${hearAboutUs}`,
    ...([line("Additional notes", str(body.anythingElse, 2000))].filter(Boolean) as string[]),
  );

  sections.push("", "---", "Sent from lumencollective.com.au");

  const result = await sendMailText(config, subject, sections.join("\n"));
  if (result === "ok") return NextResponse.json({ ok: true });
  console.error("api/referral:", result);
  return NextResponse.json({ error: result }, { status: 502 });
}
