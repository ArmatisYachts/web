"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { NAV_ITEMS } from "@/lib/site";
import { ARMATIS_107 } from "@/lib/yacht";
import { ArmatisWordmark } from "@/components/shared/armatis-wordmark";
import { LanguageSwitcher } from "@/components/shared/language-switcher";
import { WavePattern } from "@/components/shared/wave-pattern";
import { useOverDark } from "@/components/shared/use-over-dark";
import { cn } from "@/lib/utils";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export function SiteHeader() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const ref = useRef<HTMLElement>(null);
  // Transparent over dark sections (heros, CTA bands, footer); solid over light content.
  const overDark = useOverDark(ref);
  const [open, setOpen] = useState(false);

  // close the menu on navigation
  useEffect(() => setOpen(false), [pathname]);

  // Escape to close + body scroll lock (scrollbar-width compensated)
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

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <>
      <header
        ref={ref}
        className={cn(
          "fixed inset-x-0 top-0 z-[80] transition-colors duration-500",
          overDark
            ? "bg-transparent text-bone"
            : "border-b border-hairline bg-surface/90 text-fg backdrop-blur-md"
        )}
      >
        <div className="flex h-16 items-center justify-between px-6 md:px-10">
          <Link
            href="/"
            aria-label="ARMATIS"
            className="transition-opacity duration-300 hover:opacity-60"
          >
            <ArmatisWordmark
              variant={overDark ? "light" : "dark"}
              height={15}
              priority
            />
          </Link>

          <div className="flex items-center gap-6 md:gap-8">
            <LanguageSwitcher className="hidden md:flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className="group -m-2 flex items-center gap-3 p-2"
            >
              <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] md:inline">
                {t("menu")}
              </span>
              <span className="flex w-6 flex-col gap-1.5">
                <span className="block h-px w-6 bg-current transition-all duration-300 group-hover:w-4" />
                <span className="block h-px w-6 bg-current" />
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* full-screen menu — cinematic dark, all viewports */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className="fixed inset-0 z-[95] overflow-y-auto bg-[#0a0a0a] text-bone"
        >
          <WavePattern variant="light" className="z-0 opacity-[0.06]" />
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-screen"
            style={{ backgroundImage: GRAIN }}
          />

          <div className="relative z-20 flex min-h-svh flex-col">
            <div className="flex h-16 items-center justify-between px-6 md:px-10">
              <Link href="/" aria-label="ARMATIS" onClick={() => setOpen(false)}>
                <ArmatisWordmark variant="light" height={15} />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="group -m-2 flex items-center gap-3 p-2 text-bone/70 transition-colors hover:text-bone"
              >
                <span className="hidden font-mono text-[10px] uppercase tracking-[0.2em] md:inline">
                  {t("close")}
                </span>
                <span className="font-mono text-[13px]">✕</span>
              </button>
            </div>

            <nav className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 md:px-10">
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group flex items-baseline gap-6 border-b border-white/10 py-6 transition-opacity duration-300 md:gap-10 md:py-8",
                    isActive(item.href) ? "opacity-100" : "opacity-60 hover:opacity-100"
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bone/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl font-extralight tracking-tight transition-transform duration-500 ease-[var(--ease-out-luxe)] group-hover:translate-x-3 md:text-6xl">
                    {t(item.key)}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-6 pb-10 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45 md:px-10">
              <LanguageSwitcher />
              <span>{ARMATIS_107.web}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
