import type { FormDef, FunnelField } from "../types";
import { prompt, read, sentence } from "./shared";
import { chosenAt, kinds } from "../funnel";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, coachNotes } from "./act-shared";

// Values and Core Beliefs: one 50-minute session. Part 1 narrows values from
// 20 to 3 with an intrinsic / extrinsic sort; Part 2 does the same with core
// beliefs, sorted into helping and holding back; then the two are brought
// together into one small step.

const VALUES = [
  "Acceptance", "Achievement", "Adventure", "Appearance", "Authenticity", "Balance",
  "Beauty", "Belonging", "Calm", "Caring", "Challenge", "Community",
  "Compassion", "Connection", "Contribution", "Courage", "Creativity", "Curiosity",
  "Faith", "Family", "Financial security", "Fitness", "Forgiveness", "Freedom",
  "Friendship", "Fun", "Generosity", "Gratitude", "Growth", "Health",
  "Honesty", "Hope", "Humour", "Independence", "Integrity", "Justice",
  "Kindness", "Knowledge", "Leadership", "Learning", "Love", "Loyalty",
  "Nature", "Patience", "Peace", "Popularity", "Power", "Recognition",
  "Reliability", "Respect", "Responsibility", "Safety", "Self-care", "Simplicity",
  "Spirituality", "Stability", "Status", "Success", "Tradition", "Trust",
  "Wealth", "Wisdom",
];

const valuesFunnel: FunnelField = {
  id: "vsort",
  type: "funnel",
  label: "Your values",
  noun: "values",
  groups: [{ items: VALUES }],
  stages: [20, 10, 5, 3],
  allowCustom: true,
  classify: {
    afterStage: 1,
    title: "Why does each value matter to you?",
    question:
      "For each of your 10 values, is it mostly for its own sake, or mostly for what it gets you from outside (money, status, approval, how others see you)? There's no wrong answer.",
    choices: ["For its own sake", "For reward or approval"],
    short: ["intrinsic", "extrinsic"],
  },
};

// Beliefs linked to hopelessness or being a burden: flagged for a safety check.
const SAFETY_BELIEFS = ["I'm a burden to others", "I'll always feel this way", "There's no point trying"];

