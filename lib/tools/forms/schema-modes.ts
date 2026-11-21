import type { FormDef, Section } from "../types";
import { prompt, read, sentence } from "./shared";

// Schema Modes Map. The parts of us that take over in the moment (modes):
// child parts, critic parts, coping parts, and the healthy adult. For each,
// when it shows up and what it needs, then strengthening the healthy adult.

const MODES: { id: string; name: string; describe: string }[] = [
  { id: "vulnerable", name: "The hurt child part", describe: "Feels scared, sad, lonely or not good enough, like a child who needs comfort." },
  { id: "angry", name: "The angry or impulsive child part", describe: "Feels furious or frustrated when needs aren't met, and acts on impulse." },
  { id: "critic", name: "The inner critic", describe: "Pushes, blames and punishes: \"You're useless\", \"Try harder\", \"You deserve this\"." },
  { id: "protector", name: "The coping parts", describe: "Protect us from pain by shutting down, giving in, people-pleasing, or going on the attack." },
  { id: "happy", name: "The happy child part", describe: "Feels playful, curious, loved and content." },
  { id: "adult", name: "The healthy adult", describe: "The wise, kind, grounded part that can look after the other parts and make good choices." },
];

const modeSection = (mode: (typeof MODES)[number]): Section => ({
  title: mode.name,
  intro: mode.describe,
  fields: [
    { id: `${mode.id}_when`, type: "textarea", label: "When does this part show up for me? What does it say or do?" },
    { id: `${mode.id}_needs`, type: "textarea", label: mode.id === "adult" ? "What helps this part come forward?" : "What does this part need?" },
  ],
});

export const schemaModes: FormDef = {
  slug: "schema-modes",
  title: "Schema Modes Map",
  description: "Map the parts that take over in the moment (hurt child, angry child, inner critic, coping parts, happy child, healthy adult), what each needs, and strengthen the healthy adult.",
  hideEmpty: true,
  sections: [
    {
      title: "What are modes?",
      fields: [
        {
          id: "about",
          type: "note",
          label: "The parts of us",
          text:
            "Modes are the moment-to-moment states we shift into, especially when a schema is set off. It can help to think of them as different parts of us, each with its own feelings and voice.\n\nNo part is bad: each one developed for a reason. The aim is to get to know them, and to grow the healthy adult part that can look after the others.",
          print: true,
        },
        prompt(
          "p_modes",
          "Use everyday language and their own names for the parts if they have them. It can help to draw the parts or use chairs. Go gently with the hurt child part: notice it with kindness rather than exploring painful memories."
        ),
      ],
    },
    ...MODES.map(modeSection),
    {
      title: "Strengthening my healthy adult",
      fields: [
        { id: "to_child", type: "textarea", label: "What would my healthy adult say to my hurt child part?" },
        { id: "to_critic", type: "textarea", label: "What would my healthy adult say back to my inner critic?" },
        { id: "practice", type: "textarea", label: "One way I'll practise being my healthy adult this week" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const mapped = MODES.filter((mode) => text(`${mode.id}_when`)).map((mode) => mode.name.replace(/^The /, "").toLowerCase());
    const lines: string[] = [];
    if (mapped.length) lines.push(`${participant || "The participant"} mapped: ${sentence(mapped.join(", "))}`);
    const child = text("to_child");
    if (child) lines.push(`Healthy adult to hurt child: "${child.replace(/[.\s]+$/, "")}."`);
    const practice = text("practice");
    if (practice) lines.push(`This week: ${sentence(practice)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
