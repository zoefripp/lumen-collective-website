import type { FormDef, ScaleField } from "../types";

// Check-in for Psychosocial Recovery Coaching sessions.
//
// Built on three approaches:
// - Trauma-informed practice: safety and choice first, every question can be
//   skipped, the participant decides how the check-in runs, and it closes by
//   checking how they are leaving.
// - CBT: situation, thoughts, feelings and actions, and a confidence rating
//   for the next step.
// - ACT: noticing thoughts without being hooked by them, values, and a small
//   committed action.
//
// The scores are a conversation aid for tracking change over time. They are
// not a validated clinical measure.

const wellbeingAreas: { id: string; label: string }[] = [
  { id: "wb_mood", label: "My mood overall" },
  { id: "wb_energy", label: "My energy" },
  { id: "wb_sleep", label: "My sleep" },
  { id: "wb_connection", label: "Feeling connected to people" },
  { id: "wb_daily", label: "Managing day-to-day things" },
  { id: "wb_stress", label: "Coping with stress" },
];

const wellbeingFields: ScaleField[] = wellbeingAreas.map((area) => ({
  id: area.id,
  type: "scale",
  label: area.label,
  min: 0,
  max: 10,
  minLabel: "Really hard",
  maxLabel: "Really good",
}));

const lower = (items: string[]) =>
  items.map((item) => (item === item.toUpperCase() ? item : item.charAt(0).toLowerCase() + item.slice(1)));

const listText = (items: string[]) => lower(items).join(", ");

