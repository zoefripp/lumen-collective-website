import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";

// Journalling. Why journalling helps, prompts to choose from, and a journal
// table to fill between sessions: trigger, thought or belief, emotions and
// sensations, and response.

export const journalling: FormDef = {
  slug: "journalling",
  title: "Journalling",
  description: "Why journalling helps, prompts to try, and a journal to fill between sessions: trigger, thought or belief, emotions and sensations, and my response.",
  hideEmpty: true,
  sections: [
    {
      title: "Why journal?",
      fields: [
        {
          id: "about",
          type: "note",
          label: "How journalling helps",
          text:
            "Writing things down gets them out of your head and onto paper, where they're easier to look at. Over time, a journal helps you spot patterns: what sets you off, what your mind tells you, how your body reacts and what you do next. Noticing the pattern is the first step to changing it.\n\nThere's no right way to journal. A few lines is enough. Spelling and neatness don't matter.",
          print: true,
        },
        {
          id: "prompts",
          type: "note",
          label: "Prompts to try",
          text:
            "• What's on my mind right now?\n• What was the hardest moment today, and what helped?\n• What am I grateful for today, even something small?\n• What did I do today that I'm proud of?\n• What would I say to a friend who had my day?\n• What do I need more of tomorrow?\n• What's one thing I learned about myself this week?",
          print: true,
        },
        prompt(
          "p_why",
          "Work through one example together in the session so they know how to fill in the journal. Agree a time and place that fits their routine. Paper, phone notes or the printed PDF are all fine."
        ),
      ],
    },
    {
      title: "Practice together",
      fields: [
        { id: "practice_prompt", type: "textarea", label: "Choose a prompt and write a few lines" },
      ],
    },
    {
      title: "My journal",
      intro: "When something upsets or unsettles you this week, write it down. Fill in what you can.",
      fields: [
        {
          id: "journal",
          type: "pairs",
          label: "Journal entries",
          columns: ["Date", "Trigger: what happened?", "Thought or belief", "Emotions and body sensations", "My response: what I did"],
          widths: [1, 2.2, 2.2, 2.2, 2.2],
          rows: 5,
        },
      ],
    },
    {
      title: "My journalling plan",
      fields: [
        { id: "when", type: "text", label: "When and where I'll journal" },
        { id: "how_often", type: "choice", label: "How often", options: ["Every day", "Most days", "A few times a week", "When something comes up"] },
        { id: "patterns", type: "textarea", label: "Patterns I've noticed", help: "Fill this in when you review your journal together." },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const lines = [`${participant || "The participant"} started journalling.`];
    const entries = Array.from({ length: 5 }, (_, row) => text(`journal_${row + 1}_1`)).filter(Boolean).length;
    if (entries) lines.push(`Journal entries: ${entries}.`);
    const when = text("when");
    if (when) lines.push(`Plan: ${sentence(when)}${text("how_often") ? ` ${text("how_often")}.` : ""}`);
    const patterns = text("patterns");
    if (patterns) lines.push(`Patterns noticed: ${sentence(patterns)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
