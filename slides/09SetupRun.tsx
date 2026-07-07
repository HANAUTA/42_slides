import SlideLayout from "@/components/SlideLayout";
import CodeBlock from "@/components/CodeBlock";

function StepChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
      {label}
    </span>
  );
}

export default function SetupRun() {
  return (
    <SlideLayout title="アプリを起動！" aside={<StepChip label="STEP 3" />} align="center">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center">
        <div className="rise-in w-full">
          <CodeBlock
            title="terminal — run"
            lines={[{ cmd: "flutter run -d chrome", note: "Chrome でアプリを起動" }]}
          />
        </div>

        <p
          className="rise-in mt-11 text-[34px] font-bold text-foreground"
          style={{ animationDelay: "150ms" }}
        >
          Chrome が立ち上がってアプリが表示されたら成功 🎉
        </p>

        <p
          className="rise-in mt-8 rounded-full bg-accent/10 px-10 py-4 font-display text-[26px] font-bold text-accent"
          style={{ animationDelay: "300ms" }}
        >
          🏁 全員が起動できたら、環境構築ゴール達成！
        </p>

        <p
          className="rise-in mt-7 text-[22px] font-medium text-foreground/45"
          style={{ animationDelay: "420ms" }}
        >
          動かなくても大丈夫。スタッフを呼んでください 🙋
        </p>
      </div>
    </SlideLayout>
  );
}
