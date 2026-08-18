const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/**
 * public/ の画像パスに basePath を付ける。
 * next/image は unoptimized のとき src をそのまま出力し basePath を付けないため、
 * GitHub Pages のサブパス配信（/42_slides/）では自前で付ける必要がある。
 */
export function asset(path: string): string {
  return `${basePath}${path}`;
}
