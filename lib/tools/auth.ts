// Device lock for emailing completed forms.
//
// The forms themselves are open (they are blank templates), but only devices
// that have opened the one-off setup link can email PDFs. That stops anyone
// who finds the page from sending email through the website.
//
// The key lives in the TOOLS_DEVICE_KEY environment variable, never in code.
// The setup link is /api/tools/setup?key=<that value>. Opening it stores a
// cookie holding a hash of the key, valid for a year. Changing the key in
// Vercel signs every device out.

export const TOOLS_COOKIE = "lc_tools_device";
export const TOOLS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

export function deviceKey(): string | undefined {
  return process.env.TOOLS_DEVICE_KEY?.trim() || undefined;
}

export async function deviceToken(key: string): Promise<string> {
  const data = new TextEncoder().encode(`lumen-tools-device|${key}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isSetUpDevice(cookie: string | undefined): Promise<boolean> {
  const key = deviceKey();
  if (!key || !cookie) return false;
  return cookie === (await deviceToken(key));
}

export function mailConfigured(): boolean {
  return ["MS_TENANT_ID", "MS_CLIENT_ID", "MS_CLIENT_SECRET", "TOOLS_MAIL_FROM", "TOOLS_MAIL_TO"].every(
    (name) => Boolean(process.env[name]?.trim())
  );
}
