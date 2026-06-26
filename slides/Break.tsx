import Timer from "@/components/Timer";

export default function Break() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-6">
      <div className="text-[140px] leading-none">☕</div>
      <h2 className="text-[64px] font-bold tracking-tight text-foreground">
        休憩
      </h2>
      <div className="mt-4">
        <Timer seconds={5 * 60} size="lg" />
      </div>
      <p className="mt-6 text-[34px] font-medium text-foreground/50">
        そろそろ再開します！
      </p>
    </div>
  );
}
