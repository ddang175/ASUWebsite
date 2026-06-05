import { timingSafeEqual } from 'node:crypto';

const store = /* @__PURE__ */ new Map();
const WINDOW_MS = 15 * 60 * 1e3;
const MAX_ATTEMPTS = 10;
function checkRateLimit(ip) {
  const now = Date.now();
  const record = store.get(ip);
  if (!record || now - record.windowStart > WINDOW_MS) {
    store.set(ip, { count: 1, windowStart: now });
    return { allowed: true };
  }
  if (record.count >= MAX_ATTEMPTS) {
    const retryAfterSeconds = Math.ceil((record.windowStart + WINDOW_MS - now) / 1e3);
    return { allowed: false, retryAfterSeconds };
  }
  record.count++;
  return { allowed: true };
}
function resetRateLimit(ip) {
  store.delete(ip);
}
function safeCompare(a, b) {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export { checkRateLimit as c, resetRateLimit as r, safeCompare as s };
