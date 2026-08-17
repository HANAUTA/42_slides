export interface Phase {
  label: string;
  duration: string;
}

/** 今日のスケジュール（03Flow）とヘッダーのミニ進捗ステッパーで共有する */
export const PHASES: Phase[] = [
  { label: "オープニング", duration: "10分" },
  { label: "環境構築", duration: "45分" },
  { label: "開発", duration: "100分" },
  { label: "発表", duration: "10分" },
  { label: "クロージング", duration: "15分" },
];
