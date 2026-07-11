import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

// Quiet closing teaser: the brand line as a display quote + route to /company.
export function IndustrialTeaserCompany() {
  const t = useTranslations("homeTeasers.company");

  return (
    <section className="border-t border-hairline bg-surface-2 px-6 py-24 text-center md:px-12 md:py-36">
      <div className="mx-auto max-w-4xl">
        <p className="font-display text-2xl font-extralight leading-[1.25] tracking-tight md:text-4xl">
          {t("quote")}
        </p>
        <div className="mt-10">
          <Link
            href="/company"
            className="font-mono text-[11px] uppercase tracking-[0.2em] text-fg-mute transition-colors duration-300 hover:text-fg"
          >
            {t("cta")} →
          </Link>
        </div>
      </div>
    </section>
  );
}
