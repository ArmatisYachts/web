import { cn } from "@/lib/utils";

// Hairline-gridded band of key figures: big extralight value, mono micro-label.
export function StatStrip({
  items,
  className,
}: {
  items: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <dl
      className={cn(
        "grid grid-cols-2 gap-px overflow-hidden border border-hairline bg-hairline lg:grid-cols-4",
        className
      )}
    >
      {items.map(({ value, label }) => (
        <div key={label} className="flex flex-col-reverse gap-3 bg-surface px-6 py-8">
          <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-mute">
            {label}
          </dt>
          <dd className="font-display text-3xl font-extralight tabular-nums tracking-tight md:text-4xl">
            {value}
          </dd>
        </div>
      ))}
    </dl>
  );
}
