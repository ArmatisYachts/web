import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { EditorialSplit } from "@/components/sections/editorial-split";
import { CtaBand } from "@/components/sections/cta-band";
import { IndustrialBand } from "@/components/variants/industrial/industrial-band";
import { ARMATIS_107, RENDERS } from "@/lib/yacht";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/company", "company");
}

export default async function CompanyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("company");
  const tf = await getTranslations("industrial.footer");

  return (
    <main>
      <PageHero
        label={t("hero.label")}
        title={t("hero.title")}
        kicker={t("hero.kicker")}
        readout={[
          [tf("hq"), ARMATIS_107.headquarters],
          [tf("yard"), ARMATIS_107.shipyard],
        ]}
      />

      {/* 01 — the company */}
      <EditorialSplit
        index={t("story.index")}
        label={t("story.label")}
        title={t("story.title")}
        body={t("story.body")}
        src={RENDERS.sideStatic}
        alt={ARMATIS_107.model}
      />

      {/* 02 — why Italy */}
      <section className="border-t border-hairline bg-surface-2 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            index={t("whyItaly.index")}
            label={t("whyItaly.label")}
            title={t("whyItaly.title")}
          />
          <div className="mt-14 grid gap-10 border-t border-hairline pt-12 md:grid-cols-3 md:gap-12">
            {(["epicentre", "ecosystem", "madeInItaly"] as const).map((k) => (
              <div key={k}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  {t(`whyItaly.items.${k}.label`)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-fg-mute md:text-[15px]">
                  {t(`whyItaly.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* positioning statement */}
      <section className="border-t border-hairline bg-surface px-6 py-24 text-center md:px-12 md:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-2xl font-extralight leading-[1.25] tracking-tight md:text-4xl">
            {t("positioning")}
          </p>
        </div>
      </section>

      <IndustrialBand src={RENDERS.sterns} alt={ARMATIS_107.model} />

      <CtaBand line={t("ctaBand.line")} button={t("ctaBand.button")} />
    </main>
  );
}
