import SlideLayout from "@/components/SlideLayout";

interface Command {
  /** OSごとに分かれるコマンドだけラベルを付ける */
  os?: string;
  cmd: string;
}

interface Step {
  title: string;
  body: string;
  cmds: Command[];
}

const STEPS: Step[] = [
  {
    title: "インストール",
    body: "VS Code のターミナルで、自分のOSの方を実行",
    cmds: [
      { os: "🍎", cmd: "curl -fsSL https://antigravity.google/cli/install.sh | bash" },
      { os: "🪟", cmd: "irm https://antigravity.google/cli/install.ps1 | iex" },
    ],
  },
  {
    title: "モデルを指定して起動",
    body: "プロジェクトのフォルダで。models で出た Flash の名前をコピペ",
    cmds: [
      { cmd: "agy --version" },
      { cmd: "agy models" },
      { cmd: 'agy --model "Gemini 3.5 Flash (Low)"' },
    ],
  },
  {
    title: "初回だけ 2つ選ぶ",
    body: "ブラウザで Google アカウントにログイン → コードを貼り付け",
    cmds: [
      { cmd: "> 1. Google OAuth" },
      { cmd: "> Yes, I trust this folder" },
    ],
  },
];

function StepChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
      {label}
    </span>
  );
}

export default function SetupAntigravity() {
  return (
    <SlideLayout
      title="Antigravity を設定する"
      aside={<StepChip label="STEP 4（任意）" />}
      align="center"
    >
      <div className="flex flex-col gap-5">
        {STEPS.map((step, i) => (
          <div
            key={step.title}
            className="rise-in flex items-center gap-8 rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-10 py-6"
            style={{ animationDelay: `${i * 110}ms` }}
          >
            <span className="flex h-[60px] w-[60px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[26px] font-extrabold text-white shadow-lg shadow-accent/25">
              {i + 1}
            </span>
            <div className="flex-1">
              <p className="font-display text-[27px] font-bold text-foreground">
                {step.title}
              </p>
              <p className="mt-1 text-[20px] leading-snug text-foreground/50">
                {step.body}
              </p>
            </div>
            <div className="flex w-[680px] shrink-0 flex-col gap-2">
              {step.cmds.map((c) => (
                <div key={c.cmd} className="flex items-center gap-3">
                  {c.os && (
                    <span className="shrink-0 text-[20px]">{c.os}</span>
                  )}
                  <code className="flex-1 whitespace-nowrap rounded-xl bg-[#0d1117] px-5 py-2.5 font-mono text-[17px] text-emerald-300">
                    {c.cmd}
                  </code>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <p
        className="rise-in mt-9 text-center text-[22px] font-medium text-foreground/45"
        style={{ animationDelay: "380ms" }}
      >
        ⚠️ 無料枠は Flash と Pro で共有。基本は
        <span className="font-bold text-foreground/60">Flash</span>
        のまま、残りは
        <code className="mx-2 font-mono text-foreground/60">/usage</code>
        で確認
      </p>
    </SlideLayout>
  );
}
