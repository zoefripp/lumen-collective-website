import type { FormDef } from "../types";
import { act1GettingUnstuck } from "./act-1-getting-unstuck";
import { act2DroppingAnchor } from "./act-2-dropping-anchor";
import { checkIn } from "./check-in";
import { checkOut } from "./check-out";
import { goalsActionPlan } from "./goals-action-plan";
import { headsAssessment } from "./heads-assessment";
import { lifeAuditValues } from "./life-audit-values";
import { safetyWellnessPlan } from "./safety-wellness-plan";
import { smartGrow } from "./smart-grow";
import { thoughtRecord } from "./thought-record";
import { valuesBullseye } from "./values-bullseye";
import { wheelOfLife } from "./wheel-of-life";

// The forms menu, in order, under these headings.
const menu: [string, FormDef[]][] = [
  ["Getting started", [headsAssessment]],
  ["Every session", [checkIn, checkOut]],
  ["Goals and planning", [goalsActionPlan, smartGrow, safetyWellnessPlan]],
  ["Tools and worksheets", [wheelOfLife, valuesBullseye, lifeAuditValues, thoughtRecord]],
  ["ACT sessions", [act1GettingUnstuck, act2DroppingAnchor]],
];

export const forms: FormDef[] = menu.flatMap(([group, items]) =>
  items.map((form) => ({ ...form, group: form.group ?? group }))
);

export function getForm(slug: string): FormDef | undefined {
  return forms.find((form) => form.slug === slug);
}
