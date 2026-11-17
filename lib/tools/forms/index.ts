import type { FormDef } from "../types";
import { checkIn } from "./check-in";
import { headsAssessment } from "./heads-assessment";
import { wheelOfLife } from "./wheel-of-life";

// Every form listed here appears in the /tools menu, in this order.
export const forms: FormDef[] = [headsAssessment, checkIn, wheelOfLife];

export function getForm(slug: string): FormDef | undefined {
  return forms.find((form) => form.slug === slug);
}
