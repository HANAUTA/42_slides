interface SlideChromeProps {
  /** 左上に表示する現在のセクション名 */
  section?: string;
  current: number;
  total: number;
}

/** 全スライド共通のフレーム。左上にセクション名、右上にスライド番号。 */
export default function SlideChrome({
  section,
  current,
  total,
}: SlideChromeProps) {
  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10 flex items-center justify-between px-[160px] pt-[56px]">
      <span className="flex items-center gap-3 text-[23px] font-semibold tracking-[0.16em] text-foreground/40">
        {section && (
          <>
            <span className="h-[10px] w-[10px] rounded-full bg-accent/70" />
            {section}
          </>
        )}
      </span>
      <span className="font-mono text-[23px] tabular-nums text-foreground/35">
        {pad(current)}
        <span className="mx-2 text-foreground/15">/</span>
        {pad(total)}
      </span>
    </div>
  );
}
