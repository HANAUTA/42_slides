"use client";

import { useEffect, useState, type MouseEvent } from "react";

interface TimerProps {
  /** カウントダウン秒数（初期値） */
  seconds: number;
  size?: "md" | "lg";
  /** 開始前に ±1分 で秒数を調整できるようにする */
  editable?: boolean;
  /** 終了時に「終了！」を表示せず、何も出さない */
  hideFinishedLabel?: boolean;
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
export default function Timer({
  seconds,
  size = "md",
  editable = false,
  hideFinishedLabel = false,
}: TimerProps) {
  const [base, setBase] = useState(seconds);
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
  // 開始前かつ未調整の初期状態でのみ ±1分 の調整ボタンを出す
  const idle = editable && !running && remaining === base;
  // 終盤でオレンジ → 赤に変わる（短いタイマーでも開始直後に色付かないよう比率で調整）
  const amberAt = Math.min(300, base / 2);
  const redAt = Math.min(60, base / 5);
  const urgency =
    !finished && remaining <= redAt
      ? "text-rose-500"
      : !finished && remaining <= amberAt
        ? "text-amber-500"
        : "text-foreground";

  if (finished && hideFinishedLabel) return null;

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    // Space キーでのスライド送りと干渉しないようフォーカスを外す
    e.currentTarget.blur();
    if (finished) {
      setRemaining(base);
      setRunning(true);
      return;
    }
    setRunning((r) => !r);
  };

  const adjust = (deltaMinutes: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    const next = Math.max(60, base + deltaMinutes * 60);
    setBase(next);
    setRemaining(next);
  };

  return (
    <div className="flex flex-col items-center">
      <div className="flex items-center gap-8">
        {idle && (
          <button
            type="button"
            onClick={adjust(-1)}
            aria-label="1分減らす"
            className="flex h-[56px] w-[56px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/10 text-[28px] font-bold text-foreground/40 transition-colors hover:border-accent/35 hover:text-accent"
          >
            −
          </button>
        )}
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
        {idle && (
          <button
            type="button"
            onClick={adjust(1)}
            aria-label="1分増やす"
            className="flex h-[56px] w-[56px] shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/10 text-[28px] font-bold text-foreground/40 transition-colors hover:border-accent/35 hover:text-accent"
          >
            ＋
          </button>
        )}
      </div>
    </div>
  );
}
