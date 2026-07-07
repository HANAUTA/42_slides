"use client";

import { useEffect, useState, type MouseEvent } from "react";

interface TimerProps {
  /** カウントダウン秒数 */
  seconds: number;
  size?: "md" | "lg";
}

const SIZE = {
  md: { time: "text-[150px]", done: "text-[90px]" },
  lg: { time: "text-[230px]", done: "text-[130px]" },
} as const;

function format(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

/** クリックで開始 / 一時停止できる大きなカウントダウンタイマー。 */
export default function Timer({ seconds, size = "md" }: TimerProps) {
  const [remaining, setRemaining] = useState(seconds);
  const [running, setRunning] = useState(false);
  const s = SIZE[size];

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setRemaining((r) => (r <= 1 ? 0 : r - 1));
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  useEffect(() => {
    if (remaining === 0) setRunning(false);
  }, [remaining]);

  const finished = remaining === 0;
  // 終盤でオレンジ → 赤に変わる（短いタイマーでも開始直後に色付かないよう比率で調整）
  const amberAt = Math.min(300, seconds / 2);
  const redAt = Math.min(60, seconds / 5);
  const urgency =
    !finished && remaining <= redAt
      ? "text-rose-500"
      : !finished && remaining <= amberAt
        ? "text-amber-500"
        : "text-foreground";

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    // Space キーでのスライド送りと干渉しないようフォーカスを外す
    e.currentTarget.blur();
    if (finished) {
      setRemaining(seconds);
      setRunning(true);
      return;
    }
    setRunning((r) => !r);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="flex cursor-pointer flex-col items-center"
    >
      {finished ? (
        <span
          className={`font-display font-extrabold leading-none text-accent ${s.done}`}
        >
          終了！
        </span>
      ) : (
        <span
          className={`font-mono font-bold leading-none tabular-nums ${s.time} ${urgency}`}
        >
          {format(remaining)}
        </span>
      )}
      <span className="mt-9 rounded-full bg-foreground/[0.04] px-6 py-2 text-[22px] font-medium text-foreground/40">
        {finished
          ? "クリックでリセット"
          : running
            ? "⏸ クリックで一時停止"
            : "▶ クリックで開始"}
      </span>
    </button>
  );
}
