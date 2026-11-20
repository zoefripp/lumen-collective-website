const store = new Map<string, { count: number; resetAt: number }>();

export function checkRateLimit(key: string, max = 5, windowMs = 60_000): boolean {
  const now = Date.now();
  const rec = store.get(key);
  if (!rec || now > rec.resetAt) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }
  if (rec.count >= max) return false;
  rec.count += 1;
  return true;
}
