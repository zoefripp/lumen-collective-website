import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";

// Mindfulness Against Limiting Beliefs. Naming a limiting belief, noticing it
// mindfully as a thought rather than a fact, making room for the feelings it
// brings, and choosing an action guided by values instead.

export const limitingBeliefs: FormDef = {
  slug: "limiting-beliefs",
  title: "Mindfulness Against Limiting Beliefs",
  description: "Name a limiting belief, notice it mindfully as a thought rather than a fact, make room for what it brings up, and choose a small action anyway.",
  hideEmpty: true,
  sections: [
    {
      title: "Limiting beliefs",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What are limiting beliefs?",
          text:
            "Limiting beliefs are ideas about ourselves or the world that hold us back: \"I'm not smart enough\", \"I always mess things up\", \"People like me don't get that\". They often started as a way to protect us, but now they stop us doing things that matter.\n\nMindfulness doesn't argue with these beliefs or try to get rid of them. It helps us notice them as thoughts, not facts, so they have less control over what we do.\n\nFour steps: Notice it. Name it. Make room for it. Choose what to do.",
          print: true,
        },
        { id: "belief", type: "textarea", label: "A belief that limits me" },
        { id: "shows_up", type: "textarea", label: "When does it show up?" },
        { id: "stops_me", type: "textarea", label: "What does it stop me doing?" },
        { id: "strength_before", type: "scale", label: "How strongly do I believe it right now?", min: 0, max: 10, minLabel: "Not at all", maxLabel: "Completely" },
      ],
    },
    {
      title: "A mindful pause",
      intro: "About five minutes.",
      fields: [
        prompt(
          "p_pause",
          "Guide slowly, with pauses:\n\n1. Settle: feet on the floor, a few slow breaths.\n2. Notice: bring the belief to mind. Notice where you feel it in your body.\n3. Name it: say \"I'm having the thought that…\" in front of the belief. Then \"I notice I'm having the thought that…\".\n4. Make room: breathe into the feeling it brings. You don't have to like it, just let it be there.\n5. Choose: ask \"If this belief wasn't in charge, what would I do?\"\n\nOffer choice throughout; eyes open is fine."
        ),
        { id: "noticed", type: "textarea", label: "What I noticed" },
        { id: "strength_after", type: "scale", label: "Now, how strongly do I believe it?", min: 0, max: 10, minLabel: "Not at all", maxLabel: "Completely" },
      ],
    },
    {
      title: "Choosing what to do",
      fields: [
        { id: "if_not_in_charge", type: "textarea", label: "If this belief wasn't in charge, what would I do?" },
        { id: "helpful_thought", type: "textarea", label: "A kinder, more helpful thought I can hold alongside it" },
        { id: "action", type: "textarea", label: "One small action I'll take this week, even with the belief there" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, number } = read(answers);
    const lines: string[] = [];
    const belief = text("belief");
    if (belief) lines.push(`${participant || "The participant"}'s limiting belief: "${belief.replace(/[.\s]+$/, "")}"`);
    const before = number("strength_before");
    const after = number("strength_after");
    if (before !== null && after !== null) lines.push(`Belief strength: ${before}/10 before the mindful pause, ${after}/10 after.`);
    const action = text("action");
    if (action) lines.push(`Action this week: ${sentence(action)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
