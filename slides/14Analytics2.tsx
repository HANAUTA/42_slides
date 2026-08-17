"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import Timeline from "@/components/analytics/Timeline";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computeTimeline } from "@/lib/analytics";

export default function Analytics2() {
  const { events, loading, isFallback, updatedAt, refresh } = useAnalyticsEvents();
  const timeline = events ? computeTimeline(events) : [];

  return (
    <AnalyticsFrame
      kicker="Data Drop · 02"
      title="今日という日の心電図"
      loading={loading}
      isFallback={isFallback}
      updatedAt={updatedAt}
      onRefresh={refresh}
    >
      <div className="w-full max-w-[1600px]">
        <Timeline points={timeline} />
      </div>
    </AnalyticsFrame>
  );
}
