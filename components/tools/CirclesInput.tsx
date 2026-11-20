"use client";
import { useEffect, useMemo, useRef } from "react";
import { drawCircles, namesFrom } from "@/lib/tools/circles";
import type { Answers, CirclesField } from "@/lib/tools/types";

type Props = {
  field: CirclesField;
  answers: Answers;
  onChange: (id: string, value: string) => void;
};

export const ringId = (field: { id: string }, index: number) => `${field.id}_${index}`;

// Names typed into each ring appear on the circles diagram as they're added.
export default function CirclesInput({ field, answers, onChange }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const names = useMemo(
    () => field.rings.map((_, index) => namesFrom(answers[ringId(field, index)])),
    [answers, field]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      const width = canvas.getBoundingClientRect().width;
      if (!width) return;
      const size = Math.round(width * (window.devicePixelRatio || 1));
      canvas.width = size;
      canvas.height = size;
      const context = canvas.getContext("2d");
      if (context) drawCircles(context, size, field.rings, names);
    };
    draw();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [field.rings, names]);

  const inputClass =
    "w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-charcoal focus:border-teal focus:outline-none";

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-8">
      <canvas
        ref={canvasRef}
        role="img"
        aria-label="Circles of support diagram"
        className="mx-auto mb-6 block aspect-square w-full max-w-[420px] lg:sticky lg:top-4 lg:mb-0 lg:max-w-none"
      />
      <div className="flex flex-col gap-5">
        {field.rings.map((ring, index) => (
          <div key={ring.label}>
            <div className="mb-1 font-medium text-charcoal">{ring.label}</div>
            {ring.help && <div className="mb-2 text-sm text-muted">{ring.help}</div>}
            <textarea
              aria-label={ring.label}
              placeholder="One name per line"
              className={`${inputClass} min-h-[6rem]`}
              value={typeof answers[ringId(field, index)] === "string" ? (answers[ringId(field, index)] as string) : ""}
              onChange={(event) => onChange(ringId(field, index), event.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
