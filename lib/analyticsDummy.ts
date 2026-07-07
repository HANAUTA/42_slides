import type { AnalyticsEvent } from "./analytics";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Supabase 接続に失敗した場合のレイアウト確認用ダミーデータ。
 * 3時間のハッカソン（オープニング直後の山 → 中盤の沈黙 → 終盤の投稿/再生ラッシュ）を模す。
 */
export function generateDummyEvents(): AnalyticsEvent[] {
  const events: AnalyticsEvent[] = [];
  const start = new Date();
  start.setHours(13, 0, 0, 0);
  let seq = 0;

  const push = (
    offsetMinutes: number,
    event_name: string,
    properties: Record<string, unknown> | null,
  ) => {
    const created = new Date(
      start.getTime() + offsetMinutes * 60_000 + randomInt(0, 59) * 1000,
    );
    events.push({
      id: `dummy-${seq++}`,
      event_name,
      properties,
      created_at: created.toISOString(),
    });
  };

  const platforms = ["web", "mobile"] as const;
  const platform = () => platforms[randomInt(0, 1)];

  // オープニング直後：app_opened / sign_up の山
  for (let i = 0; i < 42; i++) {
    const t = randomInt(2, 14);
    push(t, "app_opened", { platform: platform() });
    if (Math.random() < 0.7) push(t + randomInt(0, 3), "sign_up", { platform: platform() });
  }

  // 環境構築〜必須課題：まばら（中だるみ）
  for (let i = 0; i < 24; i++) {
    push(randomInt(15, 95), "app_opened", { platform: platform() });
  }

  // 自由課題〜発表前：投稿と再生が伸びる
  let postSeq = 0;
  for (let i = 0; i < 38; i++) {
    const t = randomInt(100, 175);
    const postId = `post-${postSeq++}`;
    const retake = Math.random() < 0.35 ? 0 : randomInt(1, 6);
    push(t, "video_posted", {
      post_id: postId,
      group_count: randomInt(1, 3),
      retake_count: retake,
    });
    const plays = randomInt(1, 9);
    for (let p = 0; p < plays; p++) {
      push(t + randomInt(1, 20), "video_played", { post_id: postId });
    }
  }

  for (let i = 0; i < 6; i++) {
    push(randomInt(20, 170), "group_created", null);
    push(randomInt(20, 170), "group_joined", null);
  }

  return events.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}
