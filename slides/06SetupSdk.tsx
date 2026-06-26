import SlideLayout from "@/components/SlideLayout";
import StepFlow from "@/components/StepFlow";

const STEPS = ["① ダウンロード", "② 解凍", "③ PATH 設定"];

export default function SetupSdk() {
  return (
    <SlideLayout title="Flutter SDK を準備" align="center">
      <StepFlow steps={STEPS} direction="vertical" />
    </SlideLayout>
  );
}
