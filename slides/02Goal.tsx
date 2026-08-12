import SlideLayout from "@/components/SlideLayout";
import Callout from "@/components/Callout";

interface Stack {
  icon: string;
  label: string;
  role: string;
  desc: string;
}

const STACK: Stack[] = [
  {
    icon: "💙",
    label: "Flutter",
    role: "フロントエンド",
    desc: "アプリの画面をつくる",
  },
  {
    icon: "🗄️",
    label: "Supabase",
    role: "バックエンド",
    desc: "データの保存・取得をつくる",
  },
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
      <p className="rise-in text-center text-[27px] font-bold text-foreground/55">
        今日つくるのは、Flutter × Supabase で動く
        <span className="text-accent">Setlog風のSNSアプリ</span>
      </p>

      <div
        className="rise-in mt-8 grid grid-cols-2 gap-7"
        style={{ animationDelay: "90ms" }}
      >
        {STACK.map((s, i) => (
          <div
            key={s.label}
            className="rise-in flex items-center gap-7 rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-10 py-9"
            style={{ animationDelay: `${100 + i * 100}ms` }}
          >
            <span className="flex h-[76px] w-[76px] shrink-0 items-center justify-center rounded-2xl bg-accent/10 text-[38px]">
              {s.icon}
            </span>
            <div>
              <p className="font-display text-[30px] font-extrabold text-foreground">
                {s.label}
              </p>
              <p className="mt-1 font-display text-[19px] font-bold tracking-wide text-accent">
                {s.role}
              </p>
              <p className="mt-1 text-[19px] text-foreground/50">{s.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="rise-in mt-9" style={{ animationDelay: "420ms" }}>
        <Callout>
          ゴール：
          <span className="font-bold text-accent">
            「AIを使いながら、自分が作りたい簡単なサービスを自分で形にできる」
          </span>
        </Callout>
      </div>
    </SlideLayout>
  );
}
