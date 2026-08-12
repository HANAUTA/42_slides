import SlideLayout from "@/components/SlideLayout";

const STEPS = [
  "VS Code の拡張機能タブで「Flutter」を検索してインストール",
  "コマンドパレット（⌘/Ctrl + Shift + P）で「Flutter: New Project」を実行",
  "SDKが見つからない旨の通知が出たら「Download SDK」をクリック → 自動でセットアップ",
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
      <p className="rise-in mb-8 text-center text-[23px] font-medium text-foreground/45">
        🍎 Mac ／ 🪟 Windows 共通の手順です
      </p>

      <div className="flex flex-col gap-6">
        {STEPS.map((step, i) => (
          <div
            key={step}
            className="rise-in flex items-center gap-9 rounded-[24px] border border-foreground/[0.07] bg-foreground/[0.02] px-11 py-8"
            style={{ animationDelay: `${i * 110}ms` }}
          >
            <span className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full bg-accent font-display text-[24px] font-extrabold text-white shadow-lg shadow-accent/25">
              {i + 1}
            </span>
            <span className="text-[26px] font-medium leading-snug text-foreground">
              {step}
            </span>
          </div>
        ))}
      </div>

      <div
        className="rise-in mt-10 flex items-center justify-between rounded-2xl border-2 border-accent/20 bg-accent/[0.04] px-10 py-6"
        style={{ animationDelay: "380ms" }}
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
