import { useTranslations } from "next-intl";
import { SectionIntro } from "@/components/sections/section-intro";
import { PLATFORMS } from "@/lib/company";
import { cn } from "@/lib/utils";

// The platform family as giant numerals — 24 / 30 / 38 — with status captions.
export function PlatformRange() {
  const t = useTranslations("manufacturing.platforms");

  return (
    <section className="border-t border-hairline bg-surface-2 px-6 py-24 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionIntro index={t("index")} label={t("label")} title={t("title")} />

        <div className="mt-16 grid gap-12 md:grid-cols-3 md:gap-8">
          {PLATFORMS.map((p) => (
            <div key={p.key} className="border-t border-hairline pt-8">
              <p className="font-display text-[clamp(4.5rem,9vw,7.5rem)] font-extralight leading-none tracking-tight tabular-nums">
                {p.size}
                <span className="ml-3 align-top font-mono text-[11px] uppercase tracking-[0.2em] text-fg-faint">
                  {t("meters")}
                </span>
              </p>
              <p
                className={cn(
                  "mt-5 font-mono text-[10px] uppercase tracking-[0.2em]",
                  p.status === "production" ? "text-fg" : "text-fg-faint"
                )}
              >
                {p.status === "production"
                  ? t("statusProduction")
                  : t("statusDevelopment")}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
