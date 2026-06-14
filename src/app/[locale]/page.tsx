import { setRequestLocale, getTranslations } from "next-intl/server";
import { IndustrialHero } from "@/components/variants/industrial/industrial-hero";
import { IndustrialVision } from "@/components/variants/industrial/industrial-vision";
import { IndustrialBand } from "@/components/variants/industrial/industrial-band";
import { IndustrialSpecs } from "@/components/variants/industrial/industrial-specs";
import { IndustrialFeature } from "@/components/variants/industrial/industrial-feature";
import { IndustrialGallery } from "@/components/variants/industrial/industrial-gallery";
import { IndustrialFooter } from "@/components/variants/industrial/industrial-footer";
import { ARMATIS_107, RENDERS } from "@/lib/yacht";

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
      <IndustrialSpecs />
      <IndustrialFeature
        src={RENDERS.interiorSalon}
        label={t("salon.label")}
        caption={t("salon.caption")}
        ratio="6528 / 2624"
      />
      <IndustrialGallery />
      <IndustrialFeature
        src={RENDERS.interiorBeachClub}
        label={t("beachclub.label")}
        caption={t("beachclub.caption")}
        ratio="6336 / 2688"
      />
      <IndustrialFooter />
    </main>
  );
}
