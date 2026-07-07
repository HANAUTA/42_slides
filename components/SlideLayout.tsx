import type { ReactNode } from "react";

/**
 * コンテンツスライド用の共通レイアウト。
 * タイトルの位置を固定し、すべてのスライドで上部の体裁を揃える。
 * 本文は残りの領域に配置される。
 */
interface SlideLayoutProps {
  title: string;
  /** タイトル右に添える補足（例: 計3時間） */
  aside?: ReactNode;
  children: ReactNode;
  /** 本文領域の縦位置 */
  align?: "start" | "center";
}

export default function SlideLayout({
  title,
  aside,
  children,
  align = "center",
}: SlideLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col px-[160px] pt-[128px] pb-[150px]">
      <header className="flex shrink-0 items-end justify-between">
        <div>
          <h2 className="font-display text-[64px] font-extrabold leading-tight tracking-tight text-foreground">
            {title}
          </h2>
          <div className="mt-6 h-[6px] w-[88px] rounded-full bg-accent" />
        </div>
        {aside && <div className="pb-3">{aside}</div>}
      </header>

      <div
        className={`flex flex-1 flex-col ${
          align === "center" ? "justify-center" : "justify-start pt-14"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
