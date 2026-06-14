import { useTranslations } from "next-intl";
import { ArmatisWordmark } from "@/components/shared/armatis-wordmark";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { WavePattern } from "@/components/shared/wave-pattern";
import { ARMATIS_107 } from "@/lib/yacht";

export function IndustrialFooter() {
  const t = useTranslations("industrial.footer");
  const b = useTranslations("brand");

  const cols: [string, string][] = [
    [t("hq"), ARMATIS_107.headquarters],
    [t("yard"), ARMATIS_107.shipyard],
    [t("web"), ARMATIS_107.web],
  ];

  return (
    <footer className="relative overflow-hidden bg-[#0a0a0a] px-6 py-20 text-bone md:px-12 md:py-28">
      <WavePattern variant="light" className="z-0 opacity-[0.06]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <ArmatisWordmark variant="light" height={26} />

        <p className="mt-8 max-w-2xl font-display text-xl font-light leading-relaxed text-bone/80 md:text-2xl">
          {b("closing")}
        </p>

        <div className="mt-14 grid gap-10 border-t border-white/15 pt-10 md:grid-cols-[1fr_auto] md:items-end">
          <dl className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {cols.map(([label, value]) => (
              <div key={label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-bone/45">
                  {label}
                </dt>
                <dd className="mt-2 font-mono text-[12px] uppercase tracking-[0.12em] text-bone/85">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          <LanguageSwitcher />
        </div>

        <p className="mt-14 font-mono text-[10px] uppercase tracking-[0.2em] text-bone/40">
          © {new Date().getFullYear()} {ARMATIS_107.brand} S.R.L · {t("rights")}
        </p>
      </div>
    </footer>
  );
}
