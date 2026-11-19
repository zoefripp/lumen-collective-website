import type { FormDef, FunnelField } from "../types";
import { prompt, read, sentence } from "./shared";
import { chosenAt, kinds } from "../funnel";

// Values Sort. The participant chooses about 20 values, narrows to 10, sorts
// those into intrinsic (matter for their own sake) and extrinsic (matter for
// reward, status or approval), then narrows to 5 and finally 3.

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

const sort: FunnelField = {
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

export const valuesSort: FormDef = {
  slug: "values-sort",
  title: "Values Sort",
  description:
    "Choose 20 values, narrow to 10, sort them into intrinsic and extrinsic, then narrow to 5 and finally the 3 that matter most.",
  hideEmpty: true,
  sections: [
    {
      title: "Finding your values",
      fields: [
        {
          id: "about_values",
          type: "note",
          label: "How this works",
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
          "p_sort",
          "Hand over the iPad. Encourage gut responses at the first step; the narrowing is where the thinking happens. When narrowing, ask: If you could only keep one of these two, which would it be? Which would you be sad to lose? At the sorting step, stay curious, not judgemental: extrinsic values often protect something that matters (security, belonging)."
        ),
        sort,
      ],
    },
    {
      title: "Your top 3",
      fields: [
        { id: "why_top", type: "textarea", label: "Why do these three matter so much to you?" },
        { id: "living_now", type: "textarea", label: "Where are you already living by them?" },
        { id: "small_step", type: "textarea", label: "One small way to live by one of them this week" },
      ],
    },
    {
      title: "Looking at your sort",
      fields: [
        {
          id: "noticed",
          type: "textarea",
          label: "What did you notice when you sorted your values into intrinsic and extrinsic?",
        },
        {
          id: "underneath",
          type: "textarea",
          label: "For any extrinsic values, what might be underneath them? What do they give you?",
          help: "For example, wealth might really be about safety or freedom.",
        },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const lines: string[] = [];
    const top = chosenAt(answers, sort, 3);
    const five = chosenAt(answers, sort, 2);
    const ten = chosenAt(answers, sort, 1);
    const name = participant || "The participant";
    if (top.length) lines.push(`${name}'s top ${top.length} values: ${sentence(top.join(", "))}`);
    if (five.length) lines.push(`Top 5: ${sentence(five.join(", "))}`);
    const kindMap = kinds(answers, sort);
    const sorted = ten.filter((value) => kindMap[value] !== undefined);
    if (sorted.length) {
      const intrinsic = sorted.filter((value) => kindMap[value] === 0);
      const extrinsic = sorted.filter((value) => kindMap[value] === 1);
      lines.push(
        `Of their top 10: ${intrinsic.length} intrinsic${intrinsic.length ? ` (${intrinsic.join(", ")})` : ""}, ${extrinsic.length} extrinsic${
          extrinsic.length ? ` (${extrinsic.join(", ")})` : ""
        }.`
      );
    }
    const step = text("small_step");
    if (step) lines.push(`This week: ${sentence(step)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
