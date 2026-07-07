import SlideLayout from "@/components/SlideLayout";

interface Rule {
  icon: string;
  title: string;
  desc: string;
}

const RULES: Rule[] = [
  {
    icon: "🧃",
    title: "トイレ・飲み物は自由",
    desc: "席を立つのに許可はいりません",
  },
  {
    icon: "☕",
    title: "疲れたら自由に休憩OK",
    desc: "自分のペースで進めましょう",
  },
  {
    icon: "🙋",
    title: "困ったらスタッフへ！",
    desc: "詰まったら1人で悩まず即質問",
  },
  {
    icon: "🤖",
    title: "AIもどんどん活用してOK",
    desc: "現場でも使うスキル、遠慮なし",
  },
];

export default function Rules() {
  return (
    <SlideLayout title="安心して参加してください！" align="center">
      <div className="grid grid-cols-2 gap-8">
        {RULES.map((rule, i) => (
          <div
            key={rule.title}
            className="rise-in flex items-center gap-9 rounded-[28px] border border-foreground/[0.07] bg-foreground/[0.02] px-11 py-10"
            style={{ animationDelay: `${i * 90}ms` }}
          >
            <span className="flex h-[96px] w-[96px] shrink-0 items-center justify-center rounded-[24px] bg-accent/10 text-[52px]">
              {rule.icon}
            </span>
            <div>
              <p className="font-display text-[31px] font-bold text-foreground">
                {rule.title}
              </p>
              <p className="mt-2 text-[23px] text-foreground/50">{rule.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </SlideLayout>
  );
}
