import type { FormDef } from "../types";
import { joinLower, lowerFirst, prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, coachNotes, confidence, rating } from "./act-shared";

// ACT Session 6: Values into Action (values and committed action). Looking
// back over the series, naming what matters in four areas of life, turning
// values into small actions, and planning for the thoughts and feelings that
// will show up. Wording is Lumen Collective's own.

const SKILLS = [
  "Dropping the rope",
  "Dropping anchor",
  "Unhooking from thoughts",
  "Making room for feelings",
  "The noticing self",
];

export const act6ValuesAction: FormDef = {
  slug: "act-6-values-action",
  title: "ACT Session 6: Values into Action",
  description:
    "Bringing it together: what matters most, small actions guided by those values, and the skills to use when it gets hard.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving([0, 5], "Today brings together everything from the last few sessions and turns it into action."),
    {
      title: "Looking back",
      minutes: [5, 12],
      fields: [
        ask("ask_back", [
          "How did noticing the part of you that notices go this week?",
          "Looking back over our sessions, what's been most useful?",
          "What has changed, even a little, in how you respond to hard thoughts and feelings?",
        ]),
        { id: "useful", type: "multi", label: "Which skills have been most useful?", options: SKILLS },
        coachNotes("notes_back"),
      ],
    },
    {
      title: "What matters most",
      minutes: [12, 22],
      intro: "Values are how you want to be and what you want to stand for. They're like a compass: they give you a direction, not a destination.",
      fields: [
        prompt(
          "p_values",
          "Keep values as qualities of action (caring, brave, curious, reliable), not goals or feelings. If they've done the Values Bullseye or Life Audit, use those. It's fine to leave an area blank."
        ),
        { id: "values_relationships", type: "textarea", label: "Relationships: how I want to be with the people in my life" },
        { id: "values_work", type: "textarea", label: "Work, study or contribution: what I want to bring" },
        { id: "values_health", type: "textarea", label: "Health and growth: how I want to look after myself" },
        { id: "values_fun", type: "textarea", label: "Fun and rest: what I want more of" },
      ],
    },
    {
      title: "From values to action",
      minutes: [22, 35],
      intro: "Choose a value or two and turn them into small, specific actions you could take this week.",
      fields: [
        prompt(
          "p_action",
          "Actions should be within their control, specific (what, when, where) and small enough to do even on a hard day. The aim is to act on the value, not to feel good while doing it."
        ),
        {
          id: "actions",
          type: "pairs",
          label: "My values and the actions I'll take",
          columns: ["Value", "Small action this week"],
          rows: 3,
        },
      ],
    },
    {
      title: "When it gets hard",
      minutes: [35, 43],
      fields: [
        ask("ask_hard", [
          "When you start these actions, what thoughts might show up?",
          "What feelings might show up?",
          "What will you do when the passengers start shouting?",
        ]),
        { id: "might_show_up", type: "textarea", label: "Thoughts and feelings that might show up" },
        { id: "skills_plan", type: "multi", label: "Skills I can use when they do", options: [...SKILLS, "Remembering why it matters"] },
        rating(
          "willing",
          "How willing are you to make room for those thoughts and feelings to do what matters?",
          "Not willing",
          "Completely willing"
        ),
      ],
    },
    {
      title: "Bringing it home",
      minutes: [43, 50],
      fields: [
        prompt(
          "p_close",
          `Celebrate what they've done across the sessions. Agree what comes next for your work together. ${CLOSE_PROMPT}`
        ),
        confidence(),
        {
          id: "next",
          type: "choice",
          label: "What next for our coaching?",
          options: [
            "Keep practising these skills",
            "Set a goal with SMART and GROW",
            "Revisit one of the sessions",
            "Review in a few weeks",
            "Something else",
          ],
        },
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines = [`${participant || "The participant"} completed ACT Session 6: Values into Action.`];
    const useful = list("useful");
    if (useful.length) lines.push(`Most useful skills: ${sentence(joinLower(useful))}`);
    const actions = Array.from({ length: 3 }, (_, row) => [text(`actions_${row + 1}_0`), text(`actions_${row + 1}_1`)])
      .filter(([value, action]) => value || action)
      .map(([value, action]) => (value && action ? `${value}: ${action.replace(/[.\s]+$/, "")}` : value || action));
    if (actions.length) lines.push(`Values into action: ${sentence(actions.join("; "))}`);
    const willing = number("willing");
    if (willing !== null) lines.push(`Willingness: ${willing}/10.`);
    const conf = number("confidence");
    if (conf !== null) lines.push(`Confidence: ${conf}/10.`);
    const next = text("next");
    if (next) lines.push(`Next: ${lowerFirst(next)}.`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
