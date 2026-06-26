import SlideLayout from "@/components/SlideLayout";
import CheckList, { type CheckItem } from "@/components/CheckList";

const EXTENSIONS: CheckItem[] = [
  { label: "VSCode" },
  { label: "Flutter Extension" },
  { label: "Dart Extension" },
];

export default function SetupEditor() {
  return (
    <SlideLayout title="エディタ設定" align="center">
      <div className="mx-auto w-full max-w-[760px]">
        <CheckList items={EXTENSIONS} size="lg" />
      </div>
    </SlideLayout>
  );
}
