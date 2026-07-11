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

  // close the drawer on navigation
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

          <nav className="hidden items-center gap-8 md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive(item.href) ? "page" : undefined}
                className={cn(
                  "relative py-1 font-mono text-[10px] uppercase tracking-[0.2em] transition-opacity duration-300",
                  isActive(item.href)
                    ? "opacity-100 after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-current"
                    : "opacity-50 hover:opacity-100"
                )}
              >
                {t(item.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-5">
            <LanguageSwitcher className="hidden md:flex" />
            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label={t("menu")}
              aria-expanded={open}
              className="-m-2 flex h-10 w-10 flex-col items-center justify-center gap-1.5 p-2 md:hidden"
            >
              <span className="block h-px w-5 bg-current" />
              <span className="block h-px w-5 bg-current" />
            </button>
          </div>
        </div>
      </header>

      {/* mobile drawer — full-screen, cinematic dark */}
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t("menu")}
          className="fixed inset-0 z-[95] overflow-y-auto bg-[#0a0a0a] text-bone md:hidden"
        >
          <WavePattern variant="light" className="z-0 opacity-[0.06]" />
          <div
            className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-screen"
            style={{ backgroundImage: GRAIN }}
          />

          <div className="relative z-20 flex min-h-svh flex-col">
            <div className="flex h-16 items-center justify-between px-6">
              <Link href="/" aria-label="ARMATIS" onClick={() => setOpen(false)}>
                <ArmatisWordmark variant="light" height={15} />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t("close")}
                className="-m-2 p-2 font-mono text-[11px] uppercase tracking-[0.18em] text-bone/70 transition-opacity hover:opacity-60"
              >
                ✕
              </button>
            </div>

            <nav className="flex flex-1 flex-col justify-center px-6">
              {NAV_ITEMS.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "flex items-baseline gap-5 border-b border-white/10 py-5 transition-opacity duration-300",
                    isActive(item.href) ? "opacity-100" : "opacity-60 hover:opacity-100"
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.2em] text-bone/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="font-display text-4xl font-extralight tracking-tight">
                    {t(item.key)}
                  </span>
                </Link>
              ))}
            </nav>

            <div className="flex items-center justify-between px-6 pb-8 font-mono text-[10px] uppercase tracking-[0.18em] text-bone/45">
              <LanguageSwitcher />
              <span>{ARMATIS_107.web}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
