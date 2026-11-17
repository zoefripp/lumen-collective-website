"use client";
import { useEffect, useMemo, useRef } from "react";
import { drawValuesWheel } from "@/lib/tools/values-wheel";
import type { Answers, ValuesField } from "@/lib/tools/types";

type Props = {
  field: ValuesField;
  answers: Answers;
  onChange: (id: string, value: string[]) => void;
};

// Values are listed by area. Tapping a value highlights it and the wheel of
// values fills in. A value that appears in two areas (such as Empathy) is
// one choice and counts towards both.
export default function ValuesPicker({ field, answers, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const chosenList = useMemo(() => {
    const value = answers[field.id];
    return Array.isArray(value) ? value : [];
  }, [answers, field.id]);
  const chosen = useMemo(() => new Set(chosenList), [chosenList]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const width = canvas.getBoundingClientRect().width;
      if (!width) return;
      const ratio = window.devicePixelRatio || 1;
      const size = Math.round(width * ratio);
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (context) drawValuesWheel(context, size, field, chosen);
    };
    draw();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [field, chosen]);

  const toggle = (value: string) => {
    const next = chosen.has(value) ? chosenList.filter((item) => item !== value) : [...chosenList, value];
    onChange(field.id, next);
  };

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
      <div className="sticky top-0 z-10 -mx-6 mb-6 bg-white px-6 pb-3 pt-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:mb-0 lg:self-start lg:px-0">
        <canvas
          ref={canvasRef}
          role="img"
          aria-label={`Wheel of values, ${chosenList.length} values chosen`}
          className="mx-auto block aspect-square w-full max-w-[380px] lg:max-w-none"
        />
        <p className="mt-2 text-center text-sm font-medium text-muted" aria-live="polite">
          {chosenList.length === 0
            ? "Tap values in the lists to fill in your wheel."
            : `${chosenList.length} value${chosenList.length === 1 ? "" : "s"} chosen`}
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {field.categories.map((category) => (
          <div key={category.name}>
            <div className="flex items-baseline justify-between gap-3">
              <h3 className="text-lg font-semibold text-charcoal">{category.name}</h3>
              <span className="text-xs font-semibold uppercase tracking-wide text-teal">
                {field.segments[category.segment].label}
              </span>
            </div>
            <p className="mb-3 text-sm text-muted">{category.goal}</p>
            <div className="flex flex-wrap gap-2" role="group" aria-label={category.name}>
              {category.values.map((value) => {
                const selected = chosen.has(value);
                return (
                  <button
                    key={value}
                    type="button"
                    role="checkbox"
                    aria-checked={selected}
                    onClick={() => toggle(value)}
                    className={`min-h-[2.75rem] rounded-full border-2 px-4 py-1.5 text-base font-medium transition-colors ${
                      selected
                        ? "border-[#41647a] bg-[#41647a] text-white"
                        : "border-gray-300 bg-white text-charcoal"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
