import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["en", "it"],
  defaultLocale: "en",
  // Always open in English regardless of browser/location. A user's manual
  // language choice is remembered via the NEXT_LOCALE cookie (set by the
  // switcher), so returning visitors who picked Italian get Italian.
  localeDetection: false,
});

export type Locale = (typeof routing.locales)[number];
