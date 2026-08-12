import SlideLayout from "@/components/SlideLayout";
import Timer from "@/components/Timer";

interface Task {
  title: string;
  hint: string;
  level: { label: string; className: string };
}

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

export default function MustTask() {
  return (
    <SlideLayout title="必須課題" align="center">
      <div className="grid grid-cols-[1fr_1.2fr] items-center gap-20">
        <div className="rise-in flex justify-center">
          <Timer seconds={40 * 60} size="md" simple />
        </div>

        <div className="flex flex-col gap-6">
          {TASKS.map((task, i) => (
            <div
              key={task.title}
              className="rise-in rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-10 py-7"
              style={{ animationDelay: `${i * 110}ms` }}
            >
              <div className="flex items-center gap-5">
                <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[22px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="flex-1 text-[29px] font-bold text-foreground">
                  {task.title}
                </span>
                <span
                  className={`rounded-full px-5 py-1.5 font-display text-[20px] font-bold ${task.level.className}`}
                >
                  {task.level.label}
                </span>
              </div>
              <p className="mt-3 pl-[68px] text-[23px] text-foreground/50">
                {task.hint}
              </p>
            </div>
          ))}
          <p
            className="rise-in mt-1 text-center text-[23px] font-medium text-foreground/40"
            style={{ animationDelay: "380ms" }}
          >
            💬 デザインやどんな機能が必要か、チームで話し合おう
          </p>
        </div>
      </div>
    </SlideLayout>
  );
}
