import Image from "next/image";
import { WavePattern } from "@/components/shared/wave-pattern";
import { cn } from "@/lib/utils";

const GRAIN =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

// Dark cinematic hero for sub-pages: shorter than the home hero (a chapter
// opening, not a repeat), optional full-bleed render, optional data readout.
// `data-armatis-dark` drives the header/cookie-banner inversion.
export function PageHero({
  label,
  title,
  kicker,
  credit,
  src,
  alt,
  readout,
  compact = false,
}: {
  label?: string;
  title: string;
  kicker?: string;
  credit?: [string, string];
  src?: string;
  alt?: string;
  readout?: [string, string][];
  compact?: boolean;
}) {
  return (
    <section
      data-armatis-dark
      className={cn(
        "relative flex flex-col justify-end overflow-hidden bg-[#0a0a0a] text-bone select-none",
        compact ? "min-h-[52svh]" : "min-h-[72svh]"
      )}
    >
      <WavePattern variant="light" className="z-0 opacity-[0.06]" />

      {src && (
        <div className="absolute inset-0">
          <Image
            src={src}
            alt={alt ?? title}
            fill
            priority
            sizes="100vw"
            className="object-cover grayscale brightness-[0.78] contrast-[1.08]"
          />
          <div
            className="pointer-events-none absolute inset-0"
            style={{ boxShadow: "inset 0 0 110px 18px #0a0a0a" }}
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0a0a]/80 via-[#0a0a0a]/15 to-[#0a0a0a]/40" />
        </div>
      )}

      {/* film grain */}
      <div
        className="pointer-events-none absolute inset-0 z-10 opacity-[0.07] mix-blend-screen"
        style={{ backgroundImage: GRAIN }}
      />

      <div className="relative z-20 px-6 pb-14 pt-32 md:px-10 md:pb-20 md:pt-40">
        <div className="flex items-end justify-between gap-8">
          <div>
            {label && (
              <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/45">
                {label}
              </p>
            )}
            <h1 className="font-display text-[clamp(3rem,9vw,7.5rem)] font-extralight leading-[0.92] tracking-tight">
              {title}
            </h1>
            {kicker && (
              <p className="mt-5 font-mono text-[10px] uppercase tracking-[0.28em] text-white/55 md:text-[11px]">
                {kicker}
              </p>
            )}
            {credit && (
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.24em]">
                <span className="text-white/40">{credit[0]}</span>{" "}
                <span className="text-white/80">{credit[1]}</span>
              </p>
            )}
          </div>

          {readout && (
            <dl className="hidden shrink-0 space-y-1 text-right font-mono text-[10px] uppercase tracking-[0.16em] md:block">
              {readout.map(([l, v]) => (
                <div key={l} className="flex justify-end gap-3">
                  <dt className="text-white/35">{l}</dt>
                  <dd className="tabular-nums text-bone">{v}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </div>
    </section>
  );
}
