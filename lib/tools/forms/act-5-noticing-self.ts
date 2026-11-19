import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, coachNotes, confidence, sinceLastTime } from "./act-shared";

// ACT Session 5: The Noticing Self (self-as-context). Noticing that there's
// a part of them that notices, loosening the grip of labels and stories about
// who they are, and the chessboard metaphor. Wording is Lumen Collective's own.

export const act5NoticingSelf: FormDef = {
  slug: "act-5-noticing-self",
  title: "ACT Session 5: The Noticing Self",
  description:
    "Discovering the part of them that notices thoughts and feelings, and that they're more than their labels, stories and hardest days.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving([0, 5], "Today is a little more reflective: noticing who is doing the noticing."),
    sinceLastTime([5, 10], [
      "When did a difficult feeling show up this week?",
      "Did you try making room for it? What happened?",
      "What was the weather like for you this week?",
    ]),
    {
      title: "Noticing you're noticing",
      minutes: [10, 20],
      fields: [
        prompt(
          "p_noticing",
          "Guide a short exercise, about four minutes, with pauses:\n\nNotice the sounds around you… and notice that you're noticing them.\nNotice your feet on the floor… and notice that you're noticing.\nNotice a thought going through your mind… and notice that there's a part of you that can see that thought.\nThere are thoughts, and there's a part of you that notices them. There are feelings, and a part of you that notices them."
        ),
        ask("ask_noticing", [
          "What was that like?",
          "Could you sense a part of you that was doing the noticing?",
          "Has that part of you changed over your life, or has it always been there?",
        ]),
        { id: "noticing_noticed", type: "textarea", label: "What I noticed" },
      ],
    },
    {
      title: "Stories about me",
      minutes: [20, 30],
      intro:
        "Our minds tell stories about who we are. Some come from other people, some from hard times. They can feel like the whole truth, but they're only part of the picture.",
      fields: [
        prompt(
          "p_stories",
          "Go gently: labels can include diagnoses, things people have called them, or how they see themselves on bad days. Don't argue with the labels or try to replace them with positive ones. Notice them as stories, and look for what else is also true."
        ),
        {
          id: "labels",
          type: "textarea",
          label: "Labels or stories my mind tells about who I am",
          help: "Only what you're comfortable writing down.",
        },
        ask("ask_stories", [
          "When do these stories get loudest?",
          "If you hold the story tightly, what happens? If you hold it lightly?",
          "Who would you be without this story for a moment?",
        ]),
        { id: "also_true", type: "textarea", label: "Things that are also true about me" },
      ],
    },
    {
      title: "The chessboard",
      minutes: [30, 40],
      fields: [
        prompt(
          "p_chess",
          "Describe the metaphor: imagine a chessboard with pieces at war. On one side are difficult thoughts and feelings, on the other side the \"good\" ones trying to beat them. If you are one of the pieces, the battle never ends. But you're not a piece. You're the board. The board holds every piece, it isn't harmed by the battle, and it's there before the game starts and after it ends."
        ),
        ask("ask_chess", [
          "What pieces are fighting on your board?",
          "What would it be like to be the board, holding all of them?",
          "Think of a moment from years ago. Is the you who noticed then the same you noticing now?",
        ]),
        coachNotes("notes_chess"),
      ],
    },
    {
      title: "Bringing it home",
      minutes: [40, 50],
      fields: [
        prompt("p_close", `Help them find a short phrase or image to remember this by. ${CLOSE_PROMPT}`),
        {
          id: "reminder",
          type: "textarea",
          label: "Something to remind me I'm more than my thoughts and feelings",
          help: "A phrase or image, for example \"I'm the sky, not the weather\" or \"I'm the board, not the pieces\".",
        },
        { id: "practice", type: "textarea", label: "This week I'll practise noticing by…" },
        confidence(),
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, number } = read(answers);
    const lines = [`${participant || "The participant"} completed ACT Session 5: The Noticing Self.`];
    const also = text("also_true");
    if (also) lines.push(`Also true about them: ${sentence(also)}`);
    const reminder = text("reminder");
    if (reminder) lines.push(`Reminder: "${reminder.replace(/[.\s]+$/, "")}"`);
    const practice = text("practice");
    const conf = number("confidence");
    if (practice) lines.push(`This week: ${sentence(practice)}${conf !== null ? ` Confidence ${conf}/10.` : ""}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
