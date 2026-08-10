import Image from "next/image";
import BrandDecoration from "@/components/BrandDecoration";
import Timer from "@/components/Timer";

export default function IceBreak() {
  return (
    <div className="relative flex h-full w-full flex-col px-[160px] pt-[128px] pb-[150px]">
      <BrandDecoration />

      <header className="relative flex shrink-0 items-center gap-7">
        <Image
          src="/logo3-syusei-1024x156.png"
          alt="hanauta"
          width={1024}
          height={156}
          priority
          className="h-[52px] w-auto"
        />
        <span className="h-[40px] w-px bg-foreground/15" />
        <span className="font-display text-[40px] font-extrabold tracking-tight text-foreground">
          ハッカソン
        </span>
      </header>

      <div className="relative mt-20 flex flex-1 items-center">
        <div className="grid w-full grid-cols-[1fr_1.2fr] items-center gap-20">
          <div className="rise-in flex justify-center">
            <Timer seconds={5 * 60} size="md" editable hideFinishedLabel />
          </div>

          <div
            className="rise-in rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-10 py-9"
            style={{ animationDelay: "120ms" }}
          >
            <p className="font-display text-[24px] font-bold tracking-[0.1em] text-accent">
              💬 今日のお題
            </p>
            <p className="mt-6 text-[27px] font-medium leading-relaxed text-foreground/80">
              今日は、Flutter × Supabase × GitHub を使ったチーム開発がメインテーマです。
              <br />
              まずは同じテーブルの人と、Flutterやアプリ開発を触ったことがあるか、経験について気軽に話してみましょう。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
