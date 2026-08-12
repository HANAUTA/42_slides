import SlideLayout from "@/components/SlideLayout";
import Timer from "@/components/Timer";

interface Level {
  label: string;
  badgeClass: string;
  desc: string;
  detail: string;
}

const LEVELS: Level[] = [
  {
    label: "初級",
    badgeClass: "bg-emerald-400",
    desc: "Flutterのみで完結",
    detail: "画面変更やアニメーションに慣れる",
  },
  {
    label: "中級",
    badgeClass: "bg-amber-400",
    desc: "用意されたSupabaseを使う",
    detail: "既存データの読み取り・更新・集計を体験",
  },
  {
    label: "上級",
    badgeClass: "bg-rose-400",
    desc: "自分たちのSupabaseを作る",
    detail: "DB設計・リレーション・リアルタイム更新に挑戦",
  },
  {
    label: "実機",
    badgeClass: "bg-sky-400",
    desc: "スマホで動かしてみる",
    detail: "GitHub PagesでPWA公開 → 自分のスマホのブラウザで開くだけ",
  },
];

export default function FreeTask() {
  return (
    <SlideLayout title="自由課題・カスタマイズ" align="center">
      <div className="grid grid-cols-[1fr_1.25fr] items-center gap-16">
        <div className="rise-in flex justify-center">
          <Timer seconds={50 * 60} size="md" simple />
        </div>

        <div className="flex flex-col gap-5">
          {LEVELS.map((level, i) => (
            <div
              key={level.label}
              className="rise-in flex items-center gap-7 rounded-[22px] border border-foreground/[0.07] bg-foreground/[0.02] px-9 py-6"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <span
                className={`shrink-0 rounded-xl px-5 py-2 font-display text-[22px] font-bold text-white ${level.badgeClass}`}
              >
                {level.label}
              </span>
              <div>
                <p className="text-[27px] font-bold text-foreground">
                  {level.desc}
                </p>
                <p className="mt-1 text-[21px] text-foreground/50">
                  {level.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
