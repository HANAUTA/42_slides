import Image from "next/image";
import { useState } from "react";
import { asset } from "@/lib/asset";

interface ScreenshotFrameProps {
  /** public/ 配下のパス（例: "/firebase-overview.png"） */
  src: string;
  alt: string;
  /** 画像が見つからないときに出す一言（配置場所は自動でパスから出す） */
  placeholderLabel: string;
}

/**
 * スクショ1枚をカードに収めて出す。分析スライド用の Firebase 紹介2枚
 * （17Analytics5 / 18Analytics6）で共有する。
 * 縦横比が読めない画像でも、高さ基準で収めれば枠を突き破らない。
 *
 * サイズの上限は「本文なし・マスコットなし」のフルサイズ表示を前提に決めてある。
 * - 高さ660px … 本文領域 692px（1行見出し時）からカードの余白 32px を引いた上限。
 *               見出しが2行になると本文領域が 612px に減ってはみ出すので、
 *               このコンポーネントを使うスライドの見出しは1行に収めること。
 * - 幅1600px  … 左右の余白 160px を除いたステージ幅いっぱい。
 *               マスコットは data/slides.ts で hideMascot にしてあるので当たらない。
 */
export default function ScreenshotFrame({ src, alt, placeholderLabel }: ScreenshotFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="rise-in flex max-w-[1600px] justify-center overflow-hidden rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] p-4">
      {failed ? (
        // 画像未設置でも当日まで気づけるように、その場で置き場所を出す
        <div className="flex h-[660px] w-[1180px] flex-col items-center justify-center gap-4 rounded-[16px] border-2 border-dashed border-foreground/15">
          <span className="text-[52px]">🔥</span>
          <p className="font-display text-[26px] font-bold text-foreground/45">
            {placeholderLabel}
          </p>
          <p className="font-mono text-[20px] text-foreground/30">public{src}</p>
        </div>
      ) : (
        <Image
          src={asset(src)}
          alt={alt}
          width={2400}
          height={1350}
          onError={() => setFailed(true)}
          className="h-auto max-h-[660px] w-auto max-w-full rounded-[16px] object-contain"
        />
      )}
    </div>
  );
}
