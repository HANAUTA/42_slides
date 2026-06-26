import { Fragment } from "react";

export interface Step {
  label: string;
  duration?: string;
}

interface StepFlowProps {
  steps: (string | Step)[];
  direction?: "horizontal" | "vertical";
}

function normalize(step: string | Step): Step {
  return typeof step === "string" ? { label: step } : step;
}

export default function StepFlow({
  steps,
  direction = "horizontal",
}: StepFlowProps) {
  const items = steps.map(normalize);

  if (direction === "vertical") {
    return (
      <div className="mx-auto flex w-full max-w-[820px] flex-col items-stretch">
        {items.map((item, i) => (
          <Fragment key={item.label}>
            <div className="rounded-2xl border-2 border-accent/20 bg-accent/5 px-12 py-7 text-center text-[36px] font-semibold text-foreground">
              {item.label}
            </div>
            {i < items.length - 1 && (
              <div className="py-2 text-center text-[34px] leading-none text-accent/60">
                ↓
              </div>
            )}
          </Fragment>
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-start justify-between">
      {items.map((item, i) => (
        <Fragment key={item.label}>
          <div className="flex w-[170px] shrink-0 flex-col items-center gap-4">
            <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-accent text-[32px] font-bold text-white">
              {i + 1}
            </div>
            <span className="text-center text-[26px] font-semibold leading-tight text-foreground">
              {item.label}
            </span>
            {item.duration && (
              <span className="text-[22px] font-medium text-accent">
                {item.duration}
              </span>
            )}
          </div>
          {i < items.length - 1 && (
            <div className="mt-[37px] h-[3px] min-w-0 flex-1 rounded-full bg-accent/25" />
          )}
        </Fragment>
      ))}
    </div>
  );
}
