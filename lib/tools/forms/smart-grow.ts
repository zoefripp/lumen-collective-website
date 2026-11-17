import type { Field, FormDef } from "../types";
import { prompt, read, sentence } from "./shared";
import { formatDate } from "../scoring";

// SMART goal and GROW plan. Worked through together over a good part of a
// session: shape the goal with SMART, then plan it with GROW (Goal, Reality,
// Options, Way forward). The PDF uses the "goal map" layout so it can be
// shared with the participant as it is.

const STEPS = 3;

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

const stepFields = (n: number): Field[] => [
  { id: `step_${n}`, type: "textarea", label: `Step ${n}` },
  { id: `step_${n}_when`, type: "date", label: `Step ${n}: by when` },
  { id: `step_${n}_who`, type: "text", label: `Step ${n}: who or what can help` },
];

export const smartGrow: FormDef = {
  slug: "smart-grow",
  title: "SMART Goal and GROW Plan",
  description:
    "Shape one goal with SMART, then plan it with GROW. Allow a good part of the session. The PDF is a goal map you can share with the participant.",
  layout: "goalMap",
  sections: [
    {
      title: "Getting started",
      fields: [
        prompt(
          "p_start",
          "Allow 30 to 40 minutes. This is their goal, in their words: your job is to ask, reflect back and help shape it. The PDF is written to be shared with them, so keep wording respectful and in their voice. Work on one goal at a time."
        ),
        {
          id: "goal_raw",
          type: "textarea",
          label: "What would you like to work towards?",
          help: "In your own words. It can be big or vague for now.",
          required: true,
        },
        { id: "area", type: "choice", label: "Which part of life is this about?", options: lifeAreas },
      ],
    },
    {
      title: "Making it SMART",
      intro: "Now let's shape it into a goal you can act on.",
      fields: [
        prompt(
          "p_smart",
          "Go letter by letter, using their words. If it gets stuck on one letter, move on and come back. A smaller goal they believe in beats a bigger one they don't."
        ),
        {
          id: "specific",
          type: "textarea",
          label: "Specific: what exactly will you do?",
          help: "What, where, and with whom.",
        },
        {
          id: "measurable",
          type: "textarea",
          label: "Measurable: how will you know you've done it?",
          help: "Something you could see, count or tick off.",
        },
        {
          id: "achievable",
          type: "textarea",
          label: "Achievable: what makes this doable for you right now?",
          help: "Your strengths, time, energy and supports.",
        },
        {
          id: "achievable_rating",
          type: "scale",
          label: "How achievable does it feel?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Completely",
        },
        {
          id: "relevant",
          type: "textarea",
          label: "Relevant: why does this matter to you?",
          help: "How it connects to what you value or want for your life.",
        },
        { id: "target_date", type: "date", label: "Time-bound: by when?" },
        prompt(
          "p_smart_goal",
          "Pull it together and read it back to them. A useful shape: \"I will [what] by [when], so that [why it matters].\" Check it sounds like them."
        ),
        {
          id: "smart_goal",
          type: "textarea",
          label: "My SMART goal, in one sentence",
          required: true,
        },
      ],
    },
    {
      title: "Reality: where are things now?",
      fields: [
        prompt(
          "p_reality",
          "Stay curious and non-judgemental. Look for what's already working as much as what's hard."
        ),
        { id: "reality_now", type: "textarea", label: "What's happening now with this?" },
        { id: "reality_tried", type: "textarea", label: "What have you already tried, and what helped?" },
        { id: "reality_barriers", type: "textarea", label: "What's getting in the way?" },
        {
          id: "reality_rating",
          type: "scale",
          label: "Where are you now with this goal?",
          min: 0,
          max: 10,
          minLabel: "Not started",
          maxLabel: "Achieved",
        },
      ],
    },
    {
      title: "Options: what could you do?",
      fields: [
        prompt(
          "p_options",
          "Brainstorm first, judge later. Aim for at least three ideas, including small and unusual ones. Ask: What else? What would you suggest to a friend? What's worked for you before?"
        ),
        {
          id: "options",
          type: "textarea",
          label: "All the options you can think of",
          help: "One per line.",
        },
        { id: "option_choice", type: "textarea", label: "Which option will you start with, and why?" },
      ],
    },
    {
      title: "Way forward: your action plan",
      fields: [
        prompt(
          "p_way",
          "Break the chosen option into small, concrete steps with dates. The first step should be doable within a week."
        ),
        ...Array.from({ length: STEPS }, (_, index) => stepFields(index + 1)).flat(),
        { id: "if_hard", type: "textarea", label: "If it gets hard, I will…" },
        { id: "supports", type: "textarea", label: "People and supports who can help me" },
        {
          id: "confidence",
          type: "scale",
          label: "How confident do you feel about taking the first step?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Very confident",
        },
        prompt(
          "p_confidence",
          "If confidence is below 7, ask what would move it up one point, and make the first step smaller until it feels doable."
        ),
        { id: "review_date", type: "date", label: "When we'll review this goal" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, number } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];
    const goal = text("smart_goal") || text("goal_raw");
    if (goal) lines.push(`${name}'s goal: ${sentence(goal)}`);
    const target = text("target_date");
    if (target) lines.push(`Target date: ${formatDate(target)}.`);
    const now = number("reality_rating");
    if (now !== null) lines.push(`Where they are now: ${now}/10.`);
    const steps = Array.from({ length: STEPS }, (_, index) => text(`step_${index + 1}`)).filter(Boolean);
    if (steps.length) lines.push(`First step: ${sentence(steps[0])}`);
    const confidence = number("confidence");
    if (confidence !== null) lines.push(`Confidence about the first step: ${confidence}/10.`);
    const review = text("review_date");
    if (review) lines.push(`Review on ${formatDate(review)}.`);
    return lines;
  },
  signatures: [
    { id: "participant", label: "Participant" },
    { id: "coach", label: "Recovery Coach", required: true },
  ],
};
