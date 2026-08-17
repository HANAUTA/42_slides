import { Fragment } from "react";
import { PHASES } from "@/data/phases";

interface PhaseStepperProps {
  /** 現在のフェーズ index（0-4）。undefined ならステッパーごと非表示 */
  current?: number;
  theme?: "light" | "dark";
}

/** 全スライド共通のミニ進捗表示。参加者がいつでも現在地を把握できるようにする。 */
export default function PhaseStepper({ current, theme = "light" }: PhaseStepperProps) {
  if (current === undefined) return null;

  const dark = theme === "dark";

  return (
    <div className="flex items-start">
      {PHASES.map((phase, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <Fragment key={phase.label}>
            <div className="flex flex-col items-center gap-2">
              <span
                className={`h-[12px] w-[12px] rounded-full transition-colors ${
                  active
                    ? dark
                      ? "bg-[#D4FF4F] shadow-[0_0_0_5px_rgba(212,255,79,0.18)]"
                      : "bg-accent shadow-[0_0_0_5px_rgba(74,173,228,0.16)]"
                    : done
                      ? dark
                        ? "bg-[#D4FF4F]/40"
                        : "bg-accent/45"
                      : dark
                        ? "border-2 border-white/15 bg-transparent"
                        : "border-2 border-foreground/15 bg-white"
                }`}
              />
              <span
                className={`whitespace-nowrap text-[16px] font-bold ${
                  active
                    ? dark
                      ? "text-[#D4FF4F]"
                      : "text-accent"
                    : done
                      ? dark
                        ? "text-white/35"
                        : "text-foreground/35"
                      : dark
                        ? "text-white/20"
                        : "text-foreground/20"
                }`}
              >
                {phase.label}
              </span>
            </div>
            {i < PHASES.length - 1 && (
              <div
                className={`mx-3 mt-[5px] h-[2px] w-[76px] rounded-full ${
                  done
                    ? dark
                      ? "bg-[#D4FF4F]/30"
                      : "bg-accent/35"
                    : dark
                      ? "bg-white/10"
                      : "bg-foreground/10"
                }`}
              />
            )}
          </Fragment>
        );
      })}
    </div>
  );
}
