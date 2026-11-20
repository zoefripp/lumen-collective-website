// Drawing for circles of support: "Me" in the middle, then rings outward
// (closest people first) with names placed around each ring. One canvas
// renderer is used on screen and for the PDF image.

const RING_COLOURS = ["#1a6b6b", "#3b8f86", "#79a7a4", "#b8d3d0"];

export function namesFrom(text: unknown): string[] {
  if (typeof text !== "string") return [];
  return text
    .split(/\n|,/)
    .map((name) => name.trim())
    .filter(Boolean)
    .slice(0, 14);
}

export function drawCircles(
  context: CanvasRenderingContext2D,
  size: number,
  rings: { label: string }[],
  names: string[][]
) {
  const c = size / 2;
  const outer = size * 0.45;
  const hub = size * 0.11;
  const band = (outer - hub) / rings.length;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, size, size);

  // Rings, outermost first so inner ones sit on top.
  for (let index = rings.length - 1; index >= 0; index--) {
    const radius = hub + band * (index + 1);
    context.beginPath();
    context.arc(c, c, radius, 0, Math.PI * 2);
    context.fillStyle = RING_COLOURS[index % RING_COLOURS.length];
    context.globalAlpha = 0.18 + 0.12 * (rings.length - 1 - index);
    context.fill();
    context.globalAlpha = 1;
    context.lineWidth = size / 400;
    context.strokeStyle = "rgba(26,107,107,0.6)";
    context.stroke();
  }

  // Me in the middle.
  context.beginPath();
  context.arc(c, c, hub, 0, Math.PI * 2);
  context.fillStyle = "#1a6b6b";
  context.fill();
  context.fillStyle = "#ffffff";
  context.font = `700 ${size * 0.04}px Helvetica, Arial, sans-serif`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  context.fillText("Me", c, c);

  rings.forEach((ring, index) => {
    const inner = hub + band * index;
    const mid = inner + band / 2;

    // Ring label at the top of its band, on a soft background.
    const labelSize = size * 0.02;
    context.font = `700 ${labelSize}px Helvetica, Arial, sans-serif`;
    const labelText = ring.label.toUpperCase();
    const labelWidth = context.measureText(labelText).width;
    const labelY = c - mid;
    context.fillStyle = "rgba(255,255,255,0.85)";
    context.fillRect(c - labelWidth / 2 - labelSize * 0.4, labelY - labelSize * 0.8, labelWidth + labelSize * 0.8, labelSize * 1.6);
    context.fillStyle = "#154f4f";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(labelText, c, labelY);

    // Names spread around the band, skipping the label at the top.
    const list = names[index] ?? [];
    if (!list.length) return;
    const fontSize = Math.min(size * 0.026, band * 0.32);
    context.font = `600 ${fontSize}px Helvetica, Arial, sans-serif`;
    // Leave a gap at the top, wide enough for the ring's label.
    const gap = Math.min(1.2, (labelWidth / 2 + fontSize * 3.5) / mid);
    const start = -Math.PI / 2 + gap;
    const span = Math.PI * 2 - gap * 2;
    list.forEach((name, nameIndex) => {
      const angle = list.length === 1 ? Math.PI / 2 : start + (span * nameIndex) / (list.length - 1);
      const radius = list.length > 6 && nameIndex % 2 ? mid + band * 0.2 : list.length > 6 ? mid - band * 0.12 : mid + band * 0.05;
      const label = name.length > 22 ? `${name.slice(0, 21)}…` : name;
      const width = context.measureText(label).width;
      // Keep chips inside the canvas.
      const edge = width / 2 + fontSize;
      const x = Math.min(size - edge, Math.max(edge, c + radius * Math.cos(angle)));
      const y = c + radius * Math.sin(angle);
      context.fillStyle = "rgba(255,255,255,0.92)";
      const padX = fontSize * 0.45;
      const height = fontSize * 1.5;
      context.beginPath();
      const left = x - width / 2 - padX;
      const top = y - height / 2;
      const r = height / 2;
      context.moveTo(left + r, top);
      context.arcTo(left + width + padX * 2, top, left + width + padX * 2, top + height, r);
      context.arcTo(left + width + padX * 2, top + height, left, top + height, r);
      context.arcTo(left, top + height, left, top, r);
      context.arcTo(left, top, left + width + padX * 2, top, r);
      context.closePath();
      context.fill();
      context.fillStyle = "#1a1a1a";
      context.textAlign = "center";
      context.textBaseline = "middle";
      context.fillText(label, x, y + fontSize * 0.04);
    });
  });
}

export function circlesPng(rings: { label: string }[], names: string[][], size = 1200): string {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  if (!context) return "";
  drawCircles(context, size, rings, names);
  return canvas.toDataURL("image/png");
}
