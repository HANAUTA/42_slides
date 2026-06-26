import SlideLayout from "@/components/SlideLayout";
import StepFlow from "@/components/StepFlow";
import type { Step } from "@/components/StepFlow";

const STEPS: Step[] = [
  { label: "オープニング", duration: "10分" },
  { label: "環境構築", duration: "45分" },
  { label: "必須課題", duration: "40分" },
  { label: "休憩", duration: "5分" },
  { label: "自由課題", duration: "50分" },
  { label: "発表", duration: "15分" },
  { label: "振り返り", duration: "15分" },
];

export default function Flow() {
  return (
    <SlideLayout title="今日のスケジュール" align="center">
      <StepFlow steps={STEPS} />
    </SlideLayout>
  );
}
