import SlideLayout from "@/components/SlideLayout";

interface ClaudeStep {
  title: string;
  body: string;
  mono?: string;
}

const STEPS: ClaudeStep[] = [
  {
    title: "インストール",
    mono: "npm install -g @anthropic-ai/claude-code",
    body: "Node.js が必要（Mac は brew install node でもOK）",
  },
  {
    title: "API キーを設定",
    mono: "ANTHROPIC_API_KEY=（配られたキー）",
    body: "Mac は export、Windows は $env: で環境変数に",
  },
  {
    title: "起動して確認",
    mono: "claude",
    body: "会話できれば成功 🎉",
  },
];

function StepChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
      {label}
    </span>
  );
}

export default function SetupClaude() {
  return (
    <SlideLayout
      title="Claude Code を設定する"
      aside={<StepChip label="STEP 4・任意" />}
      align="center"
    >
      <div className="flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="rise-in flex items-center gap-9 rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-11 py-7"
            style={{ animationDelay: `${i * 110}ms` }}
          >
            <span className="flex h-[64px] w-[64px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[27px] font-extrabold text-white shadow-lg shadow-accent/25">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="font-display text-[28px] font-bold text-foreground">
                {step.title}
              </p>
              <p className="mt-1 text-[21px] text-foreground/50">{step.body}</p>
            </div>
            {step.mono && (
              <code className="rounded-xl bg-[#0d1117] px-7 py-4 font-mono text-[21px] text-emerald-300">
                {step.mono}
              </code>
            )}
          </div>
        ))}
      </div>

      <p
        className="rise-in mt-10 text-center text-[23px] font-medium text-foreground/45"
        style={{ animationDelay: "360ms" }}
      >
        ⏰ グループごとに好きなタイミングで進めてOK。AI
        と一緒に開発する準備です 🤖
      </p>
    </SlideLayout>
  );
}
