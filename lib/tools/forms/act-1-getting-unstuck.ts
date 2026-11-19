import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, VALUES_OPTIONS, arriving, ask, coachNotes } from "./act-shared";

// ACT Session 1: Getting Unstuck. A 50-minute ACT-informed session
// (creative hopelessness, a tug-of-war metaphor, and first steps towards
// values). Mostly conversation, with a few things for the participant to
// write. Wording is Lumen Collective's own.

export const act1GettingUnstuck: FormDef = {
  slug: "act-1-getting-unstuck",
  title: "ACT Session 1: Getting Unstuck",
  description:
    "What they've tried to manage hard thoughts and feelings, what it has cost them, and what they'd do if those feelings weren't in charge.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving(
      [0, 5],
      "Let them know today is about noticing what's been happening, not fixing anything or getting it right."
    ),
    {
      title: "What's been hard",
      minutes: [5, 12],
      fields: [
        ask("ask_hard", [
          "What's been weighing on you most lately?",
          "When that's happening, what thoughts show up most often?",
          "What feelings come with it? Where do you notice them in your body?",
          "If things were going better, what would be different?",
        ]),
        coachNotes("notes_hard"),
      ],
    },
    {
      title: "What I've tried",
      minutes: [12, 25],
      intro:
        "Most of us try lots of things to get rid of painful thoughts and feelings. Let's look at what you've tried, with curiosity rather than judgement.",
      fields: [
        prompt(
          "p_tried",
          "Every strategy makes sense, so validate each one. For each, ask how it works in the short term and in the long term, and what it costs: time, energy, money, health, relationships, missing out. Don't argue or rush to the conclusion. Let them notice the pattern themselves."
        ),
        {
          id: "tried",
          type: "pairs",
          label: "Things I've tried to get rid of difficult thoughts and feelings",
          columns: ["What I've tried", "How it worked in the long run, and what it cost"],
          rows: 5,
        },
        ask("ask_tried", [
          "Looking at this list, what do you notice?",
          "Have any of these got rid of the difficult thoughts and feelings for good?",
          "What does your own experience tell you about trying harder?",
        ]),
        { id: "notice_list", type: "textarea", label: "What I notice when I look at this list" },
      ],
    },
    {
      title: "The tug-of-war",
      minutes: [25, 35],
      fields: [
        prompt(
          "p_tug",
          "Describe the metaphor slowly. Imagine you're in a tug-of-war with a monster made of your difficult thoughts and feelings, with a pit between you. The harder you pull, the harder it pulls back, and your hands and attention are tied up with the rope. What would happen if you put the rope down? The monster is still there, and it might still yell, but your hands are free to do things that matter. If they're comfortable, act it out with a scarf, towel or just your hands."
        ),
        ask("ask_tug", [
          "What's your monster made of? What does it say?",
          "What does pulling on the rope look like for you, day to day?",
          "What would putting the rope down look like? It doesn't mean giving up, or liking the monster.",
          "If your hands were free, what would you do with them?",
        ]),
        { id: "monster", type: "textarea", label: "My monster is made of…" },
        { id: "hands_free", type: "textarea", label: "With my hands free, I'd…" },
      ],
    },
    {
      title: "What matters to me",
      minutes: [35, 45],
      intro: "If those thoughts and feelings weren't running the show, what would you be doing more of?",
      fields: [
        prompt(
          "p_matters",
          "This is a first look at values, not a full values session. Keep it about what they'd do and who they'd be, not about feeling better. If they say \"I'd be happy\", ask what they'd be doing if they were happy."
        ),
        {
          id: "values",
          type: "multi",
          label: "Which of these feel important to you?",
          options: VALUES_OPTIONS,
        },
        { id: "doing_more", type: "textarea", label: "What I'd be doing more of" },
      ],
    },
    {
      title: "Bringing it home",
      minutes: [45, 50],
      fields: [
        prompt("p_close", `Keep it light: this week is about noticing, not changing. ${CLOSE_PROMPT}`),
        {
          id: "notice_week",
          type: "textarea",
          label: "Something to notice this week",
          help: "For example: when I start pulling on the rope, and what it costs me.",
        },
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [`${name} completed ACT Session 1: Getting Unstuck.`];
    const tried = Array.from({ length: 5 }, (_, row) => text(`tried_${row + 1}_0`)).filter(Boolean);
    if (tried.length) lines.push(`Things they've tried: ${sentence(tried.join("; "))}`);
    const monster = text("monster");
    if (monster) lines.push(`Their monster: ${sentence(monster)}`);
    const values = list("values");
    if (values.length) lines.push(`What matters: ${sentence(joinLower(values))}`);
    const doing = text("doing_more");
    if (doing) lines.push(`Would be doing more of: ${sentence(doing)}`);
    const notice = text("notice_week");
    if (notice) lines.push(`To notice this week: ${sentence(notice)}`);
    const arrival = number("arrival");
    if (arrival !== null) lines.push(`Settled at the start: ${arrival}/10.`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
