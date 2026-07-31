import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/shared/contact-form";

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

  return (
    <main>
      <PageHero
        compact
        label={t("hero.label")}
        title={t("hero.title")}
        kicker={t("hero.kicker")}
      />

      <section className="bg-surface px-6 py-24 md:px-12 md:py-32">
        <div className="mx-auto max-w-3xl">
          <p className="max-w-md text-[13px] leading-relaxed text-fg-mute">
            {tc("intro")}
          </p>
          <div className="mt-8">
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  );
}
