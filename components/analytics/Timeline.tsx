import type { TimelinePoint, TimelineEventType } from "@/lib/analytics";

interface SeriesConfig {
  key: TimelineEventType;
  label: string;
  opacity: number;
  fill?: boolean;
}

// 色は増やさずアクセント1色の濃淡だけで系列を区別する
const SERIES: SeriesConfig[] = [
  { key: "app_opened", label: "app opened", opacity: 1, fill: true },
  { key: "video_played", label: "played", opacity: 0.55 },
  { key: "video_posted", label: "posted", opacity: 0.35 },
  { key: "group_joined", label: "group joined", opacity: 0.2 },
];

const WIDTH = 1600;
const HEIGHT = 380;

interface TimelineProps {
  points: TimelinePoint[];
}

export default function Timeline({ points }: TimelineProps) {
  if (points.length === 0) {
    return <p className="text-[26px] text-foreground/35">まだデータがありません</p>;
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
            stroke="rgba(26,26,26,0.08)"
            strokeWidth={1}
          />
        ))}

        {SERIES.filter((s) => s.fill).map((s) => (
          <path key={`${s.key}-fill`} d={areaPath(s.key)} fill="#4AADE4" fillOpacity={0.1} />
        ))}

        {SERIES.map((s) => (
          <path
            key={s.key}
            d={linePath(s.key)}
            fill="none"
            stroke="#4AADE4"
            strokeOpacity={s.opacity}
            strokeWidth={s.key === "app_opened" ? 4 : 2.5}
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
            fill="rgba(26,26,26,0.35)"
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
              className="h-[10px] w-[26px] rounded-full bg-accent"
              style={{ opacity: s.opacity }}
            />
            <span className="text-[18px] font-medium text-foreground/50">
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
