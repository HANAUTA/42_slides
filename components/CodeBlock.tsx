interface CodeBlockProps {
  lines: string[];
}

/** ターミナル風のコード表示。空文字の行は余白として扱う。 */
export default function CodeBlock({ lines }: CodeBlockProps) {
  return (
    <div className="rounded-2xl bg-[#0f1729] px-14 py-10 font-mono text-[34px] leading-[1.7] text-white/90 shadow-lg">
      {lines.map((line, i) => (
        <div key={i} className={line === "" ? "h-6" : ""}>
          {line && (
            <>
              <span className="mr-4 select-none text-accent/70">$</span>
              {line}
            </>
          )}
        </div>
      ))}
    </div>
  );
}
