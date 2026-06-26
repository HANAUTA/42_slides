"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Stats {
  totalPlays: number;
  totalPosts: number;
  avgGroupsPerUser: number;
  avgRetakeCount: number;
}

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

interface Row {
  metric: string;
  value: string;
  type: string;
}

function buildRows(stats: Stats): Row[] {
  return [
    {
      metric: "total_plays",
      value: String(stats.totalPlays),
      type: "int4",
    },
    {
      metric: "total_posts",
      value: String(stats.totalPosts),
      type: "int4",
    },
    {
      metric: "avg_groups_per_user",
      value: stats.avgGroupsPerUser.toFixed(1),
      type: "float8",
    },
    {
      metric: "avg_retake_count",
      value: stats.avgRetakeCount.toFixed(1),
      type: "float8",
    },
  ];
}

const QUERY = "SELECT metric, value, type FROM hackathon_stats ORDER BY id;";

function TerminalDots() {
  return (
    <div className="flex gap-[10px]">
      <span className="h-[16px] w-[16px] rounded-full bg-[#ff5f57]" />
      <span className="h-[16px] w-[16px] rounded-full bg-[#febc2e]" />
      <span className="h-[16px] w-[16px] rounded-full bg-[#28c840]" />
    </div>
  );
}

function Cursor() {
  return (
    <span className="inline-block h-[26px] w-[14px] translate-y-[2px] animate-pulse bg-emerald-400/80" />
  );
}

export default function Review() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    fetchStats().then(setStats);
    const interval = setInterval(() => fetchStats().then(setStats), 10_000);
    return () => clearInterval(interval);
  }, []);

  const rows = stats ? buildRows(stats) : [];

  const colW = { metric: "w-[340px]", value: "w-[180px]", type: "w-[140px]" };

  return (
    <div className="flex h-full w-full flex-col px-[120px] py-[90px]">
      {/* Terminal window */}
      <div className="flex flex-1 flex-col overflow-hidden rounded-2xl bg-[#0d1117] shadow-2xl">
        {/* Title bar */}
        <div className="flex items-center gap-5 border-b border-white/10 px-8 py-5">
          <TerminalDots />
          <span className="font-mono text-[20px] text-white/40">
            supabase — hackathon_2026
          </span>
        </div>

        {/* Terminal body */}
        <div className="flex-1 overflow-hidden px-10 py-8 font-mono">
          {/* Prompt + query */}
          <div className="text-[26px] leading-relaxed">
            <span className="text-emerald-400">hackathon_2026=&gt;</span>
            <span className="ml-3 text-white/90">{QUERY}</span>
          </div>

          {stats === null ? (
            <div className="mt-10 text-[26px] text-white/40">
              <span className="text-emerald-400">hackathon_2026=&gt;</span>
              <span className="ml-3">fetching...</span>
              <Cursor />
            </div>
          ) : (
            <>
              {/* Result table */}
              <div className="mt-8 text-[28px] text-white/90">
                {/* Header separator */}
                <div className="flex border-b border-white/20 pb-3">
                  <span className={`${colW.metric} font-bold text-sky-400`}>
                    metric
                  </span>
                  <span className="mx-5 text-white/20">│</span>
                  <span className={`${colW.value} font-bold text-sky-400`}>
                    value
                  </span>
                  <span className="mx-5 text-white/20">│</span>
                  <span className={`${colW.type} font-bold text-sky-400`}>
                    type
                  </span>
                </div>

                {/* Rows */}
                {rows.map((row) => (
                  <div
                    key={row.metric}
                    className="flex border-b border-white/[0.06] py-4"
                  >
                    <span className={`${colW.metric} text-amber-300`}>
                      {row.metric}
                    </span>
                    <span className="mx-5 text-white/20">│</span>
                    <span
                      className={`${colW.value} font-bold text-emerald-300`}
                    >
                      {row.value}
                    </span>
                    <span className="mx-5 text-white/20">│</span>
                    <span className={`${colW.type} text-white/40`}>
                      {row.type}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row count */}
              <div className="mt-5 text-[24px] text-white/35">
                ({rows.length} rows)
              </div>

              {/* Next prompt */}
              <div className="mt-6 text-[26px]">
                <span className="text-emerald-400">hackathon_2026=&gt;</span>
                <span className="ml-3">
                  <Cursor />
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
