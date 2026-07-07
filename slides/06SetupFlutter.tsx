import SlideLayout from "@/components/SlideLayout";
import CodeBlock from "@/components/CodeBlock";

const WIN_STEPS = [
  "Flutter SDK をダウンロード・展開（C:\\src）",
  "PATH に追加（永続化までコマンドでOK）",
];

function StepChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
      {label}
    </span>
  );
}

export default function SetupFlutter() {
  return (
    <SlideLayout title="Flutter を入れる" aside={<StepChip label="STEP 1" />} align="center">
      <div className="grid grid-cols-2 gap-9">
        {/* Mac */}
        <div className="rise-in flex flex-col">
          <p className="mb-5 font-display text-[27px] font-bold text-foreground">
            🍎 Mac の人
          </p>
          <CodeBlock
            title="terminal"
            lines={[
              { cmd: "brew install --cask flutter", note: "Homebrew で入れる" },
            ]}
          />
        </div>

        {/* Windows */}
        <div className="rise-in flex flex-col" style={{ animationDelay: "130ms" }}>
          <p className="mb-5 font-display text-[27px] font-bold text-foreground">
            🪟 Windows の人
          </p>
          <div className="flex flex-1 flex-col justify-center gap-5 rounded-2xl border border-foreground/[0.07] bg-foreground/[0.02] px-10 py-8">
            {WIN_STEPS.map((step, i) => (
              <div key={step} className="flex items-center gap-5">
                <span className="flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[20px] font-bold text-white">
                  {i + 1}
                </span>
                <span className="text-[24px] font-medium text-foreground">
                  {step}
                </span>
              </div>
            ))}
            <p className="mt-1 pl-1 text-[21px] text-foreground/45">
              PowerShell に手順書のコマンドを 1行ずつコピペ
            </p>
          </div>
        </div>
      </div>

      <div
        className="rise-in mt-10 flex items-center justify-between rounded-2xl border-2 border-accent/20 bg-accent/[0.04] px-10 py-6"
        style={{ animationDelay: "260ms" }}
      >
        <p className="text-[26px] font-bold text-foreground">
          最後に <span className="font-mono text-accent">flutter doctor</span>{" "}
          で確認
        </p>
        <p className="text-[22px] text-foreground/50">
          ✅ 緑チェックが出ればOK ／ [!] が出ても Chrome が使えれば問題なし
        </p>
      </div>
    </SlideLayout>
  );
}
