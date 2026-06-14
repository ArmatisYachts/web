import { RevealImage } from "@/components/shared/reveal-image";

// Full-bleed image band (scroll grayscale→colour reveal, matches the site).
// Responsive: taller crop on phones, cinematic 16:9 on larger screens.
export function IndustrialBand({ src, alt }: { src: string; alt: string }) {
  return (
    <section className="bg-surface">
      <div className="relative aspect-[4/3] w-full overflow-hidden sm:aspect-[16/9]">
        <RevealImage src={src} alt={alt} fill sizes="100vw" />
      </div>
    </section>
  );
}
