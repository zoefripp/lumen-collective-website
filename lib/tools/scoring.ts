import type { Answers, FormDef, ScaleField, ScoreResult } from "./types";

function scaleFields(form: FormDef): Record<string, ScaleField> {
  const map: Record<string, ScaleField> = {};
  for (const section of form.sections) {
    for (const field of section.fields) {
      if (field.type === "scale") map[field.id] = field;
      // Each wheel area behaves like its own 1..max rating.
      if (field.type === "wheel") {
        for (const area of field.areas) {
          map[area.id] = { id: area.id, type: "scale", label: area.label, min: 1, max: field.max };
        }
      }
    }
  }
  return map;
}

export function computeScores(form: FormDef, answers: Answers): Record<string, ScoreResult> {
  const scales = scaleFields(form);
  const results: Record<string, ScoreResult> = {};

  for (const def of form.scores ?? []) {
    const fields = def.fieldIds.map((id) => scales[id]).filter(Boolean);
    const values = fields
      .map((field) => answers[field.id])
      .filter((value): value is number => typeof value === "number");
    const complete = fields.length > 0 && values.length === fields.length;

    const sum = values.reduce((total, value) => total + value, 0);
    const maxSum = fields.reduce((total, field) => total + field.max, 0);

    let value: number | null = null;
    let outOf = maxSum;
    const usable = complete || (def.allowPartial && values.length > 0);
    if (def.method === "average") {
      outOf = fields.length ? Math.max(...fields.map((field) => field.max)) : 0;
      if (usable) value = Math.round((sum / values.length) * 10) / 10;
    } else if (complete) {
      value = sum;
    }

    const band =
      value === null
        ? undefined
        : def.bands?.find((b) => value! >= b.min && value! <= b.max)?.label;

    results[def.id] = {
      id: def.id,
      label: def.label,
      value,
      outOf,
      band,
      answered: values.length,
      total: fields.length,
    };
  }
  return results;
}

export function formatDate(iso: string): string {
  const match = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : iso;
}

export function todayIso(): string {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
}

// Sections with a showIf only appear once the linked choice has a matching answer.
export function sectionVisible(section: { showIf?: { field: string; anyOf: string[] } }, answers: Answers): boolean {
  if (!section.showIf) return true;
  const value = answers[section.showIf.field];
  return typeof value === "string" && section.showIf.anyOf.includes(value);
}
