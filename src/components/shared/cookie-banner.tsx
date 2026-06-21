"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { WavePattern } from "@/components/shared/wave-pattern";
import { ArmatisWordmark } from "@/components/shared/armatis-wordmark";
import { openPrivacy } from "@/components/shared/privacy-dialog";
import { cn } from "@/lib/utils";

const KEY = "armatis-cookie-consent";

export function CookieBanner() {
  const t = useTranslations("cookies");
  const [show, setShow] = useState(false);
  const [overDark, setOverDark] = useState(true); // first paint sits over the dark hero
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(KEY)) setShow(true);
    } catch {
      setShow(true);
    }
  }, []);

  // Take the OPPOSITE colour of whatever is behind the banner as the user scrolls.
  useEffect(() => {
    if (!show) return;
    let raf = 0;
    const update = () => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const y = r.top + r.height / 2;
      let dark = false;
      document.querySelectorAll("[data-armatis-dark]").forEach((d) => {
        const dr = (d as HTMLElement).getBoundingClientRect();
        if (y >= dr.top && y <= dr.bottom) dark = true;
      });
      setOverDark(dark);
    };
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [show]);

  function accept() {
    try {
      localStorage.setItem(KEY, "accepted");
    } catch {}
    setShow(false);
  }

  if (!show) return null;

  const light = overDark; // banner is light when the background behind it is dark

  return (
    <div
      ref={ref}
      role="region"
      aria-label={t("title")}
      className={cn(
        "fixed inset-x-0 bottom-0 z-[90] overflow-hidden border-t shadow-2xl transition-colors duration-500",
        light ? "border-black/15 bg-bone text-ink" : "border-white/15 bg-[#0a0a0a] text-bone"
      )}
    >
      <WavePattern variant={light ? "dark" : "light"} className="z-0 opacity-[0.06]" size={320} />
      <div className="relative z-10 mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:gap-8 md:px-10">
        <div className="flex items-center gap-5">
          <ArmatisWordmark variant={light ? "dark" : "light"} height={14} className="hidden shrink-0 sm:block" />
          <p className="max-w-3xl text-[12px] leading-relaxed opacity-80">{t("body")}</p>
        </div>
        <div className="flex shrink-0 items-center gap-6">
          <button
            type="button"
            onClick={openPrivacy}
            className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100"
          >
            {t("privacy")}
          </button>
          <button
            type="button"
            onClick={accept}
            className={cn(
              "armatis-cta px-7 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-80",
              light ? "bg-ink text-bone" : "bg-bone text-ink"
            )}
          >
            {t("accept")}
          </button>
        </div>
      </div>
    </div>
  );
}
