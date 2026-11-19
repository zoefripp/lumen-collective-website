import type { FormDef } from "../types";
import { joinLower, lowerFirst, notes, prompt, read, sentence } from "./shared";
import { formatDate } from "../scoring";

// Safety and wellness plan, written together with the participant in their
// own words. It moves from staying well, through early warning signs, to what
// to do and who to contact when things get harder. Crisis numbers match the
// Support in a Crisis page on the Lumen Collective website.

export const crisisNumbers = [
  "Emergency: 000",
  "Mental Health Line (NSW, 24/7): 1800 011 511",
  "Lifeline (24/7): 13 11 14, or text 0477 13 11 14",
  "Beyond Blue: 1300 22 4636",
  "13YARN (Aboriginal and Torres Strait Islander crisis support): 13 92 76",
  "QLife (LGBTIQ+ peer support): 1800 184 527",
  "1800RESPECT (family and domestic violence): 1800 737 732",
].join("\n");

export const safetyWellnessPlan: FormDef = {
  slug: "safety-wellness-plan",
  title: "Safety and Wellness Plan",
  description:
    "Written together in the participant's words: staying well, warning signs, what helps, who to contact and crisis numbers.",
  sections: [
    {
      title: "About this plan",
      fields: [
        prompt(
          "p_about",
          "Write this together at a calm time, in their own words, not yours. Explain that it's theirs to keep: when you finish, use \"Save or share the PDF\" to AirDrop, print or message them a copy. Agree who else should have a copy, and when you'll review it."
        ),
      ],
    },
    {
      title: "Staying well",
      fields: [
        { id: "good_day", type: "textarea", label: "When I'm well, I…", help: "What a good day looks like for you." },
        {
          id: "keep_well",
          type: "multi",
          label: "Things that help me stay well",
          options: [
            "Regular sleep",
            "Eating well",
            "Taking medication as prescribed",
            "Exercise or movement",
            "Time outdoors",
            "Seeing people I trust",
            "Routine",
            "Creative activities",
            "Faith or spiritual practice",
            "Seeing my health professionals",
          ],
        },
        { id: "keep_well_other", type: "textarea", label: "Other things that keep me well" },
        notes("notes_well"),
      ],
    },
    {
      title: "What can make things harder",
      fields: [
        {
          id: "triggers",
          type: "multi",
          label: "Things that can make things harder for me",
          options: [
            "Poor sleep",
            "Conflict with others",
            "Being alone too long",
            "Money stress",
            "Changes to routine",
            "Crowds or noise",
            "Anniversaries or reminders",
            "Alcohol or drugs",
            "Physical health problems",
          ],
        },
        { id: "triggers_other", type: "textarea", label: "Other things that can make things harder" },
        notes("notes_triggers"),
      ],
    },
    {
      title: "Early warning signs",
      fields: [
        prompt(
          "p_signs",
          "Ask about the very first changes they notice, not the crisis point: changes in sleep, thinking, mood, behaviour or contact with people. Then ask what others notice first; they often see it before we do."
        ),
        { id: "signs_me", type: "textarea", label: "Signs I notice when I'm starting to struggle" },
        { id: "signs_others", type: "textarea", label: "What other people might notice" },
        notes("notes_signs"),
      ],
    },
    {
      title: "What helps",
      fields: [
        {
          id: "help_myself",
          type: "textarea",
          label: "Things I can do on my own to feel calmer or safer",
          help: "Grounding, breathing, music, a walk, a shower, a pet…",
        },
        {
          id: "help_places",
          type: "textarea",
          label: "Places I can go, or people I can be around, to take my mind off things",
        },
        { id: "help_others_do", type: "textarea", label: "What I'd like others to do when I'm struggling" },
        { id: "help_not", type: "textarea", label: "What isn't helpful for me" },
        notes("notes_help"),
      ],
    },
    {
      title: "People and services I can contact",
      fields: [
        {
          id: "contacts_people",
          type: "textarea",
          label: "People I trust that I can ask for help",
          help: "Name and phone number, one per line.",
        },
        {
          id: "contacts_services",
          type: "textarea",
          label: "Professionals and services",
          help: "GP, psychologist, case manager, support coordinator. Name and number, one per line.",
        },
        notes("notes_contacts"),
      ],
    },
    {
      title: "Making things safer",
      fields: [
        prompt(
          "p_safer",
          "Ask gently about anything at home they could use to harm themselves (medication, weapons, other means) and what would make it harder to reach when they're struggling, such as someone else holding medication. Follow their lead and your risk and safety procedures."
        ),
        { id: "safer", type: "textarea", label: "Things I can do to make my surroundings safer" },
        { id: "reasons", type: "textarea", label: "What keeps me going", help: "People, pets, plans, hopes, values." },
        notes("notes_safer"),
      ],
    },
    {
      title: "Crisis contacts",
      fields: [
        {
          id: "crisis_numbers",
          type: "note",
          label: "If you're in danger or can't keep yourself safe",
          text: `Call 000 or go to your nearest hospital emergency department.\n\n${crisisNumbers}`,
          print: true,
        },
      ],
    },
    {
      title: "Reviewing the plan",
      fields: [
        {
          id: "copies",
          type: "multi",
          label: "Who has a copy",
          options: ["Me", "Recovery Coach", "Family member or carer", "GP", "Support coordinator", "Other"],
        },
        { id: "review_date", type: "date", label: "Date to review this plan" },
        notes("notes_review"),
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const { text, list } = read(answers);
    const name = participant || "The participant";
    const lines: string[] = [`${name} wrote this safety and wellness plan with their Recovery Coach.`];

    const signs = text("signs_me");
    if (signs) lines.push(`Early warning signs: ${sentence(signs)}`);
    const triggers = [...list("triggers"), ...(text("triggers_other") ? [text("triggers_other")] : [])];
    if (triggers.length) lines.push(`Things that can make things harder: ${sentence(joinLower(triggers))}`);
    const helps = text("help_myself");
    if (helps) lines.push(`First things to try: ${sentence(helps)}`);
    const people = text("contacts_people");
    lines.push(people ? `Trusted people are listed in the plan.` : `No trusted people listed yet.`);

    const copies = list("copies").map((holder) =>
      holder === "Me" ? "the participant" : holder === "Recovery Coach" ? holder : lowerFirst(holder)
    );
    if (copies.length) lines.push(`Copies held by: ${sentence(copies.join(", "))}`);
    const review = text("review_date");
    lines.push(review ? `Review by ${formatDate(review)}.` : `No review date set.`);
    return lines;
  },
  signatures: [
    { id: "participant", label: "Participant" },
    { id: "coach", label: "Recovery Coach", required: true },
  ],
};
