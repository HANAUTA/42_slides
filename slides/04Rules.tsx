import SlideLayout from "@/components/SlideLayout";
import Callout from "@/components/Callout";

const AI_FLOW = [
  "AIに指示を出す",
  "コードを書いてもらう",
  "動かしてみる",
  "エラーを一緒に直す",
];

interface Rule {
  icon: string;
  title: string;
  desc: string;
}

const RULES: Rule[] = [
  {
    icon: "🔗",
    title: "完成版アプリを参考にしてOK",
    desc: "URLを事前に共有済み。迷ったら触ってみよう",
  },
  {
    icon: "🧃",
    title: "トイレ・休憩は自由",
    desc: "席を立つのに許可はいりません",
  },
  {
    icon: "🙋",
    title: "困ったらスタッフへ！",
    desc: "詰まったら1人で悩まず即質問",
  },
];

export default function Rules() {
  return (
    <SlideLayout title="安心して参加してください！" align="center">
      <div className="rise-in">
        <Callout>
          3時間はかなり限られた時間。
          <span className="font-bold text-accent">
            すべての機能を作ろうとしたり、完成させることを目標にする必要はありません。
          </span>
        </Callout>
      </div>

      <div
        className="rise-in mt-11 flex flex-wrap items-center justify-center gap-4"
        style={{ animationDelay: "150ms" }}
      >
        {AI_FLOW.map((step, i) => (
          <div key={step} className="flex items-center gap-4">
            <span className="rounded-full bg-accent/10 px-7 py-4 font-display text-[22px] font-bold text-accent">
              {step}
            </span>
            {i < AI_FLOW.length - 1 && (
              <span className="text-[26px] text-foreground/25">→</span>
            )}
          </div>
        ))}
      </div>
      <p
        className="rise-in mt-4 text-center text-[21px] font-medium text-foreground/45"
        style={{ animationDelay: "220ms" }}
      >
        この一連の流れを体験することを大切にしてください
      </p>

      <div
        className="rise-in mt-11 grid grid-cols-3 gap-6"
        style={{ animationDelay: "300ms" }}
      >
        {RULES.map((rule, i) => (
          <div
            key={rule.title}
            className="rise-in flex flex-col items-center gap-4 rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-8 py-9 text-center"
            style={{ animationDelay: `${340 + i * 90}ms` }}
          >
            <span className="flex h-[72px] w-[72px] items-center justify-center rounded-2xl bg-accent/10 text-[34px]">
              {rule.icon}
            </span>
            <div>
              <p className="font-display text-[24px] font-bold text-foreground">
                {rule.title}
              </p>
              <p className="mt-1 text-[18px] text-foreground/50">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
