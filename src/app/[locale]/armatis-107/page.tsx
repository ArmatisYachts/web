import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { CtaBand } from "@/components/sections/cta-band";
import { IndustrialSpecs } from "@/components/variants/industrial/industrial-specs";
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
        title={t("hero.title")}
        kicker={t("hero.kicker")}
        credit={[ti("readout.designedBy"), ARMATIS_107.designer]}
        titleSize="reduced"
        src={RENDERS.heroProfile}
        alt={ARMATIS_107.model}
        readout={[
          [ti("readout.loa"), ARMATIS_107.loa],
          [ti("readout.beam"), ARMATIS_107.beam],
        ]}
      />
      <IndustrialSpecs />
      <IndustrialInnovation />
      {/* The salon and beach-club panoramas now live inside the gallery's
          Interiors rail — showing them twice on one page would read as filler. */}
      <IndustrialGallery />
      <CtaBand line={t("ctaBand.line")} button={t("ctaBand.button")} />
    </main>
  );
}
