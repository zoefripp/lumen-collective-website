import type { FormDef } from "../types";
import { notes, prompt, read, sentence } from "./shared";
import { formatDate } from "../scoring";

// Check-out: a short close to every session. Checks how the participant is
// leaving, captures one takeaway and one next step, and flags anyone who
// isn't okay to leave so it can't be missed.

const OKAY_TO_LEAVE = ["Yes, I'm okay", "I'd like a few minutes first", "Not really"];
const SAFE = ["Yes", "Mostly", "Not right now", "I'd rather talk about it"];

export const checkOut: FormDef = {
  slug: "check-out",
  title: "Check-out",
  description: "For the end of a session: how they're leaving, safety, one takeaway and one next step.",
  sections: [
    {
      title: "Before you go",
      fields: [
        prompt(
          "p_close",
          "Leave five minutes for this. If they're unsettled, slow down and ground together before finishing (breathing, feet on the floor, naming five things they can see). Don't end on the hardest part of the session."
        ),
        {
          id: "settled",
          type: "scale",
          label: "How settled do you feel right now?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Very settled",
        },
        { id: "takeaway", type: "textarea", label: "One thing I'm taking away from today" },
        { id: "next_step", type: "textarea", label: "My next step before we meet again" },
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
          id: "okay_to_leave",
          type: "choice",
          label: "Do you feel okay to leave today?",
          options: OKAY_TO_LEAVE,
          required: true,
        },
        {
          id: "safe",
          type: "choice",
          label: "Are you feeling safe right now?",
          options: SAFE,
          required: true,
        },
        prompt(
          "p_not_okay",
          "If either answer is anything other than \"Yes\", stay with them. Agree what they'll do for the rest of the day and who they'll be with, check their safety plan and crisis contacts, and follow your risk and safety procedures."
        ),
        { id: "next_session", type: "date", label: "Next catch-up" },
        notes("notes_checkout"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, number } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];

    // Safety first, so it can't be missed.
    const safe = text("safe");
    if (safe && safe !== SAFE[0]) {
      lines.push(
        `Safety: ${name} answered "${safe}" when asked if they felt safe at the end of the session. Follow up under your risk and safety procedures.`
      );
    }
    const okay = text("okay_to_leave");
    if (okay && okay !== OKAY_TO_LEAVE[0]) {
      lines.push(`Follow up: ${name} answered "${okay}" when asked if they felt okay to leave.`);
    }
    const settled = number("settled");
    if (settled !== null) lines.push(`Settled at the end of the session: ${settled}/10.`);
    const takeaway = text("takeaway");
    if (takeaway) lines.push(`Taking away: ${sentence(takeaway)}`);
    const step = text("next_step");
    const confidence = number("confidence");
    if (step) lines.push(`Next step: ${sentence(step)}${confidence !== null ? ` Confidence ${confidence}/10.` : ""}`);
    const next = text("next_session");
    if (next) lines.push(`Next catch-up: ${formatDate(next)}.`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
