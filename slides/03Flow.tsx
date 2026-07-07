import { Fragment } from "react";
import SlideLayout from "@/components/SlideLayout";

interface Step {
  label: string;
  duration: string;
  /** ハイライト表示（休憩など性質が違うもの） */
  soft?: boolean;
}

const STEPS: Step[] = [
  { label: "オープニング", duration: "10分" },
  { label: "環境構築", duration: "45分" },
  { label: "必須課題", duration: "40分" },
  { label: "休憩", duration: "5分", soft: true },
  { label: "自由課題", duration: "50分" },
  { label: "発表", duration: "15分" },
  { label: "振り返り", duration: "15分" },
];

export default function Flow() {
  return (
    <SlideLayout
      title="今日のスケジュール"
      aside={
        <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
          計 3時間
        </span>
      }
      align="center"
    >
      <div className="flex items-start justify-between">
        {STEPS.map((step, i) => (
          <Fragment key={step.label}>
            <div
              className="rise-in flex w-[172px] shrink-0 flex-col items-center gap-5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div
                className={`flex h-[84px] w-[84px] items-center justify-center rounded-full font-display text-[34px] font-extrabold ${
                  step.soft
                    ? "border-2 border-accent/30 bg-white text-accent"
                    : "bg-accent text-white shadow-lg shadow-accent/25"
                }`}
              >
                {step.soft ? "☕" : i + 1}
              </div>
              <span className="text-center font-display text-[27px] font-bold leading-tight text-foreground">
                {step.label}
              </span>
              <span className="rounded-full bg-accent/10 px-5 py-1 font-display text-[22px] font-bold text-accent">
                {step.duration}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div className="mt-[41px] h-[3px] min-w-0 flex-1 rounded-full bg-accent/20" />
            )}
          </Fragment>
        ))}
      </div>
    </SlideLayout>
  );
}
