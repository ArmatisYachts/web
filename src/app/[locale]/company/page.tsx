import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
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
        src={RENDERS.sideStatic}
        alt={ARMATIS_107.model}
        readout={[[tf("yard"), ARMATIS_107.shipyard]]}
      />

      {/* 01 — the company */}
      <EditorialSplit
        index={t("story.index")}
        label={t("story.label")}
        title={t("story.title")}
        body={t("story.body")}
        src={RENDERS.sterns}
        alt={ARMATIS_107.model}
      />

      {/* positioning statement */}
      <section className="border-t border-hairline bg-surface px-6 py-24 text-center md:px-12 md:py-36">
        <div className="mx-auto max-w-4xl">
          <p className="font-display text-2xl font-extralight leading-[1.25] tracking-tight md:text-4xl">
            {t("positioning")}
          </p>
        </div>
      </section>

      <IndustrialBand src={RENDERS.beachPlatform} alt={ARMATIS_107.model} />

      <CtaBand line={t("ctaBand.line")} button={t("ctaBand.button")} />
    </main>
  );
}
