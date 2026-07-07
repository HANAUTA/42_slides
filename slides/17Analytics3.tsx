"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import RetakeHistogram from "@/components/analytics/RetakeHistogram";
import StatNumber from "@/components/analytics/StatNumber";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computeRetakeStats } from "@/lib/analytics";

export default function Analytics3() {
  const { events, loading, isFallback, updatedAt, refresh } = useAnalyticsEvents();
  const stats = events ? computeRetakeStats(events) : null;

  return (
    <AnalyticsFrame
      kicker="Data Drop · 03"
      title="撮り直しの真実"
      loading={loading}
      isFallback={isFallback}
      updatedAt={updatedAt}
      onRefresh={refresh}
    >
      {stats &&
        (stats.totalPosts === 0 ? (
          <p className="text-[28px] text-foreground/35">まだ投稿がありません</p>
        ) : (
          <div className="flex w-full flex-col items-center gap-14">
            <div className="grid grid-cols-3 gap-16">
              <StatNumber
                value={`${stats.firstTryRate}%`}
                label="一発OK率"
                accent
                sizePx={96}
              />
              <StatNumber
                value={stats.average.toFixed(1)}
                label="平均撮り直し回数"
                sizePx={96}
              />
              <StatNumber value={String(stats.max)} label="最多撮り直し回数" sizePx={96} />
            </div>

            <div className="w-full max-w-[1300px]">
              <RetakeHistogram histogram={stats.histogram} max={stats.max} />
            </div>

            <p className="max-w-[1100px] text-center text-[26px] font-medium leading-relaxed text-foreground/55">
              完璧を求める気持ちはデータに出る。でも
              <span className="font-bold text-accent">
                Done is better than perfect.
              </span>
            </p>
          </div>
        ))}
    </AnalyticsFrame>
  );
}
