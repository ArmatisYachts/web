"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Black & white by default; only the image currently on screen is colourised.
// When it scrolls out of view it returns to B&W (the observer stays connected,
// so the effect repeats every time — no permanent "revealed" state).
export function RevealImage({
  className,
  ...imageProps
}: ImageProps & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.45, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        {...imageProps}
        className={cn(
          "object-cover transition-[filter] duration-[900ms] ease-out",
          inView ? "grayscale-0" : "grayscale",
          className
        )}
      />
    </div>
  );
}
