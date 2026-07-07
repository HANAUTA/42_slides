interface RetakeHistogramProps {
  histogram: { retake: number; count: number }[];
  max: number;
}

const DISPLAY_CAP = 10;

/** 撮り直し回数のヒストグラム。表示は 0〜DISPLAY_CAP+ に丸めて崩れないようにする。 */
export default function RetakeHistogram({ histogram, max }: RetakeHistogramProps) {
  const byRetake = new Map(histogram.map((h) => [h.retake, h.count]));
  const lastIndex = Math.min(max, DISPLAY_CAP);

  const bars = Array.from({ length: lastIndex + 1 }, (_, i) => {
    if (i === DISPLAY_CAP && max > DISPLAY_CAP) {
      const overflow = histogram
        .filter((h) => h.retake >= DISPLAY_CAP)
        .reduce((sum, h) => sum + h.count, 0);
      return { label: `${DISPLAY_CAP}+`, count: overflow, hero: false };
    }
    return { label: String(i), count: byRetake.get(i) ?? 0, hero: i === 0 };
  });

  const maxCount = Math.max(1, ...bars.map((b) => b.count));

  return (
    <div className="flex h-[300px] items-end gap-5">
      {bars.map((b) => (
        <div key={b.label} className="flex flex-1 flex-col items-center gap-4">
          <span className="font-display text-[20px] font-bold text-foreground/55">
            {b.count}
          </span>
          <div
            className={`w-full rounded-t-lg ${b.hero ? "bg-accent" : "bg-accent/25"}`}
            style={{ height: `${(b.count / maxCount) * 210}px` }}
          />
          <span className="font-display text-[18px] text-foreground/40">{b.label}</span>
        </div>
      ))}
    </div>
  );
}
