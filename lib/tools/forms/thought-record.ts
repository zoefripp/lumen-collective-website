import type { FormDef } from "../types";
import { joinLower, notes, prompt, read, sentence } from "./shared";

// CBT thought record: situation, feelings and body, the thought that bothered
// them most, thinking traps, evidence for and against, a balanced thought, and
// re-rating afterwards. The summary shows how the ratings changed.

export const thoughtRecord: FormDef = {
  slug: "thought-record",
  title: "Thought Record",
  description:
    "CBT thought record: situation, feelings, the hot thought, thinking traps, evidence, a balanced thought and re-rating.",
  sections: [
    {
      title: "The situation",
      fields: [
        prompt(
          "p_situation",
          "Pick one specific moment, ideally recent and moderately upsetting, not the hardest thing they've faced. Stick to the facts first: what a video camera would have seen."
        ),
        { id: "when_where", type: "text", label: "When and where" },
        { id: "situation", type: "textarea", label: "What happened?" },
        notes("notes_situation"),
      ],
    },
    {
      title: "Feelings and body",
      fields: [
        {
          id: "feelings",
          type: "multi",
          label: "What did you feel?",
          options: ["Anxious", "Sad", "Angry", "Frustrated", "Ashamed", "Guilty", "Lonely", "Hopeless", "Embarrassed", "Overwhelmed"],
        },
        { id: "feelings_other", type: "text", label: "Other feelings" },
        {
          id: "feeling_before",
          type: "scale",
          label: "How strong was the main feeling?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "As strong as it gets",
        },
        {
          id: "body",
          type: "multi",
          label: "What did you notice in your body?",
          options: ["Racing heart", "Tight chest", "Tense muscles", "Butterflies", "Shaking", "Hot or flushed", "Tearful", "Heavy or tired"],
        },
        notes("notes_feelings"),
      ],
    },
    {
      title: "Thoughts",
      fields: [
        prompt(
          "p_thoughts",
          "Ask: What went through your mind? What did it say about you, other people or the future? Then find the hot thought: the one most linked to the strongest feeling."
        ),
        { id: "thoughts", type: "textarea", label: "What went through your mind?" },
        { id: "hot_thought", type: "textarea", label: "The thought that bothered you most" },
        {
          id: "belief_before",
          type: "scale",
          label: "How much did you believe it at the time?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Completely",
        },
        {
          id: "traps",
          type: "multi",
          label: "Any thinking traps?",
          help: "Optional. Pick any that fit.",
          options: [
            "All-or-nothing thinking",
            "Catastrophising",
            "Mind reading",
            "Fortune telling",
            "Overgeneralising",
            "Should statements",
            "Labelling",
            "Discounting the positive",
            "Emotional reasoning",
            "Blaming myself",
          ],
        },
        notes("notes_thoughts"),
      ],
    },
    {
      title: "Looking at the evidence",
      fields: [
        prompt(
          "p_evidence",
          "Be curious, not argumentative. Look for facts rather than interpretations. Useful questions: Has this happened before, and how did it turn out? What would someone who cares about you say? What would you say to a friend in the same spot?"
        ),
        { id: "evidence_for", type: "textarea", label: "What supports the thought?" },
        { id: "evidence_against", type: "textarea", label: "What doesn't fit with the thought?" },
        { id: "friend", type: "textarea", label: "What would you say to a friend who had this thought?" },
        notes("notes_evidence"),
      ],
    },
    {
      title: "A more balanced thought",
      fields: [
        prompt(
          "p_balanced",
          "Aim for balanced and believable, not forced positivity. It often starts with \"Even though…\" or \"Another way to see it is…\"."
        ),
        { id: "balanced", type: "textarea", label: "A more balanced way to see it" },
        {
          id: "belief_balanced",
          type: "scale",
          label: "How much do you believe the balanced thought?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Completely",
        },
        notes("notes_balanced"),
      ],
    },
    {
      title: "Afterwards",
      fields: [
        {
          id: "feeling_after",
          type: "scale",
          label: "How strong is the main feeling now?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "As strong as it gets",
        },
        {
          id: "belief_after",
          type: "scale",
          label: "How much do you believe the original thought now?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Completely",
        },
        { id: "next_time", type: "textarea", label: "What could you do next time this happens?" },
        notes("notes_after"),
      ],
    },
  ],
  summary: ({ answers }) => {
    const { text, list, number } = read(answers);
    const lines: string[] = [];

    const situation = text("situation");
    if (situation) lines.push(`Situation: ${sentence(situation)}`);
    const feelings = [...list("feelings"), ...(text("feelings_other") ? [text("feelings_other")] : [])];
    if (feelings.length) lines.push(`Feelings: ${sentence(joinLower(feelings))}`);
    const hot = text("hot_thought");
    if (hot) lines.push(`Hot thought: "${hot.replace(/[.\s]+$/, "")}"`);
    const traps = list("traps");
    if (traps.length) lines.push(`Thinking traps noticed: ${sentence(joinLower(traps))}`);
    const balanced = text("balanced");
    if (balanced) lines.push(`Balanced thought: "${balanced.replace(/[.\s]+$/, "")}"`);

    const change = (label: string, before: number | null, after: number | null) => {
      if (before === null || after === null) return;
      const diff = after - before;
      const direction = diff === 0 ? "no change" : diff < 0 ? `down ${-diff}` : `up ${diff}`;
      lines.push(`${label}: ${before}/10 before, ${after}/10 after (${direction}).`);
    };
    change("Strength of main feeling", number("feeling_before"), number("feeling_after"));
    change("Belief in the hot thought", number("belief_before"), number("belief_after"));

    const next = text("next_time");
    if (next) lines.push(`Plan for next time: ${sentence(next)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
