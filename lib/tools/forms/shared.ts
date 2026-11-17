import type { Answers, Field } from "../types";

// Small helpers shared by the form definitions.

export const prompt = (id: string, text: string): Field => ({ id, type: "note", label: "Coach prompt", text });

export const notes = (id: string): Field => ({ id, type: "textarea", label: "Notes", help: "Optional." });

export const read = (answers: Answers) => ({
  text: (id: string) => {
    const value = answers[id];
    return typeof value === "string" ? value.trim().replace(/\s+/g, " ") : "";
  },
  list: (id: string) => {
    const value = answers[id];
    return Array.isArray(value) ? value : [];
  },
  number: (id: string) => {
    const value = answers[id];
    return typeof value === "number" ? value : null;
  },
});

// "Work and career" -> "work and career", leaving acronyms like "GP" alone.
export const lowerFirst = (item: string) =>
  /^[A-Z]{2}/.test(item) ? item : item.charAt(0).toLowerCase() + item.slice(1);

export const joinLower = (items: string[], separator = ", ") => items.map(lowerFirst).join(separator);

export const sentence = (text: string) => text.replace(/[.\s]+$/, "") + ".";
