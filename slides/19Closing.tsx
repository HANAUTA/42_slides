import Image from "next/image";
import BrandDecoration from "@/components/BrandDecoration";
import { asset } from "@/lib/asset";

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
            src={asset("/member.png")}
            alt="hanauta"
            width={474}
            height={474}
            className="h-[150px] w-[150px]"
          />
        </div>

        <h2
          className="rise-in mt-10 font-display text-[84px] font-extrabold tracking-tight text-foreground"
          style={{ animationDelay: "120ms" }}
        >
          ありがとうございました！
        </h2>



      </div>
    </div>
  );
}
