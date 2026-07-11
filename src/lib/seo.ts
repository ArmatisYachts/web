import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { localePath, type Route } from "./site";

// Shared per-page metadata builder: localized title/description from
// `meta.pages.<page>` plus canonical + hreflang alternates (resolved against
// the layout's metadataBase). The home page keeps its absolute brand title.
export async function pageMetadata(
  locale: string,
  route: Route,
  page: "home" | "yacht107" | "company" | "manufacturing" | "contact"
): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.pages.${page}` });
  return {
    title: route === "/" ? { absolute: t("title") } : t("title"),
    description: t("description"),
    alternates: {
      canonical: localePath(locale, route),
      languages: {
        en: localePath("en", route),
        it: localePath("it", route),
        "x-default": localePath("en", route),
      },
    },
  };
}
