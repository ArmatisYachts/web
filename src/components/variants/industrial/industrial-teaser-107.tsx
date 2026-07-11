import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { SectionIntro } from "@/components/sections/section-intro";
import { StatStrip } from "@/components/sections/stat-strip";
import { ARMATIS_107 } from "@/lib/yacht";

// Home teaser for the ARMATIS 107 — key figures + route to the full page.
export function IndustrialTeaser107() {
  const t = useTranslations("homeTeasers.yacht");
  const s = useTranslations("industrial.spec.items");

  return (
    <section className="border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro index={t("index")} label={t("label")} title={t("title")} />
        <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-fg-soft md:text-lg">
          {t("body")}
        </p>

        <div className="mt-12">
          <StatStrip
            items={[
              { value: ARMATIS_107.loa, label: s("loa") },
              { value: ARMATIS_107.beam, label: s("beam") },
              { value: String(ARMATIS_107.guests), label: s("guests") },
              { value: ARMATIS_107.maxSpeed, label: s("speed") },
            ]}
          />
        </div>

        <div className="mt-12">
          <Link
            href="/armatis-107"
            className="armatis-cta inline-block bg-fg px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-surface transition-opacity duration-300 hover:opacity-80"
          >
            {t("cta")}
          </Link>
        </div>
      </div>
    </section>
  );
}
