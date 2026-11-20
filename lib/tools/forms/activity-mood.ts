import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";

// Activity and Mood Planner (behavioural activation). Choose small activities
// that bring pleasure, achievement or connection, plan them across the week,
// and rate mood before and after to see what helps.

export const activityMood: FormDef = {
  slug: "activity-mood",
  title: "Activity and Mood Planner",
  description:
    "Plan small activities for the week that bring pleasure, achievement or connection, and rate mood before and after to see what helps.",
  hideEmpty: true,
  sections: [
    {
      title: "Why plan activities?",
      fields: [
        {
          id: "about",
          type: "note",
          label: "How this works",
          text:
            "When we feel low, we often do less, and doing less makes us feel lower. Doing small things anyway, even before we feel like it, can lift mood. Motivation often comes after we start, not before.\n\nWe'll look for activities that give you:\n• Pleasure: something you enjoy\n• Achievement: something that gives you a sense of getting things done\n• Connection: time with people or pets\n\nThen we'll plan a few, and you'll rate your mood before and after (0 to 10).",
          print: true,
        },
        prompt(
          "p_about",
          "Keep activities small and specific (\"walk to the letterbox\", not \"exercise more\"). Plan for when energy is usually best. Ratings are for learning what helps, not to judge."
        ),
      ],
    },
    {
      title: "Ideas",
      fields: [
        { id: "pleasure", type: "textarea", label: "Things that give me pleasure", help: "Big or small: a cuppa outside, music, a show, a hobby." },
        { id: "achievement", type: "textarea", label: "Things that give me a sense of achievement", help: "A small job, a chore, something I've been putting off." },
        { id: "connection", type: "textarea", label: "Things that help me feel connected", help: "A text, a call, a visit, time with a pet, a group." },
      ],
    },
    {
      title: "My week",
      intro: "Plan one or two small activities a day. For type, write pleasure, achievement or connection. Afterwards, write how you felt before and after, from 0 (very low) to 10 (great).",
      fields: [
        {
          id: "week",
          type: "pairs",
          label: "My activity plan",
          columns: ["Day", "Activity", "Type", "Mood before", "Mood after"],
          widths: [1.2, 3, 2, 1, 1],
          rows: 7,
        },
      ],
    },
    {
      title: "Looking back",
      intro: "Fill this in when you review the week together.",
      fields: [
        { id: "lifted", type: "textarea", label: "What lifted my mood most?" },
        { id: "surprised", type: "textarea", label: "Did anything surprise me?" },
        { id: "next_week", type: "textarea", label: "What I'll keep doing or try next week" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const lines = [`${participant || "The participant"} planned activities for the week.`];
    const planned = Array.from({ length: 7 }, (_, row) => text(`week_${row + 1}_1`)).filter(Boolean);
    if (planned.length) lines.push(`Planned: ${sentence(planned.join("; "))}`);
    const lifted = text("lifted");
    if (lifted) lines.push(`Lifted mood most: ${sentence(lifted)}`);
    const next = text("next_week");
    if (next) lines.push(`Next week: ${sentence(next)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
