// Geometry and drawing for the Wheel of Life input.
// The same maths drives the on-screen SVG and the image drawn into the PDF.

export type WheelArea = { id: string; label: string };

export const WHEEL_COLOURS = [
  "#1a6b6b",
  "#3b8f86",
  "#6aa84f",
  "#c9a227",
  "#d9822b",
  "#c45c4a",
  "#b5487a",
  "#8a5fa8",
  "#4f6fb3",
  "#3a8fb7",
];

export const WHEEL_SIZE = 640; // view box units

type Geometry = { c: number; R: number; r0: number };

export function geometry(size = WHEEL_SIZE): Geometry {
  const R = size * 0.3;
  return { c: size / 2, R, r0: R * 0.06 };
}

const toRad = (deg: number) => (deg * Math.PI) / 180;

// Slice i starts at the top and runs clockwise.
function sliceAngles(index: number, count: number): [number, number] {
  const step = 360 / count;
  return [-90 + index * step, -90 + (index + 1) * step];
}

function point(g: Geometry, radius: number, angleDeg: number): [number, number] {
  return [g.c + radius * Math.cos(toRad(angleDeg)), g.c + radius * Math.sin(toRad(angleDeg))];
}

export function ringRadius(g: Geometry, ring: number, max: number): number {
  return g.r0 + ((g.R - g.r0) * ring) / max;
}

// SVG path for one ring cell: slice `index`, ring `ring` (1..max).
export function cellPath(g: Geometry, index: number, count: number, ring: number, max: number): string {
  const [a0, a1] = sliceAngles(index, count);
  const rIn = ringRadius(g, ring - 1, max);
  const rOut = ringRadius(g, ring, max);
  const [x1, y1] = point(g, rIn, a0);
  const [x2, y2] = point(g, rOut, a0);
  const [x3, y3] = point(g, rOut, a1);
  const [x4, y4] = point(g, rIn, a1);
  const f = (n: number) => n.toFixed(2);
  return [
    `M${f(x1)} ${f(y1)}`,
    `L${f(x2)} ${f(y2)}`,
    `A${f(rOut)} ${f(rOut)} 0 0 1 ${f(x3)} ${f(y3)}`,
    `L${f(x4)} ${f(y4)}`,
    `A${f(rIn)} ${f(rIn)} 0 0 0 ${f(x1)} ${f(y1)}`,
    "Z",
  ].join(" ");
}

// Splits a label into short lines so it fits beside the wheel.
export function labelLines(label: string, width = 13): string[] {
  const lines: string[] = [];
  let line = "";
  // Long hyphenated words break after the hyphen ("Self-" / "development").
  const words = label
    .split(" ")
    .flatMap((word) => (word.length > width && word.includes("-") ? word.replace(/-/g, "-\u0000").split("\u0000") : [word]));
  for (const word of words) {
    const candidate = line ? (line.endsWith("-") ? `${line}${word}` : `${line} ${word}`) : word;
    if (candidate.length > width && line) {
      lines.push(line);
      line = word;
    } else {
      line = candidate;
    }
  }
  if (line) lines.push(line);
  return lines;
}

export type LabelPlacement = {
  x: number;
  y: number;
  anchor: "start" | "middle" | "end";
  // How many line-heights to shift the block so it sits clear of the wheel.
  shift: "up" | "centre" | "down";
};

export function labelPlacement(g: Geometry, index: number, count: number): LabelPlacement {
  const [a0, a1] = sliceAngles(index, count);
  const mid = (a0 + a1) / 2;
  const [x, y] = point(g, g.R + 18, mid);
  const dx = x - g.c;
  const dy = y - g.c;
  const anchor = Math.abs(dx) < g.R * 0.2 ? "middle" : dx > 0 ? "start" : "end";
  const shift = dy < -g.R * 0.6 ? "up" : dy > g.R * 0.6 ? "down" : "centre";
  return { x, y, anchor, shift };
}

// Works out which slice and ring a tap at (x, y) in view box units hit.
export function hitTest(
  g: Geometry,
  count: number,
  max: number,
  x: number,
  y: number
): { index: number; value: number } | null {
  const dx = x - g.c;
  const dy = y - g.c;
  const distance = Math.hypot(dx, dy);
  if (distance > g.R * 1.1) return null;
  const value = Math.min(max, Math.max(1, Math.ceil(((distance - g.r0) / (g.R - g.r0)) * max)));
  let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90; // 0 at the top, clockwise
  if (angle < 0) angle += 360;
  const index = Math.min(count - 1, Math.floor(angle / (360 / count)));
  return { index, value };
}

// Draws the wheel onto a canvas, for the PDF.
export function paintWheel(
  context: CanvasRenderingContext2D,
  size: number,
  areas: WheelArea[],
  values: (number | undefined)[],
  max: number
) {
  const g = geometry(size);
  const count = areas.length;
  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  areas.forEach((_, index) => {
    const colour = WHEEL_COLOURS[index % WHEEL_COLOURS.length];
    const value = values[index] ?? 0;
    for (let ring = 1; ring <= max; ring++) {
      const path = new Path2D(cellPath(g, index, count, ring, max));
      context.globalAlpha = ring <= value ? 0.9 : 0.07;
      context.fillStyle = colour;
      context.fill(path);
      context.globalAlpha = 1;
      context.strokeStyle = "rgba(0,0,0,0.12)";
      context.lineWidth = size / 900;
      context.stroke(path);
    }
  });

  // Outer outline.
  context.beginPath();
  context.arc(g.c, g.c, g.R, 0, Math.PI * 2);
  context.strokeStyle = "rgba(0,0,0,0.35)";
  context.lineWidth = size / 450;
  context.stroke();

  const fontSize = size * 0.026;
  const lineHeight = fontSize * 1.25;
  areas.forEach((area, index) => {
    const place = labelPlacement(g, index, count);
    const value = values[index];
    const lines = [...labelLines(area.label), value ? `${value}/${max}` : "-"];
    const blockHeight = lines.length * lineHeight;
    let top =
      place.shift === "up"
        ? place.y - blockHeight + lineHeight * 0.3
        : place.shift === "down"
          ? place.y + lineHeight * 0.3
          : place.y - blockHeight / 2 + lineHeight * 0.4;
    context.textAlign = place.anchor === "middle" ? "center" : place.anchor === "start" ? "left" : "right";
    context.textBaseline = "top";
    lines.forEach((line, lineIndex) => {
      const isValue = lineIndex === lines.length - 1;
      context.font = `${isValue ? "bold " : ""}${fontSize}px Helvetica, Arial, sans-serif`;
      context.fillStyle = isValue ? WHEEL_COLOURS[index % WHEEL_COLOURS.length] : "#1a1a1a";
      context.fillText(line, place.x, top);
      top += lineHeight;
    });
  });
}

export function wheelPng(areas: WheelArea[], values: (number | undefined)[], max: number, size = 1200): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return "";
  paintWheel(context, size, areas, values, max);
  return canvas.toDataURL("image/png");
}
