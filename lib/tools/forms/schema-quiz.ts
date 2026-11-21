import type { FormDef, ScaleField, Section } from "../types";
import { prompt, read, sentence } from "./shared";
import { ALL_SCHEMAS, SCHEMA_DOMAINS } from "./schema-shared";

// Schema Quiz. Two statements for each of the 18 schemas, rated 1 to 5,
// grouped by domain. The summary ranks the schemas and explains the strongest
// in plain language. A reflection tool written for Lumen Collective, not the
// Young Schema Questionnaire and not a diagnosis.

const statementId = (schemaId: string, index: number) => `sq_${schemaId}_${index}`;

const domainSection = (domain: (typeof SCHEMA_DOMAINS)[number]): Section => ({
  title: domain.name,
  intro: "Choose how much each statement is like you, from 1 (not at all) to 5 (very much).",
  fields: domain.schemas.flatMap((schema) =>
    schema.statements.map(
      (label, index): ScaleField => ({
        id: statementId(schema.id, index),
        type: "scale",
        label,
        min: 1,
        max: 5,
        minLabel: "Not at all like me",
        maxLabel: "Very like me",
      })
    )
  ),
});

const schemaScore = (answers: Record<string, unknown>, schemaId: string): number | null => {
  const values = [0, 1].map((index) => answers[statementId(schemaId, index)]);
  return values.every((value) => typeof value === "number") ? (values as number[]).reduce((a, b) => a + b, 0) : null;
};

export const schemaQuiz: FormDef = {
  slug: "schema-quiz",
  title: "Schema Quiz",
  description: "A reflection quiz across the 18 schemas, with the strongest patterns explained in plain language. Not a diagnosis.",
  hideEmpty: true,
  sections: [
    {
      title: "About schemas",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What are schemas?",
          text:
            "Schemas are deep patterns of thinking and feeling about ourselves, other people and the world. They usually start in childhood or adolescence, often when some of our core emotional needs weren't met. They made sense at the time, and may have helped us cope, but later in life they can be set off by situations that feel similar, and they can feel like the absolute truth.\n\nEveryone has some schemas. Noticing them is the first step to responding differently.",
          print: true,
        },
        {
          id: "quiz_note",
          type: "note",
          label: "About this quiz",
          text:
            "This quiz was written for these sessions to help you reflect. It isn't the clinical schema questionnaire and it isn't a diagnosis. Go with your first answer, and think about how you are most of the time, not just today.",
          print: true,
        },
        prompt(
          "p_quiz",
          "Let them know some statements may stir up difficult feelings, and they can pause or skip any. Schemas often link to painful childhood experiences: keep the focus on noticing patterns now, not exploring past trauma. If the results bring up a lot, a psychologist trained in schema therapy is the right person for deeper work."
        ),
      ],
    },
    ...SCHEMA_DOMAINS.map(domainSection),
    {
      title: "My results",
      fields: [
        prompt(
          "p_results",
          "Go through the results together, starting with how they feel seeing them. Read the common beliefs aloud and ask which sound familiar. Use the download button to give them their own copy."
        ),
        { id: "results", type: "schemaResults", label: "How each pattern scored" },
      ],
    },
    {
      title: "Reflecting on my results",
      fields: [
        { id: "feels_true", type: "textarea", label: "Which results feel true for me?" },
        { id: "surprised", type: "textarea", label: "Did anything surprise me?" },
        { id: "shows_up", type: "textarea", label: "When do my strongest schemas tend to show up in my life now?" },
        { id: "explore", type: "textarea", label: "Which one would I like to understand better?", help: "The Schema Flashcard worksheet can help with this." },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const scored = ALL_SCHEMAS.map((schema) => ({ schema, score: schemaScore(answers, schema.id) })).filter(
      (item): item is { schema: (typeof ALL_SCHEMAS)[number]; score: number } => item.score !== null
    );
    if (!scored.length) return [];
    const lines: string[] = [];
    const name = participant || "The participant";
    lines.push(`${name} completed ${scored.length} of 18 schemas.`);
    const ranked = [...scored].sort((a, b) => b.score - a.score);
    const strong = ranked.filter((item) => item.score >= 8);
    const some = ranked.filter((item) => item.score >= 6 && item.score < 8);
    if (strong.length) {
      lines.push("Strongest patterns (8 to 10):");
      for (const item of strong) {
        lines.push(`• ${item.schema.name}, ${item.schema.formal} (${item.score}/10): ${item.schema.meaning}`);
      }
    }
    if (some.length) {
      lines.push(`Shows up sometimes (6 or 7): ${sentence(some.map((item) => `${item.schema.name} (${item.score}/10)`).join(", "))}`);
    }
    if (!strong.length && !some.length) lines.push("No schemas scored 6 or more.");
    const explore = text("explore");
    if (explore) lines.push(`Would like to understand better: ${sentence(explore)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
