import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it"],
  defaultLocale: "en",
  // Detection stays ON so a manually chosen locale (NEXT_LOCALE cookie set by
  // the language switcher) is remembered on return visits. The browser's
  // accept-language header is stripped in src/proxy.ts, so the site still
  // always opens in English for first-time visitors regardless of location.
  localeDetection: true,
});

export type Locale = (typeof routing.locales)[number];
