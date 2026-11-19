"use client";
import { useState } from "react";
import type { AnswerValue, Answers, FunnelField } from "@/lib/tools/types";
import {
  chosenAt,
  customItems,
  customKey,
  funnelSteps,
  kindKey,
  kinds as readKinds,
  stageKey,
  stepKey,
} from "@/lib/tools/funnel";

type Props = {
  field: FunnelField;
  answers: Answers;
  onChange: (id: string, value: AnswerValue) => void;
};

const chip = (selected: boolean) =>
  `min-h-[2.75rem] rounded-full border-2 px-4 py-1.5 text-base font-medium transition-colors ${
    selected ? "border-teal bg-teal text-white" : "border-gray-300 bg-white text-charcoal"
  }`;

// Choose about 20, then narrow down stage by stage, with an optional sorting
// step along the way. Each stage only offers what was kept at the stage before.
export default function FunnelPicker({ field, answers, onChange }: Props) {
  const steps = funnelSteps(field);
  const rawStep = answers[stepKey(field)];
  const stepIndex = typeof rawStep === "number" ? Math.min(rawStep, steps.length - 1) : 0;
  const step = steps[stepIndex];
  const [custom, setCustom] = useState("");
  const kindMap = readKinds(answers, field);
  const finalStage = field.stages.length - 1;

  const goTo = (index: number) => {
    onChange(stepKey(field), index);
    if (typeof window !== "undefined") {
      document.getElementById(`q_${field.id}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  // Going back clears later stages so every stage stays a subset of the one before.
  const back = () => {
    const previous = stepIndex - 1;
    if (previous < 0) return;
    const target = steps[previous];
    if (target.kind === "pick") {
      for (let stage = target.stage + 1; stage < field.stages.length; stage++) onChange(stageKey(field, stage), []);
    }
    goTo(previous);
  };

  const progress = (
    <ol className="mb-5 flex flex-wrap items-center gap-2 text-sm font-semibold">
      {steps.map((item, index) => {
        const label =
          item.kind === "pick" ? String(field.stages[item.stage]) : item.kind === "classify" ? "Sort" : "Done";
        const state = index < stepIndex ? "done" : index === stepIndex ? "now" : "later";
        return (
          <li key={index} className="flex items-center gap-2">
            {index > 0 && <span className="text-gray-300" aria-hidden>→</span>}
            <span
              className={`rounded-full px-3 py-1 ${
                state === "now"
                  ? "bg-teal text-white"
                  : state === "done"
                    ? "bg-teal/15 text-teal"
                    : "bg-gray-100 text-muted"
              }`}
              aria-current={state === "now" ? "step" : undefined}
            >
              {label}
            </span>
          </li>
        );
      })}
    </ol>
  );

  // ---- Pick step -----------------------------------------------------------
  if (step.kind === "pick") {
    const stage = step.stage;
    const target = field.stages[stage];
    const selected = chosenAt(answers, field, stage);
    const pool =
      stage === 0
        ? null
        : chosenAt(answers, field, stage - 1);
    const full = selected.length >= target;
    const toggle = (item: string) => {
      if (selected.includes(item)) onChange(stageKey(field, stage), selected.filter((value) => value !== item));
      else if (!full) onChange(stageKey(field, stage), [...selected, item]);
    };
    const addCustom = () => {
      const value = custom.trim();
      if (!value) return;
      const existing = customItems(answers, field);
      if (!existing.includes(value)) onChange(customKey(field), [...existing, value]);
      if (!selected.includes(value) && !full) onChange(stageKey(field, stage), [...selected, value]);
      setCustom("");
    };
    const canContinue = selected.length > 0;
    const instruction =
      stage === 0
        ? `Tap up to ${target} ${field.noun} that feel most true for you. Don't overthink it.`
        : `Now narrow it down: keep the ${target} that matter most.`;

    return (
      <div>
        {progress}
        <p className="mb-1 text-lg font-semibold text-charcoal">{instruction}</p>
        <p className="mb-4 text-sm font-medium text-muted" aria-live="polite">
          {selected.length} of {target} chosen{full ? ". That's the most for this step; tap one to swap it out." : ""}
        </p>

        {pool ? (
          <div className="flex flex-wrap gap-2" role="group" aria-label={`Choose ${target}`}>
            {pool.map((item) => (
              <button
                key={item}
                type="button"
                role="checkbox"
                aria-checked={selected.includes(item)}
                onClick={() => toggle(item)}
                className={chip(selected.includes(item))}
              >
                {item}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {[...field.groups, ...(customItems(answers, field).length ? [{ label: "Added by me", items: customItems(answers, field) }] : [])].map(
              (group, groupIndex) => (
                <div key={group.label ?? groupIndex}>
                  {group.label && <h3 className="mb-2 font-semibold text-charcoal">{group.label}</h3>}
                  <div className="flex flex-wrap gap-2" role="group" aria-label={group.label ?? field.label}>
                    {group.items.map((item) => (
                      <button
                        key={item}
                        type="button"
                        role="checkbox"
                        aria-checked={selected.includes(item)}
                        onClick={() => toggle(item)}
                        className={chip(selected.includes(item))}
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                </div>
              )
            )}
            {field.allowCustom && (
              <div className="flex gap-2">
                <input
                  aria-label={`Add your own ${field.noun}`}
                  placeholder={`Add your own`}
                  value={custom}
                  onChange={(event) => setCustom(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      addCustom();
                    }
                  }}
                  className="min-w-0 flex-1 rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-charcoal focus:border-teal focus:outline-none"
                />
                <button
                  type="button"
                  onClick={addCustom}
                  className="rounded-xl border-2 border-teal px-5 font-semibold text-teal"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        )}

        <div className="mt-6 flex items-center justify-between gap-3">
          {stepIndex > 0 ? (
            <button type="button" onClick={back} className="px-2 py-3 font-medium text-teal">
              ← Back
            </button>
          ) : (
            <span />
          )}
          <button
            type="button"
            onClick={() => goTo(stepIndex + 1)}
            disabled={!canContinue}
            className="rounded-xl bg-teal px-6 py-3 font-semibold text-white disabled:opacity-40"
          >
            {stage === finalStage
              ? "Finish"
              : steps[stepIndex + 1].kind === "classify"
                ? "Next: sort them"
                : `Next: narrow to ${field.stages[stage + 1]}`}
          </button>
        </div>
      </div>
    );
  }

  // ---- Sorting step --------------------------------------------------------
  if (step.kind === "classify" && field.classify) {
    const classify = field.classify;
    const items = chosenAt(answers, field, classify.afterStage);
    const setKind = (item: string, choice: number) => {
      const next = { ...kindMap, [item]: choice };
      onChange(
        kindKey(field),
        Object.entries(next).map(([key, value]) => `${key}=${value}`)
      );
    };
    return (
      <div>
        {progress}
        <p className="mb-1 text-lg font-semibold text-charcoal">{classify.title}</p>
        <p className="mb-4 text-muted">{classify.question}</p>
        <div className="flex flex-col gap-3">
          {items.map((item) => (
            <div key={item} className="flex flex-col gap-2 rounded-xl border border-gray-200 bg-white p-3 sm:flex-row sm:items-center">
              <span className="flex-1 font-semibold text-charcoal">{item}</span>
              <div className="flex gap-2" role="radiogroup" aria-label={item}>
                {classify.choices.map((choice, index) => (
                  <button
                    key={choice}
                    type="button"
                    role="radio"
                    aria-checked={kindMap[item] === index}
                    onClick={() => setKind(item, index)}
                    className={`rounded-full border-2 px-4 py-2 text-sm font-medium ${
                      kindMap[item] === index ? "border-teal bg-teal text-white" : "border-gray-300 bg-white text-charcoal"
                    }`}
                  >
                    {choice}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 flex items-center justify-between gap-3">
          <button type="button" onClick={back} className="px-2 py-3 font-medium text-teal">
            ← Back
          </button>
          <button type="button" onClick={() => goTo(stepIndex + 1)} className="rounded-xl bg-teal px-6 py-3 font-semibold text-white">
            Next: narrow to {field.stages[classify.afterStage + 1]}
          </button>
        </div>
      </div>
    );
  }

  // ---- Done ----------------------------------------------------------------
  const top = chosenAt(answers, field, finalStage);
  return (
    <div>
      {progress}
      <p className="mb-3 text-lg font-semibold text-charcoal">
        Your top {top.length} {field.noun}
      </p>
      <ol className="mb-5 flex flex-col gap-2">
        {top.map((item, index) => (
          <li key={item} className="flex items-center gap-3 rounded-xl bg-teal/10 px-4 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-teal font-semibold text-white">
              {index + 1}
            </span>
            <span className="text-lg font-semibold text-charcoal">{item}</span>
            {field.classify && kindMap[item] !== undefined && (
              <span className="ml-auto text-sm text-muted">{field.classify.short[kindMap[item]]}</span>
            )}
          </li>
        ))}
      </ol>
      {field.stages.slice(0, -1).map((target, stage) => {
        const items = chosenAt(answers, field, stage);
        if (!items.length) return null;
        return (
          <p key={stage} className="mb-1 text-sm text-muted">
            <span className="font-semibold text-charcoal">{stage === 0 ? "First choices" : `Top ${target}`}:</span>{" "}
            {items.join(", ")}
          </p>
        );
      })}
      <div className="mt-5">
        <button type="button" onClick={back} className="px-2 py-3 font-medium text-teal">
          ← Back to change my choices
        </button>
      </div>
    </div>
  );
}
