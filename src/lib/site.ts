// Single source of truth for the site's routes and canonical origin.
// Nav, sitemap, alternates and active-link matching all derive from here.

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.armatisyachts.com";

export const ROUTES = [
  "/",
  "/armatis-107",
  "/company",
  "/manufacturing",
  "/contact",
] as const;

export type Route = (typeof ROUTES)[number];

// Header navigation (wordmark covers "/"). `key` indexes the `nav` messages namespace.
export const NAV_ITEMS = [
  { href: "/armatis-107", key: "yacht107" },
  { href: "/company", key: "company" },
  { href: "/manufacturing", key: "manufacturing" },
  { href: "/contact", key: "contact" },
] as const satisfies readonly { href: Route; key: string }[];

/** Locale-prefixed path for a route, e.g. ("it", "/company") → "/it/company". */
export function localePath(locale: string, route: Route): string {
  return `/${locale}${route === "/" ? "" : route}`;
}
