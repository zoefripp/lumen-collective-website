import type { FormDef } from "../types";
import { read, sentence } from "./shared";

// Self-Compassion Meditation. Lumen Collective's own script to read aloud
// (shown on screen only), ratings before and after, reflection, and kind
// words to take away.

const SCRIPT = `Find a comfortable seated position that feels natural to you. Allow your eyes to gently close, taking a few deep breaths. Be present with the inflow and outflow of your breath, settling into this moment. You are here and now.

Notice any tension in your body. Maybe you’re feeling stiffness in your neck. Maybe you’re curling your toes. Wherever you may feel this tension, just notice it - without judgment or wanting to change it. Focus on your breath and imagine directing its energy to any region in your body that feels tense. As you exhale, consciously relax this area, breathing out stress and discomfort. Stay with your breath as it cleanses and nourishes every cell.

Try asking yourself, “Why am I feeling this tension?” and notice what your mind comes up with. Maybe you’ve been stressed due to work? A recent argument with someone? Or just feeling that you’re not enough. Whatever it is, just observe it and say to yourself: “This is a moment of suffering, but it’s okay”. “It’s part of being a human”.

Consider that all humans fail, make mistakes and struggle in life. It is part of our shared human experience. You are not alone though it may sometimes feel that way. Whatever you are feeling, someone else has felt it before. Whatever you're experiencing, someone else has experienced it before.

Acknowledge that you too wish to be happy and to avoid suffering. Recognize that like all people, you have faced difficulties and challenges in life. There may have been times when you caused harm to yourself or others, whether intentionally or not. But you know better now. Say to yourself “I am worth taking care of”. “I wish happiness and well-being to all the people I love, just as I wish them onto myself”.

Now, imagine you are speaking to a part of yourself that is in need of healing.
Softly repeat to yourself:
“I am a work in progress. I am enough the way I am right now. I am patient with my flaws. I make mistakes like all humans & that’s okay. I am ready to grow to be a more kind and compassionate human being & the best way to start is by being kind to myself.”

With each breath, imagine your chest getting more and more warm. Feel the kindness and compassion you wish upon your loved ones covering your own body like a cozy blanket.

When your mind wanders, simply bring it back to the present moment. This is all you have. All that matters right now. Softly say to yourself: "I accept myself exactly as I am in this moment. All my experiences are okay. May I feel safe and protected. May I forgive myself and move forward. I am worthy”

When you feel ready, take a deeper breath, gently wiggle your fingers and toes, and open your eyes. Carry with you this feeling of lightness and kindness.`;

export const selfCompassion: FormDef = {
  slug: "self-compassion",
  title: "Self-Compassion Meditation",
  description: "A guided self-compassion meditation with a script to read aloud, ratings before and after, reflection, and kind words to take away.",
  hideEmpty: true,
  sections: [
    {
      title: "About self-compassion",
      fields: [
        {
          id: "about",
          type: "note",
          label: "What is self-compassion?",
          text:
            "Self-compassion means treating yourself with the same kindness you'd offer a friend who was struggling. It has three parts:\n\n• Noticing that you're having a hard time, without ignoring it or getting lost in it.\n• Remembering that struggle is part of being human. You're not alone.\n• Offering yourself kindness instead of criticism.\n\nIt can feel strange or uncomfortable at first, especially if you're used to being hard on yourself. That's normal.",
          print: true,
        },
        { id: "kind_before", type: "scale", label: "Before: how kind am I being to myself today?", min: 0, max: 10, minLabel: "Very harsh", maxLabel: "Very kind" },
      ],
    },
    {
      title: "The meditation",
      intro: "About eight to ten minutes. Read slowly, with pauses.",
      fields: [
        {
          id: "p_safety",
          type: "note",
          label: "Coach prompt",
          text: "Self-compassion can bring up grief or strong feelings, especially for people who are very self-critical. Offer choice throughout, let them know they can open their eyes or stop at any time, and leave time to settle afterwards.",
        },
        { id: "script", type: "note", label: "Script to read aloud", text: SCRIPT },
      ],
    },
    {
      title: "Afterwards",
      fields: [
        { id: "kind_after", type: "scale", label: "After: how kind am I being to myself now?", min: 0, max: 10, minLabel: "Very harsh", maxLabel: "Very kind" },
        { id: "noticed", type: "textarea", label: "What I noticed" },
        { id: "hard", type: "textarea", label: "Was anything hard or uncomfortable?" },
      ],
    },
    {
      title: "Taking it with me",
      fields: [
        {
          id: "phrase",
          type: "textarea",
          label: "A kind phrase I'd like to remember",
          help: "For example: \"I am a work in progress, and that's okay.\"",
        },
        { id: "when", type: "textarea", label: "When I'll use it" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, number } = read(answers);
    const lines = [`${participant || "The participant"} practised the self-compassion meditation.`];
    const before = number("kind_before");
    const after = number("kind_after");
    if (before !== null && after !== null) lines.push(`Kindness to self: ${before}/10 before, ${after}/10 after.`);
    const phrase = text("phrase");
    if (phrase) lines.push(`Kind phrase: "${phrase.replace(/^"|"$/g, "").replace(/[.\s]+$/, "")}."`);
    const when = text("when");
    if (when) lines.push(`Will use it: ${sentence(when)}`);
    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
