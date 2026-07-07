export interface Phase {
  label: string;
  duration: string;
}

/** 今日のスケジュール（03Flow）とヘッダーのミニ進捗ステッパーで共有する */
export const PHASES: Phase[] = [
  { label: "オープニング", duration: "10分" },
  { label: "環境構築", duration: "45分" },
  { label: "必須課題", duration: "40分" },
  { label: "休憩", duration: "5分" },
  { label: "自由課題", duration: "50分" },
  { label: "発表", duration: "15分" },
  { label: "振り返り", duration: "15分" },
];
