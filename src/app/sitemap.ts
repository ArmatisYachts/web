import type { MetadataRoute } from "next";
import { ROUTES, SITE_URL, localePath } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map((route) => {
    const en = `${SITE_URL}${localePath("en", route)}`;
    const it = `${SITE_URL}${localePath("it", route)}`;
    return {
      url: en,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: route === "/" ? 1 : 0.8,
      alternates: {
        languages: { en, it, "x-default": en },
      },
    };
  });
}
