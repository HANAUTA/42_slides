import type { SlideConfig } from "./types";
import Opening from "@/slides/Opening";
import Goal from "@/slides/Goal";
import Flow from "@/slides/Flow";
import Rules from "@/slides/Rules";
import Setup from "@/slides/Setup";
import SetupSdk from "@/slides/SetupSdk";
import SetupClone from "@/slides/SetupClone";
import SetupEditor from "@/slides/SetupEditor";
import SetupRun from "@/slides/SetupRun";
import SetupDone from "@/slides/SetupDone";
import MustTask from "@/slides/MustTask";
import Break from "@/slides/Break";
import FreeTask from "@/slides/FreeTask";
import Presentation from "@/slides/Presentation";
import Review from "@/slides/Review";
import Closing from "@/slides/Closing";

export const slides: SlideConfig[] = [
  { section: "", component: Opening },
  { section: "イントロ", component: Goal },
  { section: "イントロ", component: Flow },
  { section: "イントロ", component: Rules },
  { section: "環境構築", component: Setup },
  { section: "環境構築", component: SetupSdk },
  { section: "環境構築", component: SetupClone },
  { section: "環境構築", component: SetupEditor },
  { section: "環境構築", component: SetupRun },
  { section: "環境構築", component: SetupDone },
  { section: "必須課題", component: MustTask },
  { section: "休憩", component: Break },
  { section: "自由課題", component: FreeTask },
  { section: "発表", component: Presentation },
  { section: "振り返り", component: Review },
  { section: "クロージング", component: Closing },
];
