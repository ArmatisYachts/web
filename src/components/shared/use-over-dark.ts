"use client";

import { useEffect, useState, type RefObject } from "react";
import { usePathname } from "@/i18n/navigation";

// True while the vertical midpoint of `ref`'s box overlaps any
// `[data-armatis-dark]` section (dark heros, CTA bands, footer).
// Recomputes on scroll, resize AND route change — fixed chrome (header,
// cookie banner) uses this to invert against whatever is behind it.
export function useOverDark(
  ref: RefObject<HTMLElement | null>,
  initial = true
): boolean {
  const [overDark, setOverDark] = useState(initial);
  const pathname = usePathname();

  useEffect(() => {
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
    // measure on the next frame so a freshly navigated page has painted
    raf = requestAnimationFrame(update);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [ref, pathname]);

  return overDark;
}
