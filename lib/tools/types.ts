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

export type Field = TextField | ChoiceField | MultiField | ScaleField;

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
