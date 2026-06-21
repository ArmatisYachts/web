"use client";

import { cn } from "@/lib/utils";

// Opens the shared contact dialog (dispatched as a window event so any
// server-rendered section can drop in a trigger without prop-drilling).
export function openContact() {
  window.dispatchEvent(new CustomEvent("armatis:contact"));
}

export function ContactTrigger({
  variant = "cta",
  className,
  children,
}: {
  variant?: "cta" | "link" | "outline";
  className?: string;
  children: React.ReactNode;
}) {
  if (variant === "link") {
    return (
      <button
        type="button"
        onClick={openContact}
        className={cn("transition-opacity duration-300 hover:opacity-60", className)}
      >
        {children}
      </button>
    );
  }

  // Light/brand-coloured button with a crisp, EVEN-thickness ink edge that
  // follows the angled corner. Drawn as an SVG polygon with a non-scaling
  // stroke so every side (incl. the diagonal) is exactly the same width.
  if (variant === "outline") {
    return (
      <button
        type="button"
        onClick={openContact}
        className={cn(
          "relative inline-block px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg transition-opacity duration-300 hover:opacity-70",
          className
        )}
      >
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          preserveAspectRatio="none"
          viewBox="0 0 100 100"
        >
          <polygon
            points="0,0 100,0 100,70 86,100 0,100"
            className="fill-surface stroke-fg"
            strokeWidth={1.25}
            strokeLinejoin="round"
            vectorEffect="non-scaling-stroke"
          />
        </svg>
        <span className="relative">{children}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={openContact}
      className={cn(
        "armatis-cta inline-block px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] transition-opacity duration-300 hover:opacity-80",
        className
      )}
    >
      {children}
    </button>
  );
}
