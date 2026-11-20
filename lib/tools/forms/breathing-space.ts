import type { FormDef } from "../types";
import { joinLower, read, sentence } from "./shared";

// Three Minute Breathing Space. A short mindfulness practice with Lumen
// Collective's own script to read aloud (shown on screen only), ratings before
// and after, reflection, and a plan to practise between sessions.

const SCRIPT = `Welcome to this Three Minute Breathing Space meditation. This brief practice is a simple way to reconnect with the present moment and find tranquility in the midst of daily life. Let’s begin.

Begin by finding a comfortable position. Sit in a way that feels stable and grounded. If it feels comfortable for you, gently close your eyes, or if you prefer, keep them open with a soft, unfocused gaze.

Now, bring your awareness to the present moment. Notice the environment around you – the sounds, the temperature, the sensation of air on your skin. Whatever you notice, it’s all okay.
Gently turn your attention inward. Observe your thoughts as they come and go, acknowledging them without any judgment. Notice any sensations within your body. Observe all of these without wanting to change them. Simply be present with your current experience.

Now that you are fully present, direct your attention to the physical sensations of your breathing. Notice the air entering and leaving your nostrils, the gentle rise and fall of your chest, the movement in your belly as you breathe. No need to force anything. Simply pay attention to how good it feels to just breathe. Use this awareness of your breath as an anchor, bringing you into the present moment. Allow yourself to just be. When your mind starts to wander, gently bring it back to the sensation of breathing.

Now, expand your awareness from your breath to encompass your entire body. Sense the posture you are holding. Are there areas of tension or relaxation in your body? Notice your facial expression – is it tense or relaxed? If you encounter areas of tension, imagine breathing into them, and as you exhale, let them soften and release.
Bring a sense of acceptance to your present circumstances. With each breath, you can say to yourself: “All my feelings and sensations are okay. It’s part of being a human. It’s okay”.

As this brief meditation comes to a close, take a moment to acknowledge the space you have created for yourself. When you’re ready, gently open your eyes if they were closed, and take in your surroundings. Carry this sense of calm and awareness with you as you move through the rest of your day.`;

export const breathingSpace: FormDef = {
  slug: "breathing-space",
  title: "Three Minute Breathing Space",
  description: "A short mindfulness practice with a script to read aloud, ratings before and after, reflection, and a plan to practise between sessions.",
  hideEmpty: true,
  sections: [
    {
      title: "About this practice",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What is the breathing space?",
          text:
            "The Three Minute Breathing Space is a short mindfulness practice you can do anywhere: at home, on the bus, before an appointment. It has three steps:\n\n1. Noticing: what's here right now, around you and inside you.\n2. Gathering: bringing your attention to your breath.\n3. Expanding: widening your attention to your whole body, with acceptance.\n\nIt isn't about clearing your mind or feeling relaxed. It's about stepping out of autopilot and coming back to the present.",
          print: true,
        },
        { id: "calm_before", type: "scale", label: "Before: how calm do I feel?", min: 0, max: 10, minLabel: "Not at all", maxLabel: "Very calm" },
        { id: "busy_before", type: "scale", label: "Before: how busy is my mind?", min: 0, max: 10, minLabel: "Quiet", maxLabel: "Racing" },
      ],
    },
    {
      title: "The practice",
      intro: "About three minutes. Read slowly, with pauses.",
      fields: [
        {
          id: "p_safety",
          type: "note",
          label: "Coach prompt",
          text: "Offer choice: eyes open or closed, sitting or standing. Let them know they can stop at any time. If they become distressed, open your eyes together and ground with the room.",
        },
        { id: "script", type: "note", label: "Script to read aloud", text: SCRIPT },
      ],
    },
    {
      title: "Afterwards",
      fields: [
        { id: "calm_after", type: "scale", label: "After: how calm do I feel?", min: 0, max: 10, minLabel: "Not at all", maxLabel: "Very calm" },
        { id: "busy_after", type: "scale", label: "After: how busy is my mind?", min: 0, max: 10, minLabel: "Quiet", maxLabel: "Racing" },
        { id: "noticed", type: "textarea", label: "What I noticed" },
      ],
    },
    {
      title: "Practising between sessions",
      fields: [
        {
          id: "when",
          type: "multi",
          label: "When I could use the breathing space",
          options: ["When I wake up", "Before appointments", "When I feel stressed", "On the bus or in the car", "Before bed", "When my mind is racing"],
        },
        { id: "how_often", type: "choice", label: "How often I'll practise", options: ["Once a day", "Twice a day", "When I need it", "A few times a week"] },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list, number } = read(answers);
    const lines = [`${participant || "The participant"} practised the Three Minute Breathing Space.`];
    const cb = number("calm_before");
    const ca = number("calm_after");
    if (cb !== null && ca !== null) lines.push(`Calm: ${cb}/10 before, ${ca}/10 after.`);
    const bb = number("busy_before");
    const ba = number("busy_after");
    if (bb !== null && ba !== null) lines.push(`Busy mind: ${bb}/10 before, ${ba}/10 after.`);
    const when = list("when");
    if (when.length) lines.push(`Will use it: ${sentence(joinLower(when))}${text("how_often") ? ` ${text("how_often")}.` : ""}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
