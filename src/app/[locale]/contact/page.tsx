import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/shared/contact-form";
import { ARMATIS_107 } from "@/lib/yacht";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return pageMetadata(locale, "/contact", "contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");
  const tc = await getTranslations("contact");
  const tf = await getTranslations("industrial.footer");

  const details: [string, string, string?][] = [
    [tf("yard"), ARMATIS_107.shipyard],
    [t("emailLabel"), ARMATIS_107.email, `mailto:${ARMATIS_107.email}`],
    [tf("linkedin"), "linkedin.com/company/armatis-yachts", ARMATIS_107.linkedin],
    [tf("vat"), ARMATIS_107.vat],
  ];

  return (
    <main>
      <PageHero
        compact
        label={t("hero.label")}
        title={t("hero.title")}
        kicker={t("hero.kicker")}
      />

      <section className="bg-surface px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto grid max-w-6xl gap-16 md:grid-cols-[1.2fr_1fr] md:gap-24">
          <div>
            <p className="max-w-md text-[13px] leading-relaxed text-fg-mute">
              {tc("intro")}
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </div>

          <aside>
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
              {t("detailsLabel")}
            </p>
            <dl className="mt-8 space-y-7">
              {details.map(([label, value, href]) => (
                <div key={label}>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
                    {label}
                  </dt>
                  <dd className="mt-2 font-display text-lg font-light tracking-tight">
                    {href ? (
                      <a
                        href={href}
                        target={href.startsWith("http") ? "_blank" : undefined}
                        rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                        className="transition-opacity duration-300 hover:opacity-60"
                      >
                        {value}
                      </a>
                    ) : (
                      value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </aside>
        </div>
      </section>
    </main>
  );
}
