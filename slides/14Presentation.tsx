import SlideLayout from "@/components/SlideLayout";

const TOPICS = [
  "作ったもの",
  "工夫したところ",
  "苦労したところ",
  "AIをどう活用したか",
  "今後やってみたいこと",
];

export default function Presentation() {
  return (
    <SlideLayout title="発表タイム 🎤" align="center">
      <div className="grid grid-cols-[1.35fr_1fr] items-center gap-20">
        <div className="flex flex-col gap-2">
          {TOPICS.map((topic, i) => (
            <div
              key={topic}
              className="rise-in flex items-center gap-7 py-3"
              style={{ animationDelay: `${i * 90}ms` }}
            >
              <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[26px] font-bold text-white shadow-lg shadow-accent/25">
                {i + 1}
              </span>
              <span className="text-[34px] font-bold text-foreground">
                {topic}
              </span>
            </div>
          ))}
        </div>

        <div
          className="rise-in flex flex-col items-center rounded-[32px] border-2 border-accent/20 bg-accent/[0.04] px-12 py-14"
          style={{ animationDelay: "300ms" }}
        >
          <span className="text-[44px]">⏱</span>
          <span className="mt-4 font-display text-[96px] font-extrabold leading-none text-accent">
            3分
          </span>
          <span className="mt-4 text-[26px] font-medium text-foreground/55">
            1チームあたり
          </span>
          <p className="mt-8 border-t border-accent/15 pt-7 text-center text-[22px] leading-relaxed text-foreground/45">
            完璧じゃなくてOK。
            <br />
            動かなかった話も立派なネタです
          </p>
        </div>
      </div>
    </SlideLayout>
  );
}
