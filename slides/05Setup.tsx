import SlideLayout from "@/components/SlideLayout";
import Callout from "@/components/Callout";

interface SetupStep {
  num: string;
  title: string;
  desc: string;
  optional?: boolean;
}

const STEPS: SetupStep[] = [
  { num: "1", title: "Flutter を入れる", desc: "flutter doctor でチェック" },
  {
    num: "2",
    title: "チームのリポジトリ",
    desc: "代表者が作成 → 全員で clone",
  },
  { num: "3", title: "アプリを起動", desc: ".env を設定して flutter run" },
  {
    num: "4",
    title: "Claude Code",
    desc: "AI開発の相棒をセットアップ",
    optional: true,
  },
];

export default function Setup() {
  return (
    <SlideLayout title="環境構築" align="center">
      <div className="rise-in mb-12">
        <Callout>
          🎯 ゴールは
          <span className="font-bold text-accent">
            「Chrome でアプリが起動する」
          </span>
          こと。上から順にコピペしていけば動きます！
        </Callout>
      </div>

      <div className="grid grid-cols-4 gap-7">
        {STEPS.map((step, i) => (
          <div
            key={step.num}
            className="rise-in relative flex flex-col rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-8 py-9"
            style={{ animationDelay: `${120 + i * 90}ms` }}
          >
            {step.optional && (
              <span className="absolute right-5 top-5 rounded-full bg-foreground/[0.06] px-4 py-1 font-display text-[17px] font-bold text-foreground/45">
                任意
              </span>
            )}
            <span className="flex h-[64px] w-[64px] items-center justify-center rounded-full bg-accent font-display text-[28px] font-extrabold text-white shadow-lg shadow-accent/25">
              {step.num}
            </span>
            <p className="mt-6 font-display text-[27px] font-bold leading-tight text-foreground">
              {step.title}
            </p>
            <p className="mt-3 text-[21px] leading-relaxed text-foreground/50">
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      <p
        className="rise-in mt-11 text-center text-[22px] font-medium text-foreground/45"
        style={{ animationDelay: "500ms" }}
      >
        VS Code・Chrome・Git・GitHub アカウントは
        <span className="font-bold text-foreground/60">事前準備ガイド</span>
        で用意済みの前提です
      </p>
    </SlideLayout>
  );
}
