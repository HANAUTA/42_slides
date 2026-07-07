import Image from "next/image";
import BrandDecoration from "@/components/BrandDecoration";

const ITEMS = [
  { icon: "📝", label: "アンケートのお願い" },
  { icon: "📚", label: "今後の学習方法" },
  { icon: "🙋", label: "質問タイム" },
  { icon: "📸", label: "記念撮影" },
];

export default function Closing() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <BrandDecoration />

      <div className="relative flex flex-col items-center">
        <div className="rise-in">
          <Image
            src="/logo.png"
            alt="hanauta"
            width={110}
            height={110}
            className="rounded-3xl shadow-lg shadow-accent/20"
          />
        </div>

        <h2
          className="rise-in mt-10 font-display text-[84px] font-extrabold tracking-tight text-foreground"
          style={{ animationDelay: "120ms" }}
        >
          ありがとうございました！
        </h2>

        <p
          className="rise-in mt-5 text-[30px] font-medium text-foreground/55"
          style={{ animationDelay: "220ms" }}
        >
          3時間おつかれさまでした。ここからがスタートです 🚀
        </p>

        <div
          className="rise-in mt-14 flex gap-6"
          style={{ animationDelay: "340ms" }}
        >
          {ITEMS.map((item) => (
            <span
              key={item.label}
              className="flex items-center gap-4 rounded-full border border-foreground/10 bg-foreground/[0.02] px-8 py-4 text-[24px] font-bold text-foreground/75"
            >
              <span className="text-[28px]">{item.icon}</span>
              {item.label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
