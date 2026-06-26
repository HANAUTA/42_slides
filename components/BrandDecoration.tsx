/**
 * 背景のブランド装飾（音符モチーフ）。
 * 薄いブルーで控えめに配置し、コンテンツの可読性を損なわない。
 */
export default function BrandDecoration() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* 右上から流れる柔らかいカーブ */}
      <svg
        className="absolute right-0 top-0 h-full w-[55%]"
        viewBox="0 0 900 1080"
        fill="none"
        preserveAspectRatio="xMaxYMid slice"
        aria-hidden="true"
      >
        <path
          d="M0 540 C 260 380, 360 200, 640 200 L 900 200 L 900 1080 L 0 1080 Z"
          fill="#4aade4"
          fillOpacity="0.06"
        />
      </svg>

      {/* 大きな音符グリフ（右下） */}
      <svg
        className="absolute -bottom-[120px] right-[120px] h-[640px] w-[640px]"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M9 17V5l10-2v12"
          stroke="#4aade4"
          strokeOpacity="0.08"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6" cy="17" r="3" fill="#4aade4" fillOpacity="0.06" />
        <circle cx="16" cy="15" r="3" fill="#4aade4" fillOpacity="0.06" />
      </svg>
    </div>
  );
}
