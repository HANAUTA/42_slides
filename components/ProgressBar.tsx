"use client";

interface ProgressBarProps {
  current: number;
  total: number;
}

/** 最下部の全体進捗バー。左に hanauta ワードマーク。Stage 内に配置する。 */
export default function ProgressBar({ current, total }: ProgressBarProps) {
  const progress = ((current + 1) / total) * 100;

  return (
    <div className="absolute inset-x-0 bottom-0 z-10">
      <div className="flex items-center px-[160px] pb-6">
        <span className="text-[22px] font-semibold lowercase tracking-[0.2em] text-foreground/30">
          hanauta
        </span>
      </div>
      <div className="h-[6px] w-full bg-foreground/8">
        <div
          className="h-full bg-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}
