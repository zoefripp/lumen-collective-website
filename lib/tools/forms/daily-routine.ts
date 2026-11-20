import type { FormDef, Section } from "../types";
import { prompt, read, sentence } from "./shared";

// Daily Routine Planner. A morning, daytime and evening routine with fixed
// anchors and flexible parts, plus what helps them get started and what to do
// when the routine is interrupted. Plain, concrete wording.

const part = (id: string, title: string, intro: string): Section => ({
  title,
  intro,
  fields: [
    {
      id,
      type: "pairs",
      label: title,
      columns: ["Time", "What I do", "Must do or flexible?"],
      widths: [1.2, 4, 1.8],
      rows: 5,
    },
  ],
});

export const dailyRoutine: FormDef = {
  slug: "daily-routine",
  title: "Daily Routine Planner",
  description: "A morning, daytime and evening routine with must-do anchors and flexible parts, what helps them get started, and a plan for interruptions.",
  hideEmpty: true,
  sections: [
    {
      title: "About my routine",
      fields: [
        {
          id: "about",
          type: "note",
          label: "Why a routine helps",
          text:
            "A routine makes days more predictable and takes away some of the effort of deciding what to do next. Anchors are the parts you do every day, at about the same time. Flexible parts can move around or be skipped on a hard day.",
          print: true,
        },
        prompt(
          "p_routine",
          "Start with what they already do, not an ideal day. Build around a few anchors (waking, meals, medication, bedtime). Keep it realistic: a routine that works on a hard day is better than a perfect one."
        ),
      ],
    },
    part("morning", "Morning", "From waking up until lunch."),
    part("daytime", "Daytime", "From lunch until dinner."),
    part("evening", "Evening", "From dinner until bed."),
    {
      title: "Making it work",
      fields: [
        { id: "start_helps", type: "textarea", label: "What helps me get started", help: "For example: an alarm, a checklist on the fridge, a text from someone." },
        { id: "interrupted", type: "textarea", label: "If my routine gets interrupted, I'll…" },
        { id: "hard_day", type: "textarea", label: "On a hard day, the must-dos are…" },
        {
          id: "reminder",
          type: "choice",
          label: "Where I'll keep my routine",
          options: ["On the fridge", "A photo on my phone", "Phone reminders", "In my diary", "Somewhere else"],
        },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const anchors = ["morning", "daytime", "evening"]
      .flatMap((id) =>
        Array.from({ length: 5 }, (_, row) => ({
          time: text(`${id}_${row + 1}_0`),
          what: text(`${id}_${row + 1}_1`),
          kind: text(`${id}_${row + 1}_2`).toLowerCase(),
        }))
      )
      .filter((item) => item.what && item.kind.startsWith("must"))
      .map((item) => (item.time ? `${item.what.replace(/[.\s]+$/, "")} (${item.time})` : item.what.replace(/[.\s]+$/, "")));
    const lines = [`${participant || "The participant"} planned a daily routine.`];
    if (anchors.length) lines.push(`Must-do anchors: ${sentence(anchors.join("; "))}`);
    const hard = text("hard_day");
    if (hard) lines.push(`On a hard day: ${sentence(hard)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
