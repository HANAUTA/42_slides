interface StatNumberProps {
  value: string;
  label: string;
  accent?: boolean;
  sizePx?: number;
}

/** 分析スライド用の巨大な数字表示。通常スライドの配色に合わせる。 */
export default function StatNumber({
  value,
  label,
  accent,
  sizePx = 128,
}: StatNumberProps) {
  return (
    <div className="flex flex-col items-center">
      <span
        className={`font-display font-extrabold leading-none tabular-nums ${
          accent ? "text-accent" : "text-foreground"
        }`}
        style={{ fontSize: sizePx }}
      >
        {value}
      </span>
      <span className="mt-5 whitespace-nowrap text-[20px] font-bold tracking-wide text-foreground/45">
        {label}
      </span>
    </div>
  );
}
