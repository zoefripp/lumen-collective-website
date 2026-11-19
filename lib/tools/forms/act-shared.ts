import type { Field, Section } from "../types";
import { prompt } from "./shared";

// Building blocks shared by the ACT session plans.

export const ACT_GROUP = "ACT sessions";

// Questions for the coach to ask aloud. Shown on screen only, like coach
// prompts, so a part of the session can be pure conversation.
export const ask = (id: string, questions: string[]): Field => ({
  id,
  type: "note",
  label: "Questions to explore",
  text: questions.map((question) => `•  ${question}`).join("\n"),
});

export const coachNotes = (id: string): Field => ({
  id,
  type: "textarea",
  label: "Notes",
  help: "Optional. What came up, in their words where it matters.",
});

export const VALUES_OPTIONS = [
  "Connection",
  "Family",
  "Health",
  "Independence",
  "Learning",
  "Creativity",
  "Helping others",
  "Fun",
  "Calm",
  "Courage",
  "Honesty",
  "Faith or spirituality",
  "Nature",
  "Work or study",
];

export const arriving = (minutes: [number, number], intro: string): Section => ({
  title: "Arriving",
  minutes,
  fields: [
    prompt(
      "p_arrive",
      `Welcome them and slow things down. Invite a couple of slow breaths, feeling their feet on the floor and noticing what they can see around them. ${intro}`
    ),
    {
      id: "arrival",
      type: "scale",
      label: "How settled do you feel right now?",
      min: 0,
      max: 10,
      minLabel: "Not at all",
      maxLabel: "Very settled",
    },
  ],
});

export const CLOSE_PROMPT =
  "Leave a few minutes at the end. Summarise what you heard in their words, check how they're feeling, and close with the Check-out form.";
