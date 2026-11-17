"use client";
import { useRef } from "react";
import {
  WHEEL_COLOURS,
  bullseyeTint,
  markerPoint,
  ringToValue,
  valueToRing,
  WHEEL_SIZE,
  cellPath,
  geometry,
  hitTest,
  labelLines,
  labelPlacement,
  ringRadius,
} from "@/lib/tools/wheel";
import type { Answers, WheelField } from "@/lib/tools/types";

type Props = {
  field: WheelField;
  answers: Answers;
  onChange: (areaId: string, value: number | undefined) => void;
};

// Tap or drag along a slice to mark it. The centre is 1, the outer edge is the
// maximum. Dragging stays on the slice where the finger or Pencil first landed.
export default function WheelInput({ field, answers, onChange }: Props) {
  const svgRef = useRef<SVGSVGElement>(null);
  const activeSlice = useRef<number | null>(null);
  const g = geometry();
  const count = field.areas.length;
  const max = field.max;
  const variant = field.variant ?? "wheel";

  const valueOf = (index: number) => {
    const value = answers[field.areas[index].id];
    return typeof value === "number" ? value : undefined;
  };

  const locate = (event: React.PointerEvent<SVGSVGElement>) => {
    const svg = svgRef.current;
    if (!svg) return null;
    const rect = svg.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width) * WHEEL_SIZE;
    const y = ((event.clientY - rect.top) / rect.height) * WHEEL_SIZE;
    return hitTest(g, count, max, x, y, variant);
  };

  const down = (event: React.PointerEvent<SVGSVGElement>) => {
    const hit = locate(event);
    if (!hit) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    activeSlice.current = hit.index;
    onChange(field.areas[hit.index].id, hit.value);
  };

  const move = (event: React.PointerEvent<SVGSVGElement>) => {
    if (activeSlice.current === null) return;
    const hit = locate(event);
    if (!hit || hit.index !== activeSlice.current) return;
    event.preventDefault();
    if (valueOf(hit.index) !== hit.value) onChange(field.areas[hit.index].id, hit.value);
  };

  const up = () => {
    activeSlice.current = null;
  };

  const fontSize = 15;
  const lineHeight = fontSize * 1.25;

  return (
    <div>
      <svg
        ref={svgRef}
        viewBox={`0 0 ${WHEEL_SIZE} ${WHEEL_SIZE}`}
        className="mx-auto block w-full max-w-[600px] select-none"
        style={{ touchAction: "none" }}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={up}
        role="img"
        aria-label={`${field.label}. Use the list below the wheel to hear or change each score.`}
      >
        {field.areas.map((area, index) => {
          const colour = WHEEL_COLOURS[index % WHEEL_COLOURS.length];
          const value = valueOf(index) ?? 0;
          return (
            <g key={area.id}>
              {Array.from({ length: max }, (_, ring) => {
                const chosen = variant === "bullseye" && value > 0 && ring + 1 === valueToRing(value, max, variant);
                return (
                  <path
                    key={ring}
                    d={cellPath(g, index, count, ring + 1, max)}
                    fill={variant === "bullseye" && !chosen ? "#1a6b6b" : colour}
                    fillOpacity={
                      variant === "bullseye"
                        ? chosen
                          ? 0.55
                          : bullseyeTint(ring + 1, max)
                        : ring + 1 <= value
                          ? 0.9
                          : 0.07
                    }
                    stroke="rgba(0,0,0,0.12)"
                    strokeWidth={1}
                  />
                );
              })}
            </g>
          );
        })}
        <circle cx={g.c} cy={g.c} r={g.R} fill="none" stroke="rgba(0,0,0,0.35)" strokeWidth={1.5} />
        {variant === "bullseye" &&
          field.areas.map((area, index) => {
            const value = valueOf(index);
            if (!value) return null;
            const [x, y] = markerPoint(index, count, value, max);
            return (
              <circle
                key={area.id}
                cx={x}
                cy={y}
                r={13}
                fill={WHEEL_COLOURS[index % WHEEL_COLOURS.length]}
                stroke="#ffffff"
                strokeWidth={3}
                style={{ pointerEvents: "none" }}
              />
            );
          })}
        {(variant === "bullseye"
          ? Array.from({ length: max }, (_, index) => index + 1)
          : [2, 4, 6, 8, 10].filter((ring) => ring <= max)
        ).map((ring) => (
          <text
            key={ring}
            x={g.c + 4}
            y={g.c - ringRadius(g, ring, max) + 13}
            fontSize={11}
            fill="rgba(0,0,0,0.5)"
            style={{ pointerEvents: "none" }}
          >
            {variant === "bullseye" ? ringToValue(ring, max, variant) : ring}
          </text>
        ))}
        {field.areas.map((area, index) => {
          const place = labelPlacement(g, index, count);
          const value = valueOf(index);
          const lines = [...labelLines(area.label), value ? `${value}/${max}` : "–"];
          const blockHeight = lines.length * lineHeight;
          const firstBaseline =
            place.shift === "up"
              ? place.y - blockHeight + lineHeight
              : place.shift === "down"
                ? place.y + lineHeight
                : place.y - blockHeight / 2 + lineHeight * 0.85;
          return (
            <text
              key={area.id}
              x={place.x}
              y={firstBaseline}
              textAnchor={place.anchor}
              fontSize={fontSize}
              fill="#1a1a1a"
              style={{ pointerEvents: "none" }}
            >
              {lines.map((line, lineIndex) => {
                const isValue = lineIndex === lines.length - 1;
                return (
                  <tspan
                    key={lineIndex}
                    x={place.x}
                    dy={lineIndex === 0 ? 0 : lineHeight}
                    fontWeight={isValue ? 700 : 500}
                    fill={isValue ? WHEEL_COLOURS[index % WHEEL_COLOURS.length] : "#1a1a1a"}
                  >
                    {line}
                  </tspan>
                );
              })}
            </text>
          );
        })}
      </svg>

      {(field.minLabel || field.maxLabel) && (
        <p className="mt-2 text-center text-sm text-muted">
          {[field.minLabel && `1 = ${field.minLabel}`, field.maxLabel && `${max} = ${field.maxLabel}`]
            .filter(Boolean)
            .join(" · ")}
        </p>
      )}
      <div className="mt-6 grid gap-2 lg:grid-cols-2">
        {field.areas.map((area, index) => {
          const value = valueOf(index);
          const colour = WHEEL_COLOURS[index % WHEEL_COLOURS.length];
          const set = (next: number | undefined) => onChange(area.id, next);
          return (
            <div key={area.id} className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-3 py-2">
              <span className="h-3 w-3 shrink-0 rounded-full" style={{ background: colour }} aria-hidden />
              <span className="flex-1 text-sm font-medium text-charcoal">{area.label}</span>
              <button
                type="button"
                aria-label={`Lower ${area.label}`}
                onClick={() => set(value === undefined ? 1 : Math.max(1, value - 1))}
                className="h-9 w-9 rounded-lg border-2 border-gray-300 text-lg font-semibold text-charcoal"
              >
                −
              </button>
              <span className="w-12 text-center font-semibold text-charcoal" aria-live="polite">
                {value ?? "–"}
                <span className="text-xs font-normal text-muted">/{max}</span>
              </span>
              <button
                type="button"
                aria-label={`Raise ${area.label}`}
                onClick={() => set(value === undefined ? 1 : Math.min(max, value + 1))}
                className="h-9 w-9 rounded-lg border-2 border-gray-300 text-lg font-semibold text-charcoal"
              >
                +
              </button>
              <button
                type="button"
                aria-label={`Clear ${area.label}`}
                onClick={() => set(undefined)}
                disabled={value === undefined}
                className="px-1 text-xs font-medium text-teal disabled:text-gray-300"
              >
                Clear
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
