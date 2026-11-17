// Building blocks for the in-person forms under /tools.
// To add a form: create a file in lib/tools/forms/, describe it with these
// types, and add it to the list in lib/tools/forms/index.ts.

export type TextField = {
  id: string;
  type: "text" | "textarea" | "date";
  label: string;
  help?: string;
  required?: boolean;
};

export type ChoiceField = {
  id: string;
  type: "choice"; // pick one
  label: string;
  help?: string;
  options: string[];
  required?: boolean;
};

export type MultiField = {
  id: string;
  type: "multi"; // pick any
  label: string;
  help?: string;
  options: string[];
};

export type ScaleField = {
  id: string;
  type: "scale"; // numbered rating, can feed a score
  label: string;
  help?: string;
  min: number;
  max: number;
  minLabel?: string;
  maxLabel?: string;
  required?: boolean;
};

export type NoteField = {
  id: string;
  type: "note"; // coaching prompt shown on screen only, never in the PDF
  label: string;
  text: string;
  // An information panel instead: always shown and printed in the PDF
  // (for example crisis numbers on a safety plan).
  print?: boolean;
};

export type WheelField = {
  id: string;
  type: "wheel"; // Wheel of Life: each area is marked 1..max and stored under its own id
  label: string;
  help?: string;
  areas: { id: string; label: string }[];
  max: number;
  // "bullseye": ACT values target. The centre ring is the highest value
  // (living fully by that value) and a marker shows where they placed it.
  variant?: "wheel" | "bullseye";
  minLabel?: string; // meaning of the lowest value, shown on screen
  maxLabel?: string; // meaning of the highest value
};

export type Field = TextField | ChoiceField | MultiField | ScaleField | NoteField | WheelField;

export type Section = {
  title: string;
  intro?: string;
  fields: Field[];
};

export type Band = {
  min: number; // inclusive
  max: number; // inclusive
  label: string;
};

export type ScoreDef = {
  id: string;
  label: string;
  fieldIds: string[]; // scale fields that feed this score
  method: "sum" | "average";
  // Average whatever has been answered instead of waiting for every item,
  // so skipped questions don't block the score.
  allowPartial?: boolean;
  bands?: Band[];
};

export type ScoreResult = {
  id: string;
  label: string;
  value: number | null; // null until every item is answered
  outOf: number;
  band?: string;
  answered: number;
  total: number;
};

export type AnswerValue = string | number | string[] | undefined;
export type Answers = Record<string, AnswerValue>;

export type SummaryContext = {
  answers: Answers;
  scores: Record<string, ScoreResult>;
  participant: string;
};

export type SignatureDef = {
  id: string;
  label: string;
  required?: boolean;
};

export type FormDef = {
  slug: string;
  title: string;
  description: string;
  sample?: boolean; // shows a "sample" tag in the menu
  sections: Section[];
  scores?: ScoreDef[];
  // Returns the paragraphs of the automatic summary.
  summary?: (context: SummaryContext) => string[];
  signatures: SignatureDef[];
};

// Details collected at the top of every form.
export type Details = {
  participant: string;
  coach: string;
  date: string; // yyyy-mm-dd
};

export type Signatures = Record<string, string | undefined>; // PNG data URLs
