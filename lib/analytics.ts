import { supabase } from "./supabase";

export interface AnalyticsEvent {
  id: string;
  /** ログイン後のイベントには入る。app_opened などログイン前のものは null */
  user_id: string | null;
  event_name: string;
  properties: Record<string, unknown> | null;
  created_at: string;
}

/**
 * 1リクエストで取れる行数の上限。Supabase(PostgREST)の Max rows 設定が効くため、
 * クライアントの .limit() をいくら大きくしてもこれ以上は返ってこない。
 * 超える分は .range() でページを送って取る。
 */
const PAGE_SIZE = 1000;

/** 終了条件を踏み外しても止まるようにする保険 */
const MAX_PAGES = 50;

export async function fetchAnalyticsEvents(): Promise<AnalyticsEvent[]> {
  // 公開版（環境変数なし）ではここで抜けて、呼び出し側がデモデータに切り替える
  if (!supabase) throw new Error("Supabase is not configured");

  const all: AnalyticsEvent[] = [];

  for (let page = 0; page < MAX_PAGES; page++) {
    const { data, error, count } = await supabase
      .from("analytics_events")
      .select("id, user_id, event_name, properties, created_at", { count: "exact" })
      // 日付では絞らず全期間を集計する（開発中の動作確認データも含まれる）
      // 昇順で送るのが重要。発表中に増えた行は必ず末尾に付くので、
      // ページの境目がズレて重複・取りこぼしが出ることがない（降順だと全体が1行ずつずれる）。
      .order("created_at", { ascending: true })
      // 同時刻の行の並びを固定する（created_at だけだと順序が保証されない）
      .order("id", { ascending: true })
      // 次の開始位置は「実際に取れた件数」。要求幅ではなくこれを使うので、
      // サーバー側の Max rows が PAGE_SIZE より小さく設定されていても取りこぼさない。
      .range(all.length, all.length + PAGE_SIZE - 1);

    if (error) throw error;
    if (!data || data.length === 0) break;

    all.push(...data);
    if (count !== null && all.length >= count) break;
  }

  return all;
}

/**
 * グループID → チーム名 の対応表。
 *
 * groups テーブルは RLS が authenticated 限定で anon からは1行も返らない。
 * かといって groups を丸ごと公開すると invite_code まで見えて誰でも任意のグループに
 * 入れてしまうので、id と name だけを出すビュー public.group_names を経由する
 * （作成用の SQL は README の「チーム名を表示する」を参照）。
 *
 * ビューが未作成でもスライドは動かす必要があるため、失敗しても投げずに空で返す。
 * 名前が引けないときは人数だけが出る。
 */
export async function fetchGroupNames(): Promise<Record<string, string>> {
  if (!supabase) return {};

  const { data, error } = await supabase.from("group_names").select("id, name");
  if (error || !data) return {};

  const names: Record<string, string> = {};
  for (const row of data) {
    const id = typeof row.id === "string" ? row.id : null;
    const name = typeof row.name === "string" ? row.name.trim() : "";
    if (id && name) names[id] = name;
  }
  return names;
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

/**
 * アプリが実際に記録するイベント（42_student の Analytics.log 呼び出し箇所と対応）。
 * すべてのイベントの properties に session_id が自動で足される。
 *
 *   app_opened    { session_id }              main.dart:68
 *   app_closed    { session_id }              main.dart:73（タスクキル時は届かない）
 *   screen_viewed { screen, session_id }      router.dart:77
 *   group_created { group_id, session_id }    group_provider.dart:112
 *   group_joined  { group_id, session_id }    group_provider.dart:146
 *   video_posted  { post_id, group_count, retake_count, session_id }
 *   video_played  { post_id, session_id }     group_detail_screen.dart:327
 *
 * アプリ以外に、DB トリガーが出すイベントがひとつある（42_student の supabase/schema.sql）。
 *
 *   group_left    { group_id, members_after, days_joined }  group_members の DELETE で発火
 *
 * 注意点：
 * - group_count は「グループの人数」ではなく「その投稿を共有したグループ数」。人数ではない。
 * - sign_up は存在しない。参加者数は user_id のユニーク数で数える。
 * - video_played は再生ボタンの押下ではなく、動画の初期化＋自動再生のタイミングで飛ぶ。
 * - 参加者が自由課題で独自イベントを足すことがある（脱退を自分で log する等）。
 *   未知の event_name が来ても壊れないように、集計は常に「知っている名前だけ拾う」で書く。
 */
export const EVENT_NAMES = [
  "app_opened",
  "app_closed",
  "screen_viewed",
  "group_created",
  "group_joined",
  "video_posted",
  "video_played",
] as const;

export type EventName = (typeof EVENT_NAMES)[number];

// ── スライド1：概況 ──────────────────────────────

export interface OverviewStats {
  totalEvents: number;
  totalPosts: number;
  totalPlays: number;
  totalGroups: number;
  /** ログインした参加者の人数（user_id のユニーク数） */
  totalUsers: number;
  /**
   * 記録された期間のラベル。同じ日に収まっていれば "13:08 → 16:07"、
   * 日をまたいでいたら "8/3 → 8/20"。時刻だけ出すと日またぎで意味不明になるため。
   */
  rangeLabel: string | null;
}

const jstTimeLabel = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
});

const jstDayLabel = new Intl.DateTimeFormat("ja-JP", {
  timeZone: "Asia/Tokyo",
  month: "numeric",
  day: "numeric",
});

const jstDayKey = new Intl.DateTimeFormat("en-CA", {
  timeZone: "Asia/Tokyo",
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
});

