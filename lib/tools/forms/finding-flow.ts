import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";

// Finding Flow. What flow is (being fully absorbed in something), times
// they've felt it, the kinds of activities and conditions that bring it on,
// and a plan to make room for flow activities. Links to ACT's present-moment
// and values skills.

export const findingFlow: FormDef = {
  slug: "finding-flow",
  title: "Finding Flow",
  description: "What flow is, times they've lost track of time doing something, what brings flow on, and a plan to make room for flow activities.",
  hideEmpty: true,
  sections: [
    {
      title: "What is flow?",
      fields: [
        {
          id: "about",
          type: "note",
          label: "Being in the flow",
          text:
            "Flow is when you're so absorbed in something that you lose track of time. Your mind is in the present, worries fade into the background, and you're focused on what you're doing.\n\nFlow often happens when an activity is challenging enough to hold your attention, but not so hard that it's stressful. It can come from almost anything: gardening, cooking, drawing, sport, music, fixing something, a puzzle, a good conversation.\n\nIn ACT, flow is a natural way of being present and doing what matters. The more time we spend in flow, the less room there is for getting hooked by worries.",
          print: true,
        },
        { id: "how_often", type: "scale", label: "How often do I experience flow?", min: 0, max: 10, minLabel: "Never", maxLabel: "Often" },
      ],
    },
    {
      title: "My flow moments",
      fields: [
        prompt(
          "p_moments",
          "If they can't think of any, go back further: childhood, before they became unwell, or small moments like a good song or a walk. Even a few minutes of absorption counts."
        ),
        { id: "times", type: "textarea", label: "Times I've lost track of time doing something" },
        {
          id: "kinds",
          type: "multi",
          label: "The kinds of activities that absorb me",
          options: ["Creative", "Physical or sport", "Outdoors and nature", "Learning something new", "Helping others", "Games or puzzles", "Making or fixing things", "Music", "Cooking", "Reading or writing"],
        },
        { id: "common", type: "textarea", label: "What do these activities have in common?" },
      ],
    },
    {
      title: "What helps flow happen",
      fields: [
        {
          id: "conditions",
          type: "multi",
          label: "Conditions that help me get into flow",
          options: ["Phone away", "A quiet space", "A clear goal", "The right level of challenge", "A certain time of day", "Being outside", "Music on", "Being with others"],
        },
        { id: "blocks", type: "textarea", label: "What gets in the way of flow for me?" },
      ],
    },
    {
      title: "Making room for flow",
      fields: [
        {
          id: "plan",
          type: "pairs",
          label: "My flow plan",
          columns: ["Activity", "When", "How long"],
          widths: [3, 2, 1.5],
          rows: 3,
        },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines: string[] = [];
    const often = number("how_often");
    if (often !== null) lines.push(`${participant || "The participant"} experiences flow ${often}/10.`);
    const kinds = list("kinds");
    if (kinds.length) lines.push(`Absorbed by: ${sentence(joinLower(kinds))}`);
    const plan = Array.from({ length: 3 }, (_, row) => text(`plan_${row + 1}_0`)).filter(Boolean);
    if (plan.length) lines.push(`Flow plan: ${sentence(plan.join("; "))}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
