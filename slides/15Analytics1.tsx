"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import StatNumber from "@/components/analytics/StatNumber";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computeOverview, type OverviewStats } from "@/lib/analytics";

const STATS: { key: keyof OverviewStats; label: string }[] = [
  { key: "totalEvents", label: "TOTAL EVENTS" },
  { key: "totalSignUps", label: "SIGN UPS" },
  { key: "totalPosts", label: "VIDEOS POSTED" },
  { key: "totalPlays", label: "VIDEOS PLAYED" },
];

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
        <div className="flex w-full flex-col items-center gap-16">
          <div className="grid grid-cols-4 gap-10">
            {STATS.map((s) => (
              <StatNumber
                key={s.key}
                value={overview[s.key].toLocaleString()}
                label={s.label}
                accent={s.key === "totalEvents"}
                sizePx={118}
              />
            ))}
          </div>

          <div className="flex items-center gap-6 rounded-full border border-foreground/10 bg-foreground/[0.02] px-10 py-5">
            <span className="text-[26px] font-bold text-foreground/70">
              📱 mobile <span className="text-accent">{overview.mobilePct}%</span>
            </span>
            <span className="h-[24px] w-px bg-foreground/10" />
            <span className="text-[26px] font-bold text-foreground/70">
              🌐 web <span className="text-accent">{overview.webPct}%</span>
            </span>
          </div>
        </div>
      )}
    </AnalyticsFrame>
  );
}
