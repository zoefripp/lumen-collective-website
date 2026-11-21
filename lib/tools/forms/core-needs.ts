import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";

// My Core Emotional Needs. The five core emotional needs from schema therapy,
// marked on a wheel by how well each is met in their life now, then ways to
// meet them. Focuses on the present rather than the past.

const NEEDS = [
  { id: "need_safety", label: "Safety and connection" },
  { id: "need_autonomy", label: "Independence and confidence" },
  { id: "need_express", label: "Expressing needs and feelings" },
  { id: "need_play", label: "Fun and play" },
  { id: "need_limits", label: "Healthy limits" },
];

export const coreNeeds: FormDef = {
  slug: "core-needs",
  title: "My Core Emotional Needs",
  description: "The five core emotional needs from schema therapy, marked on a wheel by how well each is met now, and ways to meet them.",
  hideEmpty: true,
  sections: [
    {
      title: "Five core needs",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What everyone needs",
          text:
            "Schema therapy describes five core emotional needs that everyone has. When they're met, we tend to feel secure and grow. When they aren't, especially in childhood, schemas can develop.\n\n• Safety and connection: feeling safe, loved, accepted and cared for.\n• Independence and confidence: feeling capable and having a sense of who you are.\n• Expressing needs and feelings: being free to say what you need and feel.\n• Fun and play: having room for spontaneity, joy and play.\n• Healthy limits: having boundaries and self-control, and respecting others.\n\nToday we'll focus on how these needs are met in your life now.",
          print: true,
        },
        prompt(
          "p_needs",
          "Keep the focus on now. If they talk about childhood, listen kindly without digging, and bring it back to what they can do for themselves today. Deeper work on unmet childhood needs belongs with a psychologist."
        ),
      ],
    },
    {
      title: "How well are my needs met now?",
      intro: "Tap each slice: 1 at the centre means not met at all, 10 at the edge means fully met.",
      fields: [
        {
          id: "wheel",
          type: "wheel",
          label: "My needs now",
          areas: NEEDS,
          max: 10,
          minLabel: "not met at all",
          maxLabel: "fully met",
        },
        { id: "notice", type: "textarea", label: "What do I notice about my wheel?" },
      ],
    },
    {
      title: "Meeting my needs",
      fields: [
        {
          id: "ways",
          type: "pairs",
          label: "Ways I could meet my needs",
          columns: ["Need", "Something I could do, or someone who could help"],
          rows: 5,
        },
        { id: "first", type: "textarea", label: "One small step this week" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text } = read(answers);
    const marked = NEEDS.map((need) => ({ label: need.label, value: answers[need.id] })).filter(
      (item): item is { label: string; value: number } => typeof item.value === "number"
    );
    const lines: string[] = [];
    if (marked.length) {
      const low = [...marked].sort((a, b) => a.value - b.value)[0];
      const high = [...marked].sort((a, b) => b.value - a.value)[0];
      lines.push(`${participant || "The participant"} marked ${marked.length} of 5 needs.`);
      if (low.value !== high.value) {
        lines.push(`Best met: ${high.label.toLowerCase()} (${high.value}/10). Least met: ${low.label.toLowerCase()} (${low.value}/10).`);
      }
    }
    const first = text("first");
    if (first) lines.push(`This week: ${sentence(first)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
