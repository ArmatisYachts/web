import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { IndustrialSpecs } from "@/components/variants/industrial/industrial-specs";
import { IndustrialFeature } from "@/components/variants/industrial/industrial-feature";
import { IndustrialGallery } from "@/components/variants/industrial/industrial-gallery";
import { IndustrialInnovation } from "@/components/variants/industrial/industrial-innovation";
import { ARMATIS_107, RENDERS } from "@/lib/yacht";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/armatis-107", "yacht107");
}

export default async function Yacht107Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("yacht107");
  const ti = await getTranslations("industrial");

  return (
    <main>
      <PageHero
        label={t("hero.label")}
        title={t("hero.title")}
        kicker={t("hero.kicker")}
        src={RENDERS.heroProfile}
        alt={ARMATIS_107.model}
        readout={[
          [ti("readout.loa"), ARMATIS_107.loa],
          [ti("readout.beam"), ARMATIS_107.beam],
        ]}
      />
      <IndustrialSpecs />
      <IndustrialFeature
        src={RENDERS.interiorSalon}
        label={ti("salon.label")}
        caption={ti("salon.caption")}
        ratio="6528 / 2624"
      />
      <IndustrialInnovation />
      <IndustrialGallery />
      <IndustrialFeature
        src={RENDERS.interiorBeachClub}
        label={ti("beachclub.label")}
        caption={ti("beachclub.caption")}
        ratio="6336 / 2688"
      />
      <CtaBand line={t("ctaBand.line")} button={t("ctaBand.button")} />
    </main>
  );
}
