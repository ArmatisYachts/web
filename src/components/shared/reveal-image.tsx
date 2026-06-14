"use client";

import Image, { type ImageProps } from "next/image";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

// Fills its (relative) parent. Starts grayscale and transitions to full colour
// once it scrolls into view — a scroll-driven reveal, not a hover effect.
export function RevealImage({
  className,
  ...imageProps
}: ImageProps & { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === "undefined") {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          io.disconnect();
        }
      },
      { threshold: 0.25, rootMargin: "0px 0px -12% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className="absolute inset-0">
      <Image
        {...imageProps}
        className={cn(
          "object-cover transition-[filter] duration-[1400ms] ease-out",
          shown ? "grayscale-0" : "grayscale",
          className
        )}
      />
    </div>
  );
}
