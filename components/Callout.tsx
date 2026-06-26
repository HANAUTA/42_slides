import type { ReactNode } from "react";

interface CalloutProps {
  children: ReactNode;
}

/** アクセント色の引用風ハイライト。重要なメッセージの強調に使う。 */
export default function Callout({ children }: CalloutProps) {
  return (
    <div className="rounded-2xl border-l-[6px] border-accent bg-accent/8 px-12 py-8 text-[32px] font-medium leading-relaxed text-foreground/90">
      {children}
    </div>
  );
}
