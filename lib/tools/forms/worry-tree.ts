import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";

// Worry Tree. Notice the worry, ask whether there's something you can do
// about it, then either make a plan or let it go and refocus. The plan and
// let-go parts only appear once that question is answered.

const ACT_NOW = "Yes, I can do something now";
const ACT_LATER = "Yes, but not right now";
const CANT = "No, it's out of my control";

export const worryTree: FormDef = {
  slug: "worry-tree",
  title: "Worry Tree",
  description:
    "Notice a worry, ask whether there's anything you can do about it, then make a plan or let it go and refocus, with an option for worry time.",
  hideEmpty: true,
  sections: [
    {
      title: "Notice the worry",
      fields: [
        {
          id: "about",
          type: "note",
          label: "How the worry tree works",
          text:
            "1. Notice the worry and write it down.\n2. Ask: is there anything I can do about this?\n3. If yes: make a plan, then let the worry go.\n4. If no: let it go and turn your attention to something else.",
          print: true,
        },
        prompt(
          "p_notice",
          "Help them name a specific worry rather than a general feeling. If many worries come up, write them all down and pick one to work through today."
        ),
        { id: "worry", type: "textarea", label: "What am I worrying about?" },
        {
          id: "kind",
          type: "choice",
          label: "Is this about…",
          options: ["Something happening now", "Something that might happen", "Something in the past"],
        },
        { id: "worry_level", type: "scale", label: "How much is it worrying me?", min: 0, max: 10, minLabel: "A little", maxLabel: "A lot" },
        {
          id: "can_act",
          type: "choice",
          label: "Is there anything I can do about this?",
          options: [ACT_NOW, ACT_LATER, CANT],
        },
      ],
    },
    {
      title: "Make a plan",
      showIf: { field: "can_act", anyOf: [ACT_NOW, ACT_LATER] },
      fields: [
        { id: "what", type: "textarea", label: "What can I do?" },
        { id: "when", type: "text", label: "When will I do it?" },
        { id: "how", type: "textarea", label: "How will I do it? Who could help?" },
        {
          id: "after_plan",
          type: "note",
          label: "Then let it go",
          text: "Once you've made a plan, the worry has done its job. When it comes back, remind yourself: \"I've got a plan for that.\"",
          print: true,
        },
      ],
    },
    {
      title: "Let it go and refocus",
      showIf: { field: "can_act", anyOf: [CANT] },
      intro: "This worry is out of your control right now. Worrying more won't change it, so let's turn your attention to something else.",
      fields: [
        {
          id: "refocus",
          type: "multi",
          label: "Ways I can refocus",
          options: [
            "Notice the worry and let it pass",
            "Ground myself (five things I can see)",
            "Slow breathing",
            "Do something absorbing",
            "Move my body",
            "Talk to someone",
            "Save it for worry time",
          ],
        },
        { id: "refocus_on", type: "textarea", label: "What I'll turn my attention to instead" },
      ],
    },
    {
      title: "Worry time",
      showIf: { field: "can_act", anyOf: [ACT_LATER, CANT] },
      intro: "Worry time is a set 15 minutes a day for worries. When a worry pops up at other times, jot it down and save it for then.",
      fields: [
        { id: "worry_time", type: "text", label: "My worry time: when and where", help: "Not too close to bedtime." },
      ],
    },
    {
      title: "Afterwards",
      fields: [
        { id: "worry_after", type: "scale", label: "Now, how much is it worrying me?", min: 0, max: 10, minLabel: "A little", maxLabel: "A lot" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines: string[] = [];
    const worry = text("worry");
    if (worry) lines.push(`${participant || "The participant"}'s worry: ${sentence(worry)}`);
    const act = text("can_act");
    if (act) lines.push(`Can they act on it? ${sentence(act)}`);
    const what = text("what");
    if (what) lines.push(`Plan: ${sentence(what)}${text("when") ? ` When: ${sentence(text("when"))}` : ""}`);
    const refocus = list("refocus");
    if (refocus.length) lines.push(`Refocus by: ${sentence(joinLower(refocus))}`);
    const before = number("worry_level");
    const after = number("worry_after");
    if (before !== null && after !== null) lines.push(`Worry: ${before}/10 before, ${after}/10 after.`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
