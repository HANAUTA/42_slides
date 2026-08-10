import type { SlideConfig } from "./types";
import IceBreak from "@/slides/00IceBreak";
import Opening from "@/slides/01Opening";
import Goal from "@/slides/02Goal";
import Flow from "@/slides/03Flow";
import Rules from "@/slides/04Rules";
import Setup from "@/slides/05Setup";
import SetupFlutter from "@/slides/06SetupFlutter";
import SetupRepo from "@/slides/07SetupRepo";
import SetupEnv from "@/slides/08SetupEnv";
import SetupRun from "@/slides/09SetupRun";
import SetupClaude from "@/slides/10SetupClaude";
import MustTask from "@/slides/11MustTask";
import Break from "@/slides/12Break";
import FreeTask from "@/slides/13FreeTask";
import Presentation from "@/slides/14Presentation";
import Analytics1 from "@/slides/15Analytics1";
import Analytics2 from "@/slides/16Analytics2";
import Analytics3 from "@/slides/17Analytics3";
import Analytics4 from "@/slides/18Analytics4";
import Closing from "@/slides/19Closing";

export const slides: SlideConfig[] = [
  { component: IceBreak, mascot: 4 },
  { component: Opening, hideMascot: true },
  { phase: 0, component: Goal },
  { phase: 0, component: Flow },
  { phase: 0, component: Rules },
  { phase: 1, component: Setup },
  { phase: 1, component: SetupFlutter },
  { phase: 1, component: SetupRepo },
  { phase: 1, component: SetupEnv },
  { phase: 1, component: SetupRun },
  { phase: 1, component: SetupClaude },
  { phase: 2, component: MustTask },
  { phase: 3, component: Break },
  { phase: 4, component: FreeTask },
  { phase: 5, component: Presentation },
  { phase: 6, component: Analytics1 },
  { phase: 6, component: Analytics2 },
  { phase: 6, component: Analytics3 },
  { phase: 6, component: Analytics4 },
  { component: Closing },
];
