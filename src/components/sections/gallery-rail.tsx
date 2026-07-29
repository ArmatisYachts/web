"use client";

import Image from "next/image";
import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type KeyboardEvent,
} from "react";

export type RailItem = {
  src: string;
  caption: string;
  position?: string;
};

function FullscreenImage({ item }: { item: RailItem }) {
  return (
    <Image
      src={item.src}
      alt={item.caption}
      fill
      quality={90}
      sizes="100vw"
      draggable={false}
      className="object-cover"
      style={{ objectPosition: item.position ?? "center" }}
    />
  );
}

// Edge-to-edge full-screen gallery using only the original ARMATIS renders.
// Touch, trackpad, keyboard and explicit arrow navigation all move exactly one
// viewport at a time.
export function GalleryRail({
  label,
  items,
  prevLabel,
  nextLabel,
}: {
  label: string;
  items: readonly RailItem[];
  prevLabel: string;
  nextLabel: string;
}) {
  const railRef = useRef<HTMLDivElement>(null);
  const animationFrame = useRef(0);
  const currentRef = useRef(0);
  const [current, setCurrent] = useState(0);

  const sync = useCallback(() => {
    const rail = railRef.current;
    if (!rail || rail.clientWidth === 0) return;

    const index = Math.min(
      Math.max(Math.round(rail.scrollLeft / rail.clientWidth), 0),
      items.length - 1
    );
    currentRef.current = index;
    setCurrent(index);
  }, [items.length]);

  const onScroll = () => {
    if (animationFrame.current) return;

    animationFrame.current = requestAnimationFrame(() => {
      animationFrame.current = 0;
      sync();
    });
  };

  useEffect(() => {
    sync();
    const rail = railRef.current;
    if (!rail) return;

    const observer = new ResizeObserver(() => {
      rail.scrollTo({
        left: currentRef.current * rail.clientWidth,
        behavior: "auto",
      });
      sync();
    });
    observer.observe(rail);

    return () => {
      observer.disconnect();
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [sync]);

  const step = useCallback(
    (direction: -1 | 1) => {
      const rail = railRef.current;
      if (!rail) return;

      const next = Math.min(
        Math.max(currentRef.current + direction, 0),
        items.length - 1
      );
      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      rail.scrollTo({
        left: next * rail.clientWidth,
        behavior: reduceMotion ? "auto" : "smooth",
      });
      currentRef.current = next;
      setCurrent(next);
    },
    [items.length]
  );

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      step(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      step(1);
    }
  };

  const atStart = current === 0;
  const atEnd = current === items.length - 1;

  return (
    <div
      data-armatis-dark
      className="relative h-[100svh] w-full overflow-hidden bg-ink text-bone"
    >
      <div
        ref={railRef}
        role="region"
        aria-label={label}
        tabIndex={0}
        onKeyDown={onKeyDown}
        onScroll={onScroll}
        className="armatis-rail flex h-full w-full snap-x snap-mandatory overflow-x-auto overscroll-x-contain scroll-smooth outline-none"
      >
        {items.map((item, index) => (
          <figure
            key={item.src}
            role="group"
            aria-roledescription="slide"
            aria-label={`${index + 1} / ${items.length}`}
            className="relative h-full w-full flex-none snap-start snap-always overflow-hidden bg-ink"
          >
            <FullscreenImage item={item} />
            <figcaption className="sr-only">{item.caption}</figcaption>
          </figure>
        ))}
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 bg-[linear-gradient(to_bottom,rgba(0,0,0,0.38),transparent_24%,transparent_60%,rgba(0,0,0,0.62))]"
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-center justify-between p-6 pt-7 md:p-10">
        <div className="flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/90">
          <span className="h-px w-8 bg-white/55" />
          <span>{label}</span>
        </div>
        <span className="font-mono text-[10px] tabular-nums tracking-[0.22em] text-white/70">
          {String(current + 1).padStart(2, "0")} /{" "}
          {String(items.length).padStart(2, "0")}
        </span>
      </div>

      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-between px-4 md:px-8">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-disabled={atStart}
          aria-label={`${prevLabel} — ${label}`}
          title={prevLabel}
          className={[
            "pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-black/45 text-white shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 md:h-14 md:w-14",
            atStart
              ? "pointer-events-none opacity-30"
              : "hover:border-white hover:bg-white hover:text-ink",
          ].join(" ")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden
          >
            <path
              d="M11.75 2.75 5.5 9l6.25 6.25"
              stroke="currentColor"
              strokeWidth="1.35"
            />
          </svg>
        </button>
        <button
          type="button"
          onClick={() => step(1)}
          aria-disabled={atEnd}
          aria-label={`${nextLabel} — ${label}`}
          title={nextLabel}
          className={[
            "pointer-events-auto grid h-12 w-12 place-items-center rounded-full border border-white/70 bg-black/45 text-white shadow-[0_10px_35px_rgba(0,0,0,0.28)] backdrop-blur-md transition duration-300 md:h-14 md:w-14",
            atEnd
              ? "pointer-events-none opacity-30"
              : "hover:border-white hover:bg-white hover:text-ink",
          ].join(" ")}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            aria-hidden
          >
            <path
              d="m6.25 2.75 6.25 6.25-6.25 6.25"
              stroke="currentColor"
              strokeWidth="1.35"
            />
          </svg>
        </button>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-20 p-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] md:p-10">
        <div className="flex items-end justify-between gap-6">
          <p
            aria-live="polite"
            className="max-w-[65vw] font-display text-2xl font-extralight tracking-tight text-white md:text-4xl"
          >
            {items[current]?.caption}
          </p>

          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={() => step(-1)}
              aria-disabled={atStart}
              aria-label={prevLabel}
              className={[
                "grid h-11 w-11 place-items-center rounded-full border border-white/45 bg-black/15 text-white backdrop-blur-sm transition duration-300 md:h-12 md:w-12",
                atStart
                  ? "pointer-events-none opacity-30"
                  : "hover:border-white hover:bg-white hover:text-ink",
              ].join(" ")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="M10.5 2.5 5 8l5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => step(1)}
              aria-disabled={atEnd}
              aria-label={nextLabel}
              className={[
                "grid h-11 w-11 place-items-center rounded-full border border-white/45 bg-black/15 text-white backdrop-blur-sm transition duration-300 md:h-12 md:w-12",
                atEnd
                  ? "pointer-events-none opacity-30"
                  : "hover:border-white hover:bg-white hover:text-ink",
              ].join(" ")}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden
              >
                <path
                  d="m5.5 2.5 5.5 5.5-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="1.25"
                />
              </svg>
            </button>
          </div>
        </div>

        <div className="mt-6 flex gap-2" aria-hidden>
          {items.map((item, index) => (
            <span
              key={item.src}
              className={[
                "h-px flex-1 transition-colors duration-500",
                index === current ? "bg-white" : "bg-white/25",
              ].join(" ")}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
