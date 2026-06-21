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

  // Light/brand-coloured button with a crisp ink edge that follows the angled
  // corner (outer clipped layer = border, inner clipped layer = surface).
  if (variant === "outline") {
    return (
      <button
        type="button"
        onClick={openContact}
        className={cn("armatis-cta bg-fg p-px transition-opacity duration-300 hover:opacity-70", className)}
      >
        <span className="armatis-cta block bg-surface px-7 py-3.5 font-mono text-[11px] font-medium uppercase tracking-[0.18em] text-fg">
          {children}
        </span>
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
