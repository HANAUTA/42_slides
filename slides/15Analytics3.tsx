"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import BigStat from "@/components/analytics/BigStat";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computeRetakeStats } from "@/lib/analytics";

export default function Analytics3() {
  const { events, loading, isFallback, updatedAt, refresh } = useAnalyticsEvents();
  const stats = events ? computeRetakeStats(events) : null;

  return (
    <AnalyticsFrame
      kicker="Data Drop · 03"
      title="一番粘った人"
      loading={loading}
      isFallback={isFallback}
      updatedAt={updatedAt}
      onRefresh={refresh}
    >
      {stats &&
        (stats.totalPosts === 0 ? (
          <p className="text-[28px] text-foreground/35">まだ投稿がありません</p>
        ) : (
          <BigStat
            label="1本の動画での最多の撮り直し回数"
            value={String(stats.max)}
            unit="回"
            caption={
              <>
                完璧を求める気持ちは、こうしてデータに出ます。でも——
                <br />
                <span className="font-bold text-accent">Done is better than perfect.</span>
              </>
            }
            chips={[
              { label: "一発OKだった投稿", value: `${stats.firstTryRate}%` },
              { label: "平均の撮り直し", value: `${stats.average.toFixed(1)}回` },
            ]}
          />
        ))}
    </AnalyticsFrame>
  );
}
