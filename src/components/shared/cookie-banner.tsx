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
        "fixed bottom-5 left-5 z-[90] w-[min(92vw,22rem)] overflow-hidden border shadow-2xl transition-colors duration-500",
        light ? "border-black/15 bg-bone text-ink" : "border-white/15 bg-[#0a0a0a] text-bone"
      )}
    >
      <WavePattern variant={light ? "dark" : "light"} className="z-0 opacity-[0.06]" size={300} />
      <div className="relative z-10 p-5">
        <ArmatisWordmark variant={light ? "dark" : "light"} height={13} />
        <p className="mt-3 text-[12px] leading-relaxed opacity-80">{t("body")}</p>
        <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-3">
          <button
            type="button"
            onClick={accept}
            className={cn(
              "armatis-cta px-6 py-2.5 font-mono text-[10px] font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-80",
              light ? "bg-ink text-bone" : "bg-bone text-ink"
            )}
          >
            {t("accept")}
          </button>
          <button
            type="button"
            onClick={openPrivacy}
            className="font-mono text-[10px] uppercase tracking-[0.18em] opacity-70 transition-opacity hover:opacity-100"
          >
            {t("privacy")}
          </button>
        </div>
      </div>
    </div>
  );
}
