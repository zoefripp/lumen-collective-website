import { PDFDocument, PDFFont, PDFPage, StandardFonts, rgb } from "pdf-lib";
import type { Answers, Details, FormDef, ScoreResult, Signatures } from "./types";
import { formatDate } from "./scoring";
import { wheelPng } from "./wheel";
import { segmentCounts, valuesWheelPng } from "./values-wheel";
import { GROW_MEANING, SMART_MEANING } from "./forms/smart-grow";
import { chosenAt, funnelAnswered, kinds as funnelKinds } from "./funnel";

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

  // ---- Signatures (drawn by either layout) -------------------------------
  const drawSignatures = async (title: string) => {
    if (!form.signatures.length) return;
    heading(title, 140);
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
  };

  // ---- Goal map layout (SMART and GROW) ----------------------------------
  // A designed page meant to be shared with the participant: empty answers
  // are left out and the goal, SMART letters and GROW plan are laid out
  // visually rather than as a list of questions.
  const drawGoalMap = async () => {
    const str = (id: string) => {
      const value = answers[id];
      return typeof value === "string" ? value.trim() : "";
    };
    const num = (id: string) => {
      const value = answers[id];
      return typeof value === "number" ? value : null;
    };
    const LINE = 10.5 * 1.4;
    const indent = 34;
    const textWidth = CONTENT_WIDTH - indent;
    const estimate = (text: string, size = 10.5, width = textWidth) =>
      wrap(text, regular, size, width).length * size * 1.4;

    const badge = (letter: string, top: number) => {
      page.drawCircle({ x: MARGIN + 12, y: top - 12, size: 12, color: TEAL });
      const w = bold.widthOfTextAtSize(letter, 12);
      page.drawText(letter, { x: MARGIN + 12 - w / 2, y: top - 16.2, size: 12, font: bold, color: rgb(1, 1, 1) });
    };

    // A lettered block: badge, title and body text indented beside it.
    const meaning = (text: string) => {
      const rest = text.slice(text.indexOf(":") + 1).trim();
      return rest.charAt(0).toUpperCase() + rest.slice(1);
    };
    const lettered = (letter: string, title: string, body: string[], extra?: () => void, caption?: string) => {
      const parts = body.filter(Boolean);
      if (!parts.length && !extra) return;
      const needed = 34 + parts.reduce((total, part) => total + estimate(part) + 4, 0);
      // Keep the badge and title with at least the start of what follows.
      ensureSpace(Math.max(extra ? 110 : 0, Math.min(needed, 220)));
      const top = y;
      const startPage = page;
      badge(letter, top);
      page.drawText(clean(title), { x: MARGIN + indent, y: top - 15, size: 11, font: bold, color: TEAL });
      y = top - 20;
      if (caption) drawText(caption, { x: MARGIN + indent, width: textWidth, size: 9, color: MUTED, gap: 3 });
      for (const part of parts) drawText(part, { x: MARGIN + indent, width: textWidth, gap: 4 });
      if (extra) extra();
      y = (page === startPage ? Math.min(y, top - 30) : y) - 7;
    };

    // A key strip: each letter in a circle with its word beside it.
    const legend = (meanings: Record<string, string>) => {
      const entries = Object.entries(meanings).map(([letter, text]) => [letter, text.slice(0, text.indexOf(":"))]);
      const cell = CONTENT_WIDTH / entries.length;
      const height = 30;
      ensureSpace(height + 8);
      page.drawRectangle({ x: MARGIN, y: y - height, width: CONTENT_WIDTH, height, color: PANEL });
      entries.forEach(([letter, word], index) => {
        const x = MARGIN + index * cell + 10;
        const cy = y - height / 2;
        page.drawCircle({ x: x + 9, y: cy, size: 9, color: TEAL });
        const w = bold.widthOfTextAtSize(letter, 10);
        page.drawText(letter, { x: x + 9 - w / 2, y: cy - 3.5, size: 10, font: bold, color: rgb(1, 1, 1) });
        page.drawText(clean(word), { x: x + 23, y: cy - 3.5, size: 10, font: bold, color: CHARCOAL });
      });
      y -= height + 12;
    };

    const labelled = (label: string, value: string) => {
      if (!value) return;
      ensureSpace(LINE * 2 + 6);
      drawText(label, { x: MARGIN + indent, width: textWidth, font: bold, size: 9, color: MUTED });
      drawText(value, { x: MARGIN + indent, width: textWidth, gap: 5 });
    };

    const bar = (label: string, value: number | null, max = 10) => {
      if (value === null) return;
      ensureSpace(24);
      const x = MARGIN + indent;
      const barX = x + 210;
      const barWidth = CONTENT_WIDTH - indent - 210 - 50;
      const baseline = y - 13;
      page.drawText(clean(label), { x, y: baseline, size: 10, font: regular, color: CHARCOAL });
      page.drawRectangle({ x: barX, y: baseline - 1, width: barWidth, height: 9, color: rgb(0.88, 0.92, 0.92) });
      page.drawRectangle({ x: barX, y: baseline - 1, width: (barWidth * value) / max, height: 9, color: TEAL });
      const text = `${value}/${max}`;
      page.drawText(text, {
        x: PAGE_WIDTH - MARGIN - bold.widthOfTextAtSize(text, 10.5),
        y: baseline,
        size: 10.5,
        font: bold,
        color: CHARCOAL,
      });
      y -= 22;
    };

    // ---- Part 1: SMART goal.
    heading("Part 1: My SMART goal", 160);
    drawText(
      "A SMART goal is clear enough to act on and to know when you've done it.",
      { size: 9.5, color: MUTED, gap: 6 }
    );
    legend(SMART_MEANING);

    // The goal, large, in a panel.
    const goal = str("smart_goal") || str("goal_raw");
    if (goal) {
      const goalLines = wrap(goal, bold, 15, CONTENT_WIDTH - 36);
      const meta = [
        str("target_date") && `By ${formatDate(str("target_date"))}`,
        str("area"),
      ]
        .filter(Boolean)
        .join("   |   ");
      const firstPut =
        str("smart_goal") && str("goal_raw") && str("goal_raw") !== str("smart_goal")
          ? wrap(`How I first put it: ${str("goal_raw")}`, regular, 9.5, CONTENT_WIDTH - 36)
          : [];
      const height = 34 + goalLines.length * 21 + (meta ? 22 : 0) + firstPut.length * 13 + (firstPut.length ? 6 : 0) + 12;
      ensureSpace(height + 14);
      page.drawRectangle({ x: MARGIN, y: y - height, width: CONTENT_WIDTH, height, color: PANEL });
      page.drawRectangle({ x: MARGIN, y: y - height, width: 4, height, color: TEAL });
      page.drawText(str("smart_goal") ? "MY SMART GOAL" : "MY GOAL", {
        x: MARGIN + 18,
        y: y - 22,
        size: 8.5,
        font: bold,
        color: TEAL,
      });
      goalLines.forEach((line, index) => {
        page.drawText(line, { x: MARGIN + 18, y: y - 46 - index * 21, size: 15, font: bold, color: CHARCOAL });
      });
      if (meta) {
        page.drawText(clean(meta), {
          x: MARGIN + 18,
          y: y - 46 - goalLines.length * 21 - 4,
          size: 10,
          font: regular,
          color: MUTED,
        });
      }
      firstPut.forEach((line, index) => {
        page.drawText(line, {
          x: MARGIN + 18,
          y: y - 46 - goalLines.length * 21 - (meta ? 22 : 4) - 6 - index * 13,
          size: 9.5,
          font: regular,
          color: MUTED,
        });
      });
      y -= height + 16;
    }

    // SMART.
    const achievableRating = num("achievable_rating");
    const smartRows: [string, string, string][] = [
      ["S", "Specific", str("specific")],
      ["M", "Measurable", str("measurable")],
      [
        "A",
        "Achievable",
        [str("achievable"), achievableRating !== null ? `Feels ${achievableRating}/10 achievable.` : ""]
          .filter(Boolean)
          .join(" "),
      ],
      ["R", "Relevant", str("relevant")],
      ["T", "Time-bound", str("target_date") ? `By ${formatDate(str("target_date"))}` : ""],
    ];
    if (smartRows.some(([, , text]) => text)) {
      y -= 2;
      for (const [letter, title, text] of smartRows) {
        lettered(letter, title, [text], undefined, meaning(SMART_MEANING[letter]));
      }
    }


    // GROW.
    const steps = Array.from({ length: 3 }, (_, index) => ({
      what: str(`step_${index + 1}`),
      when: str(`step_${index + 1}_when`),
      who: str(`step_${index + 1}_who`),
    })).filter((step) => step.what);
    const options = str("options")
      .split("\n")
      .map((line) => line.replace(/^[-*•\s]+/, "").trim())
      .filter(Boolean);

    // Part 2 always starts on a fresh page.
    if (y < PAGE_HEIGHT - MARGIN - 1) newPage();
    heading("Part 2: My GROW plan", 90);
    drawText(
      "GROW is a four-step way to plan how to reach the goal.",
      { size: 9.5, color: MUTED, gap: 6 }
    );
    legend(GROW_MEANING);
    lettered("G", "Goal", [goal], undefined, meaning(GROW_MEANING.G) + " This is my SMART goal from Part 1.");
    lettered(
      "R",
      "Reality",
      [],
      () => {
        labelled("What's happening now", str("reality_now"));
        labelled("What I've tried, and what helped", str("reality_tried"));
        labelled("What gets in the way", str("reality_barriers"));
        bar("Where I am now with this goal", num("reality_rating"));
      },
      meaning(GROW_MEANING.R)
    );
    lettered("O", "Options", [], () => {
      for (const option of options) {
        drawText(`•  ${option}`, { x: MARGIN + indent, width: textWidth, gap: 2 });
      }
      if (options.length) y -= 4;
      labelled("Starting with", str("option_choice"));
    }, meaning(GROW_MEANING.O));
    lettered("W", "Way forward", [], () => {
      if (steps.length) {
        // Steps table.
        const colNumber = 18;
        const colWhen = 78;
        const colWho = 130;
        const colWhat = textWidth - colNumber - colWhen - colWho;
        const x0 = MARGIN + indent;
        ensureSpace(40);
        const headerY = y - 12;
        page.drawText("STEP", { x: x0 + colNumber, y: headerY, size: 8, font: bold, color: MUTED });
        page.drawText("BY WHEN", { x: x0 + colNumber + colWhat + 8, y: headerY, size: 8, font: bold, color: MUTED });
        page.drawText("WHO CAN HELP", {
          x: x0 + colNumber + colWhat + colWhen + 8,
          y: headerY,
          size: 8,
          font: bold,
          color: MUTED,
        });
        y -= 18;
        steps.forEach((step, index) => {
          const whatLines = wrap(step.what, regular, 10.5, colWhat - 4);
          const whoLines = wrap(step.who || "-", regular, 10, colWho - 8);
          const rowHeight = Math.max(whatLines.length, whoLines.length) * 14.7 + 10;
          ensureSpace(rowHeight + 4);
          page.drawLine({
            start: { x: x0, y },
            end: { x: PAGE_WIDTH - MARGIN, y },
            thickness: 0.5,
            color: RULE,
          });
          const first = y - 15;
          page.drawText(`${index + 1}`, { x: x0 + 2, y: first, size: 10.5, font: bold, color: TEAL });
          whatLines.forEach((line, lineIndex) => {
            page.drawText(line, { x: x0 + colNumber, y: first - lineIndex * 14.7, size: 10.5, font: regular, color: CHARCOAL });
          });
          page.drawText(step.when ? formatDate(step.when) : "-", {
            x: x0 + colNumber + colWhat + 8,
            y: first,
            size: 10,
            font: regular,
            color: CHARCOAL,
          });
          whoLines.forEach((line, lineIndex) => {
            page.drawText(line, {
              x: x0 + colNumber + colWhat + colWhen + 8,
              y: first - lineIndex * 14.7,
              size: 10,
              font: regular,
              color: CHARCOAL,
            });
          });
          y -= rowHeight;
        });
        page.drawLine({ start: { x: x0, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 0.5, color: RULE });
        y -= 10;
      }
      labelled("If it gets hard, I will", str("if_hard"));
      labelled("People and supports who can help me", str("supports"));
      bar("How confident I feel about the first step", num("confidence"));
    }, meaning(GROW_MEANING.W));

    const review = str("review_date");
    if (review) {
      ensureSpace(40);
      const height = 30;
      page.drawRectangle({ x: MARGIN, y: y - height, width: CONTENT_WIDTH, height, color: PANEL });
      page.drawText(clean(`We'll look at this goal together again on ${formatDate(review)}.`), {
        x: MARGIN + 14,
        y: y - 19,
        size: 10.5,
        font: bold,
        color: TEAL,
      });
      y -= height + 8;
    }
  
    y -= 4;
    await drawSignatures("Agreed together");
  };

  if (form.layout === "goalMap") {
    await drawGoalMap();
  } else {
  // ---- Answers -----------------------------------------------------------
  const pairKey = (id: string, row: number, column: number) => `${id}_${row + 1}_${column}`;
  const isAnswered = (field: FormDef["sections"][number]["fields"][number]): boolean => {
    if (field.type === "note") return Boolean(field.print);
    if (field.type === "wheel") return field.areas.some((area) => typeof answers[area.id] === "number");
    if (field.type === "funnel") return funnelAnswered(answers, field);
    if (field.type === "pairs") {
      return Array.from({ length: field.rows }, (_, row) => row).some((row) =>
        [0, 1].some((column) => {
          const value = answers[pairKey(field.id, row, column)];
          return typeof value === "string" && value.trim() !== "";
        })
      );
    }
    const value = answers[field.id];
    if (Array.isArray(value)) return value.length > 0;
    if (typeof value === "number") return true;
    return typeof value === "string" && value.trim() !== "";
  };

  for (const section of form.sections) {
    const printable = section.fields.filter((field) =>
      form.hideEmpty ? isAnswered(field) : field.type !== "note" || field.print
    );
    if (!printable.length) continue; // a section of coach prompts only, or nothing answered
    heading(
      section.minutes ? `${section.title} (${section.minutes[0]}–${section.minutes[1]} min)` : section.title,
      printable[0].type === "wheel" || printable[0].type === "values" ? 440 : 60
    );
    for (const field of printable) {
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
      if (field.type === "values") {
        const chosenList = Array.isArray(answers[field.id]) ? (answers[field.id] as string[]) : [];
        const chosen = new Set(chosenList);
        const dataUrl = valuesWheelPng(field, chosen);
        if (dataUrl) {
          const image = await doc.embedPng(dataUrl);
          const side = Math.min(CONTENT_WIDTH, 400);
          ensureSpace(side + 8);
          page.drawImage(image, { x: MARGIN + (CONTENT_WIDTH - side) / 2, y: y - side, width: side, height: side });
          y -= side + 12;
        }
        if (!chosenList.length) {
          drawText("No values chosen.", { color: MUTED, gap: 6 });
          continue;
        }
        const counts = segmentCounts(field, chosen);
        drawText(`${chosenList.length} values chosen`, { font: bold, size: 10.5, color: TEAL, gap: 4 });
        field.segments.forEach((segment, index) => {
          const picked = field.categories
            .filter((category) => category.segment === index)
            .flatMap((category) => category.values)
            .filter((value, position, all) => chosen.has(value) && all.indexOf(value) === position);
          if (!picked.length) return;
          ensureSpace(36);
          drawText(`${segment.label} (${counts[index].chosen} of ${counts[index].total})`, {
            font: bold,
            size: 9.5,
            color: MUTED,
          });
          drawText(picked.join(", "), { size: 10.5, gap: 6 });
        });
        y -= 4;
        continue;
      }

      if (field.type === "funnel") {
        const last = field.stages.length - 1;
        const kindMap = funnelKinds(answers, field);
        const tag = (item: string) =>
          field.classify && kindMap[item] !== undefined ? ` (${field.classify.short[kindMap[item]]})` : "";
        // Deepest stage reached is shown as the numbered "top" list.
        let topStage = last;
        while (topStage > 0 && !chosenAt(answers, field, topStage).length) topStage--;
        const top = chosenAt(answers, field, topStage);
        if (!top.length) {
          drawText(`No ${field.noun} chosen.`, { color: MUTED, gap: 6 });
          continue;
        }
        const height = 30 + top.length * 24;
        ensureSpace(height + 10);
        page.drawRectangle({ x: MARGIN, y: y - height, width: CONTENT_WIDTH, height, color: PANEL });
        page.drawText(clean(`MY TOP ${top.length} ${field.noun.toUpperCase()}`), {
          x: MARGIN + 16,
          y: y - 20,
          size: 8.5,
          font: bold,
          color: TEAL,
        });
        top.forEach((item, index) => {
          const rowY = y - 44 - index * 24;
          page.drawCircle({ x: MARGIN + 26, y: rowY + 4, size: 9, color: TEAL });
          const number = String(index + 1);
          page.drawText(number, {
            x: MARGIN + 26 - bold.widthOfTextAtSize(number, 10) / 2,
            y: rowY + 0.5,
            size: 10,
            font: bold,
            color: rgb(1, 1, 1),
          });
          page.drawText(clean(item), { x: MARGIN + 44, y: rowY, size: 13, font: bold, color: CHARCOAL });
          const extra = tag(item);
          if (extra) {
            page.drawText(clean(extra), {
              x: MARGIN + 44 + bold.widthOfTextAtSize(clean(item), 13) + 4,
              y: rowY,
              size: 10,
              font: regular,
              color: MUTED,
            });
          }
        });
        y -= height + 12;
        for (let stage = topStage - 1; stage >= 0; stage--) {
          const items = chosenAt(answers, field, stage);
          if (!items.length) continue;
          ensureSpace(36);
          drawText(stage === 0 ? "First choices" : `Top ${field.stages[stage]}`, {
            font: bold,
            size: 9.5,
            color: MUTED,
          });
          drawText(items.map((item) => `${item}${field.classify && field.classify.afterStage === stage ? tag(item) : ""}`).join(", "), {
            size: 10.5,
            gap: 7,
          });
        }
        if (field.classify) {
          const sorted = chosenAt(answers, field, field.classify.afterStage).filter((item) => kindMap[item] !== undefined);
          if (sorted.length) {
            const counts = [0, 1].map((choice) => sorted.filter((item) => kindMap[item] === choice).length);
            drawText(
              `When sorted: ${counts[0]} ${field.classify.short[0]}, ${counts[1]} ${field.classify.short[1]}.`,
              { size: 10, color: TEAL, font: bold, gap: 8 }
            );
          }
        }
        continue;
      }

      if (field.type === "pairs") {
        const rows = Array.from({ length: field.rows }, (_, row) => {
          const cell = (column: number) => {
            const value = answers[pairKey(field.id, row, column)];
            return typeof value === "string" ? value.trim() : "";
          };
          return [cell(0), cell(1)] as const;
        }).filter(([a, b]) => a || b);
        ensureSpace(48);
        drawText(field.label, { font: bold, size: 9.5, color: MUTED, gap: 4 });
        if (!rows.length) {
          drawText("Not answered", { color: MUTED, gap: 7 });
          continue;
        }
        const leftWidth = CONTENT_WIDTH * 0.36;
        const rightX = MARGIN + leftWidth + 12;
        const rightWidth = CONTENT_WIDTH - leftWidth - 12;
        ensureSpace(20);
        page.drawText(clean(field.columns[0].toUpperCase()), { x: MARGIN, y: y - 11, size: 8, font: bold, color: TEAL });
        page.drawText(clean(field.columns[1].toUpperCase()), { x: rightX, y: y - 11, size: 8, font: bold, color: TEAL });
        y -= 16;
        for (const [left, right] of rows) {
          const leftLines = wrap(left || "-", bold, 10.5, leftWidth - 6);
          const rightLines = wrap(right || "-", regular, 10.5, rightWidth);
          const rowHeight = Math.max(leftLines.length, rightLines.length) * 14.7 + 10;
          ensureSpace(rowHeight + 2);
          page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 0.5, color: RULE });
          leftLines.forEach((line, index) => {
            page.drawText(line, { x: MARGIN, y: y - 15 - index * 14.7, size: 10.5, font: bold, color: CHARCOAL });
          });
          rightLines.forEach((line, index) => {
            page.drawText(line, { x: rightX, y: y - 15 - index * 14.7, size: 10.5, font: regular, color: CHARCOAL });
          });
          y -= rowHeight;
        }
        page.drawLine({ start: { x: MARGIN, y }, end: { x: PAGE_WIDTH - MARGIN, y }, thickness: 0.5, color: RULE });
        y -= 10;
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

  } // end of standard layout

  // ---- Signatures --------------------------------------------------------
  // The goal map draws its signatures itself, under the goal on page 1.
  if (form.layout !== "goalMap") await drawSignatures("Signatures");

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
