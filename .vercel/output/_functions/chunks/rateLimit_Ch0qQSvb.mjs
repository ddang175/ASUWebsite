import { timingSafeEqual } from "node:crypto";
//#region src/lib/rateLimit.ts
var store = /* @__PURE__ */ new Map();
var WINDOW_MS = 9e5;
var MAX_ATTEMPTS = 10;
function checkRateLimit(ip) {
	const now = Date.now();
	const record = store.get(ip);
	if (!record || now - record.windowStart > WINDOW_MS) {
		store.set(ip, {
			count: 1,
			windowStart: now
		});
		return { allowed: true };
	}
	if (record.count >= MAX_ATTEMPTS) return {
		allowed: false,
		retryAfterSeconds: Math.ceil((record.windowStart + WINDOW_MS - now) / 1e3)
	};
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
//#endregion
export { resetRateLimit as n, safeCompare as r, checkRateLimit as t };
