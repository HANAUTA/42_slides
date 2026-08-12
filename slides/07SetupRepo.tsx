import SlideLayout from "@/components/SlideLayout";

const LEADER_STEPS = [
  "GitHub で空リポジトリを作成（Public・Initialize なし）",
  "テンプレを clone（hanauta_hackathon）",
  ".git を作り直して自分のリポジトリへ push",
  "メンバーをCollaboratorとして招待（Settings → Collaborators）",
  "flutter pub get",
];

const MEMBER_STEPS = [
  "代表者の push 完了を待つ",
  "チームのリポジトリを clone",
  "flutter pub get",
];

function StepChip({ label }: { label: string }) {
  return (
    <span className="rounded-full bg-accent/10 px-7 py-3 font-display text-[26px] font-bold text-accent">
      {label}
    </span>
  );
}

interface RoleCardProps {
  icon: string;
  role: string;
  badge: string;
  steps: string[];
  highlight?: boolean;
  delay?: string;
}

function RoleCard({ icon, role, badge, steps, highlight, delay }: RoleCardProps) {
  return (
    <div
      className={`rise-in flex flex-col rounded-[26px] px-10 py-9 ${
        highlight
          ? "border-2 border-accent/25 bg-accent/[0.04]"
          : "border border-foreground/[0.07] bg-foreground/[0.02]"
      }`}
      style={delay ? { animationDelay: delay } : undefined}
    >
      <div className="flex items-center gap-4">
        <span className="text-[40px]">{icon}</span>
        <span className="font-display text-[29px] font-bold text-foreground">
          {role}
        </span>
        <span
          className={`ml-auto rounded-full px-5 py-1.5 font-display text-[19px] font-bold ${
            highlight ? "bg-accent text-white" : "bg-foreground/[0.06] text-foreground/50"
          }`}
        >
          {badge}
        </span>
      </div>
      <div className="mt-7 flex flex-col gap-4">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-5">
            <span
              className={`flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-full font-display text-[19px] font-bold ${
                highlight ? "bg-accent text-white" : "bg-foreground/10 text-foreground/60"
              }`}
            >
              {i + 1}
            </span>
            <span className="text-[23px] font-medium leading-snug text-foreground">
              {step}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function SetupRepo() {
  return (
    <SlideLayout
      title="チームのリポジトリを作る"
      aside={<StepChip label="STEP 2" />}
      align="center"
    >
      <div className="grid grid-cols-2 gap-9">
        <RoleCard
          icon="👑"
          role="代表者"
          badge="チームで1人だけ"
          steps={LEADER_STEPS}
          highlight
        />
        <RoleCard
          icon="🧑‍🤝‍🧑"
          role="メンバー"
          badge="push を待ってから"
          steps={MEMBER_STEPS}
          delay="130ms"
        />
      </div>

      <p
        className="rise-in mt-10 text-center text-[22px] font-medium text-foreground/45"
        style={{ animationDelay: "260ms" }}
      >
        コマンドは手順書を上から順にコピペすればOK ／ push
        時のパスワードは
        <span className="font-bold text-foreground/60">
          アクセストークン（PAT）
        </span>
        を使います 🔑
      </p>
    </SlideLayout>
  );
}
