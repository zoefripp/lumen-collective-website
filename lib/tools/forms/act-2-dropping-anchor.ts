import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, coachNotes } from "./act-shared";

// ACT Session 2: Dropping Anchor. A 50-minute ACT-informed session on
// present-moment awareness: noticing where the mind goes, a grounding
// practice (notice, connect with the body, engage with the world), and
// building their own everyday anchors. Wording is Lumen Collective's own.

export const act2DroppingAnchor: FormDef = {
  slug: "act-2-dropping-anchor",
  title: "ACT Session 2: Dropping Anchor",
  description:
    "Being present: noticing where the mind goes, a grounding practice to steady them in a storm, and their own everyday anchors.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving([0, 5], "Today is about being here, in this moment, even when thoughts and feelings are loud."),
    {
      title: "Since last time",
      minutes: [5, 12],
      fields: [
        ask("ask_since", [
          "What did you notice about pulling on the rope this week?",
          "Were there moments you put the rope down, even a little? What happened?",
          "What got in the way?",
        ]),
        coachNotes("notes_since"),
      ],
    },
    {
      title: "Where does your mind take you?",
      minutes: [12, 20],
      intro:
        "Our minds are brilliant time travellers. They replay the past and rehearse the future. That's normal, but it can pull us out of our own lives.",
      fields: [
        {
          id: "mind_goes",
          type: "choice",
          label: "Where does your mind tend to take you?",
          options: ["Replaying the past", "Worrying about the future", "Both", "Hard to say"],
        },
        ask("ask_mind", [
          "When does your mind tend to wander off most?",
          "What do you miss out on when you're somewhere else in your head?",
          "When do you feel most here, in the moment? What's happening then?",
        ]),
        coachNotes("notes_mind"),
      ],
    },
    {
      title: "Dropping anchor",
      minutes: [20, 32],
      intro:
        "Dropping anchor doesn't make the storm go away. It holds you steady while the storm passes, so you can choose what to do next.",
      fields: [
        {
          id: "before",
          type: "scale",
          label: "Before we start: how caught up are you in your thoughts and feelings?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Completely",
        },
        prompt(
          "p_anchor",
          "Guide this slowly, about five minutes, and do it with them. Cycle through the three steps three or four times.\n\n1. Notice what's showing up inside: thoughts, feelings, sensations. Name them kindly, e.g. \"I'm noticing anxiety\".\n2. Connect with your body: press your feet into the floor, sit up a little, press your fingertips together, breathe out slowly.\n3. Engage with the world around you: notice five things you can see, three you can hear, where you are and what you're doing.\n\nOffer choice throughout: eyes open is fine, and they can stop at any time."
        ),
        {
          id: "after",
          type: "scale",
          label: "And now: how caught up are you in your thoughts and feelings?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Completely",
        },
        ask("ask_anchor", [
          "What did you notice?",
          "Did the thoughts and feelings go away, or did something else change?",
          "Which part helped most: noticing, your body, or the world around you?",
        ]),
        { id: "anchor_noticed", type: "textarea", label: "What I noticed" },
      ],
    },
    {
      title: "My anchors",
      minutes: [32, 42],
      intro: "Let's find the moments when dropping anchor could help, and the anchors that work best for you.",
      fields: [
        {
          id: "when",
          type: "multi",
          label: "When could you drop anchor?",
          options: [
            "When I wake up anxious",
            "Before appointments",
            "When I'm out in public",
            "When I can't sleep",
            "During an argument",
            "When memories come up",
            "When I feel overwhelmed",
          ],
        },
        {
          id: "own_anchors",
          type: "textarea",
          label: "My own anchors",
          help: "Things you can see, hear, touch, smell or do that bring you back to the here and now.",
        },
      ],
    },
    {
      title: "Bringing it home",
      minutes: [42, 50],
      fields: [
        prompt("p_close", `Agree a small, specific practice. Short and often beats long and rare. ${CLOSE_PROMPT}`),
        {
          id: "practice",
          type: "textarea",
          label: "This week I'll practise dropping anchor…",
          help: "When, where and how often.",
        },
        {
          id: "confidence",
          type: "scale",
          label: "How confident do you feel about that?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Very confident",
        },
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [`${name} completed ACT Session 2: Dropping Anchor.`];
    const mind = text("mind_goes");
    if (mind) lines.push(`Mind tends to go to: ${mind.toLowerCase()}.`);
    const before = number("before");
    const after = number("after");
    if (before !== null && after !== null) {
      const diff = after - before;
      lines.push(
        `Caught up in thoughts and feelings: ${before}/10 before dropping anchor, ${after}/10 after (${
          diff === 0 ? "no change" : diff < 0 ? `down ${-diff}` : `up ${diff}`
        }).`
      );
    }
    const when = list("when");
    if (when.length) lines.push(`Could drop anchor: ${sentence(joinLower(when))}`);
    const practice = text("practice");
    const confidence = number("confidence");
    if (practice) {
      lines.push(`Practice this week: ${sentence(practice)}${confidence !== null ? ` Confidence ${confidence}/10.` : ""}`);
    }
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
