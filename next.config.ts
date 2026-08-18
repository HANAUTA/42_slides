import type { NextConfig } from "next";

/**
 * GitHub Pages はリポジトリ名のサブパス（/42_slides/）配信になるため、
 * CI 側で NEXT_PUBLIC_BASE_PATH を渡す。ローカル開発では未設定 = ルート配信。
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // out/ に静的書き出し（サーバー不要でホストできる）
  output: "export",
  basePath,
  // 画像最適化サーバーが無いので next/image はそのまま配信する
  images: { unoptimized: true },
};

export default nextConfig;
