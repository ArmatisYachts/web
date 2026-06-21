"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { WavePattern } from "@/components/shared/wave-pattern";
import { ArmatisWordmark } from "@/components/shared/armatis-wordmark";

export function openPrivacy() {
  window.dispatchEvent(new CustomEvent("armatis:privacy"));
}

const SECTIONS = [
  "controller",
  "collect",
  "purpose",
  "processing",
  "retention",
  "rights",
  "contact",
] as const;

export function PrivacyDialog() {
  const t = useTranslations("privacy");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener("armatis:privacy", onOpen);
    return () => window.removeEventListener("armatis:privacy", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    const sbw = window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    if (sbw > 0) document.body.style.paddingRight = `${sbw}px`;
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      document.body.style.paddingRight = prevPad;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t("title")}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label={t("close")}
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/55 backdrop-blur-[2px]"
      />

      <div className="relative z-10 max-h-[92svh] w-full max-w-2xl overflow-y-auto overflow-x-hidden border border-hairline bg-surface text-fg shadow-2xl">
        <WavePattern variant="auto" className="z-0 opacity-[0.05]" size={360} />

        <div className="relative z-10 p-6 md:p-9">
          <div className="flex items-start justify-between">
            <ArmatisWordmark variant="auto" height={16} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="-m-2 p-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute transition-opacity hover:opacity-60"
            >
              ✕
            </button>
          </div>

          <h2 className="mt-6 font-display text-2xl font-extralight tracking-tight md:text-3xl">
            {t("title")}
          </h2>
          <p className="mt-2 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-faint">
            {t("updated")}
          </p>

          <div className="mt-8 space-y-7">
            {SECTIONS.map((s, i) => (
              <section key={s}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.22em] text-fg">
                  {String(i + 1).padStart(2, "0")} — {t(`${s}.head`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-fg-mute">
                  {t(`${s}.body`)}
                </p>
              </section>
            ))}
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            className="armatis-cta mt-10 inline-block bg-fg px-7 py-3 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-surface transition-opacity hover:opacity-80"
          >
            {t("close")}
          </button>
        </div>
      </div>
    </div>
  );
}
