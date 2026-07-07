import { useCallback, useEffect, useState } from "react";
import { fetchAnalyticsEvents, type AnalyticsEvent } from "./analytics";
import { generateDummyEvents } from "./analyticsDummy";

interface AnalyticsState {
  events: AnalyticsEvent[] | null;
  loading: boolean;
  /** true の場合、接続失敗によりダミーデータを表示中 */
  isFallback: boolean;
  updatedAt: Date | null;
}

/** 分析スライド共通のデータ取得フック。マウント時に取得し、refresh() で手動更新できる。 */
export function useAnalyticsEvents() {
  const [state, setState] = useState<AnalyticsState>({
    events: null,
    loading: true,
    isFallback: false,
    updatedAt: null,
  });

  const load = useCallback(() => {
    setState((s) => ({ ...s, loading: true }));
    fetchAnalyticsEvents()
      .then((events) => setState({ events, loading: false, isFallback: false, updatedAt: new Date() }))
      .catch(() =>
        setState({
          events: generateDummyEvents(),
          loading: false,
          isFallback: true,
          updatedAt: new Date(),
        }),
      );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return { ...state, refresh: load };
}
