import { RevealImage } from "@/components/shared/reveal-image";

// Full-bleed panoramic interior band — shown at its native ultra-wide ratio
// (no forced crop), the right way to use the 2.4–2.5:1 salon / beach-club renders.
export function IndustrialFeature({
  src,
  label,
  caption,
  ratio,
}: {
  src: string;
  label: string;
  caption: string;
  ratio: string;
}) {
  return (
    <section className="border-t border-hairline bg-surface">
      <div
        className="relative w-full overflow-hidden"
        style={{ aspectRatio: ratio }}
      >
        <RevealImage src={src} alt={label} fill sizes="100vw" />
      </div>
      <div className="flex flex-col gap-2 px-6 py-5 md:flex-row md:items-baseline md:justify-between md:px-12">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg">
          {label}
        </span>
        <span className="max-w-md font-display text-sm font-light text-fg-mute md:text-right">
          {caption}
        </span>
      </div>
    </section>
  );
}
