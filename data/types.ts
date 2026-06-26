import type { ComponentType } from "react";

export interface SlideConfig {
  /** 左上に表示するセクション名（空文字なら非表示） */
  section: string;
  component: ComponentType;
}
