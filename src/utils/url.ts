const BASE = (import.meta.env.BASE_URL ?? '/').replace(/\/+$/, '');

/**
 * Prefix an internal path with Astro's configured `base` so the site works
 * whether it is served from the root or from e.g. `/swrswr-portfolio/`
 * (GitHub project pages).
 *
 * Accepts absolute in-site paths ("/", "/cases/foo/", "#services") and
 * leaves external URLs and `mailto:` alone.
 */
export function withBase(href: string): string {
  if (!href) return href;
  if (/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i.test(href)) return href;
  if (href.startsWith('#')) return href;
  const path = href.startsWith('/') ? href : `/${href}`;
  return `${BASE}${path}`;
}
