import SlideLayout from "@/components/SlideLayout";
import Callout from "@/components/Callout";

interface Goal {
  icon: string;
  label: string;
}

const GOALS: Goal[] = [
  { icon: "💙", label: "Flutterに触れてみる" },
  { icon: "🤖", label: "AIを使って開発してみる" },
  { icon: "📱", label: "スマホ・ブラウザでアプリを動かす" },
  { icon: "✨", label: "自分だけの機能を追加する" },
];

export default function Goal() {
  return (
    <SlideLayout
      title="今日のゴール"
      aside={
        <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
          3時間でここまで！
        </span>
      }
      align="center"
    >
      <div className="grid grid-cols-2 gap-7">
        {GOALS.map((goal, i) => (
          <div
            key={goal.label}
            className="rise-in flex items-center gap-8 rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-10 py-9"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-[38px]">
              {goal.icon}
            </span>
            <span className="text-[31px] font-bold text-foreground">
              {goal.label}
            </span>
          </div>
        ))}
      </div>

      <div className="rise-in mt-12" style={{ animationDelay: "400ms" }}>
        <Callout>
          今日は勉強会ではなく、
          <span className="font-bold text-accent">
            実際に手を動かして開発を楽しむ日
          </span>
          です！
        </Callout>
      </div>
    </SlideLayout>
  );
}
