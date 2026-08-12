import Timer from "@/components/Timer";

export default function Break() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center gap-6">
      {/* やわらかい背景 */}
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[900px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/[0.05] blur-3xl"
        aria-hidden="true"
      />

      <div className="rise-in text-[130px] leading-none">☕</div>
      <h2
        className="rise-in font-display text-[68px] font-extrabold tracking-tight text-foreground"
        style={{ animationDelay: "100ms" }}
      >
        ひとやすみ
      </h2>
      <div className="rise-in mt-4" style={{ animationDelay: "200ms" }}>
        <Timer seconds={5 * 60} size="lg" simple />
      </div>
      <p
        className="rise-in mt-6 text-[30px] font-medium text-foreground/45"
        style={{ animationDelay: "300ms" }}
      >
        ストレッチ・水分補給・となりのチームを偵察 👀
      </p>
    </div>
  );
}
