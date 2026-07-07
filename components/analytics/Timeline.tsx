import type { TimelinePoint, TimelineEventType } from "@/lib/analytics";

interface SeriesConfig {
  key: TimelineEventType;
  label: string;
  opacity: number;
  fill?: boolean;
}

// 色は増やさずアクセント1色の濃淡だけで系列を区別する
const SERIES: SeriesConfig[] = [
  { key: "sign_up", label: "sign up", opacity: 1, fill: true },
  { key: "app_opened", label: "app opened", opacity: 0.55 },
  { key: "video_posted", label: "posted", opacity: 0.35 },
  { key: "video_played", label: "played", opacity: 0.2 },
];

const WIDTH = 1600;
const HEIGHT = 380;

interface TimelineProps {
  points: TimelinePoint[];
}

export default function Timeline({ points }: TimelineProps) {
  if (points.length === 0) {
    return <p className="text-[26px] text-white/30">まだデータがありません</p>;
  }

  const max = Math.max(1, ...points.flatMap((p) => SERIES.map((s) => p.counts[s.key])));
  const stepX = points.length > 1 ? WIDTH / (points.length - 1) : 0;
  const yFor = (count: number) => HEIGHT - (count / max) * (HEIGHT - 16) - 8;

  const linePath = (key: TimelineEventType) =>
    points.map((p, i) => `${i === 0 ? "M" : "L"} ${i * stepX} ${yFor(p.counts[key])}`).join(" ");

  const areaPath = (key: TimelineEventType) => {
    const lastX = (points.length - 1) * stepX;
    return `${linePath(key)} L ${lastX} ${HEIGHT} L 0 ${HEIGHT} Z`;
  };

  const tickIndices = Array.from(
    new Set([0, Math.floor((points.length - 1) / 2), points.length - 1]),
  );

  return (
    <div className="w-full">
      <svg
        viewBox={`0 0 ${WIDTH} ${HEIGHT + 40}`}
        className="w-full"
        preserveAspectRatio="none"
      >
        {[0.25, 0.5, 0.75].map((f) => (
          <line
            key={f}
            x1={0}
            x2={WIDTH}
            y1={HEIGHT * f}
            y2={HEIGHT * f}
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={1}
          />
        ))}

        {SERIES.filter((s) => s.fill).map((s) => (
          <path key={`${s.key}-fill`} d={areaPath(s.key)} fill="#D4FF4F" fillOpacity={0.08} />
        ))}

        {SERIES.map((s) => (
          <path
            key={s.key}
            d={linePath(s.key)}
            fill="none"
            stroke="#D4FF4F"
            strokeOpacity={s.opacity}
            strokeWidth={s.key === "sign_up" ? 4 : 2.5}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {tickIndices.map((i) => (
          <text
            key={i}
            x={i * stepX}
            y={HEIGHT + 32}
            textAnchor={i === 0 ? "start" : i === points.length - 1 ? "end" : "middle"}
            fill="rgba(255,255,255,0.3)"
            fontSize={20}
          >
            {points[i].label}
          </text>
        ))}
      </svg>

      <div className="mt-8 flex items-center justify-center gap-10">
        {SERIES.map((s) => (
          <div key={s.key} className="flex items-center gap-3">
            <span
              className="h-[10px] w-[26px] rounded-full bg-[#D4FF4F]"
              style={{ opacity: s.opacity }}
            />
            <span className="font-analytics text-[18px] font-medium text-white/50">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
