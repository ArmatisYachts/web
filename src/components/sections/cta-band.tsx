import { WavePattern } from "@/components/shared/wave-pattern";
import { ContactTrigger } from "@/components/shared/contact-trigger";

// Dark full-bleed closing band before the footer — display line + contact CTA.
// `data-armatis-dark` keeps the fixed chrome inverting correctly.
export function CtaBand({ line, button }: { line: string; button: string }) {
  return (
    <section
      data-armatis-dark
      className="relative overflow-hidden bg-[#0a0a0a] px-6 py-24 text-bone md:px-12 md:py-32"
    >
      <WavePattern variant="light" className="z-0 opacity-[0.06]" />
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start gap-10 md:flex-row md:items-end md:justify-between">
        <p className="max-w-2xl font-display text-3xl font-extralight leading-[1.12] tracking-tight md:text-5xl">
          {line}
        </p>
        <ContactTrigger
          variant="cta"
          className="shrink-0 bg-bone text-ink hover:bg-white"
        >
          {button}
        </ContactTrigger>
      </div>
    </section>
  );
}
