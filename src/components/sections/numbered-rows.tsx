// Full-width hairline rows: big mono index, display title, copy and an
// optional mono tag list. Deliberately typographic (no imagery) — the
// engineering register of the brand.
export function NumberedRows({
  items,
}: {
  items: {
    index: string;
    title: string;
    body: string;
    tags?: readonly string[];
  }[];
}) {
  return (
    <div className="border-t border-hairline">
      {items.map((it) => (
        <div
          key={it.index}
          className="grid gap-5 border-b border-hairline py-10 md:grid-cols-[6rem_1fr_minmax(0,18rem)] md:gap-10 md:py-14"
        >
          <span className="font-mono text-[11px] tracking-[0.2em] text-fg-faint">
            {it.index}
          </span>
          <div>
            <h3 className="font-display text-2xl font-extralight tracking-tight md:text-3xl">
              {it.title}
            </h3>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-fg-mute md:text-[15px]">
              {it.body}
            </p>
          </div>
          {it.tags && (
            <div className="flex flex-wrap content-start gap-2 md:justify-end">
              {it.tags.map((tg) => (
                <span
                  key={tg}
                  className="h-fit border border-hairline px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-fg-mute"
                >
                  {tg}
                </span>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
