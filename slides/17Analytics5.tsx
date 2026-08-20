"use client";

import Image from "next/image";
import { useState } from "react";
import SlideLayout from "@/components/SlideLayout";
import { asset } from "@/lib/asset";

/** public/ に置く Firebase Analytics のスクリーンショット */
const SCREENSHOT = "/firebase-analytics.png";

export default function Analytics5() {
  const [failed, setFailed] = useState(false);

  return (
    <SlideLayout
      title="これ、全部こうやって測ってます"
      aside={
        <p className="font-display text-[18px] font-bold tracking-[0.18em] text-accent/75">
          Data Drop · 05 / Final
        </p>
      }
    >
      <div className="flex w-full flex-col items-center gap-10">
        {/* スクショの縦横比が読めないので高さ基準で収める（横長でも縦長でも枠内に入る） */}
        <div className="rise-in flex max-w-[1400px] justify-center overflow-hidden rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] p-4">
          {failed ? (
            // 画像未設置でも当日まで気づけるように、その場で置き場所を出す
            <div className="flex h-[510px] w-[1180px] flex-col items-center justify-center gap-4 rounded-[16px] border-2 border-dashed border-foreground/15">
              <span className="text-[52px]">🔥</span>
              <p className="font-display text-[26px] font-bold text-foreground/45">
                Firebase Analytics のスクショを置いてください
              </p>
              <p className="font-mono text-[20px] text-foreground/30">
                public{SCREENSHOT}
              </p>
            </div>
          ) : (
            <Image
              src={asset(SCREENSHOT)}
              alt="Firebase Analytics のダッシュボード"
              width={2400}
              height={1350}
              onError={() => setFailed(true)}
              className="h-auto max-h-[510px] w-auto max-w-full rounded-[16px] object-contain"
            />
          )}
        </div>

        <p
          className="rise-in max-w-[1250px] text-center text-[28px] font-medium leading-relaxed text-foreground/55"
          style={{ animationDelay: "200ms" }}
        >
          ここまでの数字は、この仕組みが裏で数え続けた結果です。次に作るときは、
          <span className="font-bold text-accent">1行目から仕込もう。</span>
        </p>
      </div>
    </SlideLayout>
  );
}
