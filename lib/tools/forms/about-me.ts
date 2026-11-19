import type { ChoiceField, FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";

// About Me: How I Work Best. An autism-friendly profile, written by the
// participant (with support), covering communication, senses, routines, what
// helps when overwhelmed, interests and how sessions work best. Concrete,
// literal wording throughout. Shareable with the participant and, with their
// permission, their supports.

const SENSES = ["Sounds", "Lights", "Touch and textures", "Smells", "Tastes", "Busy or crowded places"];

const senseField = (sense: string, index: number): ChoiceField => ({
  id: `sense_${index}`,
  type: "choice",
  label: sense,
  options: ["Too much for me", "I look for more", "No problems", "It depends"],
});

export const aboutMe: FormDef = {
  slug: "about-me",
  title: "About Me: How I Work Best",
  description:
    "An autism-friendly profile: how they communicate, sensory needs, routines, what helps when overwhelmed, interests, and how sessions work best.",
  hideEmpty: true,
  sections: [
    {
      title: "About this page",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What this is for",
          text:
            "This page helps your coach understand how you work best. There are no right or wrong answers. You can skip anything, answer in your own words, and change your answers later. You choose who else sees it.",
          print: true,
        },
        prompt(
          "p_about",
          "This can be done over several sessions. Offer the iPad so they can tap or type if that's easier than talking. Use their words exactly, take literal answers at face value, and allow time to think before answering. Ask one question at a time."
        ),
      ],
    },
    {
      title: "Communication",
      fields: [
        {
          id: "comm_ways",
          type: "multi",
          label: "I like to communicate by…",
          options: ["Talking", "Writing or typing", "Pictures or diagrams", "Yes or no questions", "Text messages", "Email"],
        },
        {
          id: "comm_time",
          type: "choice",
          label: "When someone asks me a question…",
          options: ["I need time to think first", "I usually answer straight away", "It depends on the question"],
        },
        {
          id: "comm_helps",
          type: "multi",
          label: "These help me understand",
          options: [
            "Short sentences",
            "One question at a time",
            "Saying exactly what you mean",
            "Written instructions",
            "Examples",
            "Knowing what will happen next",
            "Pictures or diagrams",
          ],
        },
        { id: "comm_avoid", type: "textarea", label: "Words, phrases or ways of talking I don't like" },
        {
          id: "eye_contact",
          type: "choice",
          label: "Eye contact",
          options: ["I'm comfortable with it", "A little is okay", "I prefer not to"],
        },
      ],
    },
    {
      title: "My senses",
      intro: "For each one, choose what's true for you most of the time.",
      fields: [
        ...SENSES.map(senseField),
        {
          id: "sense_helps",
          type: "textarea",
          label: "Things that help my senses",
          help: "For example: headphones, sunglasses, soft clothes, a quiet room, a fidget.",
        },
      ],
    },
    {
      title: "Routines and changes",
      fields: [
        { id: "routines", type: "textarea", label: "Routines that are important to me" },
        {
          id: "notice",
          type: "choice",
          label: "When plans change, I need this much notice",
          options: ["The same day is okay", "A day or two", "About a week", "As much notice as possible"],
        },
        { id: "change_helps", type: "textarea", label: "What helps me when plans change" },
      ],
    },
    {
      title: "When I'm overwhelmed",
      fields: [
        { id: "overwhelm_signs", type: "textarea", label: "Signs I'm getting overwhelmed", help: "What I notice, and what other people might see." },
        { id: "overwhelm_helps", type: "textarea", label: "What helps me" },
        { id: "overwhelm_not", type: "textarea", label: "What does not help me" },
        {
          id: "overwhelm_talk",
          type: "choice",
          label: "When I'm overwhelmed, I'd like people to…",
          options: ["Talk to me calmly", "Use very few words", "Give me space and wait", "Help me get somewhere quiet"],
        },
      ],
    },
    {
      title: "My interests and strengths",
      fields: [
        { id: "interests", type: "textarea", label: "Things I love or know a lot about" },
        { id: "strengths", type: "textarea", label: "Things I'm good at" },
      ],
    },
    {
      title: "Our sessions",
      fields: [
        {
          id: "session_place",
          type: "multi",
          label: "Places that work for me",
          options: ["My home", "An office", "Outdoors", "A cafe", "Phone or video"],
        },
        {
          id: "session_time",
          type: "choice",
          label: "The best time of day for me",
          options: ["Morning", "Middle of the day", "Afternoon", "It doesn't matter"],
        },
        {
          id: "session_helps",
          type: "multi",
          label: "These make sessions easier",
          options: [
            "Same day and time each week",
            "Seeing the plan before we start",
            "Breaks",
            "A fidget or comfort item",
            "Walking while we talk",
            "Sitting side by side",
            "A reminder the day before",
            "Notes to take home",
          ],
        },
        { id: "session_other", type: "textarea", label: "Anything else my coach should know" },
      ],
    },
    {
      title: "Sharing this page",
      fields: [
        {
          id: "share_with",
          type: "multi",
          label: "I'm happy for these people to see this page",
          options: ["My psychologist", "My support workers", "My support coordinator", "My family", "Only my coach"],
        },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [`${name}'s profile of how they work best.`];
    const ways = list("comm_ways");
    if (ways.length) lines.push(`Communicates by: ${sentence(joinLower(ways))}`);
    const helps = list("comm_helps");
    if (helps.length) lines.push(`Helps understanding: ${sentence(joinLower(helps))}`);
    const tooMuch = SENSES.filter((_, index) => text(`sense_${index}`) === "Too much for me");
    if (tooMuch.length) lines.push(`Sensory: too much for them: ${sentence(joinLower(tooMuch))}`);
    const notice = text("notice");
    if (notice) lines.push(`Notice needed for changes: ${sentence(notice.toLowerCase())}`);
    const overwhelm = text("overwhelm_talk");
    if (overwhelm) lines.push(`When overwhelmed: ${sentence(overwhelm.toLowerCase())}`);
    const sessionHelps = list("session_helps");
    if (sessionHelps.length) lines.push(`Sessions work best with: ${sentence(joinLower(sessionHelps))}`);
    const share = list("share_with");
    if (share.length) lines.push(`Can be shared with: ${sentence(joinLower(share))}`);
    return lines;
  },
  signatures: [
    { id: "participant", label: "Participant" },
    { id: "coach", label: "Recovery Coach", required: true },
  ],
};
