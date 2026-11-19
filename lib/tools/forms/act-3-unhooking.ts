import type { FormDef } from "../types";
import { prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, beforeAfter, coachNotes, confidence, rating, sinceLastTime } from "./act-shared";

// ACT Session 3: Unhooking from Thoughts (defusion). Noticing the thoughts
// that hook them, practising stepping back from them, and the passengers on
// the bus metaphor. Wording is Lumen Collective's own.

export const act3Unhooking: FormDef = {
  slug: "act-3-unhooking",
  title: "ACT Session 3: Unhooking from Thoughts",
  description:
    "Noticing the thoughts that hook them, practising stepping back from those thoughts, and choosing direction even when the mind is loud.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving([0, 5], "Today is about noticing thoughts as thoughts, rather than arguing with them or trying to make them stop."),
    sinceLastTime([5, 10], [
      "How did dropping anchor go this week?",
      "When did you use it, or when could you have used it?",
      "What did you notice afterwards?",
    ]),
    {
      title: "Thoughts that hook me",
      minutes: [10, 20],
      intro:
        "Our minds produce thoughts all day long. Most pass by, but some grab hold of us and pull us away from what matters. We call that being hooked.",
      fields: [
        prompt(
          "p_hooks",
          "Normalise: everyone's mind does this, and the thoughts aren't the problem; getting hooked is. Ask what the mind says, not whether it's true."
        ),
        {
          id: "familiar",
          type: "multi",
          label: "Do any of these sound familiar?",
          options: [
            "I'm not good enough",
            "Something bad will happen",
            "No one likes me",
            "I can't cope",
            "It's all my fault",
            "What's the point?",
            "I'll mess it up",
          ],
        },
        { id: "hook_thought", type: "textarea", label: "The thought that hooks me most" },
        rating("hooked_before", "When this thought shows up, how much does it hook you?", "Not at all", "Completely"),
        ask("ask_hooks", [
          "When does this thought usually show up?",
          "When you're hooked by it, what do you do or stop doing?",
          "How long has your mind been telling you this?",
        ]),
      ],
    },
    {
      title: "Unhooking",
      minutes: [20, 35],
      intro: "Let's try a few ways of stepping back from the thought, so you can see it rather than see through it.",
      fields: [
        prompt(
          "p_unhook",
          "Try these one at a time, checking in after each:\n\n1. Say the thought in full. Then say \"I'm having the thought that…\" in front of it. Then \"I notice I'm having the thought that…\".\n2. Say the thought very slowly, or in a cartoon voice, or sing it to \"Happy Birthday\". Offer this; don't push it, and check it doesn't feel like you're making fun of their pain.\n3. Name the story: \"Ah, there's the 'not good enough' story again.\"\n\nThe aim isn't to make the thought go away or prove it wrong, only to loosen its grip."
        ),
        ask("ask_unhook", [
          "What happened when you added \"I'm having the thought that…\"?",
          "Which way of stepping back worked best for you?",
          "Is the thought still there? Does it have the same grip?",
        ]),
        { id: "story_name", type: "text", label: "The name I'll give this story", help: "For example: the \"not good enough\" story." },
        rating("hooked_after", "Now, how much does the thought hook you?", "Not at all", "Completely"),
        { id: "unhook_noticed", type: "textarea", label: "What I noticed" },
      ],
    },
    {
      title: "Passengers on the bus",
      minutes: [35, 43],
      fields: [
        prompt(
          "p_bus",
          "Describe the metaphor: you're the driver of a bus, and your thoughts and feelings are passengers. Some are loud and scary, and they shout directions: \"Turn back!\", \"You can't do this!\". You can't throw them off the bus, and stopping to argue means the bus goes nowhere. But you're the one holding the steering wheel, so you can keep driving in the direction that matters while they shout."
        ),
        ask("ask_bus", [
          "Who are the loudest passengers on your bus?",
          "What happens when you let them choose the direction?",
          "Where would you drive the bus if you were steering?",
        ]),
        { id: "direction", type: "textarea", label: "Where I want to drive my bus" },
      ],
    },
    {
      title: "Bringing it home",
      minutes: [43, 50],
      fields: [
        prompt("p_close", `Agree one way of unhooking they'll try when the thought shows up. ${CLOSE_PROMPT}`),
        { id: "practice", type: "textarea", label: "When this thought hooks me this week, I'll…" },
        confidence(),
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines = [`${participant || "The participant"} completed ACT Session 3: Unhooking from Thoughts.`];
    const familiar = list("familiar");
    if (familiar.length) lines.push(`Familiar thoughts: ${sentence(familiar.map((item) => `"${item}"`).join(", "))}`);
    const hook = text("hook_thought");
    if (hook) lines.push(`Thought that hooks them most: "${hook.replace(/[.\s]+$/, "")}"`);
    const story = text("story_name");
    if (story) lines.push(`Story name: ${sentence(story)}`);
    const change = beforeAfter("How much the thought hooks them", number("hooked_before"), number("hooked_after"));
    if (change) lines.push(change);
    const practice = text("practice");
    const conf = number("confidence");
    if (practice) lines.push(`This week: ${sentence(practice)}${conf !== null ? ` Confidence ${conf}/10.` : ""}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
