import { useTranslations } from "next-intl";
import { RevealImage } from "@/components/shared/reveal-image";
import { RENDERS } from "@/lib/yacht";

export function IndustrialGallery() {
  const t = useTranslations("industrial.gallery");

  const items: [string, string][] = [
    [RENDERS.sterns, t("captions.stern")],
    [RENDERS.beachPlatform, t("captions.terrace")],
    [RENDERS.profileGolden, t("captions.profile")],
    [RENDERS.foredeckSpa, t("captions.foredeck")],
    [RENDERS.heroProfile, t("captions.underway")],
    [RENDERS.interiorMaster, t("captions.master")],
    [RENDERS.interiorGuest, t("captions.guest")],
  ];

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

        <div className="mt-12 space-y-6 md:space-y-10">
          {items.map(([src, caption], i) => (
            <figure key={src}>
              <div className="relative aspect-[16/9] overflow-hidden border border-hairline">
                <RevealImage
                  src={src}
                  alt={caption}
                  fill
                  sizes="(max-width: 768px) 100vw, 1152px"
                />
              </div>
              <figcaption className="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute">
                <span>{caption}</span>
                <span className="text-fg-faint">{String(i + 1).padStart(2, "0")}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
