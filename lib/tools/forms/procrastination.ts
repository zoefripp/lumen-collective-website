import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";

// Overcoming Procrastination and Learning to Delegate. Why we put things off,
// breaking a task down, sorting tasks into do, schedule, delegate or drop,
// asking for help, and a five-minute first step.

export const procrastination: FormDef = {
  slug: "procrastination",
  title: "Overcoming Procrastination",
  description: "Why we put things off, breaking a task down, sorting tasks into do, schedule, delegate or drop, learning to delegate, and a five-minute first step.",
  hideEmpty: true,
  sections: [
    {
      title: "Why we put things off",
      fields: [
        {
          id: "about",
          type: "note",
          label: "Procrastination isn't laziness",
          text:
            "We usually put things off to avoid an uncomfortable feeling: overwhelm, boredom, fear of getting it wrong, or not knowing where to start. Putting it off brings relief for now, which is why it's so easy to repeat, but the task and the stress grow over time.\n\nThe way out is to make the first step small, and to remember that we don't have to do everything ourselves.",
          print: true,
        },
        { id: "task", type: "textarea", label: "A task I've been putting off" },
        {
          id: "reasons",
          type: "multi",
          label: "Why I've been putting it off",
          options: ["It feels overwhelming", "I don't know where to start", "I'm worried I'll get it wrong", "It's boring", "I'm too tired", "I don't know how to do it", "I want it to be perfect", "Something else always comes first"],
        },
        { id: "feeling", type: "textarea", label: "What feeling might I be avoiding?" },
      ],
    },
    {
      title: "Breaking it down",
      fields: [
        prompt(
          "p_break",
          "Break the task into steps small enough that each takes 5 to 20 minutes. For each step, ask: does this have to be me?"
        ),
        {
          id: "steps",
          type: "pairs",
          label: "Steps",
          columns: ["Step", "Me or someone else?", "When"],
          widths: [3, 2, 1.5],
          rows: 5,
        },
      ],
    },
    {
      title: "Do, schedule, delegate or drop",
      intro: "Sort the other things on your plate. Not everything needs doing now, or by you.",
      fields: [
        {
          id: "sort_note",
          type: "note",
          label: "Four choices",
          text:
            "DO: important and urgent. Do it soon.\nSCHEDULE: important but not urgent. Pick a time.\nDELEGATE: someone else could do it, or help.\nDROP: not important. Let it go.",
          print: true,
        },
        {
          id: "sort",
          type: "pairs",
          label: "My tasks",
          columns: ["Task", "Do, schedule, delegate or drop?"],
          rows: 6,
        },
      ],
    },
    {
      title: "Learning to delegate",
      fields: [
        prompt(
          "p_delegate",
          "Asking for help can feel uncomfortable, especially if they're used to doing everything themselves or worry about being a burden. Explore what gets in the way, and practise the words they'd use."
        ),
        { id: "delegate_block", type: "textarea", label: "What makes it hard for me to ask for help or hand things over?" },
        {
          id: "delegate",
          type: "pairs",
          label: "What I could hand over",
          columns: ["Task", "Who could help", "What I'll say"],
          widths: [2, 2, 3],
          rows: 3,
        },
      ],
    },
    {
      title: "My first step",
      fields: [
        { id: "first_step", type: "textarea", label: "My first five-minute step", help: "Something so small it's easy to start." },
        { id: "when", type: "text", label: "When I'll do it" },
        { id: "if_stuck", type: "textarea", label: "If I notice I'm putting it off, I'll…" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const lines: string[] = [];
    const task = text("task");
    if (task) lines.push(`${participant || "The participant"} has been putting off: ${sentence(task)}`);
    const reasons = list("reasons");
    if (reasons.length) lines.push(`Why: ${sentence(joinLower(reasons))}`);
    const delegated = Array.from({ length: 3 }, (_, row) => [text(`delegate_${row + 1}_0`), text(`delegate_${row + 1}_1`)])
      .filter(([what]) => what)
      .map(([what, who]) => (who ? `${what} (${who})` : what));
    if (delegated.length) lines.push(`Handing over: ${sentence(delegated.join("; "))}`);
    const step = text("first_step");
    if (step) lines.push(`First step: ${sentence(step)}${text("when") ? ` When: ${sentence(text("when"))}` : ""}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
