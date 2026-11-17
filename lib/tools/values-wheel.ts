// Drawing for the wheel of values (Life Audit - Values).
//
// Three rings, like the Lumen template: the outer ring names the four
// higher-order groups, the middle ring names each value area, and the inner
// circle fills from the centre as the participant chooses values in that
// area. One canvas renderer is used both on screen and for the PDF image.

export type ValuesWheelData = {
  groups: { label: string }[];
  segments: { label: string; group: number }[];
  categories: { name: string; goal: string; values: string[]; segment: number }[];
};

export const VALUES_COLOURS = {
  outer: "#41647a",
  middle: "#79a7a4",
  fill: "#79a7a4",
  line: "#2b2b2b",
};

// Distinct values in each wheel segment (a segment can hold two categories).
export function segmentValues(data: ValuesWheelData): string[][] {
  return data.segments.map((_, index) => {
    const names = new Set<string>();
    for (const category of data.categories) {
      if (category.segment === index) category.values.forEach((value) => names.add(value));
    }
    return Array.from(names);
  });
}

export function segmentCounts(data: ValuesWheelData, chosen: Set<string>) {
  return segmentValues(data).map((values) => ({
    chosen: values.filter((value) => chosen.has(value)).length,
    total: values.length,
  }));
}

// Text that follows a circle, reading left to right on both halves.
function arcText(
  context: CanvasRenderingContext2D,
  text: string,
  cx: number,
  cy: number,
  radius: number,
  centre: number,
  spacing: number
) {
  const chars = Array.from(text);
  const widths = chars.map((char) => context.measureText(char).width + spacing);
  const total = widths.reduce((sum, width) => sum + width, 0) - spacing;
  const bottom = Math.sin(centre) > 0.15;
  let angle = bottom ? centre + total / 2 / radius : centre - total / 2 / radius;
  context.textAlign = "center";
  context.textBaseline = "middle";
  chars.forEach((char, index) => {
    const step = widths[index] / radius;
    const mid = bottom ? angle - (widths[index] - spacing) / 2 / radius : angle + (widths[index] - spacing) / 2 / radius;
    context.save();
    context.translate(cx + radius * Math.cos(mid), cy + radius * Math.sin(mid));
    context.rotate(bottom ? mid - Math.PI / 2 : mid + Math.PI / 2);
    context.fillText(char, 0, 0);
    context.restore();
    angle = bottom ? angle - step : angle + step;
  });
}

