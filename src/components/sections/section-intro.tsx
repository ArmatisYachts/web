import { Fragment } from "react";
import { cn } from "@/lib/utils";

// Hyphenated words ("in-house") must never split across lines.
function unbreakable(text: string) {
  return text.split(" ").map((word, i) => (
    <Fragment key={i}>
      {i > 0 && " "}
      {word.includes("-") ? (
        <span className="whitespace-nowrap">{word}</span>
      ) : (
        word
      )}
    </Fragment>
  ));
}

// The site's editorial section opener: "01 ── LABEL" eyebrow + display title.
export function SectionIntro({
  index,
  label,
  title,
  className,
}: {
  index: string;
  label: string;
  title?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <div className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.22em] text-fg-mute">
        <span className="text-fg-faint">{index}</span>
        <span className="h-px w-10 bg-hairline-strong" />
        <span>{label}</span>
      </div>
      {title && (
        <h2
          className={cn(
            "mt-10 max-w-4xl font-display text-4xl font-extralight leading-[1.05] tracking-tight md:text-6xl"
          )}
        >
          {unbreakable(title)}
        </h2>
      )}
    </div>
  );
}
