import type { ChoiceField, FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";
import { ask, coachNotes } from "./act-shared";

// First Session. A 60-minute first session: what coaching is, why they want
// it and what they hope to gain, what has and hasn't helped before, how
// familiar they are with ACT, CBT and other approaches, the signs to look out
// for, expectations both ways, and where to start.

const APPROACHES = [
  "ACT (Acceptance and Commitment Therapy)",
  "CBT (Cognitive Behavioural Therapy)",
  "Mindfulness",
  "DBT (Dialectical Behaviour Therapy)",
  "Peer support",
];

const familiarity = (name: string, index: number): ChoiceField => ({
  id: `familiar_${index}`,
  type: "choice",
  label: name,
  options: ["Never heard of it", "Heard of it", "Tried it a little", "Used it a lot"],
});

export const firstSession: FormDef = {
  slug: "first-session",
  title: "First Session",
  description:
    "Getting to know them, why they want coaching and what they hope to gain, what has and hasn't worked, familiarity with ACT and CBT, signs to look for, and The Deal: expectations both ways, signed together.",
  sessionMinutes: 60,
  hideEmpty: true,
  sections: [
    {
      title: "Welcome",
      minutes: [0, 5],
      fields: [
        {
          id: "about_coaching",
          type: "note",
          label: "What recovery coaching is",
          text:
            "Recovery coaching supports you to build the life you want, at your pace, with your goals at the centre. We'll work on everyday things that matter to you and practise skills for managing hard thoughts and feelings.\n\nRecovery coaching isn't therapy or crisis support. It works alongside your doctor, psychologist and other supports.\n\nWhat you share stays private. The only exceptions are if someone's safety is at serious risk, or if the law requires it. We'll always try to talk with you first.",
          print: true,
        },
        prompt(
          "p_welcome",
          "Go slowly and let them set the pace. Read the panel together and check they're comfortable. Let them know there are no wrong answers, they can skip anything, and you'll keep coming back to these things over time. This is a big session: it's fine to carry some sections over to next time."
        ),
        {
          id: "arrival",
          type: "scale",
          label: "How are you feeling about today's session?",
          min: 0,
          max: 10,
          minLabel: "Very nervous",
          maxLabel: "Comfortable",
        },
      ],
    },
    {
      title: "A bit about me",
      minutes: [5, 12],
      intro: "Before we talk about coaching, I'd like to get to know you a little.",
      fields: [
        prompt(
          "p_about",
          "Keep this light and strengths-focused: it's about them as a person, not their diagnosis or problems. If they'd find it useful, the full About Me: How I Work Best form can be done in a later session."
        ),
        { id: "enjoy", type: "textarea", label: "Things I enjoy or care about" },
        { id: "important_people", type: "textarea", label: "People (or pets) who are important to me" },
        { id: "strengths", type: "textarea", label: "Things I'm good at, or that people like about me" },
        { id: "good_day", type: "textarea", label: "What a good day looks like for me" },
      ],
    },
    {
      title: "Why coaching, why now",
      minutes: [12, 20],
      fields: [
        ask("ask_why", [
          "What made you decide to try coaching? Why now?",
          "Who suggested it, or was it your idea?",
          "If coaching went really well, what would be different in six months?",
          "How would the people close to you know things had changed?",
        ]),
        { id: "why_coaching", type: "textarea", label: "What I'd like coaching to help with, in my own words" },
        { id: "different", type: "textarea", label: "If coaching works, what will be different?" },
        {
          id: "areas",
          type: "multi",
          label: "Areas I'd like to work on",
          options: [
            "Managing anxiety or worry",
            "Mood",
            "Routines and daily living",
            "Relationships and connection",
            "Work, study or volunteering",
            "Housing",
            "Physical health",
            "Confidence",
            "Getting out and about",
            "Understanding my mental health",
          ],
        },
        { id: "ndis_goals", type: "textarea", label: "NDIS plan goals this links to", help: "Optional." },
      ],
    },
    {
      title: "What's worked and what hasn't",
      minutes: [20, 28],
      fields: [
        prompt(
          "p_history",
          "You don't need their full history. Focus on what they've learned: what helped and what didn't. Listen for anything they don't want repeated, and for strengths they've shown along the way."
        ),
        {
          id: "past_supports",
          type: "multi",
          label: "Supports I've had before",
          options: [
            "GP",
            "Psychologist or counsellor",
            "Psychiatrist",
            "Mental health team",
            "Hospital stay",
            "Medication",
            "Support worker",
            "Peer support",
            "Support groups",
            "Coaching before",
          ],
        },
        {
          id: "tried",
          type: "pairs",
          label: "Things I've tried",
          columns: ["What I tried", "What helped, and what didn't"],
          rows: 4,
        },
        { id: "helped_most", type: "textarea", label: "What has helped me most" },
        { id: "dont_want", type: "textarea", label: "What didn't help, or what I don't want again" },
      ],
    },
    {
      title: "Approaches and how I learn",
      minutes: [28, 34],
      intro: "There are different approaches we can draw on. Tell me how familiar you are with each one.",
      fields: [
        ...APPROACHES.map(familiarity),
        { id: "approach_thoughts", type: "textarea", label: "What I liked or didn't like about any of these" },
        {
          id: "learn",
          type: "multi",
          label: "I learn best by…",
          options: [
            "Talking things through",
            "Trying exercises in the session",
            "Worksheets",
            "Reading",
            "Examples and stories",
            "Pictures and diagrams",
            "Practising between sessions",
          ],
        },
      ],
    },
    {
      title: "Signs to look for",
      minutes: [34, 42],
      intro: "This helps me notice how you're going, and know what to do if things get harder.",
      fields: [
        { id: "going_well", type: "textarea", label: "When things are going well for me, I…" },
        { id: "early_signs", type: "textarea", label: "Early signs I'm starting to struggle", help: "What I notice, and what my coach might notice." },
        { id: "if_notice", type: "textarea", label: "If my coach notices these signs, I'd like them to…" },
        {
          id: "safe",
          type: "choice",
          label: "Are you feeling safe at the moment?",
          options: ["Yes", "Mostly", "Not right now", "I'd rather talk about it"],
        },
        prompt(
          "p_safe",
          "If the answer is anything other than \"Yes\", pause and follow your risk and safety procedures. Consider making a Safety and Wellness Plan together soon."
        ),
      ],
    },
    {
      title: "The Deal",
      minutes: [42, 54],
      intro: "Our agreement about what we'll each bring to coaching. We'll both sign it at the end of today.",
      fields: [
        {
          id: "from_coach",
          type: "note",
          label: "My coach's side of the deal",
          text:
            "• To turn up on time and let you know early if something changes\n• To listen, be honest with you and treat you with respect\n• To work on your goals, at your pace\n• To keep what you share private, within the limits we talked about\n• To follow through on what I say I'll do\n• To check in with you about how coaching is going",
          print: true,
        },
        { id: "want_from_coach", type: "textarea", label: "Anything else I'd like my coach to add to their side" },
        {
          id: "from_me",
          type: "multi",
          label: "My side of the deal",
          options: [
            "Let you know if I need to cancel",
            "Be honest about what's working and what isn't",
            "Have a go at things between sessions",
            "Tell you if I'm not comfortable with something",
            "Tell you about changes in my supports",
          ],
        },
        {
          id: "frequency",
          type: "choice",
          label: "How often we'll meet",
          options: ["Weekly", "Every two weeks", "Monthly", "Not sure yet"],
        },
        {
          id: "contact",
          type: "multi",
          label: "Best ways to contact me",
          options: ["Phone call", "Text message", "Email", "Through my support coordinator"],
        },
        { id: "cancel", type: "textarea", label: "If either of us needs to cancel, we'll…" },
        { id: "my_extra", type: "textarea", label: "Anything else I'd like to add to my side" },
        prompt(
          "p_deal",
          "Make The Deal genuinely two-way: invite them to add to your side as well as theirs, and agree it can be changed any time. You'll both sign it at the end of the session."
        ),
      ],
    },
    {
      title: "Where we'll start",
      minutes: [54, 60],
      fields: [
        { id: "first_focus", type: "textarea", label: "The first thing I'd like to work on" },
        {
          id: "start_with",
          type: "choice",
          label: "What we'll start with next time",
          options: [
            "Introduction to ACT",
            "Introduction to CBT",
            "Setting a goal (SMART and GROW)",
            "Wheel of Life",
            "HEADS Assessment",
            "Not sure yet",
          ],
        },
        { id: "next_session", type: "date", label: "Next session" },
        prompt(
          "p_close",
          "Thank them for sharing so much. Summarise what you heard in their words, read The Deal back and sign it together, check how they're feeling after a big session, and close with the Check-out form."
        ),
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [];
    const safe = text("safe");
    if (safe && safe !== "Yes") {
      lines.push(`Safety: ${name} answered "${safe}" when asked about feeling safe. Follow up under your risk and safety procedures.`);
    }
    const why = text("why_coaching");
    if (why) lines.push(`Wants coaching to help with: ${sentence(why)}`);
    const areas = list("areas");
    if (areas.length) lines.push(`Areas: ${sentence(joinLower(areas))}`);
    const helped = text("helped_most");
    if (helped) lines.push(`Has helped most: ${sentence(helped)}`);
    const dont = text("dont_want");
    if (dont) lines.push(`Didn't help or doesn't want again: ${sentence(dont)}`);
    const familiar = APPROACHES.map((approach, index) => ({ approach, level: text(`familiar_${index}`) })).filter(
      (item) => item.level
    );
    if (familiar.length) {
      lines.push(`Familiarity: ${sentence(familiar.map((item) => `${item.approach.split(" (")[0]}: ${item.level.toLowerCase()}`).join("; "))}`);
    }
    const deal = list("from_me");
    if (deal.length) lines.push(`Their side of The Deal: ${sentence(joinLower(deal))}`);
    const signs = text("early_signs");
    if (signs) lines.push(`Early signs to look for: ${sentence(signs)}`);
    const frequency = text("frequency");
    if (frequency) lines.push(`Meeting: ${frequency.toLowerCase()}.`);
    const start = text("start_with");
    if (start) lines.push(`Starting with: ${sentence(start)}`);
    return lines;
  },
  // Signing here also signs The Deal.
  signaturesTitle: "Signing The Deal",
  signatures: [
    { id: "participant", label: "Participant" },
    { id: "coach", label: "Recovery Coach", required: true },
  ],
};
