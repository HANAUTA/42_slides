"use client";

import { useEffect, useState } from "react";
import SlideLayout from "@/components/SlideLayout";
import { supabase } from "@/lib/supabase";

interface Stats {
  totalPlays: number;
  totalPosts: number;
  avgGroupsPerUser: number;
  avgRetakeCount: number;
}

const CARDS: { key: keyof Stats; label: string; format: (v: number) => string }[] = [
  { key: "totalPlays", label: "再生数", format: (v) => v.toLocaleString() },
  { key: "totalPosts", label: "投稿数", format: (v) => v.toLocaleString() },
  {
    key: "avgGroupsPerUser",
    label: "平均グループ参加数",
    format: (v) => v.toFixed(1),
  },
  {
    key: "avgRetakeCount",
    label: "平均撮り直し回数",
    format: (v) => v.toFixed(1),
  },
];

async function fetchStats(): Promise<Stats> {
  const [playsRes, postsRes, retakeRes, membersRes] = await Promise.all([
    supabase
      .from("analytics_events")
      .select("id", { count: "exact", head: true })
      .eq("event_name", "video_played"),
    supabase
      .from("analytics_events")
      .select("id", { count: "exact", head: true })
      .eq("event_name", "video_posted"),
    supabase
      .from("analytics_events")
      .select("properties")
      .eq("event_name", "video_posted"),
    supabase.from("group_members").select("user_id"),
  ]);

  const totalPlays = playsRes.count ?? 0;
  const totalPosts = postsRes.count ?? 0;

  let avgRetakeCount = 0;
  const postRows = retakeRes.data ?? [];
  if (postRows.length > 0) {
    let sum = 0;
    let count = 0;
    for (const row of postRows) {
      const props = row.properties as Record<string, unknown> | null;
      if (props?.retake_count != null) {
        sum += Number(props.retake_count);
        count++;
      }
    }
    if (count > 0) avgRetakeCount = sum / count;
  }

  let avgGroupsPerUser = 0;
  const memberRows = membersRes.data ?? [];
  if (memberRows.length > 0) {
    const userGroups: Record<string, number> = {};
    for (const row of memberRows) {
      const uid = row.user_id as string;
      userGroups[uid] = (userGroups[uid] ?? 0) + 1;
    }
    const ids = Object.keys(userGroups);
    const total = ids.reduce((s, id) => s + userGroups[id], 0);
    avgGroupsPerUser = total / ids.length;
  }

  return { totalPlays, totalPosts, avgGroupsPerUser, avgRetakeCount };
}

export default function Review() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats().then(setStats);
    const interval = setInterval(() => fetchStats().then(setStats), 10_000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SlideLayout title="みんなの記録" align="center">
      {stats === null ? (
        <p className="text-center text-[32px] text-foreground/50">読み込み中...</p>
      ) : (
        <div className="grid grid-cols-2 gap-8">
          {CARDS.map(({ key, label, format }) => (
            <div
              key={key}
              className="flex flex-col items-center justify-center rounded-3xl bg-foreground/[0.04] px-8 py-10"
            >
              <span className="text-[72px] font-bold leading-none text-accent">
                {format(stats[key])}
              </span>
              <span className="mt-4 text-[28px] font-medium text-foreground/60">
                {label}
              </span>
            </div>
          ))}
        </div>
      )}
    </SlideLayout>
  );
}
