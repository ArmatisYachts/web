import { useTranslations } from "next-intl";
import { SectionIntro } from "@/components/sections/section-intro";
import { StatStrip } from "@/components/sections/stat-strip";
import { SUSTAINABILITY } from "@/lib/company";

const ITEMS = ["solar", "stability", "platform"] as const;

// "Innovation on board" — the 107's technology story: solar & silent power,
// patented stability monitoring, deployable platform.
export function IndustrialInnovation() {
  const t = useTranslations("yacht107.innovation");

  return (
    <section className="border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro index={t("index")} label={t("label")} title={t("title")} />

        <div className="mt-12">
          <StatStrip
            items={[
              { value: SUSTAINABILITY.solar, label: t("stats.solar") },
              { value: SUSTAINABILITY.generatorReduction, label: t("stats.generator") },
            ]}
          />
        </div>

        <div className="mt-14 grid gap-10 md:grid-cols-2 md:gap-x-16">
          {ITEMS.map((k) => (
            <div key={k} className="border-t border-hairline pt-6">
              <h3 className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
                {t(`items.${k}.label`)}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-fg-mute md:text-[15px]">
                {t(`items.${k}.body`)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
