"use client";

interface ProgressBarProps {
  current: number;
  total: number;
  theme?: "light" | "dark";
}

/** 最下部の全体進捗バー。左に hanauta ワードマーク。Stage 内に配置する。 */
export default function ProgressBar({ current, total, theme = "light" }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;
  const dark = theme === "dark";

  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      <div className="flex items-center px-[160px] pb-6">
        <span
          className={`font-display text-[23px] font-bold lowercase tracking-[0.18em] ${
            dark ? "text-white/25" : "text-foreground/30"
          }`}
        >
          ♪ hanauta
        </span>
      </div>
      <div className={`h-[6px] w-full ${dark ? "bg-white/[0.08]" : "bg-foreground/[0.06]"}`}>
        <div
          className={`h-full rounded-r-full transition-all duration-500 ease-out ${
            dark ? "bg-[#D4FF4F]" : "bg-accent"
          }`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
