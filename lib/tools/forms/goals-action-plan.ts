import type { Field, FormDef, Section } from "../types";
import { notes, prompt, read, sentence } from "./shared";
import { formatDate } from "../scoring";

// Recovery goals and action plan. Up to three goals in the participant's own
// words, each linked to why it matters, broken into steps, with a 0-10
// "where I am now" rating to review at later sessions.

const GOALS = 3;

const lifeAreas = [
  "Home and living",
  "Health and wellbeing",
  "Relationships and connection",
  "Work, study or volunteering",
  "Community and interests",
  "Money and everyday tasks",
  "Independence and skills",
  "Other",
];

const goalSection = (n: number): Section => {
  const fields: Field[] = [
    {
      id: `goal_${n}`,
      type: "textarea",
      label: "My goal, in my own words",
      required: n === 1,
    },
    { id: `area_${n}`, type: "choice", label: "Area of life", options: lifeAreas },
    { id: `why_${n}`, type: "textarea", label: "Why this matters to me" },
    {
      id: `ndis_${n}`,
      type: "text",
      label: "NDIS plan goal this links to",
      help: "Optional.",
    },
    {
      id: `steps_${n}`,
      type: "textarea",
      label: "Steps to get there",
      help: "Small, specific steps. One per line.",
    },
    { id: `supports_${n}`, type: "textarea", label: "Who or what can help" },
    { id: `barriers_${n}`, type: "textarea", label: "What might get in the way, and what I'll do about it" },
    { id: `date_${n}`, type: "date", label: "Target date" },
    {
      id: `progress_${n}`,
      type: "scale",
      label: "Where I am with this goal right now",
      min: 0,
      max: 10,
      minLabel: "Just starting",
      maxLabel: "Achieved",
    },
    notes(`notes_goal_${n}`),
  ];
  if (n === 1) {
    fields.unshift(
      prompt(
        "p_goal",
        "Use their words, even if they're broad (\"I want to feel more like myself\"). Then help make it concrete: What would be different? How would you know you're getting there? Keep the first step small enough to start this week."
      )
    );
  }
  return {
    title: n === 1 ? "Goal 1" : `Goal ${n} (optional)`,
    fields,
  };
};

export const goalsActionPlan: FormDef = {
  slug: "goals-action-plan",
  title: "Recovery Goals and Action Plan",
  description:
    "Up to three goals in the participant's words, linked to what matters, with steps, supports and a progress rating to review.",
  sections: [
    {
      title: "Getting started",
      fields: [
        prompt(
          "p_start",
          "Start from what matters to them, not from services or the NDIS plan. If they've done a Wheel of Life or values bullseye, use it here. One goal done well is better than three rushed."
        ),
        {
          id: "plan_type",
          type: "choice",
          label: "This plan is",
          options: ["A new plan", "A review of an existing plan"],
        },
        notes("notes_start"),
      ],
    },
    ...Array.from({ length: GOALS }, (_, index) => goalSection(index + 1)),
    {
      title: "Reviewing",
      fields: [
        { id: "review_date", type: "date", label: "When we'll review this plan" },
        notes("notes_review"),
      ],
    },
  ],
  scores: [
    {
      id: "progress",
      label: "Average progress across goals",
      fieldIds: Array.from({ length: GOALS }, (_, index) => `progress_${index + 1}`),
      method: "average",
      allowPartial: true,
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, number } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];
    let count = 0;
    for (let n = 1; n <= GOALS; n++) {
      const goal = text(`goal_${n}`);
      if (!goal) continue;
      count++;
      const parts = [`Goal ${n}: ${sentence(goal)}`];
      if (text(`area_${n}`)) parts.push(`Area: ${text(`area_${n}`).toLowerCase()}.`);
      const progress = number(`progress_${n}`);
      if (progress !== null) parts.push(`Progress ${progress}/10.`);
      if (text(`date_${n}`)) parts.push(`Target ${formatDate(text(`date_${n}`))}.`);
      lines.push(parts.join(" "));
    }
    const kind = text("plan_type");
    if (count) {
      lines.unshift(
        `${name} set ${count} goal${count === 1 ? "" : "s"}${kind ? ` (${kind.toLowerCase()})` : ""}.`
      );
    }
    const review = text("review_date");
    if (review) lines.push(`Review by ${formatDate(review)}.`);
    return lines;
  },
  signatures: [
    { id: "participant", label: "Participant" },
    { id: "coach", label: "Recovery Coach", required: true },
  ],
};
