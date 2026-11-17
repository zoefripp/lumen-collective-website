import type { ChoiceField, Field, FormDef } from "../types";

// HEADS Assessment for initial Psychosocial Recovery Coaching sessions.
//
// Follows the HEEADSSS psychosocial interview domains (Home, Education and
// employment, Eating and exercise, Activities, Drugs and alcohol, Sexuality
// and relationships, Suicide and mental health, Safety), adapted for adults.
// The questions and prompts are Lumen Collective's own wording.
//
// Completed by the coach, not shown to the participant, so coaching prompts
// run throughout. Each domain ends with the coach's overall rating, which
// feeds the summary.

type Domain = { id: string; label: string };

const domains: Domain[] = [
  { id: "home", label: "Home" },
  { id: "work", label: "Education and employment" },
  { id: "health", label: "Eating, exercise and physical health" },
  { id: "activities", label: "Activities and connection" },
  { id: "drugs", label: "Drugs, alcohol and gambling" },
  { id: "relationships", label: "Sexuality and relationships" },
  { id: "mental", label: "Suicide, self-harm and mental health" },
  { id: "safety", label: "Safety" },
];

const RATINGS = ["A strength", "Going OK", "Some concern", "Significant concern", "Not discussed"];

const rating = (domain: Domain): ChoiceField => ({
  id: `rating_${domain.id}`,
  type: "choice",
  label: `Overall, ${domain.label.toLowerCase()} is…`,
  options: RATINGS,
});

const prompt = (id: string, text: string): Field => ({ id, type: "note", label: "Coach prompt", text });

