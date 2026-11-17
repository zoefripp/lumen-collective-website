import type { FormDef } from "../types";
import { joinLower, notes, prompt, read, sentence } from "./shared";

// ACT values bullseye. The participant names what matters to them in four
// areas of life, marks on the target how closely they're living by those
// values (centre = living fully by them), then looks at what gets in the way
// and chooses one committed action.

const MAX = 5;

const areas = [
  { id: "be_work", label: "Work and education" },
  { id: "be_relationships", label: "Relationships" },
  { id: "be_growth", label: "Personal growth and health" },
  { id: "be_leisure", label: "Leisure" },
];

export const valuesBullseye: FormDef = {
  slug: "values-bullseye",
  title: "Values Bullseye",
  description:
    "ACT values exercise: what matters in four areas of life, how close they're living to it on a target, barriers and a committed action.",
  sections: [
    {
      title: "What matters to you",
      intro: "For each area, think about what kind of person you want to be and what you want to stand for. These are directions, not goals.",
      fields: [
        prompt(
          "p_values",
          "Values are qualities of action (caring, curious, reliable, playful), not outcomes. If they name a goal (\"get a job\"), ask what that would give them or what kind of person it would let them be. It's fine to leave an area blank."
        ),
        { id: "values_work", type: "textarea", label: "Work and education", help: "Paid work, study, volunteering, running a household." },
        { id: "values_relationships", type: "textarea", label: "Relationships", help: "Partner, family, friends, community." },
        { id: "values_growth", type: "textarea", label: "Personal growth and health", help: "Physical and emotional health, learning, spirituality." },
        { id: "values_leisure", type: "textarea", label: "Leisure", help: "Rest, fun, hobbies, creativity." },
        notes("notes_values"),
      ],
    },
    {
      title: "Your bullseye",
      intro: `Tap each quarter of the target to show how closely you've been living by your values lately. The centre (${MAX}) means living fully by them; the outer ring (1) means far away from them.`,
      fields: [
        prompt(
          "p_bullseye",
          "Hand over the iPad. Remind them this isn't about how good their life is, but how closely their actions match what matters, even when things are hard."
        ),
        {
          id: "bullseye",
          type: "wheel",
          variant: "bullseye",
          label: "Values bullseye",
          areas,
          max: MAX,
          minLabel: "far from my values",
          maxLabel: "living fully by my values",
        },
        notes("notes_bullseye"),
      ],
    },
    {
      title: "What gets in the way",
      fields: [
        prompt(
          "p_barriers",
          "Look for hooks: thoughts and feelings they get caught up in, and things they avoid. Get curious rather than problem-solving straight away. What would they be doing if those thoughts and feelings weren't in charge?"
        ),
        {
          id: "barriers",
          type: "multi",
          label: "What tends to pull you away from your values?",
          options: [
            "Worrying thoughts",
            "Self-critical thoughts",
            "Difficult feelings",
            "Avoiding things",
            "Low energy or tiredness",
            "Other people",
            "Money or practical barriers",
          ],
        },
        { id: "barriers_detail", type: "textarea", label: "Tell me more" },
        notes("notes_barriers"),
      ],
    },
    {
      title: "Committed action",
      fields: [
        prompt(
          "p_action",
          "Choose one small, specific action that moves towards the centre in one area, even by one ring. Ask: what might show up (thoughts, feelings) when you try it, and are you willing to make room for that?"
        ),
        {
          id: "action_area",
          type: "choice",
          label: "Which area will you focus on?",
          options: areas.map((area) => area.label),
        },
        { id: "action", type: "textarea", label: "One small action I'll take this week" },
        {
          id: "willing",
          type: "scale",
          label: "How willing are you to make room for discomfort to do this?",
          min: 0,
          max: 10,
          minLabel: "Not willing",
          maxLabel: "Completely willing",
        },
        notes("notes_action"),
      ],
    },
  ],
  scores: [
    {
      id: "bullseye",
      label: "Living by my values",
      fieldIds: areas.map((area) => area.id),
      method: "average",
      allowPartial: true,
    },
  ],
  summary: ({ answers, scores, participant }) => {
    const { text, list, number } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];
    const marked = areas
      .map((area) => ({ label: area.label, value: number(area.id) }))
      .filter((item): item is { label: string; value: number } => item.value !== null);

    const score = scores.bullseye;
    if (score && score.value !== null) {
      lines.push(
        `${name} marked ${score.answered} of ${score.total} areas, averaging ${score.value} out of ${MAX} (${MAX} = living fully by their values).`
      );
    }
    if (marked.length > 1) {
      const closest = Math.max(...marked.map((item) => item.value));
      const furthest = Math.min(...marked.map((item) => item.value));
      const at = (value: number) => joinLower(marked.filter((item) => item.value === value).map((item) => item.label), "; ");
      if (closest !== furthest) {
        lines.push(`Closest to their values: ${at(closest)} (${closest}/${MAX}).`);
        lines.push(`Furthest from their values: ${at(furthest)} (${furthest}/${MAX}).`);
      }
    }
    const barriers = list("barriers");
    if (barriers.length) lines.push(`What gets in the way: ${sentence(joinLower(barriers))}`);
    const action = text("action");
    if (action) {
      const willing = number("willing");
      const area = text("action_area");
      lines.push(
        `Committed action${area ? ` (${area.toLowerCase()})` : ""}: ${sentence(action)}${
          willing !== null ? ` Willingness ${willing}/10.` : ""
        }`
      );
    }
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
