import SlideLayout from "@/components/SlideLayout";
import CheckList, { type CheckItem } from "@/components/CheckList";
import Callout from "@/components/Callout";

const DONE: CheckItem[] = [
  { label: "VSCode", done: true },
  { label: "Git", done: true },
  { label: "Chrome", done: true },
];

const TODO: CheckItem[] = [
  { label: "flutter", done: false },
  { label: "git Clone", done: false },
  { label: "アプリ起動", done: false },
  { label: "動作確認", done: false },
];

export default function Setup() {
  return (
    <SlideLayout title="環境構築" align="center">
      <div className="mb-12">
        <Callout>
          目標は
          <span className="font-bold text-accent">
            「ブラウザでアプリを起動すること！」
          </span>
        </Callout>
      </div>
      <div className="grid grid-cols-2 gap-16">
        <div>
          <p className="mb-6 text-[24px] font-semibold text-foreground/40">
            インストール済み
          </p>
          <CheckList items={DONE} size="md" />
        </div>
        <div>
          <p className="mb-6 text-[24px] font-semibold text-accent">
            これからやること
          </p>
          <CheckList items={TODO} size="md" />
        </div>
      </div>
    </SlideLayout>
  );
}