export const headsAssessment: FormDef = {
  slug: "heads-assessment",
  title: "HEADS Assessment",
  description:
    "Initial-session assessment across the HEEADSSS domains, adapted for adults. Coach-completed, with prompts throughout.",
  sections: [
    {
      title: "Before you begin",
      fields: [
        prompt(
          "p_begin",
          "Explain what the assessment is for: getting to know them and what matters, not a test. Let them know they can skip any topic, take a break or stop. Explain how notes are kept and the limits of confidentiality (risk of serious harm to themselves or others). Go at their pace and follow their lead on order; you don't have to cover every domain today."
        ),
        {
          id: "confidentiality",
          type: "choice",
          label: "Purpose and limits of confidentiality explained",
          options: ["Yes", "Not yet"],
          required: true,
        },
        {
          id: "consent",
          type: "choice",
          label: "Participant agreed to go ahead",
          options: ["Yes", "Yes, with some topics left for later", "No"],
          required: true,
        },
        { id: "preferred_name", type: "text", label: "Preferred name" },
        { id: "pronouns", type: "text", label: "Pronouns" },
        { id: "present", type: "text", label: "Others present", help: "Name and relationship, or none." },
        {
          id: "feel_safe_session",
          type: "textarea",
          label: "What helps them feel comfortable and safe in sessions",
          help: "Setting, time of day, cultural considerations, things to avoid.",
        },
      ],
    },
    {
      title: "H — Home",
      fields: [
        prompt(
          "p_home",
          "Ask: Who do you live with? How do you get on with them? How long have you lived there? Do you feel safe at home? Is there anything about where you live you'd like to change?\nListen for: overcrowding, conflict, risk of losing housing, recent moves."
        ),
        {
          id: "living",
          type: "choice",
          label: "Living situation",
          options: [
            "Lives alone",
            "With family",
            "With partner",
            "Share house",
            "Supported accommodation or SIL",
            "Boarding house",
            "Homeless or couch surfing",
            "Other",
          ],
        },
        {
          id: "housing_stability",
          type: "choice",
          label: "Housing stability",
          options: ["Stable", "At risk", "Unstable"],
        },
        { id: "home_notes", type: "textarea", label: "Notes" },
        rating(domains[0]),
      ],
    },
    {
      title: "E — Education and employment",
      fields: [
        prompt(
          "p_work",
          "Ask: How do you spend your weekdays? Are you working, studying or volunteering? How is that going? What have you enjoyed or been good at in the past? Is there anything you'd like to be doing?\nListen for: strengths and skills, money worries, barriers such as transport or concentration."
        ),
        {
          id: "work_now",
          type: "multi",
          label: "Currently",
          options: [
            "Working full-time",
            "Working part-time or casual",
            "Volunteering",
            "Studying or training",
            "Looking for work",
            "Not working",
            "Receiving income support",
          ],
        },
        { id: "work_notes", type: "textarea", label: "Notes" },
        { id: "work_goals", type: "textarea", label: "Goals in this area" },
        rating(domains[1]),
      ],
    },
    {
      title: "E — Eating, exercise and physical health",
      fields: [
        prompt(
          "p_health",
          "Ask: How have you been sleeping? How is your appetite? Do you get to move your body in ways you enjoy? Do you have a GP you see? Any health conditions or medications that affect your day?\nListen for: changes in sleep or appetite, medication side effects, missed health appointments. Approach eating and weight gently."
        ),
        {
          id: "gp",
          type: "choice",
          label: "Has a regular GP",
          options: ["Yes", "No", "Not sure"],
        },
        {
          id: "health_flags",
          type: "multi",
          label: "Raised in this conversation",
          options: [
            "Sleep difficulties",
            "Appetite or eating changes",
            "Low physical activity",
            "Chronic health condition",
            "Medication side effects",
            "Missed health appointments",
          ],
        },
        { id: "health_notes", type: "textarea", label: "Notes" },
        rating(domains[2]),
      ],
    },
    {
      title: "A — Activities and connection",
      fields: [
        prompt(
          "p_activities",
          "Ask: What do you enjoy doing? What does a typical week look like? Who do you spend time with? Are you part of any groups, cultural or faith communities? Is there anything you used to enjoy that you'd like to get back to?\nListen for: isolation, loss of routine, interests to build on."
        ),
        { id: "enjoys", type: "textarea", label: "Interests and things they enjoy" },
        { id: "connections", type: "textarea", label: "Important people and communities" },
        {
          id: "isolation",
          type: "choice",
          label: "Social connection",
          options: ["Well connected", "Some connection", "Isolated"],
        },
        rating(domains[3]),
      ],
    },
    {
      title: "D — Drugs, alcohol and gambling",
      fields: [
        prompt(
          "p_drugs",
          "Introduce it as something you ask everyone. Ask: Do you drink alcohol, smoke or vape? Do you use any other substances, including medication not as prescribed? Do you gamble? How does it fit into your life, and has anyone been worried about it?\nStay non-judgemental and curious. Focus on impact and what they want, and offer harm reduction information where useful."
        ),
        {
          id: "substances",
          type: "multi",
          label: "Use reported",
          options: [
            "Alcohol",
            "Tobacco or vaping",
            "Cannabis",
            "Medication not as prescribed",
            "Other drugs",
            "Gambling",
            "None reported",
          ],
        },
        {
          id: "substance_impact",
          type: "choice",
          label: "Impact on daily life",
          options: ["No impact", "Some impact", "Significant impact", "Declined to discuss"],
        },
        { id: "drugs_notes", type: "textarea", label: "Notes" },
        rating(domains[4]),
      ],
    },
    {
      title: "S — Sexuality and relationships",
      fields: [
        prompt(
          "p_relationships",
          "Ask permission first, and only explore what is relevant to their support. Ask: Are you in a relationship at the moment? How is that for you? Is there anything about relationships, sexuality or identity that you'd like support with?\nListen for: controlling or unsafe relationships, loneliness, identity-related stress or discrimination."
        ),
        {
          id: "relationship_status",
          type: "choice",
          label: "Relationship status",
          options: ["Single", "In a relationship", "Separated or divorced", "Prefers not to say"],
        },
        { id: "relationships_notes", type: "textarea", label: "Notes" },
        rating(domains[5]),
      ],
    },
    {
      title: "S — Suicide, self-harm and mental health",
      fields: [
        prompt(
          "p_mental",
          "Ask: How has your mood been lately? How do you describe what you live with, in your own words? Who supports your mental health? Have you ever been in hospital for your mental health?\nAsk directly and calmly: Do you ever have thoughts of ending your life, or of hurting yourself? Asking does not increase risk.\nIf there are current thoughts, stay with them, follow your risk and safety procedures, and agree a safety plan and crisis contacts before the session ends."
        ),
        {
          id: "own_words",
          type: "textarea",
          label: "How they describe their mental health, in their own words",
        },
        {
          id: "mh_supports",
          type: "multi",
          label: "Current mental health supports",
          options: [
            "GP",
            "Psychologist or counsellor",
            "Psychiatrist",
            "Community mental health team",
            "Peer support",
            "Support coordinator",
            "None",
          ],
        },
        {
          id: "hospital",
          type: "choice",
          label: "Mental health hospital admissions",
          options: ["None", "In the past", "In the last 12 months", "Prefers not to say"],
        },
        {
          id: "suicide",
          type: "choice",
          label: "Thoughts of suicide or self-harm",
          options: ["None reported", "In the past", "Current", "Declined to answer", "Not asked yet"],
          required: true,
        },
        {
          id: "safety_plan",
          type: "choice",
          label: "Safety plan",
          options: ["Not needed", "Already has one", "Made today", "To be made"],
        },
        { id: "mental_notes", type: "textarea", label: "Notes" },
        rating(domains[6]),
      ],
    },
    {
      title: "S — Safety",
      fields: [
        prompt(
          "p_safety",
          "Ask: Do you feel safe where you live and in your relationships? Has anyone hurt you, threatened you, or taken your money or belongings? Do you feel safe online and when you're out in the community?\nIf they disclose harm, believe them, focus on immediate safety and follow your incident and reporting procedures. Don't push for details they don't want to share."
        ),
        {
          id: "safety_concerns",
          type: "choice",
          label: "Safety concerns identified",
          options: ["No", "Yes", "Unsure"],
          required: true,
        },
        {
          id: "safety_types",
          type: "multi",
          label: "Type of concern",
          options: [
            "Family or domestic violence",
            "Financial exploitation",
            "Unsafe housing",
            "Online safety",
            "Community safety",
            "Other",
          ],
        },
        { id: "safety_notes", type: "textarea", label: "Notes" },
        rating(domains[7]),
      ],
    },
    {
      title: "Bringing it together",
      fields: [
        prompt(
          "p_close",
          "Reflect back what you heard, starting with strengths. Ask what they'd most like to work on first. Check how they're feeling after talking about these things and whether they need anything before they go."
        ),
        { id: "strengths", type: "textarea", label: "Strengths and protective factors" },
        {
          id: "priorities",
          type: "multi",
          label: "Areas they want to focus on first",
          options: domains.map((domain) => domain.label),
        },
        {
          id: "goal_words",
          type: "textarea",
          label: "What they want, in their own words",
        },
        { id: "referrals", type: "textarea", label: "Referrals or linkages to follow up" },
        { id: "next_steps", type: "textarea", label: "Agreed next steps", help: "Who will do what, and by when." },
        {
          id: "after_session",
          type: "choice",
          label: "How they were at the end of the session",
          options: ["Settled", "A bit unsettled", "Distressed", "Not sure"],
        },
        { id: "next_session", type: "date", label: "Next session" },
        { id: "coach_reflection", type: "textarea", label: "Coach reflections" },
      ],
    },
  ],
  summary: ({ answers, participant }) => {
    const name = participant || "The participant";
    const text = (id: string) => {
      const value = answers[id];
      return typeof value === "string" ? value.trim() : "";
    };
    const list = (id: string) => {
      const value = answers[id];
      return Array.isArray(value) ? value : [];
    };
    // Semicolons, because some domain names contain commas.
    const lower = (items: string[]) =>
      items.map((item) => item.charAt(0).toLowerCase() + item.slice(1)).join("; ");
    const lines: string[] = [];

    // Risk flags first so they can't be missed.
    const suicide = text("suicide");
    if (suicide === "Current") {
      lines.push(
        `Risk: ${name} reported current thoughts of suicide or self-harm. Safety plan: ${(
          text("safety_plan") || "not recorded"
        ).toLowerCase()}. Follow up under your risk and safety procedures.`
      );
    } else if (suicide === "In the past") {
      lines.push(`Risk: past thoughts of suicide or self-harm reported. None current.`);
    } else if (suicide === "Declined to answer" || suicide === "Not asked yet") {
      lines.push(`Risk: thoughts of suicide or self-harm ${suicide.toLowerCase()}. Revisit at the next session.`);
    }
    const safety = text("safety_concerns");
    if (safety === "Yes" || safety === "Unsure") {
      const types = list("safety_types");
      lines.push(
        `Safety: concerns ${safety === "Yes" ? "identified" : "possible"}${
          types.length ? ` (${lower(types)})` : ""
        }. Follow your incident and reporting procedures.`
      );
    }
    if (text("housing_stability") === "Unstable" || text("housing_stability") === "At risk") {
      lines.push(`Housing: ${text("housing_stability").toLowerCase()}.`);
    }
    if (text("substance_impact") === "Significant impact") {
      lines.push(`Drugs, alcohol or gambling: significant impact on daily life reported.`);
    }

    // Domain ratings grouped.
    const byRating = (label: string) =>
      domains.filter((domain) => text(`rating_${domain.id}`) === label).map((domain) => domain.label);
    const groups: [string, string][] = [
      ["Strengths", "A strength"],
      ["Going OK", "Going OK"],
      ["Some concern", "Some concern"],
      ["Significant concern", "Significant concern"],
      ["Not yet discussed", "Not discussed"],
    ];
    for (const [heading, label] of groups) {
      const items = byRating(label);
      if (items.length) lines.push(`${heading}: ${lower(items)}.`);
    }

    const priorities = list("priorities");
    if (priorities.length) lines.push(`Wants to focus on first: ${lower(priorities)}.`);

    const goal = text("goal_words");
    if (goal) lines.push(`In their words: "${goal.replace(/\s+/g, " ")}"`);

    const referrals = text("referrals");
    if (referrals) lines.push(`Referrals to follow up: ${referrals.replace(/\s+/g, " ").replace(/\.$/, "")}.`);

    const after = text("after_session");
    if (after) lines.push(`At the end of the session: ${after.toLowerCase()}.`);

    return lines;
  },
  signatures: [{ id: "coach", label: "Recovery Coach", required: true }],
};
