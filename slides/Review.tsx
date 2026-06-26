import SlideLayout from "@/components/SlideLayout";
import CheckList, { type CheckItem } from "@/components/CheckList";
import Callout from "@/components/Callout";

const ACHIEVEMENTS: CheckItem[] = [
  { label: "Flutterを触った" },
  { label: "AIを使って開発した" },
  { label: "GitHubを使った" },
  { label: "アプリを動かした" },
  { label: "チームで開発した" },
  { label: "発表した" },
];

export default function Review() {
  return (
    <SlideLayout title="今日できるようになったこと" align="center">
      <CheckList items={ACHIEVEMENTS} columns={2} size="lg" />
      <div className="mt-12">
        <Callout>
          <span className="font-bold text-accent">ここからがスタートです！</span>
        </Callout>
      </div>
    </SlideLayout>
  );
}
