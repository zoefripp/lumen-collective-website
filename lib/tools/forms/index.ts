import type { FormDef } from "../types";
import { checkIn } from "./check-in";
import { checkOut } from "./check-out";
import { goalsActionPlan } from "./goals-action-plan";
import { headsAssessment } from "./heads-assessment";
import { safetyWellnessPlan } from "./safety-wellness-plan";
import { smartGrow } from "./smart-grow";
import { thoughtRecord } from "./thought-record";
import { valuesBullseye } from "./values-bullseye";
import { wheelOfLife } from "./wheel-of-life";

// Every form listed here appears in the /tools menu, in this order.
export const forms: FormDef[] = [
  headsAssessment,
  checkIn,
  checkOut,
  wheelOfLife,
  valuesBullseye,
  goalsActionPlan,
  smartGrow,
  safetyWellnessPlan,
  thoughtRecord,
];

export function getForm(slug: string): FormDef | undefined {
  return forms.find((form) => form.slug === slug);
}
