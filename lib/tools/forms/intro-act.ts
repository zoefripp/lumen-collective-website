import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, coachNotes, confidence, rating } from "./act-shared";

// Introduction to ACT. A 50-minute first look at Acceptance and Commitment
// Therapy: what it is, the six skills in plain words, the struggle switch, a
// short taste of two skills, and whether it feels like a fit. Leads into ACT
// Sessions 1 to 6. Wording is Lumen Collective's own.

const SIX_SKILLS = [
  "Being present: coming back to the here and now",
  "Unhooking from thoughts: seeing thoughts as thoughts",
  "Making room for feelings: letting feelings be there without a fight",
  "The noticing self: the part of you that notices it all",
  "Values: knowing what matters to you",
  "Committed action: doing what matters, even when it's hard",
];

export const introAct: FormDef = {
  slug: "intro-act",
  title: "Introduction to ACT",
  description:
    "What ACT is and its six skills in plain words, the struggle switch, a short taste of two skills, and whether ACT feels like a fit. Leads into ACT Sessions 1 to 6.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving([0, 5], "Today is a first look at ACT: what it is, a little taste of it, and whether it feels like a fit for you."),
    {
      title: "What is ACT?",
      minutes: [5, 15],
      fields: [
        {
          id: "about_act",
          type: "note",
          label: "ACT in a nutshell",
          text:
            "ACT stands for Acceptance and Commitment Therapy. It's said like the word \"act\".\n\nACT isn't about getting rid of difficult thoughts and feelings. It's about changing your relationship with them, so they have less power to push you around, and you can spend more of your life doing what matters to you.\n\nACT has six skills:\n" +
            SIX_SKILLS.map((skill) => `• ${skill}`).join("\n"),
          print: true,
        },
        prompt(
          "p_about",
          "Read the panel together, slowly. Link it to what they told you in the first session where you can. Check understanding by asking them to put ACT in their own words."
        ),
        ask("ask_about", [
          "What stands out to you?",
          "Does anything surprise you, or not make sense?",
          "Is there a skill you think you're already good at?",
        ]),
        coachNotes("notes_about"),
      ],
    },
    {
      title: "The struggle switch",
      minutes: [15, 25],
      fields: [
        prompt(
          "p_switch",
          "Describe the idea: imagine a switch at the back of your mind. When a hard feeling shows up and the switch is ON, we fight it: we get anxious about our anxiety, angry about our anger, down about feeling down. The feeling grows and we lose time and energy. When the switch is OFF, the feeling still comes, but we don't add the extra struggle on top. It usually passes more easily, and we can still do what matters."
        ),
        ask("ask_switch", [
          "When is your struggle switch most likely to be on?",
          "What does the struggle look like for you?",
          "What might be different if the switch was off, even a little?",
        ]),
        rating("switch_on", "How often is your struggle switch on?", "Hardly ever", "All the time"),
        { id: "switch_notes", type: "textarea", label: "When my struggle switch flicks on" },
      ],
    },
    {
      title: "A taste of ACT",
      minutes: [25, 40],
      intro: "Let's try two short ACT skills, about two minutes each.",
      fields: [
        prompt(
          "p_taste",
          "1. Being present: invite them to press their feet into the floor, take a slow breath, and notice five things they can see and three things they can hear.\n\n2. Unhooking: ask them for a thought that bothers them. Say it as it is, then with \"I'm having the thought that…\" in front. Notice what changes.\n\nOffer choice throughout; eyes open is fine."
        ),
        { id: "taste_noticed", type: "textarea", label: "What I noticed" },
        rating("taste_useful", "How useful did that feel?", "Not at all", "Very useful"),
      ],
    },
    {
      title: "Is ACT a fit for me?",
      minutes: [40, 45],
      fields: [
        {
          id: "skills_interest",
          type: "multi",
          label: "Which skills would you like to learn more about?",
          options: SIX_SKILLS.map((skill) => skill.split(":")[0]),
        },
        {
          id: "fit",
          type: "choice",
          label: "How does ACT sit with you?",
          options: ["Makes sense, keen to try", "Not sure, but willing to try", "Not for me right now"],
        },
      ],
    },
    {
      title: "Bringing it home",
      minutes: [45, 50],
      fields: [
        prompt(
          "p_close",
          `If they'd like to keep going, ACT Sessions 1 to 6 work through the skills one at a time. ${CLOSE_PROMPT}`
        ),
        {
          id: "notice_week",
          type: "textarea",
          label: "Something to notice this week",
          help: "For example: when my struggle switch flicks on.",
        },
        confidence(),
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines = [`${participant || "The participant"} completed Introduction to ACT.`];
    const switchOn = number("switch_on");
    if (switchOn !== null) lines.push(`Struggle switch on: ${switchOn}/10.`);
    const useful = number("taste_useful");
    if (useful !== null) lines.push(`Taste of ACT felt useful: ${useful}/10.`);
    const interest = list("skills_interest");
    if (interest.length) lines.push(`Keen to learn: ${sentence(joinLower(interest))}`);
    const fit = text("fit");
    if (fit) lines.push(`ACT feels: ${sentence(fit.toLowerCase())}`);
    const notice = text("notice_week");
    if (notice) lines.push(`To notice this week: ${sentence(notice)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
