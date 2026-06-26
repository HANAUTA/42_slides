import SlideLayout from "@/components/SlideLayout";
import Timer from "@/components/Timer";

const LEVELS = [
  {
    label: "初級",
    color: "bg-emerald-400",
    desc: "Flutterのみで完結",
    detail: "DB・認証に触れず、画面変更やアニメーションに慣れる",
  },
  {
    label: "中級",
    color: "bg-amber-400",
    desc: "用意されたSupabaseを使う",
    detail: "既存データの読み取り・更新・集計を体験する",
  },
  {
    label: "上級",
    color: "bg-rose-400",
    desc: "自分たちのSupabaseを作る",
    detail: "DB設計・リレーション・リアルタイム更新まで挑戦",
  },
];

export default function FreeTask() {
  return (
    <SlideLayout title="自由課題・カスタマイズ" align="center">
      <div className="grid grid-cols-2 items-center gap-16">
        <div className="flex justify-center">
          <Timer seconds={50 * 60} size="md" />
        </div>
        <div className="flex flex-col gap-6">
          {LEVELS.map((level) => (
            <div
              key={level.label}
              className="rounded-2xl border border-foreground/8 bg-foreground/[0.02] px-9 py-6"
            >
              <div className="flex items-center gap-4">
                <span
                  className={`rounded-lg px-4 py-1 text-[22px] font-bold text-white ${level.color}`}
                >
                  {level.label}
                </span>
                <span className="text-[28px] font-semibold text-foreground">
                  {level.desc}
                </span>
              </div>
              <p className="mt-3 pl-1 text-[22px] text-foreground/50">
                {level.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
