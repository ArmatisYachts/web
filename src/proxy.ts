import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const handleI18nRouting = createMiddleware(routing);

// Locale routing (next-intl). `proxy` is Next 16's renamed middleware convention.
// The accept-language header is stripped so the site always opens in English
// regardless of browser/location, while a manually chosen locale is still
// remembered via the NEXT_LOCALE cookie.
export function proxy(request: NextRequest) {
  request.headers.delete("accept-language");
  return handleI18nRouting(request);
}

export const config = {
  matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
};
