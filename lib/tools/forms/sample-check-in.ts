import type { FormDef, ScaleField } from "../types";

// SAMPLE FORM. This is a demonstration of what the form engine can do
// (ratings, a calculated score with bands, an automatic summary, signatures).
// It is not a validated clinical tool. Replace it with real PRC templates.

const areas: { id: string; label: string }[] = [
  { id: "area_home", label: "Where I live" },
  { id: "area_health", label: "My physical health" },
  { id: "area_mind", label: "My mental wellbeing" },
  { id: "area_people", label: "My relationships and connections" },
  { id: "area_days", label: "How I spend my days" },
  { id: "area_money", label: "Managing money" },
  { id: "area_supports", label: "My supports and services" },
  { id: "area_hope", label: "Hope for the future" },
];

const ratingFields: ScaleField[] = areas.map((area) => ({
  id: area.id,
  type: "scale",
  label: area.label,
  min: 1,
  max: 5,
  minLabel: "Really hard right now",
  maxLabel: "Going really well",
  required: true,
}));

export const sampleCheckIn: FormDef = {
  slug: "sample-check-in",
  title: "Recovery Check-in",
  description:
    "A quick look at how things are going across eight life areas, with a score and a summary.",
  sample: true,
  sections: [
    {
      title: "How are things going?",
      intro: "Rate each area from 1 to 5. There are no right or wrong answers.",
      fields: ratingFields,
    },
    {
      title: "Strengths and focus",
      fields: [
        {
          id: "strengths",
          type: "multi",
          label: "What has been helping lately?",
          options: [
            "Family or friends",
            "Routine",
            "Being outdoors",
            "Creative activities",
            "Exercise",
            "Faith or spirituality",
            "Pets",
            "Support workers",
            "Health professionals",
          ],
        },
        {
          id: "focus",
          type: "choice",
          label: "Which area would you most like to work on next?",
          options: areas.map((area) => area.label),
          required: true,
        },
        {
          id: "goal",
          type: "textarea",
          label: "What would you like to be different in that area?",
        },
        {
          id: "next_steps",
          type: "textarea",
          label: "Next steps we agreed on",
          help: "Who will do what, and by when.",
        },
      ],
    },
  ],
  scores: [
    {
      id: "total",
      label: "Overall check-in score",
      fieldIds: areas.map((area) => area.id),
      method: "sum",
      bands: [
        { min: 8, max: 18, label: "Things are tough at the moment" },
        { min: 19, max: 29, label: "A mix of ups and downs" },
        { min: 30, max: 40, label: "Things are going well overall" },
      ],
    },
  ],
  summary: ({ answers, scores, participant }) => {
    const name = participant || "The participant";
    const paragraphs: string[] = [];

    const total = scores.total;
    if (total?.value !== null && total?.value !== undefined) {
      paragraphs.push(
        `${name} rated eight life areas and scored ${total.value} out of ${total.outOf} (${total.band?.toLowerCase()}).`
      );
    }

    const rated = areas
      .map((area) => ({ label: area.label, value: answers[area.id] }))
      .filter((item): item is { label: string; value: number } => typeof item.value === "number");
    if (rated.length) {
      const highest = Math.max(...rated.map((item) => item.value));
      const lowest = Math.min(...rated.map((item) => item.value));
      const list = (value: number) =>
        rated
          .filter((item) => item.value === value)
          .map((item) => item.label)
          .join("; ");
      if (highest !== lowest) {
        paragraphs.push(`Highest rated (${highest}/5): ${list(highest)}.`);
        paragraphs.push(`Lowest rated (${lowest}/5): ${list(lowest)}.`);
      } else {
        paragraphs.push(`All areas were rated ${highest}/5.`);
      }
    }

    const strengths = answers.strengths;
    if (Array.isArray(strengths) && strengths.length) {
      paragraphs.push(`What has been helping: ${strengths.join(", ").toLowerCase()}.`);
    }
    if (typeof answers.focus === "string" && answers.focus) {
      paragraphs.push(`Chosen focus area: ${answers.focus}.`);
    }
    return paragraphs;
  },
  signatures: [
    { id: "participant", label: "Participant", required: true },
    { id: "coach", label: "Recovery Coach", required: true },
  ],
};
