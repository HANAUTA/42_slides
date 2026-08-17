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
      <div className="mx-auto flex w-[760px] flex-col gap-2">
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
    </SlideLayout>
  );
}
