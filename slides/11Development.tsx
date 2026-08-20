import SlideLayout from "@/components/SlideLayout";
import Timer from "@/components/Timer";

interface Task {
  title: string;
  hint: string;
  level: { label: string; className: string };
}

/** STEP1：全員が通る必須課題 */
const TASKS: Task[] = [
  {
    title: "ログイン画面のUIの改善",
    hint: "まずはここから。見た目を変えて感覚をつかむ",
    level: { label: "かんたん", className: "bg-emerald-100 text-emerald-600" },
  },
  {
    title: "グループからの脱退",
    hint: "DB更新とAPIの流れを理解する",
    level: { label: "ふつう", className: "bg-amber-100 text-amber-600" },
  },
  {
    title: "プロフ画面の作成、名前の編集",
    hint: "新しい画面をゼロから作る",
    level: { label: "チャレンジ", className: "bg-rose-100 text-rose-500" },
  },
];

interface Level {
  label: string;
  badgeClass: string;
  desc: string;
  detail: string;
}

/** STEP2：必須課題のあとに好きなものを選ぶ自由課題 */
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
    detail: "GitHub Pagesで公開 → 自分のスマホで開くだけ",
  },
];

/** セクション見出し（STEP番号 + タイトル + ひとこと） */
function StepHeading({
  step,
  title,
  note,
}: {
  step: number;
  title: string;
  note: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span className="font-display text-[26px] font-extrabold text-accent">
        STEP {step}
      </span>
      <span className="font-display text-[32px] font-extrabold tracking-tight text-foreground">
        {title}
      </span>
      <span className="text-[20px] font-medium text-foreground/40">{note}</span>
    </div>
  );
}

export default function Development() {
  return (
    <SlideLayout
      title="開発"
      aside={
        <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
          100分
        </span>
      }
      align="center"
    >
      <div className="grid grid-cols-[420px_1fr_1fr] items-center gap-14">
        <div className="rise-in flex justify-center">
          <Timer seconds={100 * 60} size="sm" simple />
        </div>

        {/* STEP1 必須課題 */}
        <div className="flex flex-col gap-5">
          <StepHeading step={1} title="共通課題" note="まずは全員ここまで" />
          {TASKS.map((task, i) => (
            <div
              key={task.title}
              className="rise-in rounded-[22px] border border-foreground/[0.07] bg-foreground/[0.02] px-7 py-5"
              style={{ animationDelay: `${i * 100}ms` }}
            >
              <div className="flex items-center gap-4">
                <span className="flex h-[40px] w-[40px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[19px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="flex-1 text-balance text-[24px] font-bold leading-tight text-foreground">
                  {task.title}
                </span>
                <span
                  className={`shrink-0 rounded-full px-4 py-1 font-display text-[17px] font-bold ${task.level.className}`}
                >
                  {task.level.label}
                </span>
              </div>
              <p className="mt-2 pl-[56px] text-[19px] text-foreground/50">
                {task.hint}
              </p>
            </div>
          ))}
          <p
            className="rise-in text-center text-[20px] font-medium text-foreground/40"
            style={{ animationDelay: "340ms" }}
          >
            💬 デザインやどんな機能が必要か、チームで話し合おう
          </p>
        </div>

        {/* STEP2 自由課題 */}
        <div className="flex flex-col gap-5">
          <StepHeading
            step={2}
            title="自由課題"
            note="終わったら好きなものを"
          />
          {LEVELS.map((level, i) => (
            <div
              key={level.label}
              className="rise-in flex items-center gap-5 rounded-[22px] border border-foreground/[0.07] bg-foreground/[0.02] px-7 py-4"
              style={{ animationDelay: `${300 + i * 100}ms` }}
            >
              <span
                className={`shrink-0 rounded-xl px-4 py-1.5 font-display text-[19px] font-bold text-white ${level.badgeClass}`}
              >
                {level.label}
              </span>
              <div className="min-w-0">
                <p className="text-[24px] font-bold leading-tight text-foreground">
                  {level.desc}
                </p>
                <p className="mt-1 text-[19px] leading-snug text-foreground/50">
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
