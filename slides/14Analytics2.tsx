"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import BigStat from "@/components/analytics/BigStat";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computePlayStats } from "@/lib/analytics";

export default function Analytics2() {
  const { events, loading, isFallback, updatedAt, refresh } = useAnalyticsEvents();
  const stats = events ? computePlayStats(events) : null;

  return (
    <AnalyticsFrame
      kicker="Data Drop · 02"
      title={
        <>
          作ったものは、
          <br />
          ちゃんと見られた
        </>
      }
      loading={loading}
      isFallback={isFallback}
      updatedAt={updatedAt}
      onRefresh={refresh}
    >
      {stats && (
        <BigStat
          label="動画が再生された回数"
          value={stats.totalPlays.toLocaleString()}
          unit="回"
          caption={
            <>
              <br />
              この回数だけ、
              <span className="font-bold text-accent">誰かの画面で動画が動いています。</span>
            </>
          }
          chips={[
            { label: "投稿された動画", value: `${stats.totalPosts.toLocaleString()}本` },
            { label: "1本あたりの再生", value: `${stats.averagePlays.toFixed(1)}回` },
          ]}
        />
      )}
    </AnalyticsFrame>
  );
}
