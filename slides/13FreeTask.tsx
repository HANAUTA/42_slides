import SlideLayout from "@/components/SlideLayout";
import Timer from "@/components/Timer";

const IDEAS = [
  "デザイン変更",
  "ダークモード",
  "API 追加",
  "アニメーション",
  "通知",
  "オリジナル機能",
  "AIで新機能を考える",
];

export default function FreeTask() {
  return (
    <SlideLayout title="自由課題・カスタマイズ" align="center">
      <div className="grid grid-cols-2 items-center gap-20">
        <div className="flex justify-center">
          <Timer seconds={50 * 60} size="md" />
        </div>
        <div className="grid grid-cols-1 gap-y-3">
          {IDEAS.map((idea) => (
            <div key={idea} className="flex items-center gap-5">
              <span className="text-[34px] leading-none text-accent">⭐</span>
              <span className="text-[32px] font-medium text-foreground">
                {idea}
              </span>
            </div>
          ))}
        </div>
      </div>
    </SlideLayout>
  );
}