/** 期間ラベル。1日に収まっていれば時刻、またいでいれば日付で出す */
function formatRange(first: Date, last: Date): string {
  const sameDay = jstDayKey.format(first) === jstDayKey.format(last);
  const label = sameDay ? jstTimeLabel : jstDayLabel;
  return `${label.format(first)} → ${label.format(last)}`;
}

export function computeOverview(events: AnalyticsEvent[]): OverviewStats {
  const times = events
    .map((e) => new Date(e.created_at).getTime())
    .filter((t) => Number.isFinite(t))
    .sort((a, b) => a - b);

  return {
    totalEvents: events.length,
    totalPosts: events.filter((e) => e.event_name === "video_posted").length,
    totalPlays: events.filter((e) => e.event_name === "video_played").length,
    totalGroups: events.filter((e) => e.event_name === "group_created").length,
    totalUsers: new Set(events.map((e) => e.user_id).filter(Boolean)).size,
    rangeLabel:
      times.length > 0
        ? formatRange(new Date(times[0]), new Date(times[times.length - 1]))
        : null,
  };
}

// ── スライド2：分単位タイムライン ──────────────────────────────

/** タイムラインに線を引く系列（app_closed / screen_viewed は多すぎて他を潰すので出さない） */
export const TIMELINE_EVENT_TYPES = [
  "app_opened",
  "group_joined",
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
  return { app_opened: 0, group_joined: 0, video_posted: 0, video_played: 0 };
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

// ── スライド3：再生 ──────────────────────────────

export interface PlayStats {
  totalPosts: number;
  totalPlays: number;
  /** 1本あたりの平均再生数 */
  averagePlays: number;
}

export function computePlayStats(events: AnalyticsEvent[]): PlayStats {
  const totalPosts = events.filter((e) => e.event_name === "video_posted").length;
  const totalPlays = events.filter((e) => e.event_name === "video_played").length;

  return {
    totalPosts,
    totalPlays,
    averagePlays: totalPosts > 0 ? totalPlays / totalPosts : 0,
  };
}

// ── スライド4：撮り直し回数 ──────────────────────────────

export interface RetakeStats {
  histogram: { retake: number; count: number }[];
  firstTryRate: number;
  average: number;
  max: number;
  totalPosts: number;
}

/**
 * retake_count は名前に反して「撮り直した回数」ではなく「録画した回数」。
 * camera_screen.dart の _stopRecording() が録画を止めるたびに +1 するので、
 * 一発で決めた投稿でも 1 が入る（0 にはならない）。投稿時に 0 へリセットされる。
 *
 * スライドで見せたいのは撮り直しの回数なので、録画回数から最初の1回を引く。
 * 0 が来るのは旧バージョンのアプリが書いた行だけなので、その場合は 0 のまま扱う。
 */
function retakesFromTakes(takes: number): number {
  return Math.max(takes - 1, 0);
}

export function computeRetakeStats(events: AnalyticsEvent[]): RetakeStats {
  const posts = events.filter((e) => e.event_name === "video_posted");
  const counts = new Map<number, number>();
  let sum = 0;
  let max = 0;
  let firstTry = 0;

  for (const e of posts) {
    const retake = retakesFromTakes(Math.round(propNumber(e.properties, "retake_count")));
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

// ── スライド5：グループ人数 ──────────────────────────────

export interface GroupStats {
  /** 一番人数の多かったグループの人数 */
  maxSize: number;
  /** 一番人数の多かったグループの ID。チーム名を引くのに使う（同数なら先に現れた方） */
  maxGroupId: string | null;
  /** 記録に現れたグループのうち、メンバーが1人以上残っている数 */
  totalGroups: number;
  /** 1グループあたりの平均人数 */
  averageSize: number;
}

/**
 * グループの人数をイベントから復元する。
 *
 * group_members テーブルを直接読めれば早いが、あちらの RLS は authenticated 限定で、
 * スライドが持つ anon キーでは弾かれる。analytics_events だけが select using (true)。
 * 作成者は group_created を出したうえで自分をメンバーに入れるので（group_provider.dart）、
 * 作成者も1人目のメンバーとして数える。
 *
 * 人数の加減算ではなく「誰がいるか」の集合で持つ理由は、脱退が二重に記録されうるため。
 * schema.sql の group_members DELETE トリガーが group_left を自動で入れる一方で、
 * 参加者が自由課題で自前の group_left を log することもある。集合なら同じ削除が
 * 何回来ても結果は変わらない（−1 を2回引いて人数が1人減る、が起きない）。
 */
export function computeGroupStats(events: AnalyticsEvent[]): GroupStats {
  const membersByGroup = new Map<string, Set<string>>();

  for (const e of events) {
    const groupId = propString(e.properties, "group_id");
    const userId = e.user_id;
    if (!groupId || !userId) continue;

    let members = membersByGroup.get(groupId);
    if (!members) {
      members = new Set<string>();
      membersByGroup.set(groupId, members);
    }

    if (e.event_name === "group_created" || e.event_name === "group_joined") {
      members.add(userId);
    } else if (e.event_name === "group_left") {
      members.delete(userId);
    }
  }

  // 全員抜けたグループは「人数」の話から外す（0人を平均に混ぜない）
  const remaining = Array.from(membersByGroup.entries())
    .map(([groupId, members]) => ({ groupId, size: members.size }))
    .filter((g) => g.size > 0);

  const sum = remaining.reduce((a, g) => a + g.size, 0);
  // Map は挿入順なので、同数のときは先にできたグループが残る
  const largest = remaining.reduce<{ groupId: string; size: number } | null>(
    (best, g) => (best === null || g.size > best.size ? g : best),
    null,
  );

  return {
    maxSize: largest?.size ?? 0,
    maxGroupId: largest?.groupId ?? null,
    totalGroups: remaining.length,
    averageSize: remaining.length > 0 ? sum / remaining.length : 0,
  };
}
