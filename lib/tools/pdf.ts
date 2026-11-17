import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { Answers, Details, FormDef, ScoreResult, Signatures } from "./types";
import { formatDate } from "./scoring";
import { wheelPng } from "./wheel";

// Builds the completed-form PDF entirely in the browser.

const PAGE_WIDTH = 595.28; // A4
const PAGE_HEIGHT = 841.89;
const MARGIN = 48;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN * 2;
const FOOTER_SPACE = 44;

const TEAL = rgb(0.102, 0.42, 0.42);
const CHARCOAL = rgb(0.1, 0.1, 0.1);
const MUTED = rgb(0.38, 0.38, 0.38);
const RULE = rgb(0.85, 0.85, 0.85);
const PANEL = rgb(0.95, 0.97, 0.97);

export type PdfInput = {
  form: FormDef;
  details: Details;
  answers: Answers;
  scores: Record<string, ScoreResult>;
  summary: string[];
  signatures: Signatures;
};

export async function buildPdf(input: PdfInput): Promise<Uint8Array> {
  const { form, details, answers, scores, summary, signatures } = input;

  const doc = await PDFDocument.create();
  doc.setTitle(`${form.title} - ${details.participant}`);
  doc.setAuthor("Lumen Collective");
  doc.setCreationDate(new Date());

  const regular = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const supported = new Set(regular.getCharacterSet());

  // The built-in PDF fonts cannot draw emoji or some symbols; leave those out
  // rather than failing to produce the document.
  const clean = (text: string) =>
    Array.from(text.replace(/\r\n?/g, "\n").replace(/\t/g, " "))
      .map((char) => {
        if (char === "\n") return char;
        const code = char.codePointAt(0) ?? 0;
        return supported.has(code) ? char : "";
      })
      .join("")
      .replace(/ {2,}/g, " ");

  let page: PDFPage = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
  let y = PAGE_HEIGHT - MARGIN;

  const newPage = () => {
    page = doc.addPage([PAGE_WIDTH, PAGE_HEIGHT]);
    y = PAGE_HEIGHT - MARGIN;
  };
  const ensureSpace = (height: number) => {
    if (y - height < MARGIN + FOOTER_SPACE) newPage();
  };

  const wrap = (text: string, font: PDFFont, size: number, maxWidth: number): string[] => {
    const lines: string[] = [];
    for (const paragraph of clean(text).split("\n")) {
      let line = "";
      for (let word of paragraph.split(" ")) {
        // Break words that are longer than a whole line.
        while (font.widthOfTextAtSize(word, size) > maxWidth) {
          let cut = word.length - 1;
          while (cut > 1 && font.widthOfTextAtSize(word.slice(0, cut), size) > maxWidth) cut--;
          if (line) {
            lines.push(line);
            line = "";
          }
          lines.push(word.slice(0, cut));
          word = word.slice(cut);
        }
        const candidate = line ? `${line} ${word}` : word;
        if (font.widthOfTextAtSize(candidate, size) > maxWidth && line) {
          lines.push(line);
          line = word;
        } else {
          line = candidate;
        }
      }
      lines.push(line);
    }
    return lines;
  };

  const drawText = (
    text: string,
    options: { font?: PDFFont; size?: number; color?: ReturnType<typeof rgb>; x?: number; width?: number; gap?: number } = {}
  ) => {
    const font = options.font ?? regular;
    const size = options.size ?? 10.5;
    const x = options.x ?? MARGIN;
    const width = options.width ?? CONTENT_WIDTH - (x - MARGIN);
    const lineHeight = size * 1.4;
    for (const line of wrap(text, font, size, width)) {
      ensureSpace(lineHeight);
      y -= lineHeight;
      page.drawText(line, { x, y: y + size * 0.3, size, font, color: options.color ?? CHARCOAL });
    }
    y -= options.gap ?? 0;
  };

  // `keepWith` is the space the first item under the heading needs, so a
  // heading is never stranded at the bottom of a page.
  const heading = (text: string, keepWith = 60) => {
    ensureSpace(keepWith);
    y -= 14;
    drawText(text, { font: bold, size: 12.5, color: TEAL });
    y -= 4;
    page.drawLine({
      start: { x: MARGIN, y },
      end: { x: PAGE_WIDTH - MARGIN, y },
      thickness: 0.75,
      color: RULE,
    });
    y -= 6;
  };

  // ---- Header band -------------------------------------------------------
  const bandHeight = 64;
  page.drawRectangle({
    x: 0,
    y: PAGE_HEIGHT - bandHeight,
    width: PAGE_WIDTH,
    height: bandHeight,
    color: TEAL,
  });
  let logoDrawn = false;
  try {
    const response = await fetch("/logo-trimmed.png");
    if (response.ok) {
      const logo = await doc.embedPng(await response.arrayBuffer());
      const height = 30;
      const width = (logo.width / logo.height) * height;
      page.drawImage(logo, {
        x: MARGIN,
        y: PAGE_HEIGHT - bandHeight + (bandHeight - height) / 2,
        width,
        height,
      });
      logoDrawn = true;
    }
  } catch {
    // fall back to text below
  }
  if (!logoDrawn) {
    page.drawText("Lumen Collective", {
      x: MARGIN,
      y: PAGE_HEIGHT - bandHeight / 2 - 6,
      size: 16,
      font: bold,
      color: rgb(1, 1, 1),
    });
  }
  const tag = "Psychosocial Recovery Coaching";
  page.drawText(tag, {
    x: PAGE_WIDTH - MARGIN - regular.widthOfTextAtSize(tag, 9.5),
    y: PAGE_HEIGHT - bandHeight / 2 - 3,
    size: 9.5,
    font: regular,
    color: rgb(1, 1, 1),
  });
  y = PAGE_HEIGHT - bandHeight - 18;

  // ---- Title and details -------------------------------------------------
  drawText(form.title, { font: bold, size: 19, gap: 8 });

  const detailRows: [string, string][] = [
    ["Participant", details.participant],
    ["Recovery Coach", details.coach],
    ["Date", formatDate(details.date)],
  ];
  const columnWidth = CONTENT_WIDTH / detailRows.length;
  const detailsTop = y;
  let detailsBottom = y;
  detailRows.forEach(([label, value], index) => {
    y = detailsTop;
    const x = MARGIN + columnWidth * index;
    drawText(label.toUpperCase(), { font: bold, size: 7.5, color: MUTED, x, width: columnWidth - 10 });
    drawText(value || "-", { size: 11, x, width: columnWidth - 10 });
    detailsBottom = Math.min(detailsBottom, y);
  });
  y = detailsBottom - 6;

  // ---- Answers -----------------------------------------------------------
  for (const section of form.sections) {
    const printable = section.fields.filter((field) => field.type !== "note" || field.print);
    if (!printable.length) continue; // a section of coach prompts only
    heading(section.title, printable[0].type === "wheel" ? 440 : 60);
    for (const field of section.fields) {
      if (field.type === "note") {
        if (!field.print) continue; // coach prompts stay on screen only
        const lines = wrap(field.text, regular, 10, CONTENT_WIDTH - 24);
        const height = 22 + 12 + lines.length * 14;
        ensureSpace(height + 8);
        page.drawRectangle({ x: MARGIN, y: y - height, width: CONTENT_WIDTH, height, color: PANEL });
        page.drawText(clean(field.label), { x: MARGIN + 12, y: y - 18, size: 10.5, font: bold, color: TEAL });
        lines.forEach((line, index) => {
          page.drawText(line, { x: MARGIN + 12, y: y - 36 - index * 14, size: 10, font: regular, color: CHARCOAL });
        });
        y -= height + 10;
        continue;
      }

      if (field.type === "wheel") {
        const values = field.areas.map((area) => {
          const value = answers[area.id];
          return typeof value === "number" ? value : undefined;
        });
        const dataUrl = wheelPng(field.areas, values, field.max, field.variant ?? "wheel");
        if (dataUrl) {
          const image = await doc.embedPng(dataUrl);
          const side = Math.min(CONTENT_WIDTH, 380);
          ensureSpace(side + 8);
          page.drawImage(image, { x: MARGIN + (CONTENT_WIDTH - side) / 2, y: y - side, width: side, height: side });
          y -= side + 8;
        }
        for (let index = 0; index < field.areas.length; index++) {
          const area = field.areas[index];
          const value = values[index];
          const size = 10.5;
          ensureSpace(size * 1.4 + 3);
          const top = y;
          drawText(area.label, { size, width: CONTENT_WIDTH - 60 });
          const text = value === undefined ? "Not marked" : `${value} / ${field.max}`;
          const font = value === undefined ? regular : bold;
          page.drawText(text, {
            x: PAGE_WIDTH - MARGIN - font.widthOfTextAtSize(text, size),
            y: top - size * 1.4 + size * 0.3,
            size,
            font,
            color: value === undefined ? MUTED : CHARCOAL,
          });
          y -= 3;
        }
        y -= 6;
        continue;
      }
      const value = answers[field.id];
      let answer = "Not answered";
      if (field.type === "scale" && typeof value === "number") {
        answer = `${value} / ${field.max}`;
      } else if (Array.isArray(value) && value.length) {
        answer = value.join(", ");
      } else if (field.type === "date" && typeof value === "string" && value) {
        answer = formatDate(value);
      } else if (typeof value === "string" && value.trim()) {
        answer = value.trim();
      }
      const unanswered = answer === "Not answered";

      if (field.type === "scale") {
        // Rating on one line: label on the left, score on the right.
        const size = 10.5;
        const scoreWidth = 60;
        const lines = wrap(field.label, regular, size, CONTENT_WIDTH - scoreWidth);
        ensureSpace(lines.length * size * 1.4 + 4);
        const top = y;
        drawText(field.label, { size, width: CONTENT_WIDTH - scoreWidth });
        const text = clean(answer);
        const font = unanswered ? regular : bold;
        page.drawText(text, {
          x: PAGE_WIDTH - MARGIN - font.widthOfTextAtSize(text, size),
          y: top - size * 1.4 + size * 0.3,
          size,
          font,
          color: unanswered ? MUTED : CHARCOAL,
        });
        y -= 3;
      } else {
        ensureSpace(34);
        drawText(field.label, { font: bold, size: 9.5, color: MUTED });
        drawText(answer, { size: 10.5, color: unanswered ? MUTED : CHARCOAL, gap: 7 });
      }
    }
  }

  // ---- Scores ------------------------------------------------------------
  const scoreList = (form.scores ?? []).map((def) => scores[def.id]).filter(Boolean);
  if (scoreList.length) {
    heading(scoreList.length === 1 ? "Score" : "Scores");
    for (const score of scoreList) {
      const boxHeight = 40;
      ensureSpace(boxHeight + 8);
      page.drawRectangle({
        x: MARGIN,
        y: y - boxHeight,
        width: CONTENT_WIDTH,
        height: boxHeight,
        color: PANEL,
      });
      const valueText =
        score.value === null
          ? score.answered === 0
            ? "Not rated"
            : `Incomplete (${score.answered} of ${score.total} rated)`
          : `${score.value} / ${score.outOf}`;
      page.drawText(clean(score.label), {
        x: MARGIN + 12,
        y: y - 17,
        size: 10.5,
        font: bold,
        color: CHARCOAL,
      });
      const partial =
        score.value !== null && score.answered < score.total
          ? ` (based on ${score.answered} of ${score.total})`
          : "";
      if (score.band || partial) {
        page.drawText(clean(`${score.band ?? ""}${partial}`.trim()), {
          x: MARGIN + 12,
          y: y - 31,
          size: 9.5,
          font: regular,
          color: MUTED,
        });
      }
      const valueSize = score.value === null ? 10 : 16;
      page.drawText(valueText, {
        x: PAGE_WIDTH - MARGIN - 12 - bold.widthOfTextAtSize(valueText, valueSize),
        y: y - 25,
        size: valueSize,
        font: bold,
        color: TEAL,
      });
      y -= boxHeight + 8;
    }
  }

  // ---- Summary -----------------------------------------------------------
  if (summary.length) {
    heading("Summary");
    for (const paragraph of summary) {
      drawText(paragraph, { size: 10.5, gap: 5 });
    }
  }

  // ---- Signatures --------------------------------------------------------
  if (form.signatures.length) {
    heading("Signatures");
    const gap = 24;
    const boxWidth = (CONTENT_WIDTH - gap) / 2;
    const imageHeight = 64;
    for (let index = 0; index < form.signatures.length; index += 2) {
      const row = form.signatures.slice(index, index + 2);
      ensureSpace(imageHeight + 44);
      const top = y;
      for (let column = 0; column < row.length; column++) {
        const def = row[column];
        const x = MARGIN + column * (boxWidth + gap);
        const dataUrl = signatures[def.id];
        if (dataUrl) {
          const image = await doc.embedPng(dataUrl);
          const scale = Math.min(boxWidth / image.width, imageHeight / image.height);
          page.drawImage(image, {
            x,
            y: top - imageHeight + (imageHeight - image.height * scale) / 2,
            width: image.width * scale,
            height: image.height * scale,
          });
        }
        const lineY = top - imageHeight - 4;
        page.drawLine({
          start: { x, y: lineY },
          end: { x: x + boxWidth, y: lineY },
          thickness: 0.75,
          color: MUTED,
        });
        page.drawText(clean(def.label), { x, y: lineY - 13, size: 9.5, font: bold, color: CHARCOAL });
        const name = def.id === "participant" ? details.participant : def.id === "coach" ? details.coach : "";
        const caption = [name, dataUrl ? `Signed ${formatDate(details.date)}` : "Not signed"]
          .filter(Boolean)
          .join(" - ");
        page.drawText(clean(caption), { x, y: lineY - 25, size: 8.5, font: regular, color: MUTED });
      }
      y = top - imageHeight - 44;
    }
  }

  // ---- Footers -----------------------------------------------------------
  const pages = doc.getPages();
  pages.forEach((p, index) => {
    const left = clean(`Lumen Collective - ${form.title} - ${details.participant}`);
    const right = `Page ${index + 1} of ${pages.length}`;
    p.drawLine({
      start: { x: MARGIN, y: MARGIN + 14 },
      end: { x: PAGE_WIDTH - MARGIN, y: MARGIN + 14 },
      thickness: 0.5,
      color: RULE,
    });
    p.drawText(left, { x: MARGIN, y: MARGIN, size: 8, font: regular, color: MUTED });
    p.drawText(right, {
      x: PAGE_WIDTH - MARGIN - regular.widthOfTextAtSize(right, 8),
      y: MARGIN,
      size: 8,
      font: regular,
      color: MUTED,
    });
  });

  return doc.save();
}

export function pdfFilename(form: FormDef, details: Details): string {
  const safe = (text: string) => text.replace(/[^\w .,()-]/g, "").replace(/\s+/g, " ").trim();
  const parts = [safe(form.title), safe(details.participant), details.date].filter(Boolean);
  return `${parts.join(" - ").slice(0, 140)}.pdf`;
}

export function toBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunk = 0x8000;
  for (let i = 0; i < bytes.length; i += chunk) {
    binary += String.fromCharCode(...Array.from(bytes.subarray(i, i + chunk)));
  }
  return btoa(binary);
}
