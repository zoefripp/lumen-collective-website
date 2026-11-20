import type { FormDef, ScaleField } from "../types";
import { prompt, read, sentence } from "./shared";

// The Art of Good Enough. Maximisers and satisficers: a short quiz written
// for Lumen Collective (a reflection tool, not a validated measure), what the
// score means, and questions for finding "good enough" decisions.

const STATEMENTS = [
  "When I'm shopping, I keep looking even after I've found something that would do.",
  "Choosing what to watch takes ages, because something better might be on.",
  "I often wonder how things would have turned out if I'd chosen differently.",
  "I compare my choices with what other people have.",
  "I rewrite messages or emails several times before I send them.",
  "I need to read lots of reviews before I buy something.",
  "Even when I'm happy with something, I wonder if I could have done better.",
  "Making decisions takes me a long time.",
  "I hold myself to very high standards in most things.",
  "I feel uneasy if I haven't checked every option.",
];

const quizItems: ScaleField[] = STATEMENTS.map((label, index) => ({
  id: `q${index + 1}`,
  type: "scale",
  label,
  min: 1,
  max: 5,
  minLabel: "Strongly disagree",
  maxLabel: "Strongly agree",
}));

export const goodEnough: FormDef = {
  slug: "good-enough",
  title: "The Art of Good Enough",
  description: "Maximisers and satisficers: a short quiz and what the score means, finding where \"good enough\" would do, and good-enough answers to decisions that cause stress.",
  hideEmpty: true,
  sections: [
    {
      title: "Maximisers and satisficers",
      fields: [
        {
          id: "about",
          type: "note",
          label: "Two ways of making decisions",
          text:
            "MAXIMISERS want the best possible choice. They look at every option, compare a lot, and often keep wondering whether something better was out there. This can bring good results, but also stress, regret and decisions that take a long time.\n\nSATISFICERS (from \"satisfy\" and \"suffice\") have a clear idea of what they need, and choose the first option that meets it. Good enough is good enough. They tend to feel calmer and happier with their choices.\n\nMost of us are a mix, and it changes from one part of life to another. Being a maximiser about the things that really matter can be helpful. The trouble comes when we maximise over things that don't matter much.",
          print: true,
        },
      ],
    },
    {
      title: "Quiz: am I a maximiser or a satisficer?",
      intro: "For each statement, choose how much you agree, from 1 (strongly disagree) to 5 (strongly agree). Go with your first answer.",
      fields: [
        ...quizItems,
        {
          id: "quiz_note",
          type: "note",
          label: "About this quiz",
          text: "This is a short reflection quiz written for these sessions, not a diagnostic or research tool. Use the score as a starting point for conversation.",
          print: true,
        },
      ],
    },
    {
      title: "What my score means",
      fields: [
        {
          id: "meaning",
          type: "note",
          label: "Interpreting your score (10 to 50)",
          text:
            "10 to 23: Mostly a satisficer. You tend to settle on what's good enough and move on. Notice if there are important areas where it would help to slow down and weigh things up.\n\n24 to 36: A mix. You maximise in some parts of life and satisfice in others. The questions below can help you spot where maximising is costing you.\n\n37 to 50: Mostly a maximiser. You put a lot of energy into getting things just right, which can bring stress and second-guessing. Practising \"good enough\" in low-stakes areas can free up time and energy.",
          print: true,
        },
        prompt(
          "p_meaning",
          "Talk through the score without judgement: maximising often comes from caring a lot or from anxiety about getting it wrong. Link it to their experience: where does it help, and where does it cost them?"
        ),
      ],
    },
    {
      title: "Finding good enough",
      fields: [
        {
          id: "low_stakes",
          type: "textarea",
          label: "In what parts of my life am I a maximiser, when the decisions don't have much impact on my life?",
        },
        {
          id: "decisions",
          type: "pairs",
          label: "Think of decisions that cause you distress or anxiety. Come up with one \"good enough\" solution for each.",
          columns: ["The decision", "A good enough solution"],
          rows: 4,
        },
        {
          id: "long_term",
          type: "textarea",
          label: "What happens in the long term if I can't make these decisions? What will I be missing out on?",
        },
        { id: "try_this_week", type: "textarea", label: "One decision I'll make \"good enough\" this week" },
      ],
    },
  ],
  scores: [
    {
      id: "maximiser",
      label: "Maximiser score",
      fieldIds: STATEMENTS.map((_, index) => `q${index + 1}`),
      method: "sum",
      bands: [
        { min: 10, max: 23, label: "Mostly a satisficer" },
        { min: 24, max: 36, label: "A mix of both" },
        { min: 37, max: 50, label: "Mostly a maximiser" },
      ],
    },
  ],
  summary: ({ answers, scores, participant }) => {
    const { text } = read(answers);
    const lines: string[] = [];
    const score = scores.maximiser;
    if (score && score.value !== null) lines.push(`${participant || "The participant"} scored ${score.value} out of 50: ${score.band?.toLowerCase()}.`);
    const low = text("low_stakes");
    if (low) lines.push(`Maximising where it matters little: ${sentence(low)}`);
    const week = text("try_this_week");
    if (week) lines.push(`Good enough this week: ${sentence(week)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
