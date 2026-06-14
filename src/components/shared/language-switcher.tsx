"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/utils";

// Inherits text color from its parent so it works on light and dark surfaces.
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div
      className={cn(
        "pointer-events-auto flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em]",
        className
      )}
    >
      {routing.locales.map((loc, i) => (
        <span key={loc} className="flex items-center gap-2">
          {i > 0 && <span className="opacity-30">/</span>}
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: loc })}
            aria-current={loc === locale}
            className={cn(
              "transition-opacity duration-300",
              loc === locale ? "opacity-100" : "opacity-40 hover:opacity-70"
            )}
          >
            {loc}
          </button>
        </span>
      ))}
    </div>
  );
}
