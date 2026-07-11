import { useTranslations } from "next-intl";
import { RevealImage } from "@/components/shared/reveal-image";
import { GalleryRail } from "@/components/sections/gallery-rail";
import { RENDERS, renderRatio } from "@/lib/yacht";
import { cn } from "@/lib/utils";

// Gallery — two statement frames, then a swipeable Interiors card and a
// swipeable Exteriors card, each followed by its own editorial note.
const STATEMENTS = [
  { src: RENDERS.profileGolden, captionKey: "profile", span: "md:col-span-7" },
  { src: RENDERS.sterns, captionKey: "stern", span: "md:col-span-5" },
];

const INTERIORS = [
  { src: RENDERS.interiorSalon, captionKey: "salon" },
  { src: RENDERS.interiorMaster, captionKey: "master" },
  { src: RENDERS.interiorGuest, captionKey: "guest" },
  { src: RENDERS.interiorBeachClub, captionKey: "club" },
];

const EXTERIORS = [
  { src: RENDERS.aerial, captionKey: "aerial" },
  { src: RENDERS.beachPlatform, captionKey: "terrace" },
  { src: RENDERS.foredeckSpa, captionKey: "foredeck" },
  { src: RENDERS.sideStatic, captionKey: "underway" },
];

export function IndustrialGallery() {
  const t = useTranslations("industrial.gallery");

  const rail = (items: readonly { src: string; captionKey: string }[]) =>
    items.map((item) => ({
      src: item.src,
      caption: t(`captions.${item.captionKey}`),
    }));

  const note = (key: "interiors" | "exteriors") => (
    <div className="mt-12 grid gap-6 md:grid-cols-12 md:gap-8">
      <h3 className="font-display text-2xl font-extralight leading-tight tracking-tight md:col-span-5 md:text-3xl">
        {t(`${key}.title`)}
      </h3>
      <p className="leading-relaxed text-fg-soft md:col-span-6 md:col-start-7">
        {t(`${key}.body`)}
      </p>
    </div>
  );

  return (
    <section
      id="gallery"
      className="border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
          <span className="text-fg-faint">{t("index")}</span>
          <span className="h-px w-10 bg-hairline-strong" />
          <span>{t("label")}</span>
        </div>

        {/* the two statement frames — bottoms align exactly; the stagger comes
            from their different heights, not from a hardcoded offset */}
        <div className="mt-14 grid grid-cols-1 items-end gap-10 md:grid-cols-12 md:gap-8">
          {STATEMENTS.map((item) => {
            const caption = t(`captions.${item.captionKey}`);
            return (
              <figure key={item.src} className={cn(item.span)}>
                <div
                  className="relative overflow-hidden border border-hairline"
                  style={{ aspectRatio: renderRatio(item.src) }}
                >
                  <RevealImage
                    src={item.src}
                    alt={caption}
                    fill
                    sizes="(max-width: 768px) 100vw, 660px"
                  />
                </div>
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute">
                  {caption}
                </figcaption>
              </figure>
            );
          })}
        </div>

        {/* interiors */}
        <div className="mt-28 md:mt-40">
          <GalleryRail
            label={t("interiors.label")}
            items={rail(INTERIORS)}
            prevLabel={t("prev")}
            nextLabel={t("next")}
          />
          {note("interiors")}
        </div>

        {/* exteriors */}
        <div className="mt-28 md:mt-40">
          <GalleryRail
            label={t("exteriors.label")}
            items={rail(EXTERIORS)}
            prevLabel={t("prev")}
            nextLabel={t("next")}
          />
          {note("exteriors")}
        </div>
      </div>
    </section>
  );
}
