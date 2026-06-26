import type { ReactNode } from "react";

/**
 * コンテンツスライド用の共通レイアウト。
 * タイトルの位置を固定し、すべてのスライドで上部の体裁を揃える。
 * 本文は残りの領域に配置される。
 */
interface SlideLayoutProps {
  title: string;
  children: ReactNode;
  /** 本文領域の縦位置 */
  align?: "start" | "center";
}

export default function SlideLayout({
  title,
  children,
  align = "center",
}: SlideLayoutProps) {
  return (
    <div className="flex h-full w-full flex-col px-[160px] pt-[128px] pb-[150px]">
      <header className="shrink-0">
        <h2 className="text-[68px] font-bold leading-tight tracking-tight text-foreground">
          {title}
        </h2>
        <div className="mt-7 h-[5px] w-[88px] rounded-full bg-accent" />
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
