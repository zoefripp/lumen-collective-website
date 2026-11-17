import type { FormDef } from "../types";

// Wheel of Life. The participant marks how satisfied they feel with ten areas
// of life by tapping the wheel (1 at the centre, 10 at the edge), then reflects
// on it with their coach. The average is a snapshot for comparing over time,
// not a clinical measure.

const areas = [
  { id: "wol_spirituality", label: "Spirituality" },
  { id: "wol_work", label: "Work and career" },
  { id: "wol_family", label: "Family and friends" },
  { id: "wol_fun", label: "Fun and recreation" },
  { id: "wol_environment", label: "Environment" },
  { id: "wol_health", label: "Health and fitness" },
  { id: "wol_finances", label: "Finances" },
  { id: "wol_development", label: "Self-development" },
  { id: "wol_creativity", label: "Creativity" },
  { id: "wol_love", label: "Love and relationships" },
];

export const wheelOfLife: FormDef = {
  slug: "wheel-of-life",
  title: "Wheel of Life",
  description:
    "The participant marks how satisfied they feel across ten areas of life, then you reflect on the wheel together.",
  sections: [
    {
      title: "Your wheel",
      intro:
        "Tap each slice to show how satisfied you feel with that part of your life right now. The centre is 1 (not at all satisfied) and the outer edge is 10 (completely satisfied). You can change a mark at any time.",
      fields: [
        {
          id: "p_wheel",
          type: "note",
          label: "Coach prompt",
          text:
            "Hand over the iPad and let them mark it themselves. Explain there are no right answers: it's a snapshot of today, not a judgement. If an area doesn't apply or they'd rather not mark it, leave it blank. Ask them to describe what an area means to them if it's unclear (for example, \"Environment\" can mean home, neighbourhood or surroundings).",
        },
        {
          id: "wheel",
          type: "wheel",
          label: "Wheel of Life",
          areas,
          max: 10,
        },
        { id: "notes_wheel", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "Looking at your wheel",
      fields: [
        {
          id: "p_reflect",
          type: "note",
          label: "Coach prompt",
          text:
            "Start with what's going well before looking at lower areas. Useful questions: What stands out? If this were a real wheel, how smooth would the ride be? What would a 10 look like in this area? What has helped this area be as high as it is?",
        },
        { id: "stands_out", type: "textarea", label: "What stands out when you look at your wheel?" },
        { id: "going_well", type: "textarea", label: "What's helping the higher areas go well?" },
        {
          id: "focus",
          type: "multi",
          label: "Which areas would you most like to work on?",
          help: "Choose one to three.",
          options: areas.map((area) => area.label),
        },
        {
          id: "one_point",
          type: "textarea",
          label: "What would one point higher look like in that area?",
          help: "Something you'd notice in your everyday life.",
        },
        { id: "notes_reflect", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
    {
      title: "Next steps",
      fields: [
        {
          id: "p_next",
          type: "note",
          label: "Coach prompt",
          text:
            "Keep the step small and within their control. Link it to what matters to them in that area, and agree when you'll look at the wheel again so you can compare.",
        },
        { id: "next_step", type: "textarea", label: "One small step towards that" },
        {
          id: "confidence",
          type: "scale",
          label: "How confident do you feel about that step?",
          min: 0,
          max: 10,
          minLabel: "Not at all",
          maxLabel: "Very confident",
        },
        { id: "review_date", type: "date", label: "When we'll look at the wheel again" },
        { id: "notes_next", type: "textarea", label: "Notes", help: "Optional." },
      ],
    },
  ],
  scores: [
    {
      id: "average",
      label: "Average across the wheel",
      fieldIds: areas.map((area) => area.id),
      method: "average",
      allowPartial: true,
    },
  ],
  summary: ({ answers, scores, participant }) => {
    const name = participant || "The participant";
    const lines: string[] = [];
    const marked = areas
      .map((area) => ({ label: area.label, value: answers[area.id] }))
      .filter((item): item is { label: string; value: number } => typeof item.value === "number");
    const lower = (items: string[]) =>
      items.map((item) => item.charAt(0).toLowerCase() + item.slice(1)).join(", ");

    const average = scores.average;
    if (average && average.value !== null) {
      lines.push(
        `${name} marked ${average.answered} of ${average.total} areas, with an average of ${average.value} out of 10.`
      );
    }
    if (marked.length > 1) {
      const highest = Math.max(...marked.map((item) => item.value));
      const lowest = Math.min(...marked.map((item) => item.value));
      const at = (value: number) => lower(marked.filter((item) => item.value === value).map((item) => item.label));
      if (highest !== lowest) {
        lines.push(`Most satisfied: ${at(highest)} (${highest}/10).`);
        lines.push(`Least satisfied: ${at(lowest)} (${lowest}/10).`);
        lines.push(`Gap between highest and lowest: ${highest - lowest} points.`);
      } else {
        lines.push(`All marked areas were rated ${highest}/10.`);
      }
    }
    const unmarked = areas.filter((area) => typeof answers[area.id] !== "number").map((area) => area.label);
    if (marked.length && unmarked.length) lines.push(`Not marked: ${lower(unmarked)}.`);

    const focus = answers.focus;
    if (Array.isArray(focus) && focus.length) lines.push(`Wants to work on: ${lower(focus)}.`);

    const step = typeof answers.next_step === "string" ? answers.next_step.trim() : "";
    const confidence = answers.confidence;
    if (step) {
      lines.push(
        `Next step: ${step.replace(/\s+/g, " ").replace(/[.\s]+$/, "")}.${
          typeof confidence === "number" ? ` Confidence ${confidence}/10.` : ""
        }`
      );
    }
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
