import type { SlideConfig } from "./types";
import Opening from "@/slides/01Opening";
import Goal from "@/slides/02Goal";
import Flow from "@/slides/03Flow";
import Rules from "@/slides/04Rules";
import Setup from "@/slides/05Setup";
import SetupSdk from "@/slides/06SetupSdk";
import SetupClone from "@/slides/07SetupClone";
import SetupEditor from "@/slides/08SetupEditor";
import SetupRun from "@/slides/09SetupRun";
import SetupDone from "@/slides/10SetupDone";
import MustTask from "@/slides/11MustTask";
import Break from "@/slides/12Break";
import FreeTask from "@/slides/13FreeTask";
import Presentation from "@/slides/14Presentation";
import Review from "@/slides/15Review";
import Closing from "@/slides/16Closing";

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
