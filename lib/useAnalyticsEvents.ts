import { useCallback, useEffect, useSyncExternalStore } from "react";
import { fetchAnalyticsEvents, fetchGroupNames, type AnalyticsEvent } from "./analytics";
import { DUMMY_GROUP_NAMES, generateDummyEvents } from "./analyticsDummy";

interface Snapshot {
  events: AnalyticsEvent[];
  /** グループID → チーム名。ビュー未作成なら空（人数だけ出る） */
  groupNames: Record<string, string>;
  /** true の場合、接続失敗または0件によりダミーデータを表示中 */
  isFallback: boolean;
  updatedAt: Date;
}

function fallbackSnapshot(): Snapshot {
  return {
    events: generateDummyEvents(),
    groupNames: DUMMY_GROUP_NAMES,
    isFallback: true,
    updatedAt: new Date(),
  };
}

/**
 * 分析スライドは5枚あり、それぞれが個別に取得すると行き来のたびにスピナーが出る。
 * 取得結果をモジュール単位で共有し、2枚目以降は即表示する。
 */
let cache: Snapshot | null = null;
let inflight: Promise<Snapshot> | null = null;
const listeners = new Set<() => void>();

/** これより古いキャッシュは、表示はそのままで裏側だけ取り直す */
const STALE_MS = 60_000;

function load(): Promise<Snapshot> {
  // 同時に複数スライドから呼ばれても1リクエストにまとめる
  if (inflight) return inflight;

  // チーム名はビュー未作成でも空で返るので、events 側の失敗だけを見ればよい
  inflight = Promise.all([fetchAnalyticsEvents(), fetchGroupNames()])
    // 0件は「開催日の設定ミス」等でしか起きないが、壇上で 0 を出すよりは
    // デモデータ＋バッジのほうがまだ成立する（バッジが出るので嘘にはならない）
    .then(([events, groupNames]) =>
      events.length > 0
        ? { events, groupNames, isFallback: false, updatedAt: new Date() }
        : fallbackSnapshot(),
    )
    .catch(() => fallbackSnapshot())
    .then((snapshot) => {
      cache = snapshot;
      inflight = null;
      listeners.forEach((notify) => notify());
      return snapshot;
    });

  return inflight;
}

function subscribe(onStoreChange: () => void): () => void {
  listeners.add(onStoreChange);
  return () => {
    listeners.delete(onStoreChange);
  };
}

function getSnapshot(): Snapshot | null {
  return cache;
}

/** デッキを開いた時点で先読みしておき、分析スライドに着いたら即出るようにする */
export function prefetchAnalyticsEvents(): void {
  if (!cache) void load();
}

/** 分析スライド共通のデータ取得フック。refresh() で手動更新できる。 */
export function useAnalyticsEvents() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => null);

  useEffect(() => {
    // キャッシュがあればまずそれを表示し、古ければ裏で取り直す（スピナーは出さない）
    if (!cache || Date.now() - cache.updatedAt.getTime() > STALE_MS) void load();
  }, []);

  const refresh = useCallback(() => {
    void load();
  }, []);

  return {
    events: snapshot?.events ?? null,
    groupNames: snapshot?.groupNames ?? {},
    // 表示できるデータが無い最初の一瞬だけ true
    loading: snapshot === null,
    isFallback: snapshot?.isFallback ?? false,
    updatedAt: snapshot?.updatedAt ?? null,
    refresh,
  };
}
