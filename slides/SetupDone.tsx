export default function SetupDone() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10">
      <div className="text-[180px] leading-none">🎉</div>
      <h2 className="text-[88px] font-bold tracking-tight text-foreground">
        完成！
      </h2>
      <p className="text-[40px] font-medium text-foreground/60">
        ブラウザでアプリが動けば OK！
      </p>
    </div>
  );
}
