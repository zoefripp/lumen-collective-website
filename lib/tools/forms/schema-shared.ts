// The 18 early maladaptive schemas (Young), grouped into five domains, with
// plain-language names and descriptions. The quiz statements are Lumen
// Collective's own wording, not the Young Schema Questionnaire.

export type Schema = {
  id: string;
  name: string; // plain-language name
  formal: string; // schema therapy name
  meaning: string;
  statements: [string, string];
  beliefs: string[]; // common beliefs that go with this schema
  balanced: string; // a more balanced thought to try
};

export const SCHEMA_DOMAINS: { name: string; intro: string; schemas: Schema[] }[] = [
  {
    name: "Connection and belonging",
    intro: "Feeling safe, loved and accepted by others.",
    schemas: [
      {
        id: "abandonment",
        name: "People will leave me",
        formal: "Abandonment / Instability",
        meaning: "Expecting the people you're close to will leave, die or let you down, so relationships feel unstable.",
        statements: ["I worry that the people I'm close to will leave me.", "I hold on tight to people because I'm scared of losing them."],
        beliefs: ["People I love will leave me.", "I'll end up alone."],
        balanced: "People may come and go, but I can build connections that last, and I can cope.",
      },
      {
        id: "mistrust",
        name: "People will hurt me",
        formal: "Mistrust / Abuse",
        meaning: "Expecting others to hurt, use, lie to or take advantage of you.",
        statements: ["I expect people to hurt me or take advantage of me.", "I find it hard to trust why people are being nice to me."],
        beliefs: ["People will hurt or use me if I let my guard down.", "I can't trust anyone."],
        balanced: "Some people have hurt me, but not everyone will. I can build trust slowly and safely.",
      },
      {
        id: "deprivation",
        name: "My needs won't be met",
        formal: "Emotional Deprivation",
        meaning: "Believing no one will really understand, care for or support you emotionally.",
        statements: ["I feel that no one really understands me or cares about how I feel.", "I don't expect anyone to be there for me emotionally."],
        beliefs: ["No one will ever really understand me.", "My needs won't be met."],
        balanced: "My needs matter, and I can ask for what I need from people who care.",
      },
      {
        id: "defectiveness",
        name: "Something is wrong with me",
        formal: "Defectiveness / Shame",
        meaning: "Feeling flawed, bad or unlovable, and that people would reject you if they really knew you.",
        statements: ["If people really knew me, they wouldn't like me.", "I feel there's something wrong with me."],
        beliefs: ["I'm not good enough.", "If people really knew me, they'd reject me."],
        balanced: "I have flaws, like everyone, and I'm still worthy of love and respect.",
      },
      {
        id: "isolation",
        name: "I don't fit in",
        formal: "Social Isolation / Alienation",
        meaning: "Feeling different from others and not part of any group or community.",
        statements: ["I feel different from other people, like I don't belong.", "I feel alone, even when I'm with others."],
        beliefs: ["I don't belong anywhere.", "I'm different from everyone else."],
        balanced: "Being different doesn't mean I'm alone. There are people and places where I can belong.",
      },
    ],
  },
  {
    name: "Managing on my own",
    intro: "Believing you can cope, be your own person and do well.",
    schemas: [
      {
        id: "dependence",
        name: "I can't cope on my own",
        formal: "Dependence / Incompetence",
        meaning: "Feeling unable to handle everyday life without a lot of help from others.",
        statements: ["I don't trust myself to handle everyday things on my own.", "I need other people to help me make decisions."],
        beliefs: ["I can't cope on my own.", "I need others to tell me what to do."],
        balanced: "I can handle more than I think, and it's okay to ask for help when I need it.",
      },
      {
        id: "vulnerability",
        name: "Something bad will happen",
        formal: "Vulnerability to Harm or Illness",
        meaning: "Fearing disaster is about to strike: illness, accidents, crime or losing everything.",
        statements: ["I worry that something terrible is about to happen.", "I worry a lot about illness, accidents or losing everything."],
        beliefs: ["Something terrible is about to happen.", "The world isn't safe."],
        balanced: "Bad things can happen, but most of the time I'm safe, and I can cope with what comes.",
      },
      {
        id: "enmeshment",
        name: "I don't know who I am apart from others",
        formal: "Enmeshment / Undeveloped Self",
        meaning: "Being so close to someone (often a parent or partner) that it's hard to have your own identity or life.",
        statements: ["I find it hard to know who I am apart from someone close to me.", "I feel I can't have a life separate from my family or partner."],
        beliefs: ["I don't know who I am without them.", "I can't have my own life."],
        balanced: "I can stay close to people I love and still be my own person.",
      },
      {
        id: "failure",
        name: "I'll fail",
        formal: "Failure",
        meaning: "Believing you're less capable than others and will fail at things that matter.",
        statements: ["I feel I'm not as capable as other people.", "I expect to fail at most things I try."],
        beliefs: ["I'm a failure.", "Everyone else is more capable than me."],
        balanced: "I have strengths and I can learn. Everyone struggles with some things.",
      },
    ],
  },
  {
    name: "Limits and self-control",
    intro: "Respecting others' needs and managing your own impulses.",
    schemas: [
      {
        id: "entitlement",
        name: "Rules don't apply to me",
        formal: "Entitlement / Grandiosity",
        meaning: "Feeling you should be able to do or have what you want, regardless of the cost to others.",
        statements: ["I find it hard to accept no when I want something.", "I feel rules shouldn't always apply to me."],
        beliefs: ["I should be able to have what I want.", "Rules are for other people."],
        balanced: "Other people's needs matter too, and fair limits help my relationships.",
      },
      {
        id: "selfcontrol",
        name: "I can't stick at hard things",
        formal: "Insufficient Self-Control / Self-Discipline",
        meaning: "Struggling to tolerate boredom or frustration, or to control impulses and emotions.",
        statements: ["I struggle to stick with things that are boring or hard.", "I find it hard to control my impulses or emotions."],
        beliefs: ["I can't put up with discomfort.", "I'll do it later."],
        balanced: "I can handle some discomfort to get to what matters to me, one small step at a time.",
      },
    ],
  },
  {
    name: "Putting others first",
    intro: "Focusing on others' needs and wishes at the expense of your own.",
    schemas: [
      {
        id: "subjugation",
        name: "I have to give in",
        formal: "Subjugation",
        meaning: "Letting others take control and hiding your own needs or feelings to avoid anger or rejection.",
        statements: ["I go along with what others want to avoid conflict.", "I feel I have to put my needs aside or people will get angry."],
        beliefs: ["My needs don't matter.", "If I say what I want, people will get angry."],
        balanced: "My needs and opinions matter, and I can say what I want respectfully.",
      },
      {
        id: "selfsacrifice",
        name: "Others come first",
        formal: "Self-Sacrifice",
        meaning: "Always meeting others' needs before your own, and feeling guilty when you look after yourself.",
        statements: ["I look after everyone else before myself.", "I feel guilty when I put my own needs first."],
        beliefs: ["Other people's needs come first.", "It's selfish to look after myself."],
        balanced: "Looking after myself is not selfish. I can care for others and for me.",
      },
      {
        id: "approval",
        name: "I need others' approval",
        formal: "Approval-Seeking / Recognition-Seeking",
        meaning: "Basing your sense of worth on approval, attention or recognition from others.",
        statements: ["I need other people's approval to feel okay about myself.", "I change how I act depending on what others want."],
        beliefs: ["I'm only worth something if people like me.", "I need to be noticed to matter."],
        balanced: "My worth doesn't depend on other people's approval. I matter as I am.",
      },
    ],
  },
  {
    name: "Holding back and high standards",
    intro: "Holding back feelings, staying on guard, and very high expectations.",
    schemas: [
      {
        id: "negativity",
        name: "Things will go wrong",
        formal: "Negativity / Pessimism",
        meaning: "Focusing on what's going wrong or could go wrong, and expecting the worst.",
        statements: ["I tend to focus on what could go wrong.", "Even when things go well, I expect them to fall apart."],
        beliefs: ["Things will go wrong.", "Don't get your hopes up."],
        balanced: "Some things go wrong and many things go right. I can notice the good too.",
      },
      {
        id: "inhibition",
        name: "I keep my feelings in",
        formal: "Emotional Inhibition",
        meaning: "Holding back feelings and spontaneity to avoid embarrassment, disapproval or losing control.",
        statements: ["I keep my feelings to myself.", "I find it hard to show warmth, anger or excitement."],
        beliefs: ["Showing my feelings is dangerous or embarrassing.", "I must stay in control."],
        balanced: "My feelings are okay, and I can share them with people I trust.",
      },
      {
        id: "standards",
        name: "I must be perfect",
        formal: "Unrelenting Standards / Hypercriticalness",
        meaning: "Believing you must meet very high standards, often at the cost of rest, fun and health.",
        statements: ["I must do everything perfectly.", "I'm rarely satisfied with what I achieve."],
        beliefs: ["It has to be perfect.", "Whatever I do isn't good enough."],
        balanced: "Good enough is often good enough. I can rest and still be worthwhile.",
      },
      {
        id: "punitiveness",
        name: "Mistakes must be punished",
        formal: "Punitiveness",
        meaning: "Believing people, including you, should be harshly punished for mistakes.",
        statements: ["People, including me, deserve to be punished for their mistakes.", "I'm very hard on myself when I get something wrong."],
        beliefs: ["Mistakes deserve punishment.", "I don't deserve forgiveness."],
        balanced: "Everyone makes mistakes. I can learn from them and treat myself with kindness.",
      },
    ],
  },
];

