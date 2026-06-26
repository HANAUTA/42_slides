import SlideLayout from "@/components/SlideLayout";
import CodeBlock from "@/components/CodeBlock";

export default function SetupRun() {
  return (
    <SlideLayout title="アプリ起動" align="center">
      <div className="mx-auto flex w-full max-w-[1000px] flex-col items-center gap-8">
        <CodeBlock lines={["flutter run -d chrome"]} />
        <p className="text-[30px] font-medium text-foreground/50">または</p>
        <div className="rounded-2xl border-2 border-accent/25 bg-accent/5 px-16 py-6 font-mono text-[44px] font-bold text-foreground">
          F5
        </div>
      </div>
    </SlideLayout>
  );
}
