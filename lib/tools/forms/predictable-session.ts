import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, ask, coachNotes } from "./act-shared";

// Predictable Session Plan. The same five steps every time, shown up front,
// for participants who do best with predictability and concrete structure
// (for example autistic participants). Plain, literal wording; a sensory
// check; a choice of talking or writing; and a written plan to take home.

export const predictableSession: FormDef = {
  slug: "predictable-session",
  title: "Predictable Session Plan",
  description:
    "The same five steps every session, shown up front: plan, check-in with a sensory check, main focus, a written plan for the week, and finishing.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    {
      title: "1. Today's plan",
      minutes: [0, 5],
      fields: [
        {
          id: "agenda",
          type: "note",
          label: "What we'll do today",
          text:
            "1. Today's plan (5 minutes)\n2. Since last time (5 minutes)\n3. Main focus (25 minutes)\n4. My plan for this week (10 minutes)\n5. Finishing (5 minutes)\n\nWe can take a break at any time. Just say or show \"break\".",
          print: true,
        },
        prompt(
          "p_agenda",
          "Show them this screen and read the plan aloud. Keep the order the same every session. Tell them about any change (time, place, a new person) at the very start. If OCD comes up, follow their OCD Support and Reassurance Plan."
        ),
        {
          id: "comm_today",
          type: "choice",
          label: "How would you like to communicate today?",
          options: ["Talking", "Typing or writing", "A mix of both"],
        },
        {
          id: "sensory",
          type: "multi",
          label: "Is anything bothering your senses right now?",
          options: ["Noise", "Light", "Temperature", "Smells", "Seating", "Clothing", "Nothing"],
        },
        { id: "sensory_fix", type: "text", label: "What would help with that?" },
      ],
    },
    {
      title: "2. Since last time",
      minutes: [5, 10],
      fields: [
        { id: "went_well", type: "textarea", label: "One thing that went well" },
        { id: "was_hard", type: "textarea", label: "One thing that was hard" },
        {
          id: "plan_done",
          type: "choice",
          label: "Did you do the plan from last session?",
          options: ["Yes, all of it", "Some of it", "Not this time", "We didn't make one"],
        },
      ],
    },
    {
      title: "3. Main focus",
      minutes: [10, 35],
      fields: [
        prompt(
          "p_focus",
          "Ask one question at a time and wait: silence is thinking time. Say exactly what you mean and avoid figures of speech. Use the iPad to write or draw things out. Check understanding by asking them to tell you in their own words. Offer a break around halfway."
        ),
        {
          id: "focus",
          type: "choice",
          label: "What are we working on today?",
          options: [
            "Daily routines",
            "A goal",
            "Something that's worrying me",
            "Practice from my psychologist",
            "Getting ready for a change",
            "Something else",
          ],
        },
        { id: "focus_words", type: "text", label: "In my words, today's topic is…" },
        ask("ask_focus", [
          "What would you like to be different about this?",
          "What have you already tried?",
          "What is one small step that would help?",
          "What could get in the way, and what will you do then?",
        ]),
        { id: "focus_notes", type: "textarea", label: "What we talked about" },
        { id: "decided", type: "textarea", label: "What I learned or decided" },
        { id: "took_break", type: "choice", label: "Did we take a break?", options: ["Yes", "No"] },
      ],
    },
    {
      title: "4. My plan for this week",
      minutes: [35, 45],
      intro: "Write down exactly what you'll do and when, so it's clear.",
      fields: [
        {
          id: "week_plan",
          type: "pairs",
          label: "My plan",
          columns: ["What I'll do", "When"],
          rows: 3,
        },
        {
          id: "reminder",
          type: "choice",
          label: "Would a reminder help?",
          options: ["A text message", "A written list", "A calendar reminder", "No reminder"],
        },
      ],
    },
    {
      title: "5. Finishing",
      minutes: [45, 50],
      fields: [
        prompt("p_finish", `Finish the same way every time. Confirm the next session clearly. ${CLOSE_PROMPT}`),
        { id: "next_session", type: "text", label: "Next session: day, time and place" },
        {
          id: "changes_coming",
          type: "textarea",
          label: "Anything changing before next time?",
          help: "For example: a different room, a public holiday, someone new joining.",
        },
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];
    const focus = text("focus_words") || text("focus");
    if (focus) lines.push(`${name} worked on: ${sentence(focus)}`);
    const decided = text("decided");
    if (decided) lines.push(`Decided: ${sentence(decided)}`);
    const plan = Array.from({ length: 3 }, (_, row) => [text(`week_plan_${row + 1}_0`), text(`week_plan_${row + 1}_1`)])
      .filter(([what]) => what)
      .map(([what, when]) => (when ? `${what.replace(/[.\s]+$/, "")} (${when})` : what.replace(/[.\s]+$/, "")));
    if (plan.length) lines.push(`Plan for the week: ${sentence(plan.join("; "))}`);
    const next = text("next_session");
    if (next) lines.push(`Next session: ${sentence(next)}`);
    const changes = text("changes_coming");
    if (changes) lines.push(`Changes to prepare for: ${sentence(changes)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