export const ALL_SCHEMAS = SCHEMA_DOMAINS.flatMap((domain) => domain.schemas);

export const schemaLabel = (schema: Schema) => `${schema.name} (${schema.formal})`;

// ---- Scoring -----------------------------------------------------------------

export const statementId = (schemaId: string, index: number) => `sq_${schemaId}_${index}`;

export type SchemaResult = { schema: Schema; domain: string; score: number; band: "strong" | "some" | "low" };

// Score each schema from its two statements (2 to 10). Unanswered schemas are left out.
export function schemaResults(answers: Record<string, unknown>): SchemaResult[] {
  const results: SchemaResult[] = [];
  for (const domain of SCHEMA_DOMAINS) {
    for (const schema of domain.schemas) {
      const values = [0, 1].map((index) => answers[statementId(schema.id, index)]);
      if (!values.every((value) => typeof value === "number")) continue;
      const score = (values as number[]).reduce((sum, value) => sum + value, 0);
      results.push({ schema, domain: domain.name, score, band: score >= 8 ? "strong" : score >= 6 ? "some" : "low" });
    }
  }
  return results;
}

// The schemas to explain in cards: strong and sometimes, or the top three if none.
export function highlightedSchemas(results: SchemaResult[]): SchemaResult[] {
  const ranked = [...results].sort((a, b) => b.score - a.score);
  const notable = ranked.filter((item) => item.band !== "low");
  return notable.length ? notable : ranked.slice(0, 3);
}
