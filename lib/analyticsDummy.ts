import type { AnalyticsEvent } from "./analytics";

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const SCREENS = ["home", "group", "camera", "profile", "post"];

/** デモ表示用のチーム名。group_names ビュー（本番）と同じ形で使う */
export const DUMMY_GROUP_NAMES: Record<string, string> = {
  "group-0": "ハミング",
  "group-1": "くちぶえ同好会",
  "group-2": "メロディメーカーズ",
  "group-3": "おとのは",
  "group-4": "ラララ団",
  "group-5": "ゆびぶえ",
  "group-6": "ハーモニー",
};

/**
 * Supabase 接続に失敗した場合のレイアウト確認用ダミーデータ。
 * 3時間のハッカソン（序盤のグループ作り → 中盤の沈黙 → 終盤の投稿/再生ラッシュ）を模す。
 *
 * 重要：アプリが実際に飛ばすイベントと同じ名前・同じプロパティしか作らないこと。
 * ここに存在しないイベントを混ぜると、本番では絶対に0になる数字をスライドに載せてしまう
 * （実際 sign_up / platform を捏造していて、mobile/web比が永遠に0%になっていた）。
 * 定義元は 42_student の lib/core/analytics.dart と各呼び出し箇所。
 */
export function generateDummyEvents(): AnalyticsEvent[] {
  const events: AnalyticsEvent[] = [];
  const start = new Date();
  start.setHours(13, 0, 0, 0);
  let seq = 0;

  const push = (
    offsetMinutes: number,
    event_name: string,
    userId: string | null,
    properties: Record<string, unknown> | null,
  ) => {
    const created = new Date(
      start.getTime() + offsetMinutes * 60_000 + randomInt(0, 59) * 1000,
    );
    events.push({
      id: `dummy-${seq++}`,
      user_id: userId,
      event_name,
      // session_id は Analytics.log が全イベントに自動で足す
      properties: { ...properties, session_id: `sess-${userId ?? "anon"}` },
      created_at: created.toISOString(),
    });
  };

  // 参加者24人。起動 → 画面遷移をひととおり
  const users = Array.from({ length: 24 }, (_, i) => `user-${i}`);
  for (const u of users) {
    // 起動直後はログイン前なので user_id が付かない
    push(randomInt(2, 12), "app_opened", null, {});
    for (let s = 0; s < randomInt(6, 20); s++) {
      push(randomInt(3, 175), "screen_viewed", u, {
        screen: SCREENS[randomInt(0, SCREENS.length - 1)],
      });
    }
    push(randomInt(150, 178), "app_closed", u, {});
  }

  // 序盤：チームごとにグループを作って、メンバーが招待コードで入ってくる
  let userSeq = 0;
  for (let g = 0; g < 7; g++) {
    const groupId = `group-${g}`;
    const created = randomInt(8, 30);
    push(created, "group_created", users[userSeq++ % users.length], { group_id: groupId });
    // 作成者を除いた参加人数（表示上は +1 されて 2〜5人のグループになる）
    for (let m = 0; m < randomInt(1, 4); m++) {
      push(created + randomInt(1, 25), "group_joined", users[userSeq++ % users.length], {
        group_id: groupId,
      });
    }
  }

  // 終盤：投稿と再生が伸びる
  for (let i = 0; i < 38; i++) {
    const t = randomInt(100, 175);
    const postId = `post-${i}`;
    push(t, "video_posted", users[randomInt(0, users.length - 1)], {
      post_id: postId,
      // 1投稿を複数グループへ共有できる（人数ではなく共有先の数）
      group_count: randomInt(1, 3),
      // 撮り直し回数ではなく「録画した回数」。一発で決めても 1 で、0 にはならない
      retake_count: Math.random() < 0.35 ? 1 : randomInt(2, 7),
    });
    for (let p = 0; p < randomInt(1, 9); p++) {
      push(t + randomInt(1, 20), "video_played", users[randomInt(0, users.length - 1)], {
        post_id: postId,
      });
    }
  }

  return events.sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime(),
  );
}
