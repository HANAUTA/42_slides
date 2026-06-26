"use client";

import { useEffect, useState } from "react";

interface TimerProps {
  /** カウントダウン秒数 */
  seconds: number;
  size?: "md" | "lg";
}

const SIZE = {
  md: { time: "text-[150px]", done: "text-[96px]" },
  lg: { time: "text-[240px]", done: "text-[140px]" },
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

  const toggle = () => {
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
      className="flex flex-col items-center"
    >
      <span
        className={`font-mono font-bold leading-none tabular-nums ${
          finished ? `${s.done} text-accent` : `${s.time} text-foreground`
        }`}
      >
        {finished ? "終了！" : format(remaining)}
      </span>
      <span className="mt-10 text-[24px] font-medium text-foreground/35">
        {finished
          ? "クリックでリセット"
          : running
            ? "クリックで一時停止"
            : "クリックで開始"}
      </span>
    </button>
  );
}
