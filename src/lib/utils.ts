// URL Validation

export function validateImageUrl(imageUrl: string): URL | null {
  try {
    const url = new URL(imageUrl);
    if (url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
}

// SSRF Protection

export function isBlockedHost(hostname: string): boolean {
  const blockedHosts = ["localhost", "127.0.0.1", "0.0.0.0", "::1"];

  if (blockedHosts.includes(hostname)) return true;

  if (
    hostname.startsWith("10.") ||
    hostname.startsWith("192.168.") ||
    hostname.startsWith("172.16.") ||
    hostname.startsWith("172.17.") ||
    hostname.startsWith("172.18.") ||
    hostname.startsWith("172.19.") ||
    hostname.startsWith("172.2")
  ) {
    return true;
  }

  return false;
}
