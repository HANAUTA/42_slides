import { Fragment } from "react";
import SlideLayout from "@/components/SlideLayout";
import { PHASES } from "@/data/phases";

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
        {PHASES.map((phase, i) => (
          <Fragment key={phase.label}>
            <div
              className="rise-in flex w-[200px] shrink-0 flex-col items-center gap-5"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className="flex h-[84px] w-[84px] items-center justify-center rounded-full bg-accent font-display text-[34px] font-extrabold text-white shadow-lg shadow-accent/25">
                {i + 1}
              </div>
              <span className="text-center font-display text-[27px] font-bold leading-tight text-foreground">
                {phase.label}
              </span>
              <span className="rounded-full bg-accent/10 px-5 py-1 font-display text-[22px] font-bold text-accent">
                {phase.duration}
              </span>
            </div>
            {i < PHASES.length - 1 && (
              <div className="mt-[41px] h-[3px] min-w-0 flex-1 rounded-full bg-accent/20" />
            )}
          </Fragment>
        ))}
      </div>
    </SlideLayout>
  );
}
