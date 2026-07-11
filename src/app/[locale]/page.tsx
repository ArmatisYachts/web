import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { IndustrialHero } from "@/components/variants/industrial/industrial-hero";
import { IndustrialVision } from "@/components/variants/industrial/industrial-vision";
import { IndustrialBand } from "@/components/variants/industrial/industrial-band";
import { IndustrialFeature } from "@/components/variants/industrial/industrial-feature";
import { IndustrialTeaser107 } from "@/components/variants/industrial/industrial-teaser-107";
import { IndustrialTeaserManufacturing } from "@/components/variants/industrial/industrial-teaser-manufacturing";
import { IndustrialTeaserCompany } from "@/components/variants/industrial/industrial-teaser-company";
import { ARMATIS_107, RENDERS } from "@/lib/yacht";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/", "home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("industrial");

  return (
    <main>
      <IndustrialHero />
      <IndustrialVision />
      <IndustrialBand src={RENDERS.aerial} alt={ARMATIS_107.model} />
      <IndustrialTeaser107 />
      <IndustrialFeature
        src={RENDERS.interiorSalon}
        label={t("salon.label")}
        caption={t("salon.caption")}
        ratio="6528 / 2624"
      />
      <IndustrialTeaserManufacturing />
      <IndustrialTeaserCompany />
    </main>
  );
}
