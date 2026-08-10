import Image from "next/image";
import BrandDecoration from "@/components/BrandDecoration";

const EVENT_DATE = "2026.06.25";

export default function Opening() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <BrandDecoration />

      <div className="relative flex flex-col items-center">
        <div className="rise-in" style={{ animationDelay: "0ms" }}>
          <Image
            src="/hanau-tan_servicex2.png"
            alt="hanauta"
            width={236}
            height={236}
            priority
            className="mb-12 h-[168px] w-[168px]"
          />
        </div>

        <p
          className="rise-in mb-7 font-display text-[26px] font-bold lowercase tracking-[0.42em] text-accent"
          style={{ animationDelay: "120ms" }}
        >
          hanauta presents
        </p>

        <h1
          className="rise-in text-center font-display text-[116px] font-extrabold leading-[0.95] tracking-tight text-foreground"
          style={{ animationDelay: "220ms" }}
        >
          Hackathon 2026
        </h1>

        <div
          className="rise-in my-10 h-[6px] w-[110px] rounded-full bg-accent"
          style={{ animationDelay: "340ms" }}
        />

        <p
          className="rise-in font-display text-[46px] font-bold tracking-wide text-foreground/85"
          style={{ animationDelay: "420ms" }}
        >
          Flutter <span className="mx-3 text-accent">×</span> AI
        </p>

        <p
          className="rise-in mt-12 rounded-full border border-foreground/10 px-9 py-3 font-mono text-[24px] tracking-[0.25em] text-foreground/45"
          style={{ animationDelay: "520ms" }}
        >
          {EVENT_DATE}
        </p>
      </div>
    </div>
  );
}
