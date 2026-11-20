import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, coachNotes, confidence, rating } from "./act-shared";

// Introduction to CBT. A 50-minute first look at Cognitive Behavioural
// Therapy: what it is, mapping a recent situation through the thoughts,
// feelings, body and actions cycle, common thinking traps, and one small
// experiment to try. Leads into the Thought Record. Wording is Lumen
// Collective's own.

const TRAPS = [
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
];

export const introCbt: FormDef = {
  slug: "intro-cbt",
  title: "Introduction to CBT",
  description:
    "What CBT is, mapping a recent situation through thoughts, feelings, body and actions, common thinking traps, and one small experiment to try. Leads into the Thought Record.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving([0, 5], "Today is a first look at CBT: how thoughts, feelings, our body and what we do all link together."),
    {
      title: "What is CBT?",
      minutes: [5, 15],
      fields: [
        {
          id: "about_cbt",
          type: "note",
          label: "CBT in a nutshell",
          text:
            "CBT stands for Cognitive Behavioural Therapy.\n\nIt's based on a simple idea: our thoughts, feelings, body and actions are all connected. When one changes, the others change too. Hard situations can set off a cycle where unhelpful thoughts lead to difficult feelings and actions that keep us stuck.\n\nCBT helps you notice the cycle and try small changes, to your thinking or to what you do, so you feel better and can do more of what you want. It's practical, focuses on now, and works best with practice between sessions.",
          print: true,
        },
        ask("ask_about", [
          "What stands out to you?",
          "Can you think of a time a thought changed how you felt?",
          "Have you noticed your actions changing your mood?",
        ]),
        coachNotes("notes_about"),
      ],
    },
    {
      title: "Mapping the cycle",
      minutes: [15, 30],
      intro: "Let's map out a recent situation that was a bit hard. Pick one that was uncomfortable but manageable.",
      fields: [
        prompt(
          "p_cycle",
          "Draw the cycle on paper or the iPad if that helps: thoughts, feelings, body and actions in a circle around the situation. Start with the facts of the situation, then fill each part. Then trace the arrows: how did each part feed the others?"
        ),
        { id: "situation", type: "textarea", label: "The situation: what happened?" },
        { id: "thoughts", type: "textarea", label: "Thoughts: what went through my mind?" },
        { id: "feelings", type: "textarea", label: "Feelings: what emotions came up?" },
        rating("feeling_strength", "How strong was the main feeling?", "Not at all", "As strong as it gets"),
        { id: "body", type: "textarea", label: "Body: what did I notice physically?" },
        { id: "actions", type: "textarea", label: "Actions: what did I do, or not do?" },
        ask("ask_cycle", [
          "How did each part feed the others?",
          "Did what you did make the feeling better or worse in the long run?",
          "Is this a pattern that happens often?",
        ]),
      ],
    },
    {
      title: "Thinking traps",
      minutes: [30, 38],
      intro: "Our minds take shortcuts that can trap us. Everyone does it.",
      fields: [
        prompt(
          "p_traps",
          "Briefly explain any they're unsure of, with an everyday example. Keep it light: the aim is to notice, not to criticise their thinking."
        ),
        { id: "traps", type: "multi", label: "Which thinking traps sound familiar?", options: TRAPS },
        { id: "main_trap", type: "textarea", label: "The trap that shows up most for me, and when" },
      ],
    },
    {
      title: "A small experiment",
      minutes: [38, 45],
      intro: "CBT works by trying small changes and seeing what happens.",
      fields: [
        {
          id: "change_part",
          type: "choice",
          label: "Which part of the cycle would be easiest to change first?",
          options: ["My thoughts", "My actions", "My body (e.g. breathing, movement)", "Not sure"],
        },
        {
          id: "experiment",
          type: "textarea",
          label: "One small experiment I'll try this week",
          help: "For example: when I notice \"no one wants to see me\", I'll send one text anyway and see what happens.",
        },
        { id: "predict", type: "textarea", label: "What I think will happen" },
        confidence(),
      ],
    },
    {
      title: "Bringing it home",
      minutes: [45, 50],
      fields: [
        {
          id: "fit",
          type: "choice",
          label: "How does CBT sit with you?",
          options: ["Makes sense, keen to try", "Not sure, but willing to try", "Not for me right now"],
        },
        prompt(
          "p_close",
          `Next time, check how the experiment went: what actually happened compared with what they predicted. The Thought Record is a good next step. ${CLOSE_PROMPT}`
        ),
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines = [`${participant || "The participant"} completed Introduction to CBT.`];
    const situation = text("situation");
    if (situation) lines.push(`Situation mapped: ${sentence(situation)}`);
    const strength = number("feeling_strength");
    if (strength !== null) lines.push(`Main feeling strength: ${strength}/10.`);
    const traps = list("traps");
    if (traps.length) lines.push(`Familiar thinking traps: ${sentence(joinLower(traps))}`);
    const experiment = text("experiment");
    const conf = number("confidence");
    if (experiment) lines.push(`Experiment: ${sentence(experiment)}${conf !== null ? ` Confidence ${conf}/10.` : ""}`);
    const predict = text("predict");
    if (predict) lines.push(`Prediction: ${sentence(predict)}`);
    const fit = text("fit");
    if (fit) lines.push(`CBT feels: ${sentence(fit.toLowerCase())}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
