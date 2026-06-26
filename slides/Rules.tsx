import SlideLayout from "@/components/SlideLayout";
import CheckList, { type CheckItem } from "@/components/CheckList";

const RULES: CheckItem[] = [
  { label: "トイレ・飲み物は自由" },
  { label: "疲れたら自由に休憩OK" },
  { label: "困ったらスタッフへ！" },
  { label: "AIもどんどん活用してOK" },
  { label: "まずは自分で考えてみる" },
  { label: "楽しむことが一番！" },
];

export default function Rules() {
  return (
    <SlideLayout title="安心して参加してください！" align="center">
      <CheckList items={RULES} columns={2} size="lg" />
    </SlideLayout>
  );
}
