"use client";

import { useEffect, useState, type ReactNode } from "react";

/**
 * デザイン基準キャンバス（16:9 / 1920×1080）。
 * すべてのスライドはこの固定サイズで組み、ビューポートに合わせて
 * scale 変換で拡縮する。これにより画面サイズに関係なく
 * 「内容が切れる／レイアウトが崩れる」ことが起きない。
 */
export const STAGE_WIDTH = 1920;
export const STAGE_HEIGHT = 1080;

interface StageProps {
  children: ReactNode;
}

export default function Stage({ children }: StageProps) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    function updateScale() {
      const scaleX = window.innerWidth / STAGE_WIDTH;
      const scaleY = window.innerHeight / STAGE_HEIGHT;
      setScale(Math.min(scaleX, scaleY));
    }

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  return (
    <div className="fixed inset-0 flex items-center justify-center overflow-hidden bg-white">
      <div
        className="relative origin-center shrink-0"
        style={{
          width: STAGE_WIDTH,
          height: STAGE_HEIGHT,
          transform: `scale(${scale})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}
