import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";
import { namesFrom } from "../circles";

// Circles of Support. People and services around them, in circles from
// closest out, drawn as a diagram, then who to go to for what.

const RINGS = [
  { label: "Closest to me", help: "The people I'm closest to and trust most." },
  { label: "Friends and family", help: "People I see or talk to, and enjoy." },
  { label: "Community", help: "Neighbours, groups, clubs, faith community, people I see around." },
  { label: "Paid supports and services", help: "GP, psychologist, support workers, coordinator, coach." },
];

export const circlesOfSupport: FormDef = {
  slug: "circles-of-support",
  title: "Circles of Support",
  description: "Map the people and services around them, from closest out, drawn as circles, then who to go to for what.",
  hideEmpty: true,
  sections: [
    {
      title: "My circles",
      intro: "Add names to each circle. They appear on the diagram as you type. Pets count too.",
      fields: [
        prompt(
          "p_circles",
          "Go gently: for some people this shows how few connections they have, which can be painful. Notice strengths and any connections that could grow. First names or roles are fine."
        ),
        { id: "circles", type: "circles", label: "My circles of support", rings: RINGS },
      ],
    },
    {
      title: "Who I go to for what",
      fields: [
        {
          id: "who_for",
          type: "pairs",
          label: "Who I can go to",
          columns: ["When I need…", "I can go to…"],
          rows: 5,
        },
        { id: "grow", type: "textarea", label: "A connection I'd like to grow, and one small step towards it" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const counts = RINGS.map((ring, index) => `${ring.label.toLowerCase()} ${namesFrom(answers[`circles_${index}`]).length}`);
    const lines = [`${participant || "The participant"} mapped their circles of support: ${sentence(counts.join(", "))}`];
    const grow = text("grow");
    if (grow) lines.push(`Connection to grow: ${sentence(grow)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