export function drawValuesWheel(
  context: CanvasRenderingContext2D,
  size: number,
  data: ValuesWheelData,
  chosen: Set<string>,
  background = "#ffffff"
) {
  const c = size / 2;
  const R3 = size * 0.49; // outside edge
  const R2 = size * 0.405; // outer ring inner edge
  const R1 = size * 0.325; // middle ring inner edge
  const hub = size * 0.035;
  const count = data.segments.length;
  const step = (Math.PI * 2) / count;
  const start = (index: number) => -Math.PI / 2 + index * step;
  const counts = segmentCounts(data, chosen);

  context.clearRect(0, 0, size, size);
  context.fillStyle = background;
  context.fillRect(0, 0, size, size);

  // Outer ring.
  context.beginPath();
  context.arc(c, c, R3, 0, Math.PI * 2);
  context.arc(c, c, R2, 0, Math.PI * 2, true);
  context.fillStyle = VALUES_COLOURS.outer;
  context.fill();

  // Middle ring.
  context.beginPath();
  context.arc(c, c, R2, 0, Math.PI * 2);
  context.arc(c, c, R1, 0, Math.PI * 2, true);
  context.fillStyle = VALUES_COLOURS.middle;
  context.fill();

  // Inner fills: from the centre out, by share of values chosen.
  counts.forEach((segment, index) => {
    if (!segment.chosen) return;
    const reach = hub + (R1 - hub) * (segment.chosen / segment.total);
    context.beginPath();
    context.moveTo(c, c);
    context.arc(c, c, reach, start(index), start(index + 1));
    context.closePath();
    context.fillStyle = VALUES_COLOURS.fill;
    context.globalAlpha = 0.85;
    context.fill();
    context.globalAlpha = 1;
  });

  // Ring outlines and the dashed inner edge.
  context.lineWidth = size / 400;
  context.strokeStyle = VALUES_COLOURS.line;
  for (const radius of [R3, R2]) {
    context.beginPath();
    context.arc(c, c, radius, 0, Math.PI * 2);
    context.stroke();
  }
  context.setLineDash([size / 90, size / 110]);
  context.beginPath();
  context.arc(c, c, R1, 0, Math.PI * 2);
  context.stroke();
  context.setLineDash([]);

  // Segment lines through the inner circle and middle ring.
  context.lineWidth = size / 600;
  for (let index = 0; index < count; index++) {
    const angle = start(index);
    context.beginPath();
    context.moveTo(c, c);
    context.lineTo(c + R2 * Math.cos(angle), c + R2 * Math.sin(angle));
    context.stroke();
  }
  // Group boundaries across the outer ring.
  context.lineWidth = size / 300;
  data.segments.forEach((segment, index) => {
    const previous = data.segments[(index + count - 1) % count];
    if (previous.group === segment.group) return;
    const angle = start(index);
    context.beginPath();
    context.moveTo(c + R2 * Math.cos(angle), c + R2 * Math.sin(angle));
    context.lineTo(c + R3 * Math.cos(angle), c + R3 * Math.sin(angle));
    context.stroke();
  });

  // Centre hub.
  context.beginPath();
  context.arc(c, c, hub * 0.5, 0, Math.PI * 2);
  context.fillStyle = VALUES_COLOURS.line;
  context.fill();

  // Group labels around the outer ring.
  context.fillStyle = "#ffffff";
  context.font = `600 ${size * 0.036}px Helvetica, Arial, sans-serif`;
  data.groups.forEach((group, groupIndex) => {
    const members = data.segments
      .map((segment, index) => ({ segment, index }))
      .filter((item) => item.segment.group === groupIndex);
    if (!members.length) return;
    const first = members[0].index;
    const last = members[members.length - 1].index;
    const centre = (start(first) + start(last + 1)) / 2;
    arcText(context, group.label.toUpperCase(), c, c, (R2 + R3) / 2, centre, size * 0.006);
  });

  // Segment labels around the middle ring.
  context.font = `600 ${size * 0.026}px Helvetica, Arial, sans-serif`;
  data.segments.forEach((segment, index) => {
    const centre = start(index) + step / 2;
    const label = segment.label.toUpperCase();
    // Long labels are made smaller so they stay inside their slice.
    const maxWidth = step * ((R1 + R2) / 2) * 0.86;
    let fontSize = size * 0.026;
    context.font = `600 ${fontSize}px Helvetica, Arial, sans-serif`;
    while (context.measureText(label).width + label.length * size * 0.003 > maxWidth && fontSize > size * 0.016) {
      fontSize -= size * 0.001;
      context.font = `600 ${fontSize}px Helvetica, Arial, sans-serif`;
    }
    arcText(context, label, c, c, (R1 + R2) / 2, centre, size * 0.003);
  });

  // Counts in the inner circle.
  counts.forEach((segment, index) => {
    const centre = start(index) + step / 2;
    const radius = R1 * 0.78;
    const x = c + radius * Math.cos(centre);
    const y = c + radius * Math.sin(centre);
    context.beginPath();
    context.arc(x, y, size * 0.032, 0, Math.PI * 2);
    context.fillStyle = segment.chosen ? VALUES_COLOURS.outer : "#ffffff";
    context.fill();
    context.lineWidth = size / 500;
    context.strokeStyle = VALUES_COLOURS.outer;
    context.stroke();
    context.fillStyle = segment.chosen ? "#ffffff" : VALUES_COLOURS.outer;
    context.font = `700 ${size * 0.03}px Helvetica, Arial, sans-serif`;
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(String(segment.chosen), x, y + size * 0.002);
  });
}

export function valuesWheelPng(data: ValuesWheelData, chosen: Set<string>, size = 1400): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return "";
  drawValuesWheel(context, size, data, chosen);
  return canvas.toDataURL("image/png");
}
