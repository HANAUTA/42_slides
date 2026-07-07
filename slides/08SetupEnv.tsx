import SlideLayout from "@/components/SlideLayout";
import CodeBlock from "@/components/CodeBlock";

function StepChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
      {label}
    </span>
  );
}

export default function SetupEnv() {
  return (
    <SlideLayout
      title="接続情報（.env）を設定"
      aside={<StepChip label="STEP 3" />}
      align="center"
    >
      <div className="grid grid-cols-2 items-stretch gap-9">
        <div className="rise-in flex flex-col justify-center">
          <CodeBlock
            title="terminal"
            lines={[{ cmd: "cp .env.example .env", note: "設定ファイルを作る" }]}
          />
          <p className="mt-7 text-[24px] leading-relaxed text-foreground/60">
            運営から配られる{" "}
            <span className="font-bold text-foreground">
              Supabase の URL と Key
            </span>{" "}
            を、VS Code で <span className="font-mono text-accent">.env</span>{" "}
            に貼り付け
          </p>
        </div>

        {/* .env ファイル風 */}
        <div
          className="rise-in overflow-hidden rounded-2xl bg-[#0d1117] shadow-2xl"
          style={{ animationDelay: "130ms" }}
        >
          <div className="flex items-center gap-4 border-b border-white/10 px-7 py-4">
            <span className="rounded-md bg-white/[0.07] px-4 py-1 font-mono text-[19px] text-white/60">
              .env
            </span>
          </div>
          <div className="px-10 py-9 font-mono text-[24px] leading-[2] text-white/85">
            <div>
              <span className="text-sky-400">SUPABASE_URL</span>
              <span className="text-white/40">=</span>
              <span className="text-amber-300">https://xxxxxxxx.supabase.co</span>
            </div>
            <div>
              <span className="text-sky-400">SUPABASE_ANON_KEY</span>
              <span className="text-white/40">=</span>
              <span className="text-amber-300">eyJhbGciOi...（長い文字列）</span>
            </div>
          </div>
        </div>
      </div>

      <div
        className="rise-in mt-10 flex items-center justify-center gap-14"
        style={{ animationDelay: "260ms" }}
      >
        <p className="text-[23px] font-bold text-foreground/70">
          ⚠️ ブラウザのアドレスバーの URL ではありません！配られた値をそのまま
        </p>
        <p className="text-[23px] text-foreground/45">
          🔒 .env は GitHub に上がりません（設定済み）
        </p>
      </div>
    </SlideLayout>
  );
}
