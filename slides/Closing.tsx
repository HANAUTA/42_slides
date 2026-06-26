import Image from "next/image";

const ITEMS = [
  "アンケートのお願い",
  "今後の学習方法",
  "質問タイム",
  "記念撮影",
];

export default function Closing() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <h2 className="text-[80px] font-bold tracking-tight text-foreground">
        ありがとうございました！
      </h2>
      <div className="mt-14 flex flex-col gap-3">
        {ITEMS.map((item) => (
          <div key={item} className="flex items-center gap-5">
            <span className="h-[12px] w-[12px] shrink-0 rounded-full bg-accent" />
            <span className="text-[34px] font-medium text-foreground/80">
              {item}
            </span>
          </div>
        ))}
      </div>
      <Image
        src="/logo.png"
        alt="hanauta"
        width={96}
        height={96}
        className="mt-16 rounded-2xl opacity-90"
      />
    </div>
  );
}
