import type { FormDef } from "../types";
import { formatDate } from "../scoring";
import { prompt, read, sentence } from "./shared";

// Problem Solving. Six steps: name the problem, what solved looks like,
// brainstorm options, weigh them up, choose and plan, then review.

export const problemSolving: FormDef = {
  slug: "problem-solving",
  title: "Problem Solving",
  description: "Six steps: name the problem, picture it solved, brainstorm options, weigh them up, choose and plan, then review how it went.",
  hideEmpty: true,
  sections: [
    {
      title: "1. The problem",
      fields: [
        prompt(
          "p_problem",
          "Break big problems into one specific piece. Describe it as facts: what, where, when, who. Stay with one problem at a time."
        ),
        { id: "problem", type: "textarea", label: "What exactly is the problem?" },
      ],
    },
    {
      title: "2. What would solved look like?",
      fields: [{ id: "goal", type: "textarea", label: "If this was sorted, what would be different?" }],
    },
    {
      title: "3. All the options",
      intro: "Write down every idea, even ones that seem silly. Don't judge them yet.",
      fields: [{ id: "options", type: "textarea", label: "Possible options", help: "One per line." }],
    },
    {
      title: "4. Weigh them up",
      fields: [
        {
          id: "weigh",
          type: "pairs",
          label: "Pros and cons of the best few options",
          columns: ["Option", "Pros", "Cons"],
          widths: [2, 3, 3],
          rows: 4,
        },
      ],
    },
    {
      title: "5. Choose and plan",
      fields: [
        { id: "chosen", type: "textarea", label: "The option I'll try, and why" },
        {
          id: "steps",
          type: "pairs",
          label: "Steps",
          columns: ["Step", "When", "Who can help"],
          widths: [3, 1.5, 2],
          rows: 4,
        },
        { id: "obstacles", type: "textarea", label: "What might get in the way, and what I'll do" },
        { id: "review_date", type: "date", label: "When I'll check how it went" },
      ],
    },
    {
      title: "6. How did it go?",
      intro: "Fill this in when you review it.",
      fields: [
        {
          id: "outcome",
          type: "choice",
          label: "Did it help?",
          options: ["Yes, it's sorted", "It helped a bit", "Not yet", "No, try another option"],
        },
        { id: "learned", type: "textarea", label: "What I learned, and what's next" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const lines: string[] = [];
    const problem = text("problem");
    if (problem) lines.push(`${participant || "The participant"}'s problem: ${sentence(problem)}`);
    const chosen = text("chosen");
    if (chosen) lines.push(`Chosen option: ${sentence(chosen)}`);
    const first = text("steps_1_0");
    if (first) lines.push(`First step: ${sentence(first)}${text("steps_1_1") ? ` (${text("steps_1_1")})` : ""}`);
    const review = text("review_date");
    if (review) lines.push(`Review on ${formatDate(review)}.`);
    const outcome = text("outcome");
    if (outcome) lines.push(`Outcome: ${sentence(outcome.toLowerCase())}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
