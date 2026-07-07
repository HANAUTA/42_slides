import type { ReactNode } from "react";

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

/** 分析4枚共通の器。ダークシネマティック配色 + 更新ボタン/最終更新時刻/フォールバック表示を持つ。 */
export default function AnalyticsFrame({
  kicker,
  title,
  loading,
  isFallback,
  updatedAt,
  onRefresh,
  children,
}: AnalyticsFrameProps) {
  return (
    <div className="flex h-full w-full flex-col bg-[#0A0A0F] px-[150px] pb-[110px] pt-[150px]">
      <div className="flex shrink-0 items-start justify-between">
        <div>
          <p className="font-analytics text-[20px] font-bold uppercase tracking-[0.35em] text-[#D4FF4F]/70">
            {kicker}
          </p>
          <h2 className="mt-5 max-w-[1250px] text-[54px] font-bold leading-[1.2] text-white">
            {title}
          </h2>
        </div>

        <div className="flex flex-col items-end gap-3">
          <button
            type="button"
            onClick={onRefresh}
            className="flex items-center gap-2 rounded-full border border-[#2A2A35] bg-[#15151C] px-6 py-3 text-[16px] font-medium text-white/50 transition-colors hover:border-[#D4FF4F]/40 hover:text-[#D4FF4F]"
          >
            <RefreshIcon />
            更新
          </button>
          {isFallback && (
            <span className="rounded-full bg-[#D4FF4F]/10 px-4 py-1.5 text-[15px] font-bold text-[#D4FF4F]">
              ⚠ デモデータ表示中
            </span>
          )}
          {updatedAt && !loading && (
            <span className="font-analytics text-[15px] text-white/25">
              updated{" "}
              {updatedAt.toLocaleTimeString("ja-JP", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          )}
        </div>
      </div>

      <div className="flex flex-1 items-center justify-center">
        {loading ? (
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/10 border-t-[#D4FF4F]" />
        ) : (
          children
        )}
      </div>
    </div>
  );
}
