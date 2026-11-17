import type { FormDef } from "../types";
import { sampleCheckIn } from "./sample-check-in";

// Every form listed here appears in the /tools menu, in this order.
export const forms: FormDef[] = [sampleCheckIn];

export function getForm(slug: string): FormDef | undefined {
  return forms.find((form) => form.slug === slug);
}
