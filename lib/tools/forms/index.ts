import type { FormDef } from "../types";
import { act1GettingUnstuck } from "./act-1-getting-unstuck";
import { act2DroppingAnchor } from "./act-2-dropping-anchor";
import { act3Unhooking } from "./act-3-unhooking";
import { act4MakingRoom } from "./act-4-making-room";
import { act5NoticingSelf } from "./act-5-noticing-self";
import { act6ValuesAction } from "./act-6-values-action";
import { aboutMe } from "./about-me";
import { checkIn } from "./check-in";
import { ocdSupportPlan } from "./ocd-support-plan";
import { predictableSession } from "./predictable-session";
import { checkOut } from "./check-out";
import { goalsActionPlan } from "./goals-action-plan";
import { headsAssessment } from "./heads-assessment";
import { lifeAuditValues } from "./life-audit-values";
import { safetyWellnessPlan } from "./safety-wellness-plan";
import { smartGrow } from "./smart-grow";
import { thoughtRecord } from "./thought-record";
import { valuesBeliefsSession } from "./values-and-beliefs";
import { valuesBullseye } from "./values-bullseye";
import { wheelOfLife } from "./wheel-of-life";

// The forms menu, in order, under these headings.
const menu: [string, FormDef[]][] = [
  ["Getting started", [headsAssessment, aboutMe]],
  ["Every session", [checkIn, checkOut]],
  ["Goals and planning", [goalsActionPlan, smartGrow, safetyWellnessPlan, ocdSupportPlan]],
  ["Tools and worksheets", [wheelOfLife, valuesBullseye, lifeAuditValues, thoughtRecord]],
  ["Session plans", [act1GettingUnstuck, act2DroppingAnchor, act3Unhooking, act4MakingRoom, act5NoticingSelf, act6ValuesAction, valuesBeliefsSession, predictableSession]],
];

export const forms: FormDef[] = menu.flatMap(([group, items]) =>
  items.map((form) => ({ ...form, group: form.group ?? group }))
);

export function getForm(slug: string): FormDef | undefined {
  return forms.find((form) => form.slug === slug);
}
