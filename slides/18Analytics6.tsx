import SlideLayout from "@/components/SlideLayout";
import ScreenshotFrame from "@/components/analytics/ScreenshotFrame";

export default function Analytics6() {
  return (
    <SlideLayout
      title="続けて測ると、こう見える"
      aside={
        <p className="font-display text-[18px] font-bold tracking-[0.18em] text-accent/75">
          Data Drop · 06 / Final
        </p>
      }
    >
      <div className="flex w-full justify-center">
        <ScreenshotFrame
          src="/firebase-overview.png"
          alt="Firebase Analytics の全体ダッシュボード"
          placeholderLabel="Firebase Analytics のスクショを置いてください"
        />
      </div>
    </SlideLayout>
  );
}
