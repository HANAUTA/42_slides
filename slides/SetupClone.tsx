import SlideLayout from "@/components/SlideLayout";
import CodeBlock from "@/components/CodeBlock";

const COMMANDS = ["git clone <repository-url>", "cd project", "flutter pub get"];

export default function SetupClone() {
  return (
    <SlideLayout title="GitHub からコード取得" align="center">
      <div className="mx-auto w-full max-w-[1100px]">
        <CodeBlock lines={COMMANDS} />
      </div>
    </SlideLayout>
  );
}
