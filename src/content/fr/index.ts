import type { Dictionary } from "../types";
import { common } from "./common";
import { home } from "./home";
import { agentsHub, agentEmail, agentDocs, agentSales, agentKnowledge, agentReporting } from "./agents";
import { automationsHub, sectorTraining, sectorLegal } from "./automations";
import { cases } from "./cases";
import { method } from "./method";
import { formation } from "./formation";
import { about } from "./about";
import { blog } from "./blogui";

export const fr = {
  common,
  home,
  agentsHub,
  automationsHub,
  agentEmail,
  agentDocs,
  agentSales,
  agentKnowledge,
  agentReporting,
  sectorTraining,
  sectorLegal,
  cases,
  method,
  formation,
  about,
  blog,
} satisfies Dictionary;
