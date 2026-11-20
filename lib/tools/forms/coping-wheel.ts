import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";

// Coping Strategies Wheel. Helpful (adaptive) and unhelpful (maladaptive)
// coping: they mark how often they use ten common strategies on a wheel, then
// look at the long-term consequences and choose better strategies for
// overthinking and anxiety.

const HELPFUL = [
  { id: "cw_problem", label: "Problem solving" },
  { id: "cw_support", label: "Reaching out for support" },
  { id: "cw_move", label: "Moving my body" },
  { id: "cw_calm", label: "Calming and relaxing" },
  { id: "cw_accept", label: "Accepting what I can't change" },
];
const UNHELPFUL = [
  { id: "cw_avoid", label: "Avoiding things" },
  { id: "cw_overthink", label: "Overthinking and worrying" },
  { id: "cw_withdraw", label: "Withdrawing from people" },
  { id: "cw_numb", label: "Numbing (alcohol, drugs, scrolling)" },
  { id: "cw_critic", label: "Being hard on myself" },
];

export const copingWheel: FormDef = {
  slug: "coping-wheel",
  title: "Coping Strategies Wheel",
  description: "Helpful and unhelpful coping: mark how often they use ten strategies on a wheel, look 5 to 10 years ahead, and choose new strategies for overthinking and anxiety.",
  hideEmpty: true,
  sections: [
    {
      title: "Helpful and unhelpful coping",
      fields: [
        {
          id: "about",
          type: "note",
          label: "Two kinds of coping",
          text:
            "Everyone has ways of coping with stress. Some help in the long run (adaptive coping): they deal with the problem or help us recover, like problem solving, reaching out, moving, calming and accepting what we can't change.\n\nOthers help in the moment but cost us later (unhelpful or maladaptive coping): avoiding, overthinking, withdrawing, numbing out or being hard on ourselves. They made sense at the time, and they may have helped us survive, but they can keep us stuck.\n\nThere's no shame in any coping strategy. The aim is to notice which ones we use, and choose more of the ones that help.",
          print: true,
        },
      ],
    },
    {
      title: "My coping wheel",
      intro: "Tap each slice to show how often you use that strategy. The centre is 1 (never) and the edge is 10 (all the time). The first five help in the long run; the last five help now but cost later.",
      fields: [
        prompt(
          "p_wheel",
          "Hand over the iPad. Stay curious and kind about the unhelpful ones: ask what they do for them, not just what they cost."
        ),
        {
          id: "wheel",
          type: "wheel",
          label: "How often I use each coping strategy",
          areas: [...HELPFUL, ...UNHELPFUL],
          max: 10,
          minLabel: "never",
          maxLabel: "all the time",
        },
      ],
    },
    {
      title: "Looking ahead",
      fields: [
        { id: "consequences", type: "textarea", label: "What are the long-term consequences of using these coping patterns?" },
        {
          id: "years_ahead",
          type: "textarea",
          label: "Think 5 to 10 years ahead. How will my life look if I keep using these strategies?",
          help: "The outcomes can be both positive and negative.",
        },
      ],
    },
    {
      title: "Choosing new strategies",
      fields: [
        { id: "new_strategies", type: "textarea", label: "What coping strategies could I adopt now to deal with overthinking and anxiety better?" },
        {
          id: "actions",
          type: "pairs",
          label: "What are some concrete actions I could take to build them in?",
          columns: ["Strategy", "Concrete action, and when"],
          rows: 3,
        },
      ],
    },
  ],
  scores: [
    { id: "helpful", label: "Helpful coping (average)", fieldIds: HELPFUL.map((item) => item.id), method: "average", allowPartial: true },
    { id: "unhelpful", label: "Unhelpful coping (average)", fieldIds: UNHELPFUL.map((item) => item.id), method: "average", allowPartial: true },
  ],
  summary: ({ answers, scores, participant }) => {
    const { text } = read(answers);
    const lines: string[] = [];
    const helpful = scores.helpful;
    const unhelpful = scores.unhelpful;
    if (helpful?.value !== null && unhelpful?.value !== null && helpful && unhelpful) {
      lines.push(`${participant || "The participant"} uses helpful coping ${helpful.value}/10 and unhelpful coping ${unhelpful.value}/10 on average.`);
    }
    const marked = [...HELPFUL, ...UNHELPFUL]
      .map((area) => ({ label: area.label, value: answers[area.id] }))
      .filter((item): item is { label: string; value: number } => typeof item.value === "number");
    const top = [...marked].sort((a, b) => b.value - a.value)[0];
    if (top) lines.push(`Uses most: ${top.label.toLowerCase()} (${top.value}/10).`);
    const actions = Array.from({ length: 3 }, (_, row) => text(`actions_${row + 1}_0`)).filter(Boolean);
    if (actions.length) lines.push(`New strategies: ${sentence(actions.join(", "))}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
