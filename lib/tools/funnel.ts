import type { Answers, FunnelField } from "./types";

// Where a narrowing exercise keeps its answers:
//   <id>_<stage>   the items chosen at each stage (string[])
//   <id>_custom    items they added themselves (string[])
//   <id>_kind      sorting answers, "item=0" or "item=1" (string[])
//   <id>_step      which step they're on (number)

export const stageKey = (field: { id: string }, stage: number) => `${field.id}_${stage}`;
export const customKey = (field: { id: string }) => `${field.id}_custom`;
export const kindKey = (field: { id: string }) => `${field.id}_kind`;
export const stepKey = (field: { id: string }) => `${field.id}_step`;

const list = (answers: Answers, key: string): string[] => {
  const value = answers[key];
  return Array.isArray(value) ? value : [];
};

export const chosenAt = (answers: Answers, field: FunnelField, stage: number) =>
  list(answers, stageKey(field, stage));

export const customItems = (answers: Answers, field: FunnelField) => list(answers, customKey(field));

export function kinds(answers: Answers, field: FunnelField): Record<string, number> {
  const result: Record<string, number> = {};
  for (const entry of list(answers, kindKey(field))) {
    const split = entry.lastIndexOf("=");
    if (split > 0) result[entry.slice(0, split)] = Number(entry.slice(split + 1));
  }
  return result;
}

export type FunnelStep = { kind: "pick"; stage: number } | { kind: "classify" } | { kind: "done" };

export function funnelSteps(field: FunnelField): FunnelStep[] {
  const steps: FunnelStep[] = [];
  field.stages.forEach((_, stage) => {
    steps.push({ kind: "pick", stage });
    if (field.classify && field.classify.afterStage === stage) steps.push({ kind: "classify" });
  });
  steps.push({ kind: "done" });
  return steps;
}

// The deepest stage that has anything chosen, for summaries.
export function finalChoices(answers: Answers, field: FunnelField): { stage: number; items: string[] } | null {
  for (let stage = field.stages.length - 1; stage >= 0; stage--) {
    const items = chosenAt(answers, field, stage);
    if (items.length) return { stage, items };
  }
  return null;
}

export function funnelAnswered(answers: Answers, field: FunnelField) {
  return field.stages.some((_, stage) => chosenAt(answers, field, stage).length > 0);
}
