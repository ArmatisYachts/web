import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionIntro } from "@/components/sections/section-intro";
import { WavePattern } from "@/components/shared/wave-pattern";
import { FACILITIES } from "@/lib/company";

// Home teaser for the production platform — the three facilities in the
// vision section's 3-column rhythm + route to /manufacturing.
export function IndustrialTeaserManufacturing() {
  const t = useTranslations("homeTeasers.manufacturing");

  return (
    <section className="relative overflow-hidden border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-36">
      <WavePattern variant="auto" className="z-0 opacity-[0.05]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <SectionIntro index={t("index")} label={t("label")} title={t("title")} />

        <div className="mt-14 grid gap-10 border-t border-hairline pt-12 md:grid-cols-3 md:gap-12">
          {FACILITIES.map((f) => (
            <div key={f.key}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                {f.index}
              </p>
              <h3 className="mt-3 font-display text-xl font-light tracking-tight">
                {t(`facilities.${f.key}.title`)}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-fg-mute">
                {t(`facilities.${f.key}.blurb`)}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-12">
          <Link
            href="/manufacturing"
            className="armatis-cta inline-block bg-fg px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-surface transition-opacity duration-300 hover:opacity-80"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
