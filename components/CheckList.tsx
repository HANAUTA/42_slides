import type { ReactNode } from "react";

export interface CheckItem {
  label: ReactNode;
  /** false で未チェック（空の丸）として表示。デフォルトはチェック済み */
  done?: boolean;
}

interface CheckListProps {
  items: CheckItem[];
  columns?: 1 | 2;
  size?: "md" | "lg";
}

const SIZE = {
  md: { text: "text-[32px]", icon: "h-[42px] w-[42px]", gap: "gap-5", row: "py-3" },
  lg: { text: "text-[40px]", icon: "h-[50px] w-[50px]", gap: "gap-6", row: "py-[14px]" },
} as const;

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[55%] w-[55%]">
      <path
        d="M5 13l4 4L19 7"
        stroke="#ffffff"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function CheckList({
  items,
  columns = 1,
  size = "md",
}: CheckListProps) {
  const s = SIZE[size];
  return (
    <div
      className={`grid gap-y-1 ${
        columns === 2 ? "grid-cols-2 gap-x-24" : "grid-cols-1"
      }`}
    >
      {items.map((item, i) => {
        const done = item.done !== false;
        return (
          <div key={i} className={`flex items-center ${s.gap} ${s.row}`}>
            <span
              className={`flex ${s.icon} shrink-0 items-center justify-center rounded-full ${
                done ? "bg-accent" : "border-2 border-foreground/20"
              }`}
            >
              {done && <CheckIcon />}
            </span>
            <span
              className={`${s.text} font-medium ${
                done ? "text-foreground" : "text-foreground/40"
              }`}
            >
              {item.label}
            </span>
          </div>
        );
      })}
    </div>
  );
}
