// Passcode gate for the hidden /tools section.
// The passcode lives in the TOOLS_PASSCODE environment variable (never in code).
// After a correct passcode, the browser holds a cookie containing a hash of it.

export const TOOLS_COOKIE = "lc_tools";
export const TOOLS_COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // one year

export async function passcodeToken(passcode: string): Promise<string> {
  const data = new TextEncoder().encode(`lumen-tools|${passcode}`);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidToolsCookie(value: string | undefined): Promise<boolean> {
  const passcode = process.env.TOOLS_PASSCODE;
  if (!passcode || !value) return false;
  return value === (await passcodeToken(passcode));
}