const beliefsFunnel: FunnelField = {
  id: "bsort",
  type: "funnel",
  label: "Your core beliefs",
  noun: "beliefs",
  groups: [
    {
      label: "About me",
      items: [
        "I'm worthy of love",
        "I'm capable",
        "I'm not good enough",
        "I'm a burden to others",
        "I can learn and grow",
        "I have to be perfect",
        "I'm strong",
        "I'm unlovable",
        "I deserve good things",
        "I'm a failure",
        "My needs matter",
        "I can handle hard things",
        "I'm only worth what I achieve",
        "I'm different from everyone else",
      ],
    },
    {
      label: "About other people",
      items: [
        "People can be trusted",
        "People will let me down",
        "Most people are kind",
        "Others are better than me",
        "People will leave me",
        "I need others' approval",
        "It's okay to ask for help",
        "Asking for help is weak",
        "People care about me",
      ],
    },
    {
      label: "About the world and life",
      items: [
        "The world is mostly safe",
        "The world is dangerous",
        "Things usually work out",
        "Life is unfair",
        "Hard work pays off",
        "Bad things always happen to me",
        "Change is possible",
        "Nothing ever changes",
        "I have to be in control to be safe",
        "Feelings are okay to feel",
        "Showing feelings is weak",
        "Mistakes help me learn",
        "Mistakes are unforgivable",
      ],
    },
    {
      label: "About the future",
      items: [
        "My future can be good",
        "Recovery is possible",
        "I'll always feel this way",
        "There's no point trying",
        "Every day is a fresh start",
      ],
    },
  ],
  stages: [20, 10, 5, 3],
  allowCustom: true,
  classify: {
    afterStage: 1,
    title: "Does each belief help you or hold you back?",
    question:
      "For each of your 10 beliefs, notice whether it mostly helps you live the life you want, or mostly holds you back. Beliefs aren't facts; they're ideas we've learned along the way.",
    choices: ["Helps me", "Holds me back"],
    short: ["helps", "holds me back"],
  },
};
export const valuesBeliefsSession: FormDef = {
  slug: "values-and-beliefs",
  title: "Values and Core Beliefs",
  description:
    "One session: narrow values from 20 to 3 and sort them intrinsic or extrinsic, then do the same with core beliefs, and bring the two together.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving(
      [0, 5],
      "Today is about discovering what matters most to them and the beliefs that shape how they live. Let them know there are no right answers and they can change their mind at any point."
    ),
    {
      title: "Part 1: Your values",
      minutes: [5, 20],
      fields: [
        {
          id: "about_values",
          type: "note",
          label: "Values and how this works",
          text:
            "Values are what matter most to you: how you want to live and what you want to stand for.\n\n1. Choose up to 20 values that feel true for you.\n2. Narrow them down to 10.\n3. Sort your 10: does each one matter for its own sake, or for what it gets you?\n4. Narrow to 5, then to your top 3.",
          print: true,
        },
        {
          id: "about_kinds",
          type: "note",
          label: "Intrinsic and extrinsic values",
          text:
            "Intrinsic values matter to you for their own sake, like connection, growth, kindness or health. Living by them tends to feel satisfying in itself.\n\nExtrinsic values matter mainly for what they bring from outside, like money, status, approval or how you look to others. They're not wrong, but chasing them on their own often leaves people feeling empty or never quite enough.",
          print: true,
        },
        prompt(
          "p_values",
          "Hand over the iPad. Encourage gut responses at the first step; the narrowing is where the thinking happens. When narrowing, ask: If you could only keep one of these two, which would it be? At the sorting step, stay curious, not judgemental: extrinsic values often protect something that matters, like security or belonging. Keep an eye on time: aim to finish Part 1 by about 20 minutes."
        ),
        valuesFunnel,
      ],
    },
    {
      title: "Reflecting on your values",
      minutes: [20, 25],
      fields: [
        { id: "why_top", type: "textarea", label: "Why do your top three values matter so much to you?" },
        {
          id: "underneath",
          type: "textarea",
          label: "For any extrinsic values, what might be underneath them? What do they give you?",
          help: "For example, wealth might really be about safety or freedom.",
        },
      ],
    },
    {
      title: "Part 2: Your core beliefs",
      minutes: [25, 38],
      fields: [
        {
          id: "about_beliefs",
          type: "note",
          label: "What are core beliefs?",
          text:
            "Core beliefs are deep ideas we hold about ourselves, other people, the world and the future. They often form early in life or in hard times, and they can feel like facts. Some help us; others hold us back. Noticing them is the first step to choosing which ones we want to live by.\n\n1. Choose up to 20 beliefs that feel true for you, even a little.\n2. Narrow them down to 10.\n3. Sort your 10: does each help you or hold you back?\n4. Narrow to 5, then to the 3 that most shape your life.",
          print: true,
        },
        prompt(
          "p_beliefs",
          "Go gently: choosing painful beliefs can bring up strong feelings, so pace this and check in. Normalise that everyone carries unhelpful beliefs, and don't argue with them or rush to replace them.\n\nIf they choose \"I'm a burden to others\", \"I'll always feel this way\" or \"There's no point trying\", check in about their safety and follow your risk and safety procedures. The summary will flag these."
        ),
        beliefsFunnel,
      ],
    },
    {
      title: "A belief that holds me back",
      minutes: [38, 45],
      intro: "Choose one belief from your top 3 that holds you back. We'll look at it with curiosity, not judgement.",
      fields: [
        prompt(
          "p_explore",
          "Let them choose, and leave it for another session if it's too much today. The new belief should be believable, not forced positivity: \"I'm learning that I'm enough\" can land better than \"I'm amazing\"."
        ),
        { id: "held_back_belief", type: "text", label: "The belief" },
        { id: "origin", type: "textarea", label: "Where might this belief have come from?" },
        { id: "also_true", type: "textarea", label: "What else is also true?" },
        { id: "new_belief", type: "textarea", label: "A more helpful belief I'd like to grow" },
      ],
    },
    {
      title: "Bringing it together",
      minutes: [45, 50],
      fields: [
        ask("ask_together", [
          "Looking at your top values and your top beliefs side by side, what do you notice?",
          "Which beliefs help you live by your values? Which get in the way?",
          "What's one small thing you could do this week that fits your values?",
        ]),
        { id: "together", type: "textarea", label: "How my values and beliefs fit together" },
        { id: "small_step", type: "textarea", label: "One small step this week, guided by my values" },
        prompt("p_close", CLOSE_PROMPT),
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];

    // Safety first.
    const everything = new Set([0, 1, 2, 3].flatMap((stage) => chosenAt(answers, beliefsFunnel, stage)));
    const flagged = SAFETY_BELIEFS.filter((belief) => everything.has(belief));
    if (flagged.length) {
      lines.push(
        `Safety: ${name} chose ${flagged.map((belief) => `"${belief}"`).join(", ")}. Check in about their safety and follow your risk and safety procedures.`
      );
    }

    const topValues = chosenAt(answers, valuesFunnel, 3);
    if (topValues.length) lines.push(`Top ${topValues.length} values: ${sentence(topValues.join(", "))}`);
    const tenValues = chosenAt(answers, valuesFunnel, 1);
    const valueKinds = kinds(answers, valuesFunnel);
    const sortedValues = tenValues.filter((value) => valueKinds[value] !== undefined);
    if (sortedValues.length) {
      const extrinsic = sortedValues.filter((value) => valueKinds[value] === 1);
      lines.push(
        `Of their top 10 values: ${sortedValues.length - extrinsic.length} intrinsic, ${extrinsic.length} extrinsic${
          extrinsic.length ? ` (${extrinsic.join(", ")})` : ""
        }.`
      );
    }

    const topBeliefs = chosenAt(answers, beliefsFunnel, 3);
    if (topBeliefs.length) {
      lines.push(`Top ${topBeliefs.length} core beliefs: ${sentence(topBeliefs.map((belief) => `"${belief}"`).join(", "))}`);
    }
    const tenBeliefs = chosenAt(answers, beliefsFunnel, 1);
    const beliefKinds = kinds(answers, beliefsFunnel);
    const sortedBeliefs = tenBeliefs.filter((belief) => beliefKinds[belief] !== undefined);
    if (sortedBeliefs.length) {
      const helps = sortedBeliefs.filter((belief) => beliefKinds[belief] === 0).length;
      lines.push(`Of their top 10 beliefs: ${helps} help them, ${sortedBeliefs.length - helps} hold them back.`);
    }

    const belief = text("held_back_belief");
    const replacement = text("new_belief");
    if (belief && replacement) lines.push(`Working on: "${belief}" towards "${replacement.replace(/[.\s]+$/, "")}".`);
    const step = text("small_step");
    if (step) lines.push(`This week: ${sentence(step)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
