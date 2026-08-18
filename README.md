# 42 ハッカソン スライド

Next.js（App Router）製のスライドデッキ。← → / Space で送ります。

## 公開版（見るだけの人はこちら）

https://hanauta.github.io/42_slides/

main に push すると GitHub Actions が自動でビルド・デプロイします（[.github/workflows/deploy.yml](.github/workflows/deploy.yml)）。
公開版は Supabase の環境変数を渡していないため、**分析スライドはデモデータ**（右上に「デモデータ表示中」バッジ）で表示されます。

## ローカルで動かす

```bash
npm install
npm run dev
```

http://localhost:3000 を開きます。

当日の**実データ**を分析スライドに出すには `.env.local` が必要です（運営から受け取ってください）。

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
```

未設定でも起動でき、その場合はデモデータになります。

## 構成

| パス | 中身 |
| --- | --- |
| [slides/](slides/) | スライド本体（ファイル名の連番＝表示順） |
| [data/slides.ts](data/slides.ts) | スライドの並び順とフェーズの割り当て |
| [data/phases.ts](data/phases.ts) | 進行フェーズ（スケジュールと上部ステッパーで共有） |
| [components/](components/) | レイアウト・タイマー・ステッパーなど共通部品 |
| [lib/](lib/) | Supabase 接続と分析データの集計 |

## デプロイの仕組み

- `output: "export"` で `out/` に静的書き出し（サーバー不要）
- GitHub Pages はサブパス配信のため、CI で `NEXT_PUBLIC_BASE_PATH=/42_slides` を渡す
- `next/image` は `unoptimized` のとき basePath を付けないので、画像は [lib/asset.ts](lib/asset.ts) の `asset()` を通す
