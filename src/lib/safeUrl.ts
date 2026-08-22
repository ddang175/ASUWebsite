export function isSafeHttpsUrl(url: string | null | undefined): boolean {
  if (!url) return false;
  try {
    return new URL(url).protocol === 'https:';
  } catch {
    return false;
  }
}

export function sanitizeHref(url: string | null | undefined): string | null {
  if (!url) return null;
  if (url.startsWith('/')) return url;
  return isSafeHttpsUrl(url) ? url : null;
}
