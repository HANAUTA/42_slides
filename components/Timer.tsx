"use client";

import { useEffect, useState, type ChangeEvent, type MouseEvent } from "react";

interface TimerProps {
  /** カウントダウン秒数（初期値） */
  seconds: number;
  size?: "sm" | "md" | "lg";
  /** true の場合、色変化や終了演出のないシンプルなカウントダウンにする。
   *  開始前は分数を手動入力・±1分で調整でき、0になったら00:00で止まって固まる。 */
  simple?: boolean;
}

export default function Timer({ seconds, size = "md", simple = false }: TimerProps) {
  return simple ? (
    <SimpleTimer seconds={seconds} size={size} />
  ) : (
    <ClassicTimer seconds={seconds} size={size} />
  );
}

const SIZE = {
  // 3桁分（100:00）でも横に収まるサイズ。並列レイアウト用。
  sm: {
    time: "text-[108px]",
    done: "text-[68px]",
    button: "h-[64px] w-[64px]",
    icon: "h-[26px] w-[26px]",
    step: "h-[46px] w-[46px] text-[24px]",
  },
  md: {
    time: "text-[150px]",
    done: "text-[90px]",
    button: "h-[76px] w-[76px]",
    icon: "h-[30px] w-[30px]",
    step: "h-[52px] w-[52px] text-[26px]",
  },
  lg: {
    time: "text-[230px]",
    done: "text-[130px]",
    button: "h-[96px] w-[96px]",
    icon: "h-[38px] w-[38px]",
    step: "h-[60px] w-[60px] text-[30px]",
  },
} as const;

function format(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function PlayIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={`${className} translate-x-[2px]`}>
      <path d="M8 5v14l11-7z" />
    </svg>
  );
}

function PauseIcon({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}

interface VariantProps {
  seconds: number;
  size: "sm" | "md" | "lg";
}

/** クリックで開始 / 一時停止できる大きなカウントダウンタイマー（従来仕様）。 */
function ClassicTimer({ seconds, size }: VariantProps) {
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

/** 色変化や終了演出のないシンプルなカウントダウンタイマー。分数を手動入力できる。 */
function SimpleTimer({ seconds, size }: VariantProps) {
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
  // 開始前かつ未調整の初期状態でのみ調整UIを出す
  const idle = !running && remaining === base;

  // 0になったら00:00で固定し、そこから先は何も操作できないようにする
  if (finished) {
    return (
      <span
        className={`font-mono font-bold leading-none tabular-nums ${s.time} text-foreground`}
      >
        {format(0)}
      </span>
    );
  }

  const toggle = (e: MouseEvent<HTMLButtonElement>) => {
    e.currentTarget.blur();
    setRunning((r) => !r);
  };

  const adjustMinutes = (deltaMinutes: number) => (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    e.currentTarget.blur();
    const next = Math.max(60, base + deltaMinutes * 60);
    setBase(next);
    setRemaining(next);
  };

  const setMinutes = (e: ChangeEvent<HTMLInputElement>) => {
    const mins = Math.max(1, Math.round(Number(e.target.value)) || 1);
    const next = mins * 60;
    setBase(next);
    setRemaining(next);
  };

  return (
    <div className="flex flex-col items-center gap-8">
      <span
        className={`font-mono font-bold leading-none tabular-nums ${s.time} text-foreground`}
      >
        {format(remaining)}
      </span>

      {idle && (
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={adjustMinutes(-1)}
            aria-label="1分減らす"
            className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/10 font-bold text-foreground/40 transition-colors hover:border-accent/35 hover:text-accent ${s.step}`}
          >
            −
          </button>
          <div className="flex items-center gap-2 rounded-full border border-foreground/10 px-5 py-2">
            <input
              type="number"
              min={1}
              value={Math.round(base / 60)}
              onChange={setMinutes}
              className="w-[64px] bg-transparent text-center font-mono text-[26px] font-bold text-foreground focus:outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
            />
            <span className="text-[20px] font-medium text-foreground/40">分</span>
          </div>
          <button
            type="button"
            onClick={adjustMinutes(1)}
            aria-label="1分増やす"
            className={`flex shrink-0 cursor-pointer items-center justify-center rounded-full border border-foreground/10 font-bold text-foreground/40 transition-colors hover:border-accent/35 hover:text-accent ${s.step}`}
          >
            ＋
          </button>
        </div>
      )}

      <button
        type="button"
        onClick={toggle}
        aria-label={running ? "一時停止" : "開始"}
        className={`flex cursor-pointer items-center justify-center rounded-full bg-accent text-white shadow-lg shadow-accent/25 transition-transform hover:scale-105 ${s.button}`}
      >
        {running ? <PauseIcon className={s.icon} /> : <PlayIcon className={s.icon} />}
      </button>
    </div>
  );
}
