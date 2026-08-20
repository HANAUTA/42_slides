"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import BigStat from "@/components/analytics/BigStat";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computeOverview } from "@/lib/analytics";

export default function Analytics1() {
  const { events, loading, isFallback, updatedAt, refresh } = useAnalyticsEvents();
  const overview = events ? computeOverview(events) : null;

  return (
    <AnalyticsFrame
      kicker="Data Drop · 01"
      title={
        <>
          この3時間、
          <br />
          全部記録されてました
        </>
      }
      loading={loading}
      isFallback={isFallback}
      updatedAt={updatedAt}
      onRefresh={refresh}
    >
      {overview && (
        <BigStat
          label="記録されたイベントの数"
          value={overview.totalEvents.toLocaleString()}
          unit="件"
          caption={
            <>
              みなさんがアプリで起こした行動の数。
              <br />
              グループを作った・入った・投稿した・再生した、その
              <span className="font-bold text-accent">全部</span>が数えられています。
            </>
          }
          chips={[
            { label: "参加者", value: `${overview.totalUsers}人` },
            { label: "記録された期間", value: overview.rangeLabel ?? "—" },
          ]}
        />
      )}
    </AnalyticsFrame>
  );
}
