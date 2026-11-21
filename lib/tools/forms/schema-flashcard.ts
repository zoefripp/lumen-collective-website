import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";
import { ALL_SCHEMAS, schemaLabel } from "./schema-shared";

// Schema Flashcard. Working through one schema when it's triggered: what set
// it off, what they feel and think, where the old message came from, how they
// usually cope, what's also true now, and what they'll do instead. The summary
// pulls it together into a flashcard they can keep and read when it happens.

const COPING = [
  "Giving in to it (acting as if it's true)",
  "Avoiding (staying away from what sets it off)",
  "Fighting back (doing the opposite, often too much)",
];

export const schemaFlashcard: FormDef = {
  slug: "schema-flashcard",
  title: "Schema Flashcard",
  description: "Work through one schema when it's set off, then turn it into a flashcard to read next time: what's happening, the old message, what's true now, and what to do instead.",
  hideEmpty: true,
  sections: [
    {
      title: "Which schema?",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What a flashcard is for",
          text:
            "When a schema is set off, it can feel completely true and the feelings can be strong. A flashcard is a short note, written when you're calmer, to read in those moments. It reminds you what's happening, where it comes from, what's also true now, and what you want to do instead.",
          print: true,
        },
        {
          id: "schema",
          type: "choice",
          label: "Which schema are we working with?",
          options: ALL_SCHEMAS.map(schemaLabel),
        },
        prompt(
          "p_which",
          "Use their quiz results if they've done the Schema Quiz, or the pattern they recognise most. Choose a recent, moderately upsetting example, not the most painful one."
        ),
      ],
    },
    {
      title: "When it's set off",
      fields: [
        { id: "trigger", type: "textarea", label: "A recent situation that set it off" },
        { id: "feel", type: "textarea", label: "What I felt (emotions and in my body)" },
        { id: "think", type: "textarea", label: "What I thought, or what the schema told me" },
        { id: "coping", type: "choice", label: "How I usually cope when this schema is set off", options: COPING },
        { id: "did", type: "textarea", label: "What I did" },
      ],
    },
    {
      title: "The old message",
      fields: [
        prompt(
          "p_origin",
          "Keep this brief and gentle: naming where the message came from, not going into detail. If it brings up a lot, pause, ground together, and leave it there for today."
        ),
        { id: "origin", type: "textarea", label: "Where might I have learned this message?", help: "Only what you're comfortable sharing." },
        { id: "made_sense", type: "textarea", label: "How did it make sense, or protect me, back then?" },
      ],
    },
    {
      title: "What's true now",
      fields: [
        { id: "true_now", type: "textarea", label: "What's also true now?", help: "Think of evidence, other people's view, and what you'd tell a friend." },
        { id: "instead", type: "textarea", label: "Next time, instead of my usual way of coping, I'll…" },
        { id: "kind", type: "textarea", label: "A kind thing I can say to myself" },
      ],
    },
  ],
  summary: ({ answers }) => {
    const { text } = read(answers);
    const schema = text("schema");
    if (!schema) return [];
    const strip = (value: string) => value.replace(/[.\s]+$/, "");
    const parts = [
      text("feel") && `Right now I feel ${strip(text("feel")).toLowerCase()}${text("trigger") ? ` because ${strip(text("trigger")).charAt(0).toLowerCase()}${strip(text("trigger")).slice(1)}` : ""}.`,
      `This is my "${schema.split(" (")[0]}" schema.`,
      text("origin") && `I learned it from ${strip(text("origin")).charAt(0).toLowerCase()}${strip(text("origin")).slice(1)}.`,
      text("think") && `It tells me ${strip(text("think")).charAt(0).toLowerCase()}${strip(text("think")).slice(1)}.`,
      text("true_now") && `But what's also true now is ${strip(text("true_now")).charAt(0).toLowerCase()}${strip(text("true_now")).slice(1)}.`,
      text("instead") && `So instead I will ${strip(text("instead")).charAt(0).toLowerCase()}${strip(text("instead")).slice(1)}.`,
      text("kind") && sentence(text("kind")),
    ].filter(Boolean) as string[];
    return ["My flashcard:", parts.join(" ")];
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
