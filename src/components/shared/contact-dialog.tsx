"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { WavePattern } from "@/components/shared/wave-pattern";
import { ArmatisWordmark } from "@/components/shared/armatis-wordmark";
import { ContactForm } from "@/components/shared/contact-form";

// Modal shell around the shared ContactForm. Opens via the global
// "armatis:contact" event (see ContactTrigger).
export function ContactDialog() {
  const t = useTranslations("contact");
  const [open, setOpen] = useState(false);
  // remount the form on every open so a previous submission resets
  const [session, setSession] = useState(0);

  useEffect(() => {
    const onOpen = () => {
      setSession((s) => s + 1);
      setOpen(true);
    };
    window.addEventListener("armatis:contact", onOpen);
    return () => window.removeEventListener("armatis:contact", onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    const prevPad = document.body.style.paddingRight;
    // compensate for the removed scrollbar so the page doesn't shift
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
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label={t("close")}
        onClick={() => setOpen(false)}
        className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
      />

      <div className="relative z-10 max-h-[94svh] w-full max-w-xl overflow-y-auto overflow-x-hidden border border-hairline bg-surface text-fg shadow-2xl">
        <WavePattern variant="auto" className="z-0 opacity-[0.05]" size={360} />

        <div className="relative z-10 p-6 md:p-8">
          <div className="flex items-start justify-between">
            <ArmatisWordmark variant="auto" height={20} />
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={t("close")}
              className="-m-2 p-2 font-mono text-[11px] uppercase tracking-[0.18em] text-fg-mute transition-opacity hover:opacity-60"
            >
              ✕
            </button>
          </div>

          <h2 className="mt-5 font-display text-xl font-extralight tracking-tight md:text-2xl">
            {t("title")}
          </h2>
          <p className="mt-1.5 max-w-md text-[13px] leading-relaxed text-fg-mute">
            {t("intro")}
          </p>

          <div className="mt-5">
            <ContactForm key={session} />
          </div>
        </div>
      </div>
    </div>
  );
}
