import { timingSafeEqual } from 'node:crypto';

const store = new Map<string, { count: number; windowStart: number }>();

const WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_ATTEMPTS = 10;

export function checkRateLimit(ip: string): { allowed: boolean; retryAfterSeconds?: number } {
  const now = Date.now();
  const record = store.get(ip);

  if (!record || now - record.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }

  if (record.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((record.windowStart + WINDOW_MS - now) / 1000);
    return { allowed: false, retryAfterSeconds };
  }

  record.count++;
  return { allowed: true };
}

export function resetRateLimit(ip: string): void {
  store.delete(ip);
}

// Constant-time string comparison to prevent timing attacks.
// Returns false immediately on length mismatch (length itself is not secret).
export function safeCompare(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}
