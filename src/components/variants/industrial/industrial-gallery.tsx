import { useTranslations } from "next-intl";
import { RevealImage } from "@/components/shared/reveal-image";
import { RENDERS } from "@/lib/yacht";
import { cn } from "@/lib/utils";

// Editorial gallery — an asymmetric, staggered composition (wide/portrait
// pairings, offset columns, one cinematic full-bleed row) instead of a
// uniform stack. Reveal-on-scroll colourising as everywhere else.
const LAYOUT: {
  src: string;
  captionKey: string;
  span: string;
  ratio: string;
  offset?: string;
  sizes: string;
}[] = [
  {
    src: RENDERS.sterns,
    captionKey: "stern",
    span: "md:col-span-7",
    ratio: "aspect-[4/3]",
    sizes: "(max-width: 768px) 100vw, 60vw",
  },
  {
    src: RENDERS.beachPlatform,
    captionKey: "terrace",
    span: "md:col-span-5",
    ratio: "aspect-[3/4]",
    offset: "md:mt-24",
    sizes: "(max-width: 768px) 100vw, 40vw",
  },
  {
    src: RENDERS.profileGolden,
    captionKey: "profile",
    span: "md:col-span-12",
    ratio: "aspect-[16/9] md:aspect-[21/9]",
    sizes: "100vw",
  },
  {
    src: RENDERS.interiorMaster,
    captionKey: "master",
    span: "md:col-span-5",
    ratio: "aspect-[3/4]",
    sizes: "(max-width: 768px) 100vw, 40vw",
  },
  {
    src: RENDERS.foredeckSpa,
    captionKey: "foredeck",
    span: "md:col-span-7",
    ratio: "aspect-[4/3]",
    offset: "md:mt-24",
    sizes: "(max-width: 768px) 100vw, 60vw",
  },
  {
    src: RENDERS.heroProfile,
    captionKey: "underway",
    span: "md:col-span-7",
    ratio: "aspect-[4/3]",
    sizes: "(max-width: 768px) 100vw, 60vw",
  },
  {
    src: RENDERS.interiorGuest,
    captionKey: "guest",
    span: "md:col-span-5",
    ratio: "aspect-[3/4]",
    offset: "md:mt-24",
    sizes: "(max-width: 768px) 100vw, 40vw",
  },
];

export function IndustrialGallery() {
  const t = useTranslations("industrial.gallery");

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

        <div className="mt-14 grid grid-cols-1 items-start gap-10 md:grid-cols-12 md:gap-x-8 md:gap-y-24">
          {LAYOUT.map((item) => {
            const caption = t(`captions.${item.captionKey}`);
            return (
              <figure key={item.captionKey} className={cn(item.span, item.offset)}>
                <div
                  className={cn(
                    "relative overflow-hidden border border-hairline",
                    item.ratio
                  )}
                >
                  <RevealImage src={item.src} alt={caption} fill sizes={item.sizes} />
                </div>
                <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute">
                  {caption}
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
