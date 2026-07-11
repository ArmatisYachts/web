import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { SectionIntro } from "@/components/sections/section-intro";
import { NumberedRows } from "@/components/sections/numbered-rows";
import { StatStrip } from "@/components/sections/stat-strip";
import { EditorialSplit } from "@/components/sections/editorial-split";
import { PlatformRange } from "@/components/sections/platform-range";
import { CtaBand } from "@/components/sections/cta-band";
import { IndustrialBand } from "@/components/variants/industrial/industrial-band";
import {
  FACILITIES,
  TECHNOLOGIES,
  PROCESS_INNOVATIONS,
  SUSTAINABILITY,
  INNOVATION_METRICS,
} from "@/lib/company";
import { RENDERS } from "@/lib/yacht";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/manufacturing", "manufacturing");
}

export default async function ManufacturingPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("manufacturing");

  return (
    <main>
      <PageHero
        label={t("hero.label")}
        title={t("hero.title")}
        kicker={t("hero.kicker")}
        src={RENDERS.aerialBW}
        readout={[
          [t("hero.readout.facilities"), "03"],
          [t("hero.readout.platforms"), "24–38 m"],
        ]}
      />

      {/* 01 — three-facility production model */}
      <section className="bg-surface px-6 py-24 md:px-12 md:py-36">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            index={t("facilities.index")}
            label={t("facilities.label")}
            title={t("facilities.title")}
          />
          <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-fg-soft md:text-lg">
            {t("facilities.intro")}
          </p>
          <div className="mt-14">
            <NumberedRows
              items={FACILITIES.map((f) => ({
                index: f.index,
                title: t(`facilities.items.${f.key}.title`),
                body: t(`facilities.items.${f.key}.body`),
                tags: f.tags,
              }))}
            />
          </div>
        </div>
      </section>

      {/* 02 — controlled, phased growth (qualitative) */}
      <section className="border-t border-hairline bg-surface-2 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            index={t("phases.index")}
            label={t("phases.label")}
            title={t("phases.title")}
          />
          <div className="mt-14 grid gap-10 border-t border-hairline pt-12 md:grid-cols-3 md:gap-12">
            {(["one", "two", "three"] as const).map((k) => (
              <div key={k}>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                  {t(`phases.items.${k}.label`)}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-fg-mute md:text-[15px]">
                  {t(`phases.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 — Industry 4.0 capabilities */}
      <section className="border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            index={t("tech.index")}
            label={t("tech.label")}
            title={t("tech.title")}
          />
          <dl className="mt-14 border-y border-hairline">
            {TECHNOLOGIES.map((k, i) => (
              <div
                key={k}
                className={`flex flex-col justify-between gap-2 py-5 md:flex-row md:items-baseline md:gap-6 ${
                  i > 0 ? "border-t border-hairline" : ""
                }`}
              >
                <dt className="font-display text-xl font-light tracking-tight md:text-2xl">
                  {t(`tech.items.${k}.term`)}
                </dt>
                <dd className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute md:text-right">
                  {t(`tech.items.${k}.detail`)}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 04 — process innovation */}
      <section className="border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            index={t("innovation.index")}
            label={t("innovation.label")}
            title={t("innovation.title")}
          />
          <div className="mt-12">
            <StatStrip
              items={[
                {
                  value: INNOVATION_METRICS.interiorInstallReduction,
                  label: t("innovation.stats.interiors"),
                },
                {
                  value: INNOVATION_METRICS.weightReductionTarget,
                  label: t("innovation.stats.weight"),
                },
              ]}
            />
          </div>
          <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16">
            {PROCESS_INNOVATIONS.map((k) => (
              <div key={k} className="border-t border-hairline pt-6">
                <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
                  {t(`innovation.items.${k}.title`)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-fg-mute md:text-[15px]">
                  {t(`innovation.items.${k}.body`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 — sustainable manufacturing */}
      <section className="border-t border-hairline bg-surface-2 px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-6xl">
          <SectionIntro
            index={t("green.index")}
            label={t("green.label")}
            title={t("green.title")}
          />
          <p className="mt-8 max-w-2xl text-base font-light leading-relaxed text-fg-soft md:text-lg">
            {t("green.body")}
          </p>
          <p className="mt-10 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
            {t("green.productLead")}
          </p>
          <div className="mt-4">
            <StatStrip
              items={[
                { value: SUSTAINABILITY.solar, label: t("green.stats.solar") },
                {
                  value: SUSTAINABILITY.generatorReduction,
                  label: t("green.stats.generator"),
                },
              ]}
            />
          </div>
        </div>
      </section>

      <IndustrialBand src={RENDERS.beachPlatform} alt={t("hero.title")} />

      {/* 06 — R&D & university collaboration */}
      <EditorialSplit
        index={t("rnd.index")}
        label={t("rnd.label")}
        title={t("rnd.title")}
        body={t("rnd.body")}
        src={RENDERS.profileGoldenAlt}
        flip
      />

      {/* 07 — platform range */}
      <PlatformRange />

      <CtaBand line={t("ctaBand.line")} button={t("ctaBand.button")} />
    </main>
  );
}
