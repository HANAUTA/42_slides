"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import StatNumber from "@/components/analytics/StatNumber";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computeOverview } from "@/lib/analytics";

export default function Analytics4() {
  const { events, loading, isFallback, updatedAt, refresh } = useAnalyticsEvents();
  const overview = events ? computeOverview(events) : null;
  const avgPlays =
    overview && overview.totalPosts > 0 ? overview.totalPlays / overview.totalPosts : 0;

  return (
    <AnalyticsFrame
      kicker="Data Drop · 04 / Final"
      title={
        <>
          作る人1人に、
          <br />
          見る人{overview ? Math.round(avgPlays) : "—"}人。
        </>
      }
      loading={loading}
      isFallback={isFallback}
      updatedAt={updatedAt}
      onRefresh={refresh}
    >
      {overview && (
        <div className="flex w-full flex-col items-center gap-16">
          <div className="flex items-center gap-20">
            <StatNumber
              value={overview.totalPosts.toLocaleString()}
              label="POSTED"
              sizePx={150}
            />
            <span className="font-analytics text-[64px] font-bold text-white/20">→</span>
            <StatNumber
              value={overview.totalPlays.toLocaleString()}
              label="PLAYED"
              accent
              sizePx={150}
            />
          </div>

          <p className="max-w-[1250px] text-center text-[28px] font-medium leading-relaxed text-white/55">
            世に広めるとは、この&ldquo;見る側&rdquo;の数字を伸ばすこと。その第一歩が計測。
            <br />
            次に自分のアプリを作るときは、
            <span className="font-bold text-[#D4FF4F]">1行目から仕込もう。</span>
          </p>
        </div>
      )}
    </AnalyticsFrame>
  );
}
