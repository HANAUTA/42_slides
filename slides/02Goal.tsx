import SlideLayout from "@/components/SlideLayout";
import CheckList, { type CheckItem } from "@/components/CheckList";
import Callout from "@/components/Callout";

const GOALS: CheckItem[] = [
  { label: "Flutterに触れてみる" },
  { label: "AIを使って開発してみる" },
  { label: "スマホ・ブラウザでアプリを動かす" },
  { label: "自分だけの機能を追加する" },
];

export default function Goal() {
  return (
    <SlideLayout title="今日のゴール 🚀" align="center">
      <p className="mb-10 text-[34px] font-medium text-foreground/60">
        今日この3時間で…
      </p>
      <CheckList items={GOALS} size="lg" />
      <div className="mt-12">
        <Callout>
          今日は勉強会ではなく、実際に手を動かして開発を楽しむ日です！
        </Callout>
      </div>
    </SlideLayout>
  );
}
