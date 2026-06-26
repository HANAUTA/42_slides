import SlideLayout from "@/components/SlideLayout";
import StepFlow from "@/components/StepFlow";

const STEPS = [
  "オープニング",
  "環境構築",
  "必須課題",
  "休憩",
  "自由課題",
  "発表",
  "振り返り",
];

export default function Flow() {
  return (
    <SlideLayout title="今日のスケジュール" align="center">
      <StepFlow steps={STEPS} />
    </SlideLayout>
  );
}
