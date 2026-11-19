import type { FormDef } from "../types";
import { joinLower, prompt, read, sentence } from "./shared";
import { ACT_GROUP, CLOSE_PROMPT, arriving, ask, beforeAfter, coachNotes, confidence, rating, sinceLastTime } from "./act-shared";

// ACT Session 4: Making Room for Feelings (acceptance). Choosing a difficult
// feeling, a practice of noticing it, breathing around it and making space
// for it, and the sky and weather metaphor. Wording is Lumen Collective's own.

export const act4MakingRoom: FormDef = {
  slug: "act-4-making-room",
  title: "ACT Session 4: Making Room for Feelings",
  description:
    "Practising making room for a difficult feeling instead of fighting it, so it has less power to push them around.",
  group: ACT_GROUP,
  sessionMinutes: 50,
  hideEmpty: true,
  sections: [
    arriving(
      [0, 5],
      "Today is about practising a different way of being with difficult feelings: not liking them or wanting them, just making a bit of room."
    ),
    sinceLastTime([5, 10], [
      "When did your mind hook you this week?",
      "Did you try unhooking? What happened?",
      "Did you drive the bus in a direction that mattered, even a little?",
    ]),
    {
      title: "A difficult feeling",
      minutes: [10, 18],
      intro: "Choose a feeling that's been showing up for you lately. Pick one that's uncomfortable but manageable for today.",
      fields: [
        prompt(
          "p_choose",
          "Steer towards a mild to moderate feeling, not the most painful memory or a trauma. They choose; you follow. Remind them they can stop or open their eyes at any time."
        ),
        {
          id: "feeling",
          type: "multi",
          label: "Which feeling will we make room for?",
          options: ["Anxiety", "Sadness", "Anger", "Shame", "Loneliness", "Frustration", "Guilt", "Overwhelm"],
        },
        { id: "feeling_other", type: "text", label: "Or in your own words" },
        {
          id: "body",
          type: "multi",
          label: "Where do you notice it in your body?",
          options: ["Chest", "Stomach", "Throat", "Shoulders", "Head", "Hands", "Whole body", "Not sure"],
        },
        rating("intensity_before", "How strong is the feeling right now?", "Barely there", "As strong as it gets"),
        rating("struggle_before", "How much are you struggling against it?", "Not at all", "With everything I've got"),
      ],
    },
    {
      title: "Making room",
      minutes: [18, 32],
      intro: "We're not trying to get rid of the feeling. We're practising letting it be there, so it doesn't run the show.",
      fields: [
        prompt(
          "p_room",
          "Guide this slowly, about eight minutes. Pause between each step.\n\n1. Notice: where is the feeling in your body? What shape or size is it? Is it hot or cool, heavy or light, still or moving?\n2. Breathe: breathe slowly, as if your breath could flow in and around the feeling.\n3. Make space: imagine opening up around it, giving it a little more room, like opening a door.\n4. Allow: let it be there. You don't have to like it or want it, just let it be.\n\nOptional: place a kind hand where the feeling is. Watch for distress and ground together if needed."
        ),
        rating("intensity_after", "Now, how strong is the feeling?", "Barely there", "As strong as it gets"),
        rating("struggle_after", "And how much are you struggling against it now?", "Not at all", "With everything I've got"),
        ask("ask_room", [
          "What did you notice about the feeling as you made room for it?",
          "Did the feeling change, or did the struggle change?",
          "What was it like to stop fighting it, even for a moment?",
        ]),
        prompt(
          "p_room_note",
          "If the feeling's strength didn't drop, that's fine. The aim is less struggle, not less feeling. Say so if they seem disappointed."
        ),
        { id: "room_noticed", type: "textarea", label: "What I noticed" },
      ],
    },
    {
      title: "The sky and the weather",
      minutes: [32, 42],
      fields: [
        prompt(
          "p_sky",
          "Describe the metaphor: feelings are like the weather, always changing. Some days are calm and sunny, others are stormy. You are like the sky. The sky has room for every kind of weather, and no storm can harm it. However wild the weather gets, the sky is still there behind it."
        ),
        ask("ask_sky", [
          "What's the weather like for you most days lately?",
          "What would it be like to be the sky, rather than the storm?",
          "What could you say to yourself, kindly, when this feeling shows up?",
        ]),
        { id: "kind_words", type: "textarea", label: "A kind thing I can say to myself when this feeling shows up" },
      ],
    },
    {
      title: "Bringing it home",
      minutes: [42, 50],
      fields: [
        prompt("p_close", `Agree a short, specific practice for when the feeling shows up. ${CLOSE_PROMPT}`),
        { id: "practice", type: "textarea", label: "This week, when this feeling shows up, I'll…" },
        confidence(),
        coachNotes("notes_close"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines = [`${participant || "The participant"} completed ACT Session 4: Making Room for Feelings.`];
    const feeling = [...list("feeling"), ...(text("feeling_other") ? [text("feeling_other")] : [])];
    if (feeling.length) lines.push(`Feeling worked with: ${sentence(joinLower(feeling))}`);
    const body = list("body");
    if (body.length) lines.push(`Noticed in: ${sentence(joinLower(body))}`);
    const struggle = beforeAfter("Struggle against the feeling", number("struggle_before"), number("struggle_after"));
    if (struggle) lines.push(struggle);
    const intensity = beforeAfter("Strength of the feeling", number("intensity_before"), number("intensity_after"));
    if (intensity) lines.push(intensity);
    const kind = text("kind_words");
    if (kind) lines.push(`Kind words: "${kind.replace(/[.\s]+$/, "")}"`);
    const practice = text("practice");
    const conf = number("confidence");
    if (practice) lines.push(`This week: ${sentence(practice)}${conf !== null ? ` Confidence ${conf}/10.` : ""}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
