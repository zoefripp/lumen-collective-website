import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";

// My Coping Toolbox. Coping strategies sorted by type, their own additions,
// their top go-to strategies, and which to use in which situations.

export const copingToolbox: FormDef = {
  slug: "coping-toolbox",
  title: "My Coping Toolbox",
  description: "Coping strategies sorted by type (calming, distracting, connecting, moving, senses, thinking), their go-to five, and what to use when.",
  hideEmpty: true,
  sections: [
    {
      title: "Filling my toolbox",
      intro: "Tick the strategies that work for you, or that you'd like to try. Add your own too.",
      fields: [
        prompt(
          "p_tools",
          "Different situations need different tools: calming works for some moments, distraction or moving for others. Ask what they've already done that helped, even a little. Aim for variety across the types."
        ),
        {
          id: "calming",
          type: "multi",
          label: "Calming",
          options: ["Slow breathing", "A warm shower or bath", "Calming music", "Lying down somewhere quiet", "Prayer or meditation", "A cup of tea"],
        },
        {
          id: "distracting",
          type: "multi",
          label: "Distracting",
          options: ["A show or movie", "Puzzles or games", "Reading", "Cooking", "Tidying or sorting", "A hobby"],
        },
        {
          id: "connecting",
          type: "multi",
          label: "Connecting",
          options: ["Call or text someone", "Visit someone", "Time with a pet", "A support group", "A helpline"],
        },
        {
          id: "moving",
          type: "multi",
          label: "Moving",
          options: ["Going for a walk", "Stretching", "Dancing", "Gardening", "Exercise"],
        },
        {
          id: "senses",
          type: "multi",
          label: "Using my senses",
          options: ["Cold water on my face", "Holding something comforting", "A favourite smell", "Weighted blanket", "Headphones", "Something to fidget with"],
        },
        {
          id: "thinking",
          type: "multi",
          label: "Helpful things to tell myself",
          options: ["This feeling will pass", "I've got through this before", "One step at a time", "I'm doing the best I can", "It's okay to ask for help"],
        },
        { id: "own", type: "textarea", label: "My own strategies" },
      ],
    },
    {
      title: "My go-to five",
      fields: [{ id: "top_five", type: "textarea", label: "The five I'll reach for first", help: "One per line." }],
    },
    {
      title: "What to use when",
      fields: [
        {
          id: "when",
          type: "pairs",
          label: "Situations and what I'll try",
          columns: ["When this happens…", "I'll try…"],
          rows: 4,
        },
        { id: "keep_where", type: "textarea", label: "Where I'll keep this list so I can find it", help: "For example: a photo on my phone, on the fridge." },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const lines = [`${participant || "The participant"} filled their coping toolbox.`];
    const counts = ["calming", "distracting", "connecting", "moving", "senses", "thinking"]
      .map((id) => [id, list(id).length] as const)
      .filter(([, count]) => count > 0)
      .map(([id, count]) => `${id} ${count}`);
    if (counts.length) lines.push(`Strategies chosen: ${sentence(counts.join(", "))}`);
    const top = text("top_five");
    if (top) lines.push(`Go-to strategies: ${sentence(joinLower(top.split(/\s*\n\s*|\s{2,}/).filter(Boolean)))}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
