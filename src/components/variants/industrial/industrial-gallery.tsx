import { useTranslations } from "next-intl";
import { GalleryRail } from "@/components/sections/gallery-rail";
import { HQ_GALLERY } from "@/lib/yacht";

type GalleryCategory = "exteriors" | "interiors";

export function IndustrialGallery() {
  const t = useTranslations("industrial.gallery");

  const rail = (
    items: readonly {
      desktop: string;
      mobile: string;
      captionKey: string;
    }[]
  ) =>
    items.map((item) => ({
      desktopSrc: item.desktop,
      mobileSrc: item.mobile,
      caption: t(`captions.${item.captionKey}`),
    }));

  const introduction = (category: GalleryCategory, index: string) => (
    <div className="bg-surface px-6 py-20 md:px-12 md:py-28">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-12 md:items-end">
        <div className="md:col-span-5">
          <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-fg-mute">
            <span className="text-fg-faint">{index}</span>
            <span className="h-px w-10 bg-hairline-strong" />
            <span>{t(`${category}.label`)}</span>
          </div>
          <h2 className="mt-7 font-display text-4xl font-extralight leading-[0.98] tracking-tight text-fg md:text-6xl">
            {t(`${category}.title`)}
          </h2>
        </div>
        <p className="max-w-2xl leading-relaxed text-fg-soft md:col-span-6 md:col-start-7">
          {t(`${category}.body`)}
        </p>
      </div>
    </div>
  );

  return (
    <section id="gallery" className="border-t border-hairline bg-surface">
      {introduction("exteriors", "03.1")}
      <GalleryRail
        label={t("exteriors.label")}
        items={rail(HQ_GALLERY.exteriors)}
        prevLabel={t("prev")}
        nextLabel={t("next")}
      />

      {introduction("interiors", "03.2")}
      <GalleryRail
        label={t("interiors.label")}
        items={rail(HQ_GALLERY.interiors)}
        prevLabel={t("prev")}
        nextLabel={t("next")}
      />
    </section>
  );
}
