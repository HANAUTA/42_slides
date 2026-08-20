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
import SetupAntigravity from "@/slides/10SetupAntigravity";
import Development from "@/slides/11Development";
import Presentation from "@/slides/12Presentation";
import Analytics1 from "@/slides/13Analytics1";
import Analytics2 from "@/slides/14Analytics2";
import Analytics3 from "@/slides/15Analytics3";
import Analytics4 from "@/slides/16Analytics4";
import Analytics5 from "@/slides/17Analytics5";
import Analytics6 from "@/slides/18Analytics6";
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
  { phase: 1, component: SetupAntigravity },
  { phase: 2, component: Development },
  { phase: 3, component: Presentation },
  { phase: 4, component: Analytics1 },
  { phase: 4, component: Analytics2 },
  { phase: 4, component: Analytics3 },
  { phase: 4, component: Analytics4 },
  { phase: 4, component: Analytics5 },
  { phase: 4, component: Analytics6 },
  { component: Closing, hideMascot: true },
];
