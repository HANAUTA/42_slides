/**
 * 背景のブランド装飾。
 * hanauta のヒーロービジュアルを踏襲した「流れる波 + 音符」を
 * 薄いブルーで敷き、コンテンツの可読性は損なわない。
 */
export default function BrandDecoration() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {/* 画面を横切る柔らかい波 */}
      <svg
        className="absolute inset-x-0 top-1/2 h-[560px] w-full -translate-y-1/2"
        viewBox="0 0 1920 560"
        fill="none"
        preserveAspectRatio="none"
      >
        <path
          d="M-40 420 C 320 200, 640 480, 980 300 C 1300 130, 1560 340, 1960 160 L 1960 560 L -40 560 Z"
          fill="#4aade4"
          fillOpacity="0.05"
        />
        <path
          d="M-40 480 C 360 300, 700 520, 1040 380 C 1380 240, 1620 420, 1960 280 L 1960 560 L -40 560 Z"
          fill="#4aade4"
          fillOpacity="0.04"
        />
      </svg>

      {/* 大きな音符グリフ（右側） */}
      <svg
        className="absolute -right-[60px] top-[80px] h-[720px] w-[720px] rotate-[8deg]"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M9 18V5l10-2v13"
          stroke="#4aade4"
          strokeOpacity="0.09"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle cx="6.5" cy="18" r="2.6" fill="#4aade4" fillOpacity="0.09" />
        <circle cx="16.5" cy="16" r="2.6" fill="#4aade4" fillOpacity="0.09" />
      </svg>

      {/* 小さな音符たち */}
      <span className="absolute left-[180px] top-[160px] rotate-[-12deg] font-display text-[64px] text-accent/15">
        ♪
      </span>
      <span className="absolute bottom-[200px] left-[300px] rotate-[10deg] font-display text-[44px] text-accent/12">
        ♫
      </span>
      <span className="absolute right-[360px] top-[220px] rotate-[14deg] font-display text-[52px] text-accent/12">
        ♪
      </span>
    </div>
  );
}
