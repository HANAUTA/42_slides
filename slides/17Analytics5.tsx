import SlideLayout from "@/components/SlideLayout";
import ScreenshotFrame from "@/components/analytics/ScreenshotFrame";

export default function Analytics5() {
  return (
    <SlideLayout
      title="測る仕組みは、他にもある"
      aside={
        <p className="font-display text-[18px] font-bold tracking-[0.18em] text-accent/75">
          Data Drop · 05
        </p>
      }
    >
      <div className="flex w-full justify-center">
        <ScreenshotFrame
          src="/firebase-realtime.png"
          alt="Firebase Analytics のリアルタイムダッシュボード"
          placeholderLabel="Firebase Analytics のスクショを置いてください"
        />
      </div>
    </SlideLayout>
  );
}
