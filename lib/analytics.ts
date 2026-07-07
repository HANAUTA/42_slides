import { supabase } from "./supabase";

export interface AnalyticsEvent {
  id: string;
  event_name: string;
  properties: Record<string, unknown> | null;
  created_at: string;
}

/** 発表直前のリロードでも読める程度の上限（3時間分のイベント数を十分カバー） */
const FETCH_LIMIT = 20000;

export async function fetchAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  const { data, error } = await supabase
    .from("analytics_events")
    .select("id, event_name, properties, created_at")
    .order("created_at", { ascending: true })
    .limit(FETCH_LIMIT);

  if (error) throw error;
  return data ?? [];
}

function propNumber(properties: Record<string, unknown> | null, key: string): number {
  const raw = properties?.[key];
  const n = typeof raw === "number" ? raw : Number(raw);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function propString(properties: Record<string, unknown> | null, key: string): string | undefined {
  const raw = properties?.[key];
  return typeof raw === "string" ? raw : undefined;
}

// ── スライド1：概況 ──────────────────────────────

export interface OverviewStats {
  totalEvents: number;
  totalSignUps: number;
  totalPosts: number;
  totalPlays: number;
  mobilePct: number;
  webPct: number;
}

export function computeOverview(events: AnalyticsEvent[]): OverviewStats {
  const totalEvents = events.length;
  const totalSignUps = events.filter((e) => e.event_name === "sign_up").length;
  const totalPosts = events.filter((e) => e.event_name === "video_posted").length;
  const totalPlays = events.filter((e) => e.event_name === "video_played").length;

  const opens = events.filter((e) => e.event_name === "app_opened");
  const mobile = opens.filter((e) => propString(e.properties, "platform") === "mobile").length;
  const web = opens.filter((e) => propString(e.properties, "platform") === "web").length;
  const platformTotal = mobile + web;
  const mobilePct = platformTotal > 0 ? Math.round((mobile / platformTotal) * 100) : 0;

  return {
    totalEvents,
    totalSignUps,
    totalPosts,
    totalPlays,
    mobilePct,
    webPct: platformTotal > 0 ? 100 - mobilePct : 0,
  };
}

// ── スライド2：分単位タイムライン ──────────────────────────────

export const TIMELINE_EVENT_TYPES = [
  "sign_up",
  "app_opened",
  "video_posted",
  "video_played",
] as const;

export type TimelineEventType = (typeof TIMELINE_EVENT_TYPES)[number];

export interface TimelinePoint {
  label: string;
  counts: Record<TimelineEventType, number>;
}

const MAX_TIMELINE_MINUTES = 220;
const jstMinuteLabel = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

// Asia/Tokyo は UTC+09:00 ちょうど（分単位のズレがない）ので、
// UTC のエポック分でバケット化しても JST の「分」と一致する。
function minuteKey(iso: string): number {
  return Math.floor(new Date(iso).getTime() / 60_000);
}

function emptyCounts(): Record<TimelineEventType, number> {
  return { sign_up: 0, app_opened: 0, video_posted: 0, video_played: 0 };
}

export function computeTimeline(events: AnalyticsEvent[]): TimelinePoint[] {
  if (events.length === 0) return [];

  const sorted = [...events].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );

  let startMinute = minuteKey(sorted[0].created_at);
  const endMinute = minuteKey(sorted[sorted.length - 1].created_at);
  if (endMinute - startMinute > MAX_TIMELINE_MINUTES) {
    startMinute = endMinute - MAX_TIMELINE_MINUTES;
  }

  const buckets = new Map<number, Record<TimelineEventType, number>>();
  for (let m = startMinute; m <= endMinute; m++) {
    buckets.set(m, emptyCounts());
  }

  for (const e of sorted) {
    if (!(TIMELINE_EVENT_TYPES as readonly string[]).includes(e.event_name)) continue;
    const key = minuteKey(e.created_at);
    const bucket = buckets.get(key);
    if (bucket) bucket[e.event_name as TimelineEventType] += 1;
  }

  return Array.from(buckets.entries()).map(([m, counts]) => ({
    label: jstMinuteLabel.format(new Date(m * 60_000)),
    counts,
  }));
}

// ── スライド3：撮り直し回数 ──────────────────────────────

export interface RetakeStats {
  histogram: { retake: number; count: number }[];
  firstTryRate: number;
  average: number;
  max: number;
  totalPosts: number;
}

export function computeRetakeStats(events: AnalyticsEvent[]): RetakeStats {
  const posts = events.filter((e) => e.event_name === "video_posted");
  const counts = new Map<number, number>();
  let sum = 0;
  let max = 0;
  let firstTry = 0;

  for (const e of posts) {
    const retake = Math.round(propNumber(e.properties, "retake_count"));
    counts.set(retake, (counts.get(retake) ?? 0) + 1);
    sum += retake;
    if (retake > max) max = retake;
    if (retake === 0) firstTry += 1;
  }

  const histogram = Array.from(counts.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([retake, count]) => ({ retake, count }));

  return {
    histogram,
    firstTryRate: posts.length > 0 ? Math.round((firstTry / posts.length) * 100) : 0,
    average: posts.length > 0 ? sum / posts.length : 0,
    max,
    totalPosts: posts.length,
  };
}
