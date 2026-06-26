import Image from "next/image";
import BrandDecoration from "@/components/BrandDecoration";

const EVENT_DATE = "2026.06.25";

export default function Opening() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <BrandDecoration />

      <div className="relative flex flex-col items-center">
        <Image
          src="/logo.png"
          alt="hanauta"
          width={132}
          height={132}
          priority
          className="mb-12 rounded-3xl"
        />

        <p className="mb-7 text-[26px] font-semibold lowercase tracking-[0.4em] text-accent">
          hanauta hackathon
        </p>

        <h1 className="text-center text-[112px] font-bold leading-[0.95] tracking-tight text-foreground">
          Hackathon 2026
        </h1>

        <div className="my-9 h-[5px] w-[100px] rounded-full bg-accent" />

        <p className="text-[44px] font-medium tracking-wide text-foreground/80">
          Flutter <span className="mx-3 text-accent">×</span> AI
        </p>

        <p className="mt-12 font-mono text-[26px] tracking-widest text-foreground/40">
          {EVENT_DATE}
        </p>
      </div>
    </div>
  );
}
