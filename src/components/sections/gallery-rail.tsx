"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { RevealImage } from "@/components/shared/reveal-image";
import { renderRatio, renderAspect } from "@/lib/yacht";

export type RailItem = { src: string; caption: string };

// Tallest a frame may get. Below this width the slide is simply full-width, so
// on phones nothing is constrained; on desktop it keeps the 16:9 frames from
// towering over the panoramas.
const MAX_FRAME_HEIGHT = 560;

// A horizontally scrolled card of renders — arrows, snap, progress rail.
// One frame at a time: every slide takes the card's full width, so no part of
// the next image ever bleeds into view. The frame keeps the file's native ratio
// (its height simply follows), so nothing is cropped either. Frames are centred
// vertically, which keeps the card a stable height as the panoramas — shorter
// than the rest — scroll past.
export function GalleryRail({
  label,
  items,
  prevLabel,
  nextLabel,
}: {
  label: string;
  items: RailItem[];
  prevLabel: string;
  nextLabel: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const frame = useRef(0);
  const [current, setCurrent] = useState(0);
  const [atStart, setAtStart] = useState(true);
  const [atEnd, setAtEnd] = useState(false);

  const offsets = () => {
    const el = railRef.current;
    if (!el) return [];
    const slides = Array.from(el.children) as HTMLElement[];
    if (!slides.length) return [];
    const base = slides[0].offsetLeft;
    return slides.map((s) => s.offsetLeft - base);
  };

  const sync = useCallback(() => {
    const el = railRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    const x = el.scrollLeft;
    setAtStart(x <= 2);
    setAtEnd(x >= max - 2);

    const offs = offsets();
    if (!offs.length) return;
    let index = 0;
    offs.forEach((o, i) => {
      if (o <= x + 4) index = i;
    });
    if (max - x <= 2) index = offs.length - 1;
    setCurrent(index);
  }, []);

  const onScroll = () => {
    if (frame.current) return;
    frame.current = requestAnimationFrame(() => {
      frame.current = 0;
      sync();
    });
  };

  useEffect(() => {
    sync();
    const el = railRef.current;
    if (!el) return;
    const ro = new ResizeObserver(sync);
    ro.observe(el);
    return () => {
      ro.disconnect();
      if (frame.current) cancelAnimationFrame(frame.current);
    };
  }, [sync]);

  const step = (dir: -1 | 1) => {
    const el = railRef.current;
    if (!el) return;
    if (dir === -1 ? atStart : atEnd) return;
    const offs = offsets();
    const next = Math.min(Math.max(current + dir, 0), offs.length - 1);
    const max = el.scrollWidth - el.clientWidth;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollTo({
      left: Math.min(offs[next], max),
      behavior: reduce ? "auto" : "smooth",
    });
  };

  // aria-disabled rather than disabled: a disabled button loses focus mid-interaction
  const arrow = (off: boolean) =>
    [
      "flex h-9 w-9 items-center justify-center border border-hairline-strong text-fg transition-colors duration-300",
      off ? "opacity-20" : "hover:bg-fg hover:text-surface",
    ].join(" ");

  return (
    <div className="border border-hairline bg-surface-2/50">
      <div className="flex items-center justify-between gap-4 border-b border-hairline px-5 py-4 md:gap-6 md:px-6">
        <div className="flex items-center gap-4 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
          <span className="hidden h-px w-8 bg-hairline-strong sm:block" />
          <span>{label}</span>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <span className="whitespace-nowrap font-mono text-[10px] tabular-nums tracking-[0.2em] text-fg-faint">
            {String(current + 1).padStart(2, "0")} /{" "}
            {String(items.length).padStart(2, "0")}
          </span>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-disabled={atStart}
              aria-label={prevLabel}
              className={arrow(atStart)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M9 2 4 7l5 5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-disabled={atEnd}
              aria-label={nextLabel}
              className={arrow(atEnd)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden>
                <path
                  d="M5 2l5 5-5 5"
                  stroke="currentColor"
                  strokeWidth="1"
                  strokeLinecap="square"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        ref={railRef}
        onScroll={onScroll}
        role="group"
        aria-label={label}
        tabIndex={0}
        className="armatis-rail flex snap-x snap-mandatory items-center gap-5 overflow-x-auto scroll-px-5 p-5 md:gap-6 md:scroll-px-6 md:p-6"
      >
        {items.map((item) => (
          <div key={item.src} className="w-full flex-none snap-start">
            <div
              className="relative mx-auto w-full overflow-hidden border border-hairline"
              style={{
                aspectRatio: renderRatio(item.src),
                // cap the height of the taller frames so the panoramas don't sit
                // in a deep mat — every frame stays inside one calm card height
                maxWidth: `${Math.round(MAX_FRAME_HEIGHT * renderAspect(item.src))}px`,
              }}
            >
              <RevealImage
                src={item.src}
                alt={item.caption}
                fill
                threshold={0.25}
                sizes="(max-width: 768px) 92vw, 1120px"
              />
            </div>
          </div>
        ))}
      </div>

      <div className="px-5 pb-5 md:px-6 md:pb-6">
        <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-mute">
          {items[current]?.caption}
        </p>
        <div className="relative h-px w-full bg-hairline">
          <div
            className="absolute top-0 h-px bg-fg-mute transition-[margin] duration-500 ease-out"
            style={{
              width: `${100 / items.length}%`,
              marginLeft: `${(current * 100) / items.length}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
