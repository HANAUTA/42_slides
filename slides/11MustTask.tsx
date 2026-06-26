import SlideLayout from "@/components/SlideLayout";
import Timer from "@/components/Timer";
import CheckList, { type CheckItem } from "@/components/CheckList";

const TASKS: CheckItem[] = [
  { label: "課題①  〇〇する", done: false },
  { label: "課題②  〇〇する", done: false },
  { label: "課題③  〇〇する", done: false },
];

export default function MustTask() {
  return (
    <SlideLayout title="必須課題" align="center">
      <div className="grid grid-cols-2 items-center gap-20">
        <div className="flex justify-center">
          <Timer seconds={40 * 60} size="md" />
        </div>
        <div>
          <p className="mb-8 text-[30px] font-semibold uppercase tracking-[0.2em] text-accent">
            Task List
          </p>
          <CheckList items={TASKS} size="lg" />
        </div>
      </div>
    </SlideLayout>
  );
}
