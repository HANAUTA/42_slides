import SlideLayout from "@/components/SlideLayout";
import CheckList, { type CheckItem } from "@/components/CheckList";
import Callout from "@/components/Callout";

const CHECKLIST: CheckItem[] = [
  { label: "VSCode", done: true },
  { label: "Git", done: true },
  { label: "Chrome", done: true },
  { label: "Flutter SDK", done: true },
  { label: "リポジトリをClone", done: false },
  { label: "パッケージ取得", done: false },
  { label: "アプリ起動", done: false },
  { label: "動作確認", done: false },
];

export default function Setup() {
  return (
    <SlideLayout title="環境構築" align="center">
      <div className="mb-12">
        <Callout>
          今日の目標は
          <span className="font-bold text-accent">
            「ブラウザでアプリを起動すること！」
          </span>
        </Callout>
      </div>
      <CheckList items={CHECKLIST} columns={2} size="md" />
    </SlideLayout>
  );
}
