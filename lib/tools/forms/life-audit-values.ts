import type { FormDef, ValuesField } from "../types";
import { prompt, read, sentence } from "./shared";
import { segmentCounts } from "../values-wheel";

// Life Audit - Values. Based on Lumen Collective's Canva worksheet, which
// follows the ten basic human values (Schwartz). The participant taps the
// values that matter to them and the wheel of values fills in as they go,
// then they reflect, name their core values, and look at how they fit.

const valuesWheel: ValuesField = {
  id: "values_chosen",
  type: "values",
  label: "Wheel of values",
  // Outer ring.
  groups: [
    { label: "Self-transcendence" },
    { label: "Conservation" },
    { label: "Self-enhancement" },
    { label: "Openness to change" },
  ],
  // Middle ring, clockwise from the top.
  segments: [
    { label: "Benevolence", group: 0 },
    { label: "Universalism", group: 0 },
    { label: "Conformity & Tradition", group: 1 },
    { label: "Security", group: 1 },
    { label: "Power", group: 2 },
    { label: "Achievement", group: 2 },
    { label: "Hedonism", group: 3 },
    { label: "Stimulation", group: 3 },
    { label: "Self-direction", group: 3 },
  ],
  categories: [
    {
      name: "Universalism",
      goal: "Understanding and protecting the welfare of all people and nature.",
      values: ["Open-mindedness", "Empathy", "Tolerance", "Compassion", "Equality", "Altruism"],
      segment: 1,
    },
    {
      name: "Benevolence",
      goal: "Preserving and improving the welfare of the people around you.",
      values: ["Kindness", "Generosity", "Loyalty", "Trustworthiness", "Empathy", "Compassion"],
      segment: 0,
    },
    {
      name: "Tradition",
      goal: "Respect for and commitment to the customs of your culture.",
      values: ["Respect for tradition", "Humility", "Faithfulness", "Devotion", "Modesty", "Duty"],
      segment: 2,
    },
    {
      name: "Conformity",
      goal: "Holding back actions and impulses likely to upset or harm others.",
      values: ["Discipline", "Reliability", "Courtesy", "Responsibility", "Punctuality", "Respectfulness"],
      segment: 2,
    },
    {
      name: "Security",
      goal: "Safety, harmony and stability in society, relationships and yourself.",
      values: ["Stability", "Safety", "Dependability", "Resilience", "Preparedness", "Self-reliance"],
      segment: 3,
    },
    {
      name: "Power",
      goal: "Social status, influence and control over people and resources.",
      values: ["Authority", "Competence", "Influence", "Self-confidence", "Charisma", "Assertiveness"],
      segment: 4,
    },
    {
      name: "Achievement",
      goal: "Personal success through showing what you can do.",
      values: ["Competence", "Ambition", "Skilfulness", "Recognition", "Success", "Effectiveness"],
      segment: 5,
    },
    {
      name: "Hedonism",
      goal: "Pleasure and enjoyment for yourself.",
      values: ["Joy", "Playfulness", "Spontaneity", "Satisfaction", "Delight", "Pleasure"],
      segment: 6,
    },
    {
      name: "Stimulation",
      goal: "Excitement, novelty and challenge in life.",
      values: ["Curiosity", "Adventurousness", "Creativity", "Risk-taking", "Experimentation", "Imagination"],
      segment: 7,
    },
    {
      name: "Self-direction",
      goal: "Being free in what you do and how you think.",
      values: ["Self-reliance", "Open-mindedness", "Resourcefulness", "Initiative", "Risk-taking", "Free-thinking"],
      segment: 8,
    },
  ],
};

export const lifeAuditValues: FormDef = {
  slug: "life-audit-values",
  title: "Life Audit - Values",
  description:
    "The participant taps the values that matter to them and their wheel of values fills in, then reflects on their core values.",
  hideEmpty: true,
  sections: [
    {
      title: "Your wheel of values",
      intro:
        "Tap the values that feel most important to you. Your wheel fills in as you go. There are no right or wrong answers, and you can change your mind at any time.",
      fields: [
        prompt(
          "p_values",
          "Hand over the iPad. Encourage them to choose what genuinely matters to them, not what they think they should value. Some values sit in two areas (such as Empathy); choosing one fills both. If they choose a lot, ask which ones they couldn't live without."
        ),
        valuesWheel,
      ],
    },
    {
      title: "Reflecting on your values",
      fields: [
        { id: "life_about", type: "textarea", label: "What do you want your life to be about?" },
        {
          id: "admire",
          type: "textarea",
          label: "Who are the people you admire most? Why? What qualities do they have?",
        },
        {
          id: "resonate",
          type: "textarea",
          label: "Which parts of the wheel of values feel most like you? Why?",
        },
      ],
    },
    {
      title: "Your core values",
      fields: [
        prompt(
          "p_core",
          "Use the wheel and their answers above. Aim for around three to six core values. The \"why\" matters more than the word: reflect it back in their language."
        ),
        {
          id: "core",
          type: "pairs",
          label: "Using your wheel and your answers above, write down the things you value most. Next to each one, write why it's important to you.",
          columns: ["My value", "Why I value it"],
          rows: 6,
        },
      ],
    },
    {
      title: "Looking at your values",
      fields: [
        {
          id: "compatible",
          type: "textarea",
          label: "Look back at your wheel and what you wrote. Do your values fit together, or do some pull against each other? How?",
        },
        {
          id: "prioritise",
          type: "textarea",
          label: "If some of your values pull against each other, which will you put first, and why?",
        },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];
    const chosenList = Array.isArray(answers.values_chosen) ? (answers.values_chosen as string[]) : [];
    if (chosenList.length) {
      const counts = segmentCounts(valuesWheel, new Set(chosenList));
      const ranked = valuesWheel.segments
        .map((segment, index) => ({ label: segment.label, ...counts[index] }))
        .filter((segment) => segment.chosen > 0)
        .sort((a, b) => b.chosen / b.total - a.chosen / a.total);
      lines.push(`${name} chose ${chosenList.length} values.`);
      lines.push(
        `Strongest areas: ${ranked
          .slice(0, 3)
          .map((segment) => `${segment.label} (${segment.chosen} of ${segment.total})`)
          .join(", ")}.`
      );
    }
    const core = Array.from({ length: 6 }, (_, row) => text(`core_${row + 1}_0`)).filter(Boolean);
    if (core.length) lines.push(`Core values: ${sentence(core.join(", "))}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
