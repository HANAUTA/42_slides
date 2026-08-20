"use client";

import AnalyticsFrame from "@/components/analytics/AnalyticsFrame";
import BigStat from "@/components/analytics/BigStat";
import { useAnalyticsEvents } from "@/lib/useAnalyticsEvents";
import { computeGroupStats } from "@/lib/analytics";

export default function Analytics4() {
  const { events, groupNames, loading, isFallback, updatedAt, refresh } =
    useAnalyticsEvents();
  const stats = events ? computeGroupStats(events) : null;
  // group_names ビューが無ければ名前は引けない。その場合は人数だけ出す
  const teamName = stats?.maxGroupId ? groupNames[stats.maxGroupId] : undefined;

  return (
    <AnalyticsFrame
      kicker="Data Drop · 04"
      title={
        <>
          一番大きかった
          <br />
          グループ
        </>
      }
      loading={loading}
      isFallback={isFallback}
      updatedAt={updatedAt}
      onRefresh={refresh}
    >
      {stats &&
        (stats.maxSize === 0 ? (
          <p className="text-[28px] text-foreground/35">まだグループの記録がありません</p>
        ) : (
          <BigStat
            label="一番大きいグループの人数"
            value={String(stats.maxSize)}
            unit="人"
            sub={teamName && `「${teamName}」`}
            caption={
              teamName ? (
                <>
                  今日いちばん人が集まったのはこのチームでした。
                  <br />
                  アプリは一人で使うものじゃない、と
                  <span className="font-bold text-accent">数字が言っています。</span>
                </>
              ) : (
                <>
                  いちばん人が集まったグループの人数です。
                  <br />
                  アプリは一人で使うものじゃない、と
                  <span className="font-bold text-accent">数字が言っています。</span>
                </>
              )
            }
            chips={[
              { label: "作られたグループ", value: `${stats.totalGroups.toLocaleString()}組` },
              { label: "1組あたりの人数", value: `${stats.averageSize.toFixed(1)}人` },
            ]}
          />
        ))}
    </AnalyticsFrame>
  );
}
