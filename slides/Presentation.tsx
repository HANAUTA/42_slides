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
    <SlideLayout title="発表タイム" align="center">
      <div className="flex flex-col gap-1">
        {TOPICS.map((topic, i) => (
          <div key={topic} className="flex items-center gap-7 py-3">
            <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-accent text-[28px] font-bold text-white">
              {i + 1}
            </span>
            <span className="text-[36px] font-medium text-foreground">
              {topic}
            </span>
          </div>
        ))}
      </div>
      <p className="mt-12 text-[28px] font-medium text-foreground/45">
        ※ 1チーム3分程度
      </p>
    </SlideLayout>
  );
}