export const checkIn: FormDef = {
  slug: "check-in",
  title: "Check-in",
  description:
    "A session check-in drawing on ACT, CBT and trauma-informed practice. Covers wellbeing, thoughts and feelings, values and a next step.",
  sections: [
    {
      title: "Getting started",
      fields: [
        {
          id: "note_start",
          type: "note",
          label: "Coach prompt",
          text:
            "Let them know this is their check-in and they're in charge of how it goes: they can skip any question, take a break or stop at any time. Ask what would make today more comfortable.",
        },
        {
          id: "how_today",
          type: "choice",
          label: "How would you like to do the check-in today?",
          options: [
            "Go through it together",
            "I'll fill it in, then we talk",
            "Just talk, and my coach writes",
          ],
        },
        {
          id: "arrival",
          type: "scale",
          label: "How settled do you feel right now?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Very settled",
        },
        { id: "notes_start", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "How things have been",
      intro: "Since we last caught up. Rate each one from 0 to 10, or skip any you'd rather not.",
      fields: [
        ...wellbeingFields,
        {
          id: "stood_out",
          type: "textarea",
          label: "Has anything stood out since we last met?",
          help: "Something good, something hard, or both.",
        },
        { id: "notes_wellbeing", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "Noticing thoughts and feelings",
      intro: "Think of one moment from the past week or two that was hard.",
      fields: [
        {
          id: "situation",
          type: "textarea",
          label: "What was happening?",
          help: "Where you were, who was there, what happened.",
        },
        {
          id: "feelings",
          type: "multi",
          label: "Which feelings showed up?",
          options: [
            "Anxious",
            "Sad",
            "Angry",
            "Frustrated",
            "Lonely",
            "Overwhelmed",
            "Ashamed",
            "Numb",
            "Tired",
            "Calm",
            "Hopeful",
            "Proud",
          ],
        },
        { id: "other_feelings", type: "text", label: "Other feelings that showed up" },
        {
          id: "thoughts",
          type: "textarea",
          label: "What thoughts came up?",
        },
        {
          id: "note_defusion",
          type: "note",
          label: "Coach prompt",
          text:
            "Invite them to say the thought as \"I'm having the thought that...\". Help them notice the thought rather than argue with it, then ask whether it's helpful right now.",
        },
        {
          id: "hooked",
          type: "choice",
          label: "How much did those thoughts hook you?",
          options: ["Hardly at all", "A bit", "Quite a lot", "Completely"],
        },
        {
          id: "action",
          type: "textarea",
          label: "What did you do next?",
          help: "Anything you did, or didn't do, afterwards.",
        },
        {
          id: "helpful",
          type: "choice",
          label: "Looking back, did that help in the long run?",
          options: ["Yes", "Partly", "No", "Not sure"],
        },
        { id: "notes_thoughts", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "What matters to you",
      fields: [
        {
          id: "values",
          type: "multi",
          label: "Which of these feel important to you right now?",
          options: [
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
          ],
        },
        {
          id: "values_lived",
          type: "scale",
          label: "How closely have your days matched what matters to you?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Very closely",
        },
        {
          id: "barriers",
          type: "textarea",
          label: "What got in the way?",
        },
        { id: "notes_values", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "Coping and strengths",
      fields: [
        {
          id: "coping",
          type: "multi",
          label: "What helped, even a little?",
          options: [
            "Talking to someone",
            "Getting outside",
            "Movement or exercise",
            "Routine",
            "Breathing or grounding",
            "Music or creativity",
            "Rest",
            "Pets",
            "Faith or spirituality",
            "Support worker",
            "Health professional",
          ],
        },
        {
          id: "strength",
          type: "textarea",
          label: "A strength you used, or something you're proud of",
        },
        { id: "notes_coping", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "Safety and support",
      fields: [
        {
          id: "safe",
          type: "choice",
          label: "Are you feeling safe at the moment?",
          options: ["Yes", "Mostly", "Not right now", "I'd rather talk about it"],
        },
        {
          id: "note_safety",
          type: "note",
          label: "Coach prompt",
          text:
            "If the answer is anything other than \"Yes\", pause the check-in and follow your risk and safety procedures. Crisis contacts are on the Support in a Crisis page of the Lumen Collective website.",
        },
        {
          id: "support_needed",
          type: "textarea",
          label: "Is there any support you need that you're not getting?",
        },
        { id: "notes_safety", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "Next steps",
      fields: [
        {
          id: "next_step",
          type: "textarea",
          label: "One small step before we next meet",
          help: "Something that moves you towards what matters to you.",
        },
        {
          id: "confidence",
          type: "scale",
          label: "How confident do you feel about that step?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Very confident",
        },
        {
          id: "if_hard",
          type: "textarea",
          label: "What could help if it gets hard?",
        },
        {
          id: "next_meeting",
          type: "date",
          label: "Next catch-up",
        },
        {
          id: "leaving",
          type: "choice",
          label: "How are you feeling now, compared with when we started?",
          options: ["Better", "About the same", "Worse", "Not sure"],
        },
        {
          id: "note_close",
          type: "note",
          label: "Coach prompt",
          text:
            "If they're leaving feeling worse, take a few minutes to ground before finishing, and agree what they'll do for the rest of the day.",
        },
        {
          id: "coach_notes",
          type: "textarea",
          label: "Notes",
          help: "Optional.",
        },
      ],
    },
  ],
  scores: [
    {
      id: "wellbeing",
      label: "Wellbeing snapshot",
      fieldIds: wellbeingAreas.map((area) => area.id),
      method: "average",
      allowPartial: true,
      bands: [
        { min: 0, max: 3.9, label: "Doing it tough" },
        { min: 4, max: 6.9, label: "Getting by" },
        { min: 7, max: 10, label: "Doing well" },
      ],
    },
    {
      id: "values",
      label: "Living by what matters",
      fieldIds: ["values_lived"],
      method: "sum",
    },
  ],
  summary: ({ answers, scores, participant }) => {
    const name = participant || "The participant";
    const text = (id: string) => {
      const value = answers[id];
      return typeof value === "string" ? value.trim() : "";
    };
    const list = (id: string) => {
      const value = answers[id];
      return Array.isArray(value) ? value : [];
    };
    const number = (id: string) => {
      const value = answers[id];
      return typeof value === "number" ? value : null;
    };
    const lines: string[] = [];

    // Safety goes first so it can't be missed.
    const safe = text("safe");
    if (safe && safe !== "Yes") {
      lines.push(
        `Safety: ${name} answered "${safe}" when asked about feeling safe. Follow up under your risk and safety procedures.`
      );
    }

    const wellbeing = scores.wellbeing;
    if (wellbeing && wellbeing.value !== null) {
      const basis =
        wellbeing.answered < wellbeing.total ? `, based on ${wellbeing.answered} of ${wellbeing.total} areas` : "";
      lines.push(
        `Wellbeing snapshot: ${wellbeing.value} out of 10 (${wellbeing.band?.toLowerCase()}${basis}).`
      );
      const rated = wellbeingAreas
        .map((area) => ({ label: area.label, value: number(area.id) }))
        .filter((item): item is { label: string; value: number } => item.value !== null);
      if (rated.length > 1) {
        const highest = Math.max(...rated.map((item) => item.value));
        const lowest = Math.min(...rated.map((item) => item.value));
        const named = (value: number) =>
          lower(rated.filter((item) => item.value === value).map((item) => item.label)).join("; ");
        if (highest !== lowest) {
          lines.push(`Strongest area: ${named(highest)} (${highest}/10). Hardest area: ${named(lowest)} (${lowest}/10).`);
        }
      }
    }

    const otherFeelings = text("other_feelings");
    const feelings = [...list("feelings"), ...(otherFeelings ? [otherFeelings] : [])];
    const hooked = text("hooked");
    if (feelings.length || hooked) {
      const parts: string[] = [];
      if (feelings.length) parts.push(`Feelings noticed in a hard moment: ${listText(feelings)}.`);
      if (hooked) parts.push(`Hooked by difficult thoughts: ${hooked.toLowerCase()}.`);
      lines.push(parts.join(" "));
    }

    const values = list("values");
    const lived = number("values_lived");
    if (values.length || lived !== null) {
      const parts: string[] = [];
      if (values.length) parts.push(`What matters right now: ${listText(values)}.`);
      if (lived !== null) parts.push(`Days matched those values ${lived}/10.`);
      lines.push(parts.join(" "));
    }

    const coping = list("coping");
    if (coping.length) lines.push(`What helped: ${listText(coping)}.`);

    const step = text("next_step");
    const confidence = number("confidence");
    if (step) {
      lines.push(
        `Next step: ${step.replace(/[.\s]+$/, "")}.${confidence !== null ? ` Confidence ${confidence}/10.` : ""}`
      );
    }

    const arrival = number("arrival");
    const leaving = text("leaving");
    if (arrival !== null || leaving) {
      const parts: string[] = [];
      if (arrival !== null) parts.push(`Settled at the start: ${arrival}/10.`);
      if (leaving) parts.push(`Feeling at the end compared with the start: ${leaving.toLowerCase()}.`);
      lines.push(parts.join(" "));
    }

    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
