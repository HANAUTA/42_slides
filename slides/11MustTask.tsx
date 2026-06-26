import SlideLayout from "@/components/SlideLayout";
import Timer from "@/components/Timer";

interface Task {
  title: string;
  hint: string;
}

const TASKS: Task[] = [
  { title: "ログイン画面のUIの改善", hint: "簡単" },
  { title: "グループからの脱退", hint: "DB更新とAPIを理解する" },
  {
    title: "プロフ画面の作成、名前の編集",
    hint: "新しい画面を作成する",
  },
];

export default function MustTask() {
  return (
    <SlideLayout title="必須課題" align="center">
      <div className="grid grid-cols-2 items-center gap-20">
        <div className="flex justify-center">
          <Timer seconds={40 * 60} size="md" />
        </div>
        <div className="flex flex-col gap-6">
          {TASKS.map((task, i) => (
            <div
              key={task.title}
              className="rounded-2xl border-2 border-accent/15 bg-accent/5 px-10 py-7"
            >
              <div className="flex items-center gap-5">
                <span className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-full bg-accent text-[22px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[30px] font-semibold text-foreground">
                  {task.title}
                </span>
              </div>
              <p className="mt-3 pl-[68px] text-[24px] font-medium text-foreground/50">
                {task.hint}
              </p>
            </div>
          ))}
          <p className="mt-2 text-center text-[24px] font-medium text-foreground/40">
            デザインやどんな機能が必要か話し合おう
          </p>
        </div>
      </div>
    </SlideLayout>
  );
}
