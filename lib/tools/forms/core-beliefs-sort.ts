import type { FormDef, FunnelField } from "../types";
import { prompt, read, sentence } from "./shared";
import { chosenAt, kinds } from "../funnel";

// Core Beliefs Sort. The participant chooses the beliefs that feel true for
// them (about themselves, other people, the world and the future), narrows to
// 10, sorts those into beliefs that help them and beliefs that hold them back,
// then narrows to 5 and finally the 3 that most shape their life. A belief
// that holds them back is then explored gently.

// Beliefs linked to hopelessness or being a burden: flagged for a safety check.
const SAFETY_BELIEFS = ["I'm a burden to others", "I'll always feel this way", "There's no point trying"];

const sort: FunnelField = {
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

export const coreBeliefsSort: FormDef = {
  slug: "core-beliefs-sort",
  title: "Core Beliefs Sort",
  description:
    "Choose the beliefs that feel true, narrow to 10, sort them into helping and holding back, narrow to the 3 that most shape their life, then explore one gently.",
  hideEmpty: true,
  sections: [
    {
      title: "Finding your core beliefs",
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
          "Go gently: choosing painful beliefs can bring up strong feelings, so pace this and check in. Normalise that everyone carries unhelpful beliefs. Don't argue with beliefs or rush to replace them.\n\nIf they choose \"I'm a burden to others\", \"I'll always feel this way\" or \"There's no point trying\", check in about their safety and follow your risk and safety procedures. The summary will flag these."
        ),
        sort,
      ],
    },
    {
      title: "A belief that holds me back",
      intro: "Choose one belief from your top 3 that holds you back. We'll look at it with curiosity, not judgement.",
      fields: [
        prompt(
          "p_explore",
          "Let them choose which belief, and stop if it's too much today. Look for the belief's origin and its cost, and what else is also true. The new belief should be believable, not forced positivity: \"I'm learning that I'm enough\" can land better than \"I'm amazing\"."
        ),
        { id: "held_back_belief", type: "text", label: "The belief" },
        { id: "origin", type: "textarea", label: "Where might this belief have come from?" },
        { id: "cost", type: "textarea", label: "What does it cost me? What does it stop me doing?" },
        { id: "also_true", type: "textarea", label: "What else is also true?" },
        { id: "new_belief", type: "textarea", label: "A more helpful belief I'd like to grow" },
      ],
    },
    {
      title: "A belief that helps me",
      fields: [
        {
          id: "helps_most",
          type: "textarea",
          label: "Which belief helps you most, and how does it help?",
        },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const lines: string[] = [];
    const name = participant || "The participant";
    const everything = new Set([0, 1, 2, 3].flatMap((stage) => chosenAt(answers, sort, stage)));
    const flagged = SAFETY_BELIEFS.filter((belief) => everything.has(belief));
    if (flagged.length) {
      lines.push(
        `Safety: ${name} chose ${flagged.map((belief) => `"${belief}"`).join(", ")}. Check in about their safety and follow your risk and safety procedures.`
      );
    }
    const top = chosenAt(answers, sort, 3);
    if (top.length) lines.push(`Top ${top.length} core beliefs: ${sentence(top.map((belief) => `"${belief}"`).join(", "))}`);
    const ten = chosenAt(answers, sort, 1);
    const kindMap = kinds(answers, sort);
    const sorted = ten.filter((belief) => kindMap[belief] !== undefined);
    if (sorted.length) {
      const helps = sorted.filter((belief) => kindMap[belief] === 0).length;
      lines.push(`Of their top 10: ${helps} help them, ${sorted.length - helps} hold them back.`);
    }
    const belief = text("held_back_belief");
    const replacement = text("new_belief");
    if (belief && replacement) lines.push(`Working on: "${belief}" towards "${replacement.replace(/[.\s]+$/, "")}".`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
