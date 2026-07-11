import { RevealImage } from "@/components/shared/reveal-image";
import { cn } from "@/lib/utils";

// Two-column editorial row: eyebrow + title + copy beside a reveal image.
export function EditorialSplit({
  index,
  label,
  title,
  body,
  src,
  alt,
  flip = false,
  children,
}: {
  index: string;
  label: string;
  title: string;
  body: string;
  src?: string;
  alt?: string;
  flip?: boolean;
  children?: React.ReactNode;
}) {
  return (
    <section className="border-t border-hairline bg-surface px-6 py-24 md:px-12 md:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 md:grid-cols-2 md:gap-20">
        <div className={cn(flip && "md:order-2")}>
          <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
            <span className="text-fg-faint">{index}</span>
            <span className="h-px w-10 bg-hairline-strong" />
            <span>{label}</span>
          </div>
          <h2 className="mt-8 font-display text-3xl font-extralight leading-[1.08] tracking-tight md:text-4xl">
            {title}
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-fg-mute md:text-[15px]">{body}</p>
          {children}
        </div>

        {src && (
          <div
            className={cn(
              "relative aspect-[4/3] overflow-hidden border border-hairline",
              flip && "md:order-1"
            )}
          >
            <RevealImage
              src={src}
              alt={alt ?? title}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        )}
      </div>
    </section>
  );
}
