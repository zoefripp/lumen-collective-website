import { NextResponse } from "next/server";

// Emails a completed form PDF to the practice mailbox through Microsoft 365
// (Microsoft Graph). The recipient is fixed by environment variable, so this
// endpoint can only ever send to that one address. Nothing is stored here.

export const runtime = "nodejs";

const MAX_BASE64_LENGTH = 3_800_000; // keeps the request under Vercel's 4.5 MB limit

type SendBody = {
  filename?: unknown;
  formTitle?: unknown;
  pdfBase64?: unknown;
};

function mailConfig() {
  // Trimmed, because copied values often pick up stray spaces.
  const tenant = process.env.MS_TENANT_ID?.trim();
  const clientId = process.env.MS_CLIENT_ID?.trim();
  const clientSecret = process.env.MS_CLIENT_SECRET?.trim();
  const from = process.env.TOOLS_MAIL_FROM?.trim();
  const to = process.env.TOOLS_MAIL_TO?.trim();
  if (!tenant || !clientId || !clientSecret || !from || !to) return null;
  return { tenant, clientId, clientSecret, from, to };
}

export async function POST(request: Request) {
  const config = mailConfig();
  if (!config) {
    return NextResponse.json({ error: "not_configured" }, { status: 503 });
  }

  let body: SendBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }

  const pdfBase64 = typeof body.pdfBase64 === "string" ? body.pdfBase64 : "";
  const formTitle = typeof body.formTitle === "string" ? body.formTitle.slice(0, 120) : "Form";
  const filename =
    typeof body.filename === "string" && /^[\w .,()-]{1,150}\.pdf$/.test(body.filename)
      ? body.filename
      : "completed-form.pdf";

  if (!pdfBase64 || !/^[A-Za-z0-9+/=]+$/.test(pdfBase64)) {
    return NextResponse.json({ error: "bad_request" }, { status: 400 });
  }
  if (pdfBase64.length > MAX_BASE64_LENGTH) {
    return NextResponse.json({ error: "too_large" }, { status: 413 });
  }

  try {
    const tokenResponse = await fetch(
      `https://login.microsoftonline.com/${encodeURIComponent(config.tenant)}/oauth2/v2.0/token`,
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "client_credentials",
          client_id: config.clientId,
          client_secret: config.clientSecret,
          scope: "https://graph.microsoft.com/.default",
        }),
        cache: "no-store",
      }
    );
    if (!tokenResponse.ok) {
      console.error("tools/send: Microsoft sign-in failed", tokenResponse.status);
      return NextResponse.json({ error: "mail_auth_failed" }, { status: 502 });
    }
    const { access_token: accessToken } = await tokenResponse.json();

    const mailResponse = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.from)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject: `Completed form: ${formTitle}`,
            body: {
              contentType: "Text",
              content: `A completed "${formTitle}" is attached as a PDF.\n\nSent automatically from the Lumen Collective tools page.`,
            },
            toRecipients: [{ emailAddress: { address: config.to } }],
            attachments: [
              {
                "@odata.type": "#microsoft.graph.fileAttachment",
                name: filename,
                contentType: "application/pdf",
                contentBytes: pdfBase64,
              },
            ],
          },
          saveToSentItems: false,
        }),
        cache: "no-store",
      }
    );
    if (!mailResponse.ok) {
      console.error("tools/send: sending failed", mailResponse.status);
      return NextResponse.json({ error: "mail_send_failed" }, { status: 502 });
    }
  } catch {
    console.error("tools/send: could not reach Microsoft 365");
    return NextResponse.json({ error: "mail_unreachable" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
