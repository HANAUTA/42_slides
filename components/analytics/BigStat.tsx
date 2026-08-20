import { Fragment, type ReactNode } from "react";

export interface StatChip {
  label: string;
  value: string;
}

interface BigStatProps {
  /** 数字の上に置く見出し。何を数えた数字なのかを日本語で言い切る */
  label: string;
  value: string;
  /** 数字の右に添える単位（件・回・人など） */
  unit?: string;
  /** 数字のすぐ下に置く固有名（チーム名など）。無ければ詰めて表示する */
  sub?: string;
  /** 数字の下の一言 */
  caption?: ReactNode;
  /** さらに下のピル内に並べる補足数値 */
  chips?: StatChip[];
  /** 桁数が多いスライドで小さくする用 */
  sizePx?: number;
}

/**
 * 分析スライド用の「1枚に数字ひとつ」レイアウト。
 * 見出し → 巨大な数字 → 一言 → 補足ピル の順に時間差で出す。
 *
 * 見出しは他スライド（02Goal / 03Flow）と同じアクセントのピルで出す。
 * 数字だけ大きくても何の数字か伝わらないので、ここが一番強い手がかりになる。
 */
export default function BigStat({
  label,
  value,
  unit,
  sub,
  caption,
  chips,
  sizePx = 240,
}: BigStatProps) {
  return (
    <div className="flex w-full flex-col items-center">
      <span className="rise-in rounded-full bg-accent/10 px-9 py-4 font-display text-[30px] font-bold text-accent">
        {label}
      </span>

      <div
        className="rise-in mt-8 flex items-baseline gap-5"
        style={{ animationDelay: "90ms" }}
      >
        <span
          className="font-display font-extrabold leading-none tracking-tight tabular-nums text-accent"
          style={{ fontSize: sizePx }}
        >
          {value}
        </span>
        {unit && (
          // ベースライン揃えだと巨大な数字に対して沈んで見えるので少し持ち上げる
          <span className="relative -top-[14px] font-display text-[52px] font-extrabold text-foreground/25">
            {unit}
          </span>
        )}
      </div>

      {sub && (
        <p
          className="rise-in mt-6 max-w-[1150px] text-center font-display text-[46px] font-extrabold leading-tight tracking-tight text-foreground"
          style={{ animationDelay: "180ms" }}
        >
          {sub}
        </p>
      )}

      {caption && (
        <p
          className={`rise-in max-w-[1150px] text-center text-[29px] font-medium leading-relaxed text-foreground/55 ${
            sub ? "mt-7" : "mt-10"
          }`}
          style={{ animationDelay: "260ms" }}
        >
          {caption}
        </p>
      )}

      {chips && chips.length > 0 && (
        <div
          className="rise-in mt-8 flex items-center gap-7 rounded-full border border-foreground/10 bg-foreground/[0.02] px-10 py-5"
          style={{ animationDelay: "380ms" }}
        >
          {chips.map((chip, i) => (
            <Fragment key={chip.label}>
              {i > 0 && <span className="h-[24px] w-px bg-foreground/10" />}
              <span className="text-[24px] font-bold text-foreground/60">
                {chip.label}{" "}
                <span className="ml-1 tabular-nums text-accent">{chip.value}</span>
              </span>
            </Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
