import PhaseStepper from "@/components/PhaseStepper";

interface SlideChromeProps {
  /** 現在のフェーズ index（0-4）。undefined ならステッパーを表示しない */
  phase?: number;
  current: number;
  total: number;
  theme?: "light" | "dark";
}

/** 全スライド共通のフレーム。中央にフェーズ進捗、右上にスライド番号。 */
export default function SlideChrome({
  phase,
  current,
  total,
  theme = "light",
}: SlideChromeProps) {
  const pad = (n: number) => String(n).padStart(2, "0");
  const dark = theme === "dark";

  return (
    <div className="pointer-events-none absolute inset-x-0 top-0 z-10">
      <div className="flex justify-center px-[100px] pt-[46px]">
        <PhaseStepper current={phase} theme={theme} />
      </div>
      <span
        className={`absolute right-[100px] top-[52px] font-mono text-[22px] tabular-nums ${
          dark ? "text-white/30" : "text-foreground/30"
        }`}
      >
        {pad(current)}
        <span className={dark ? "mx-2 text-white/15" : "mx-2 text-foreground/15"}>
          /
        </span>
        {pad(total)}
      </span>
    </div>
  );
}
