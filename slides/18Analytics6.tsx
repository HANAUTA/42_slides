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
      <div className="flex w-full flex-col items-center gap-10">
        <ScreenshotFrame
          src="/firebase-overview.png"
          alt="Firebase Analytics の全体ダッシュボード"
          placeholderLabel="Firebase Analytics のスクショを置いてください"
        />

        <p
          className="rise-in max-w-[1250px] text-center text-[28px] font-medium leading-relaxed text-foreground/55"
          style={{ animationDelay: "200ms" }}
        >
          継続と定着まで積み上がると、こんな全体像になります。
          <br />
          次に自分のアプリを作るときは、
          <span className="font-bold text-accent">1行目から仕込もう。</span>
        </p>
      </div>
    </SlideLayout>
  );
}
