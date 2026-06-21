import { useTranslations } from "next-intl";
import { WavePattern } from "@/components/shared/wave-pattern";

export function IndustrialVision() {
  const t = useTranslations("industrial.vision");
  const b = useTranslations("brand");

  const paragraphs: [string, string][] = [
    ["In-house", b("vision")],
    ["Living spaces", b("spaces")],
    ["Scalable craft", b("production")],
  ];

  return (
    <section
      id="vision"
      className="relative overflow-hidden border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-36"
    >
      <WavePattern variant="auto" className="z-0 opacity-[0.06]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
          <span className="text-fg-faint">{t("index")}</span>
          <span className="h-px w-10 bg-hairline-strong" />
          <span>{t("label")}</span>
        </div>

        <h2 className="mt-10 max-w-4xl font-display text-4xl font-extralight leading-[1.05] tracking-tight md:text-6xl">
          {t("title")}
        </h2>

        <p className="mt-8 max-w-3xl text-lg font-light leading-relaxed text-fg-soft md:text-xl">
          {b("positioning")}
        </p>

        <div className="mt-16 grid gap-10 border-t border-hairline pt-12 md:grid-cols-3 md:gap-12">
          {paragraphs.map(([label, body]) => (
            <div key={label}>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                {label}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-fg-mute md:text-[15px]">
                {body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
