export type MailConfig = {
  tenant: string;
  clientId: string;
  clientSecret: string;
  from: string;
  to: string;
};

export function getMailConfig(): MailConfig | null {
  const tenant = process.env.MS_TENANT_ID?.trim();
  const clientId = process.env.MS_CLIENT_ID?.trim();
  const clientSecret = process.env.MS_CLIENT_SECRET?.trim();
  const from = process.env.TOOLS_MAIL_FROM?.trim();
  const to = process.env.TOOLS_MAIL_TO?.trim();
  if (!tenant || !clientId || !clientSecret || !from || !to) return null;
  return { tenant, clientId, clientSecret, from, to };
}

export type MailResult = "ok" | "auth_failed" | "send_failed" | "unreachable";

export async function sendMailText(
  config: MailConfig,
  subject: string,
  body: string
): Promise<MailResult> {
  try {
    const tokenRes = await fetch(
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
    if (!tokenRes.ok) return "auth_failed";
    const { access_token: token } = (await tokenRes.json()) as { access_token: string };

    const mailRes = await fetch(
      `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(config.from)}/sendMail`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: {
            subject,
            body: { contentType: "Text", content: body },
            toRecipients: [{ emailAddress: { address: config.to } }],
          },
          saveToSentItems: false,
        }),
        cache: "no-store",
      }
    );
    return mailRes.ok ? "ok" : "send_failed";
  } catch {
    return "unreachable";
  }
}
