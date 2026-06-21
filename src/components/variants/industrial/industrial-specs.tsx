import { useTranslations } from "next-intl";
import { RevealImage } from "@/components/shared/reveal-image";
import { ContactTrigger } from "@/components/shared/contact-trigger";
import { ARMATIS_107, RENDERS } from "@/lib/yacht";

export function IndustrialSpecs() {
  const t = useTranslations("industrial.spec");

  const rows: [string, string][] = [
    [t("items.loa"), ARMATIS_107.loa],
    [t("items.beam"), ARMATIS_107.beam],
    [t("items.draught"), ARMATIS_107.draught],
    [t("items.guests"), String(ARMATIS_107.guests)],
    [t("items.crew"), String(ARMATIS_107.crew)],
    [t("items.engines"), ARMATIS_107.engines],
    [t("items.speed"), ARMATIS_107.maxSpeed],
    [t("items.fuel"), ARMATIS_107.fuel],
    [t("items.built"), t("items.builtValue")],
  ];

  return (
    <section
      id="specs"
      className="border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
          <span className="text-fg-faint">{t("index")}</span>
          <span className="h-px w-10 bg-hairline-strong" />
          <span>{t("label")}</span>
        </div>

        <div className="mt-12 grid gap-12 md:grid-cols-2 md:gap-16">
          <div className="flex flex-col gap-12 md:gap-16">
            <div className="relative aspect-[4/3] overflow-hidden border border-hairline">
              <RevealImage
                src={RENDERS.bowOn}
                alt={ARMATIS_107.model}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
            <ContactTrigger variant="outline" className="self-start">
              {t("requestInfo")}
            </ContactTrigger>
          </div>

          <dl className="grid grid-cols-1 border-y border-hairline">
            {rows.map(([label, value], i) => (
              <div
                key={label}
                className={`flex items-baseline justify-between gap-6 py-4 ${
                  i > 0 ? "border-t border-hairline" : ""
                }`}
              >
                <dt className="font-mono text-[11px] uppercase tracking-[0.16em] text-fg-mute">
                  {label}
                </dt>
                <dd className="font-display text-xl font-light tabular-nums md:text-2xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
