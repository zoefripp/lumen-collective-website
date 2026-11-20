import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";

// Cognitive Distortions. Common thinking traps explained in plain words with
// examples, which ones they notice, and practice catching and rebalancing a
// few of their own thoughts.

const DISTORTIONS: [string, string][] = [
  ["All-or-nothing thinking", "Seeing things as all good or all bad. \"If it's not perfect, it's a failure.\""],
  ["Catastrophising", "Jumping to the worst possible outcome. \"If I make a mistake, I'll lose everything.\""],
  ["Mind reading", "Assuming you know what others think. \"They think I'm boring.\""],
  ["Fortune telling", "Predicting things will go badly. \"It won't work out, so why try?\""],
  ["Overgeneralising", "One bad thing means everything is bad. \"This always happens to me.\""],
  ["Should statements", "Rigid rules for yourself or others. \"I should be coping better.\""],
  ["Labelling", "Putting a label on yourself or others. \"I'm an idiot.\""],
  ["Discounting the positive", "Brushing off the good. \"They were only being nice.\""],
  ["Emotional reasoning", "Feeling it means it's true. \"I feel useless, so I must be.\""],
  ["Personalising", "Blaming yourself for things outside your control. \"It's my fault they're upset.\""],
  ["Mental filter", "Only noticing the negative. One bad comment outweighs ten good ones."],
];

export const cognitiveDistortions: FormDef = {
  slug: "cognitive-distortions",
  title: "Cognitive Distortions",
  description: "Common thinking traps in plain words with examples, which ones they notice in themselves, and practice catching and rebalancing their own thoughts.",
  hideEmpty: true,
  sections: [
    {
      title: "Thinking traps",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What are cognitive distortions?",
          text:
            "Cognitive distortions, or thinking traps, are shortcuts our minds take. Everyone has them. They aren't facts, but they can feel true, especially when we're stressed or low, and they can make us feel worse.\n\n" +
            DISTORTIONS.map(([name, meaning]) => `• ${name}: ${meaning}`).join("\n"),
          print: true,
        },
        prompt(
          "p_traps",
          "Read through them together and share an everyday example of your own if it helps normalise them. Keep it light and curious: noticing a trap is a skill, not a criticism."
        ),
        { id: "mine", type: "multi", label: "Which do I notice in myself?", options: DISTORTIONS.map(([name]) => name) },
        { id: "most", type: "textarea", label: "The one that shows up most, and when" },
      ],
    },
    {
      title: "Catching my thoughts",
      intro: "Write down a few thoughts that upset you. Name the trap, then try a more balanced thought.",
      fields: [
        {
          id: "catch",
          type: "pairs",
          label: "My thoughts",
          columns: ["The thought", "Thinking trap", "A more balanced thought"],
          widths: [3, 2, 3],
          rows: 4,
        },
        prompt(
          "p_balance",
          "A balanced thought should be believable, not forced positivity. Helpful questions: What's the evidence? What would I tell a friend? Is there another way to see this?"
        ),
      ],
    },
    {
      title: "This week",
      fields: [
        { id: "catch_phrase", type: "textarea", label: "When I notice a thinking trap, I'll say to myself…", help: "For example: \"There's the catastrophising again.\"" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const lines: string[] = [];
    const mine = list("mine");
    if (mine.length) lines.push(`${participant || "The participant"} notices: ${sentence(joinLower(mine))}`);
    const most = text("most");
    if (most) lines.push(`Shows up most: ${sentence(most)}`);
    const caught = Array.from({ length: 4 }, (_, row) => text(`catch_${row + 1}_0`)).filter(Boolean).length;
    if (caught) lines.push(`Thoughts caught and rebalanced: ${caught}.`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
