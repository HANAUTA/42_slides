import type { ComponentType } from "react";

export interface SlideConfig {
  /** ヘッダーのミニ進捗ステッパーで示すフェーズ index（0-6）。undefined なら非表示（タイトル・クロージング用） */
  phase?: number;
  /** ヘッダー/フッターの配色。"dark" は分析スライドなど暗転演出用。省略時は "light" */
  theme?: "light" | "dark";
  /** true の場合、右下のランダムマスコットを表示しない */
  hideMascot?: boolean;
  /** 右下マスコットを固定したい場合の CHARACTERS index（components/MascotCorner.tsx）。省略時はランダム */
  mascot?: number;
  component: ComponentType;
}
