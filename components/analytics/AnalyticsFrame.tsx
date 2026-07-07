import type { ReactNode } from "react";
import SlideLayout from "@/components/SlideLayout";

interface AnalyticsFrameProps {
  kicker: string;
  title: ReactNode;
  loading: boolean;
  isFallback: boolean;
  updatedAt: Date | null;
  onRefresh: () => void;
  children: ReactNode;
}

function RefreshIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-[18px] w-[18px]">
      <path
        d="M20 11A8 8 0 1 0 18.5 15.5M20 11V5M20 11H14"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** 分析4枚共通の器。通常スライドと同じ余白・見出しに更新表示を添える。 */
export default function AnalyticsFrame({
  kicker,
  title,
  loading,
  isFallback,
  updatedAt,
  onRefresh,
  children,
}: AnalyticsFrameProps) {
  const aside = (
    <div className="flex flex-col items-end gap-3">
      <p className="font-display text-[18px] font-bold tracking-[0.18em] text-accent/75">
        {kicker}
      </p>
      <button
        type="button"
        onClick={onRefresh}
        className="pointer-events-auto flex items-center gap-2 rounded-full border border-foreground/10 bg-foreground/[0.02] px-6 py-3 text-[16px] font-bold text-foreground/50 transition-colors hover:border-accent/35 hover:text-accent"
      >
        <RefreshIcon />
        更新
      </button>
      {isFallback && (
        <span className="rounded-full bg-accent/10 px-4 py-1.5 text-[15px] font-bold text-accent">
          デモデータ表示中
        </span>
      )}
      {updatedAt && !loading && (
        <span className="font-mono text-[15px] text-foreground/30">
          updated{" "}
          {updatedAt.toLocaleTimeString("ja-JP", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </span>
      )}
    </div>
  );

  return (
    <SlideLayout title={title} aside={aside}>
      <div className="flex w-full flex-1 items-center justify-center">
        {loading ? (
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-foreground/10 border-t-accent" />
        ) : (
          children
        )}
      </div>
    </SlideLayout>
  );
}
