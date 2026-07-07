interface StatNumberProps {
  value: string;
  label: string;
  accent?: boolean;
  sizePx?: number;
}

/** 分析スライド用の巨大な数字表示。アクセントは #D4FF4F 固定、それ以外は白。 */
export default function StatNumber({
  value,
  label,
  accent,
  sizePx = 128,
}: StatNumberProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={`font-analytics font-bold leading-none tabular-nums ${
          accent ? "text-[#D4FF4F]" : "text-white"
        }`}
        style={{ fontSize: sizePx }}
      >
        {value}
      </span>
      <span className="mt-5 whitespace-nowrap text-[20px] font-medium tracking-wide text-white/40">
        {label}
      </span>
    </div>
  );
}
