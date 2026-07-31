import { useTranslations } from "next-intl";
import { GalleryRail } from "@/components/sections/gallery-rail";
import { RENDERS } from "@/lib/yacht";

type GalleryCategory = "exteriors" | "interiors";

const EXTERIORS = [
  { src: RENDERS.profileGolden, captionKey: "profile" },
  { src: RENDERS.beachPlatform, captionKey: "terrace" },
  { src: RENDERS.aerial, captionKey: "aerial" },
  { src: RENDERS.sterns, captionKey: "stern" },
  { src: RENDERS.profileGoldenAlt, captionKey: "profile" },
  { src: RENDERS.foredeckSpa, captionKey: "foredeck" },
  { src: RENDERS.bowOn, captionKey: "foredeck" },
  { src: RENDERS.sideStatic, captionKey: "underway" },
] as const;

const INTERIORS = [
  { src: RENDERS.interiorSalon, captionKey: "salon" },
  { src: RENDERS.interiorMaster, captionKey: "master" },
  { src: RENDERS.interiorGuest, captionKey: "guest" },
  { src: RENDERS.interiorBeachClub, captionKey: "club" },
] as const;

export function IndustrialGallery() {
  const t = useTranslations("industrial.gallery");

  const rail = (
    items: readonly {
      src: string;
      captionKey: string;
      position?: string;
    }[]
  ) =>
    items.map((item) => ({
      src: item.src,
      caption: t(`captions.${item.captionKey}`),
      position: item.position,
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
        items={rail(EXTERIORS)}
        prevLabel={t("prev")}
        nextLabel={t("next")}
      />

      {introduction("interiors", "03.2")}
      <GalleryRail
        label={t("interiors.label")}
        items={rail(INTERIORS)}
        prevLabel={t("prev")}
        nextLabel={t("next")}
      />
    </section>
  );
}
