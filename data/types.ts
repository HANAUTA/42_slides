import type { ComponentType } from "react";

export interface SlideConfig {
  /** ヘッダーのミニ進捗ステッパーで示すフェーズ index（0-6）。undefined なら非表示（タイトル・クロージング用） */
  phase?: number;
  /** ヘッダー/フッターの配色。"dark" は分析スライドなど暗転演出用。省略時は "light" */
  theme?: "light" | "dark";
  component: ComponentType;
}
