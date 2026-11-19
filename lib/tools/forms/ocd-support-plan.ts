import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";
import { crisisNumbers } from "./safety-wellness-plan";
import { formatDate } from "../scoring";

// OCD Support and Reassurance Plan. Written together, for a participant who
// is doing exposure and response prevention (ERP) with a psychologist. It
// agrees how the coach responds to reassurance-seeking, compulsions and
// distress so that coaching supports their treatment rather than undoing it.
// It does not plan or lead exposures: that stays with the treating clinician.

export const ocdSupportPlan: FormDef = {
  slug: "ocd-support-plan",
  title: "OCD Support and Reassurance Plan",
  description:
    "Written together: how their OCD shows up, how you'll respond to reassurance-seeking and distress, and how coaching supports their ERP treatment.",
  hideEmpty: true,
  sections: [
    {
      title: "About this plan",
      fields: [
        {
          id: "about",
          type: "note",
          label: "Why we're making this plan",
          text:
            "OCD often makes people ask for reassurance or do rituals to feel less anxious. Reassurance helps for a moment, but it teaches the OCD that the worry was important, so the OCD gets stronger.\n\nThis plan is our agreement about how your coach will respond when OCD shows up, so that our sessions support the work you're doing with your psychologist. Your psychologist leads your OCD treatment. Your coach supports you with your everyday life and goals.",
          print: true,
        },
        prompt(
          "p_about",
          "Before you start: get their consent to talk with their psychologist, and if possible check this plan fits their ERP plan. Don't design or lead exposures, and don't argue with or test the obsessions. Responding without reassurance can feel unkind at first: be warm, brief and consistent. Use plain, literal language; avoid metaphors unless they've found one helpful."
        ),
      ],
    },
    {
      title: "My treatment",
      fields: [
        { id: "clinician", type: "text", label: "My psychologist or clinician", help: "Name and how to contact them." },
        {
          id: "consent_liaise",
          type: "choice",
          label: "Is it okay for my coach to talk with my psychologist?",
          options: ["Yes", "Yes, about this plan only", "Not yet", "No"],
        },
        { id: "working_on", type: "textarea", label: "What I'm working on in treatment" },
        {
          id: "practice",
          type: "textarea",
          label: "Practice my psychologist has asked me to do between sessions",
          help: "Only what your psychologist has set. Your coach can help you plan time for it and remember it.",
        },
      ],
    },
    {
      title: "How OCD shows up",
      intro: "This helps your coach notice when it's the OCD talking.",
      fields: [
        { id: "reassurance_qs", type: "textarea", label: "Questions OCD makes me ask over and over" },
        { id: "rituals", type: "textarea", label: "Rituals or checks that might happen during our sessions" },
        { id: "triggers", type: "textarea", label: "Things that often set my OCD off" },
        { id: "ocd_name", type: "text", label: "A name for my OCD (optional)", help: "Some people find it helps to give the OCD a name, so it's separate from them." },
      ],
    },
    {
      title: "How my coach will respond",
      fields: [
        {
          id: "response",
          type: "choice",
          label: "When I ask for reassurance, I'd like my coach to…",
          options: [
            "Kindly say that sounds like the OCD",
            "Say our agreed phrase",
            "Remind me of what my psychologist suggested",
            "Help me move on to something else",
          ],
        },
        {
          id: "phrase",
          type: "textarea",
          label: "Our agreed phrase",
          help: "For example: \"I can hear the OCD asking. I'm not going to answer it, and I'm still here with you.\"",
        },
        {
          id: "coach_helps",
          type: "multi",
          label: "Ways my coach can support me",
          options: [
            "Notice and name the OCD kindly",
            "Encourage the practice my psychologist set",
            "Help me plan time for practice",
            "Celebrate small wins",
            "Help with routines and daily tasks",
            "Not take part in rituals or checks",
            "Keep sessions predictable",
          ],
        },
        { id: "not_helpful", type: "textarea", label: "Things that are not helpful for me" },
      ],
    },
    {
      title: "When I'm very distressed",
      fields: [
        { id: "distress_signs", type: "textarea", label: "Signs I'm becoming very distressed" },
        {
          id: "distress_settle",
          type: "textarea",
          label: "What helps me settle",
          help: "For example: a quiet space, headphones, a familiar routine, deep pressure, a fidget.",
        },
        {
          id: "distress_want",
          type: "choice",
          label: "When I'm very distressed, I'd like my coach to…",
          options: ["Use very few, calm words", "Give me quiet and space", "Keep talking with me", "Stop the session for today"],
        },
        { id: "contact_who", type: "textarea", label: "Who to contact if I need more help, and when" },
        {
          id: "crisis",
          type: "note",
          label: "If you're in danger or can't keep yourself safe",
          text: `Call 000 or go to your nearest hospital emergency department.\n\n${crisisNumbers}`,
          print: true,
        },
      ],
    },
    {
      title: "Reviewing the plan",
      fields: [
        {
          id: "copies",
          type: "multi",
          label: "Who has a copy",
          options: ["Me", "Recovery Coach", "My psychologist", "Support coordinator", "Family or carer"],
        },
        { id: "review_date", type: "date", label: "When we'll review this plan" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [`${name} wrote an OCD support and reassurance plan with their Recovery Coach.`];
    const consent = text("consent_liaise");
    if (consent) lines.push(`Consent to talk with psychologist: ${sentence(consent.toLowerCase())}`);
    const response = text("response");
    if (response) lines.push(`Response to reassurance-seeking: ${sentence(response.toLowerCase())}`);
    const phrase = text("phrase");
    if (phrase) lines.push(`Agreed phrase: "${phrase.replace(/^"|"$/g, "").replace(/[.\s]+$/, "")}."`);
    const helps = list("coach_helps");
    if (helps.length) lines.push(`Coach support: ${sentence(joinLower(helps))}`);
    const distress = text("distress_want");
    if (distress) lines.push(`When very distressed: ${sentence(distress.toLowerCase())}`);
    const review = text("review_date");
    lines.push(review ? `Review by ${formatDate(review)}.` : "No review date set.");
    return lines;
  },
  signatures: [
    { id: "participant", label: "Participant" },
    { id: "coach", label: "Recovery Coach", required: true },
  ],
};
