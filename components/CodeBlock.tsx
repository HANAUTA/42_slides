export interface CodeLine {
  cmd: string;
  /** コマンドの上に表示する説明コメント */
  note?: string;
}

interface CodeBlockProps {
  lines: (string | CodeLine)[];
  /** タイトルバーに表示する名前 */
  title?: string;
}

function normalize(line: string | CodeLine): CodeLine {
  return typeof line === "string" ? { cmd: line } : line;
}

/** macOS 風タイトルバー付きのターミナルウィンドウ。 */
export default function CodeBlock({ lines, title = "terminal" }: CodeBlockProps) {
  const items = lines.map(normalize);

  return (
    <div className="overflow-hidden rounded-2xl bg-[#0d1117] shadow-2xl">
      <div className="flex items-center gap-5 border-b border-white/10 px-7 py-4">
        <div className="flex gap-[9px]">
          <span className="h-[15px] w-[15px] rounded-full bg-[#ff5f57]" />
          <span className="h-[15px] w-[15px] rounded-full bg-[#febc2e]" />
          <span className="h-[15px] w-[15px] rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-[19px] text-white/35">{title}</span>
      </div>

      <div className="px-12 py-9 font-mono text-[31px] leading-[1.55] text-white/90">
        {items.map((line, i) => (
          <div key={i} className={i > 0 ? "mt-6" : ""}>
            {line.note && (
              <div className="mb-1 text-[22px] text-white/30"># {line.note}</div>
            )}
            <div>
              <span className="mr-4 select-none text-emerald-400">$</span>
              {line.cmd}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
