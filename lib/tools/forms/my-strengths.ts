import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";

// Finding My Strengths. A self-reflection on strengths: choosing from a list,
// times they were at their best, what others see, strengths shown in hard
// times, their top three, and how to use one this week.

const STRENGTHS = [
  "Kindness", "Humour", "Persistence", "Creativity", "Honesty", "Curiosity",
  "Loyalty", "Courage", "Patience", "Being organised", "Problem solving", "Caring for others",
  "Practical skills", "Listening", "Resilience", "Fairness", "Gratitude", "Hope",
  "Leadership", "Teamwork", "Love of learning", "Faith or spirituality", "Self-awareness", "Adaptability",
];

export const myStrengths: FormDef = {
  slug: "my-strengths",
  title: "Finding My Strengths",
  description: "A self-reflection on strengths: choosing from a list, times they were at their best, what others see, strengths shown in hard times, and using one this week.",
  hideEmpty: true,
  sections: [
    {
      title: "My strengths",
      intro: "Tap the strengths that sound like you, even a little. Add your own too.",
      fields: [
        prompt(
          "p_strengths",
          "Many people find it hard to name their strengths, especially when they're struggling. Go slowly, offer examples you've noticed in them, and gently challenge \"I don't have any\". Getting through hard times takes strength."
        ),
        { id: "chosen", type: "multi", label: "Strengths that sound like me", options: STRENGTHS },
        { id: "own", type: "textarea", label: "Other strengths I have" },
      ],
    },
    {
      title: "Reflecting",
      fields: [
        { id: "best", type: "textarea", label: "A time I was at my best. What was I doing? Which strengths was I using?" },
        { id: "others_see", type: "textarea", label: "What would the people who know me say my strengths are?" },
        { id: "hard_times", type: "textarea", label: "What strengths have helped me get through hard times?" },
      ],
    },
    {
      title: "Using my strengths",
      fields: [
        { id: "top_three", type: "textarea", label: "My top three strengths" },
        {
          id: "use",
          type: "pairs",
          label: "Ways I'll use my strengths this week",
          columns: ["Strength", "How I'll use it"],
          rows: 3,
        },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const lines: string[] = [];
    const chosen = list("chosen");
    if (chosen.length) lines.push(`${participant || "The participant"}'s strengths: ${sentence(joinLower(chosen))}`);
    const top = text("top_three");
    if (top) lines.push(`Top three: ${sentence(top)}`);
    const use = Array.from({ length: 3 }, (_, row) => [text(`use_${row + 1}_0`), text(`use_${row + 1}_1`)])
      .filter(([strength, how]) => strength && how)
      .map(([strength, how]) => `${strength}: ${how.replace(/[.\s]+$/, "")}`);
    if (use.length) lines.push(`This week: ${sentence(use.join("; "))}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
