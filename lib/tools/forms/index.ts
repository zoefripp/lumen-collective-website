import type { FormDef } from "../types";
import { act1GettingUnstuck } from "./act-1-getting-unstuck";
import { act2DroppingAnchor } from "./act-2-dropping-anchor";
import { act3Unhooking } from "./act-3-unhooking";
import { act4MakingRoom } from "./act-4-making-room";
import { act5NoticingSelf } from "./act-5-noticing-self";
import { act6ValuesAction } from "./act-6-values-action";
import { aboutMe } from "./about-me";
import { activityMood } from "./activity-mood";
import { breathingSpace } from "./breathing-space";
import { cognitiveDistortions } from "./cognitive-distortions";
import { copingWheel } from "./coping-wheel";
import { findingFlow } from "./finding-flow";
import { goodEnough } from "./good-enough";
import { journalling } from "./journalling";
import { limitingBeliefs } from "./limiting-beliefs";
import { myStrengths } from "./my-strengths";
import { procrastination } from "./procrastination";
import { selfCompassion } from "./self-compassion";
import { windowOfTolerance } from "./window-of-tolerance";
import { checkIn } from "./check-in";
import { circlesOfSupport } from "./circles-of-support";
import { copingToolbox } from "./coping-toolbox";
import { dailyRoutine } from "./daily-routine";
import { problemSolving } from "./problem-solving";
import { worryTree } from "./worry-tree";
import { firstSession } from "./first-session";
import { introAct } from "./intro-act";
import { introCbt } from "./intro-cbt";
import { ocdSupportPlan } from "./ocd-support-plan";
import { predictableSession } from "./predictable-session";
import { checkOut } from "./check-out";
import { goalsActionPlan } from "./goals-action-plan";
import { headsAssessment } from "./heads-assessment";
import { lifeAuditValues } from "./life-audit-values";
import { safetyWellnessPlan } from "./safety-wellness-plan";
import { smartGrow } from "./smart-grow";
import { thoughtRecord } from "./thought-record";
import { valuesBeliefsSession } from "./values-and-beliefs";
import { valuesBullseye } from "./values-bullseye";
import { wheelOfLife } from "./wheel-of-life";

// The forms menu, in order, under these headings.
const menu: [string, FormDef[]][] = [
  ["Getting started", [firstSession, headsAssessment, aboutMe]],
  ["Every session", [checkIn, checkOut]],
  ["Goals and planning", [goalsActionPlan, smartGrow, safetyWellnessPlan, ocdSupportPlan]],
  ["Thoughts and feelings", [thoughtRecord, cognitiveDistortions, worryTree, journalling, windowOfTolerance, limitingBeliefs]],
  ["Values and strengths", [wheelOfLife, valuesBullseye, lifeAuditValues, myStrengths, findingFlow]],
  ["Everyday skills", [activityMood, problemSolving, procrastination, goodEnough, copingToolbox, copingWheel, dailyRoutine, circlesOfSupport]],
  ["Mindfulness practices", [breathingSpace, selfCompassion]],
  ["Session plans", [introAct, act1GettingUnstuck, act2DroppingAnchor, act3Unhooking, act4MakingRoom, act5NoticingSelf, act6ValuesAction, introCbt, valuesBeliefsSession, predictableSession]],
];

export const forms: FormDef[] = menu.flatMap(([group, items]) =>
  items.map((form) => ({ ...form, group: form.group ?? group }))
);

export function getForm(slug: string): FormDef | undefined {
  return forms.find((form) => form.slug === slug);
}
