import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";

// Window of Tolerance. The three zones (above, within, below), their personal
// signs in each, what pushes them out, what brings them back down or up, and
// what widens the window over time.


export const windowOfTolerance: FormDef = {
  slug: "window-of-tolerance",
  title: "Window of Tolerance",
  description: "The three zones (too much, coping, shut down), their own signs in each, what pushes them out, and what brings them back.",
  hideEmpty: true,
  sections: [
    {
      title: "What is the window of tolerance?",
      fields: [
        {
          id: "about",
          type: "note",
          label: "The three zones",
          text:
            "ABOVE MY WINDOW: too much\nAnxious, panicky, angry, overwhelmed, racing heart, can't sit still, can't think straight. The body is in fight or flight.\n\nIN MY WINDOW: I can cope\nI can feel things and still think, talk, make choices and connect with people. Hard things are hard, but manageable.\n\nBELOW MY WINDOW: shut down\nNumb, flat, empty, foggy, exhausted, disconnected, hard to move or speak. The body is in freeze or shutdown.\n\nEveryone's window is a different size, and stress, trauma, tiredness and illness can make it narrower. The good news: we can learn to notice where we are, come back into the window, and slowly make it wider.",
          print: true,
        },
        prompt(
          "p_window",
          "Draw the window on paper if it helps: a band in the middle with a zone above and below. Normalise moving in and out of the window: it's what nervous systems do. If they have a trauma history, go gently and keep the focus on noticing and coping, not on the events."
        ),
        { id: "now", type: "choice", label: "Where am I right now?", options: ["Above my window", "In my window", "Below my window", "Not sure"] },
      ],
    },
    {
      title: "My signs",
      fields: [
        { id: "signs_above", type: "textarea", label: "When I'm above my window, I notice…", help: "In my body, thoughts and actions." },
        { id: "signs_in", type: "textarea", label: "When I'm in my window, I notice…" },
        { id: "signs_below", type: "textarea", label: "When I'm below my window, I notice…" },
      ],
    },
    {
      title: "What pushes me out",
      fields: [
        { id: "pushes_up", type: "textarea", label: "Things that push me above my window" },
        { id: "pushes_down", type: "textarea", label: "Things that push me below my window" },
      ],
    },
    {
      title: "Coming back into my window",
      fields: [
        {
          id: "calm_down",
          type: "multi",
          label: "When I'm above my window, these help me come back down",
          options: ["Slow breathing, longer out-breath", "Cold water", "Pushing my feet into the floor", "A quiet space", "Weighted blanket or pressure", "Calming music", "Naming what I see around me"],
        },
        {
          id: "lift_up",
          type: "multi",
          label: "When I'm below my window, these help me come back up",
          options: ["Moving my body", "Strong taste or smell", "Upbeat music", "Stepping outside", "Splashing my face", "Talking to someone", "Standing up and stretching"],
        },
        { id: "own_ways", type: "textarea", label: "My own ways back into my window" },
      ],
    },
    {
      title: "Widening my window",
      fields: [
        { id: "widen", type: "textarea", label: "Things that help my window grow over time", help: "For example: sleep, routine, people who feel safe, regular practice of calming skills." },
        { id: "practice", type: "textarea", label: "One thing I'll practise this week" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const lines = [`${participant || "The participant"} mapped their window of tolerance.`];
    const now = text("now");
    if (now) lines.push(`In session: ${sentence(now.toLowerCase())}`);
    const down = list("calm_down");
    if (down.length) lines.push(`Comes back down with: ${sentence(down.join(", ").toLowerCase())}`);
    const up = list("lift_up");
    if (up.length) lines.push(`Comes back up with: ${sentence(up.join(", ").toLowerCase())}`);
    const practice = text("practice");
    if (practice) lines.push(`This week: ${sentence(practice)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
