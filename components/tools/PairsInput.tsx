"use client";
import type { Answers, PairsField } from "@/lib/tools/types";

type Props = {
  field: PairsField;
  answers: Answers;
  onChange: (id: string, value: string) => void;
};

export const pairId = (field: { id: string }, row: number, column: 0 | 1) => `${field.id}_${row + 1}_${column}`;

// Two-column table, one row per entry (e.g. "My value" / "Why I value it").
export default function PairsInput({ field, answers, onChange }: Props) {
  const value = (id: string) => {
    const answer = answers[id];
    return typeof answer === "string" ? answer : "";
  };
  const inputClass =
    "w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-charcoal focus:border-teal focus:outline-none";

  return (
    <div>
      <div className="mb-2 hidden grid-cols-[minmax(0,2fr)_minmax(0,3fr)] gap-3 sm:grid">
        {field.columns.map((column) => (
          <div key={column} className="text-center text-sm font-semibold uppercase tracking-wide text-[#41647a]">
            {column}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: field.rows }, (_, row) => (
          <div key={row} className="grid gap-2 sm:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] sm:gap-3">
            <input
              aria-label={`${field.columns[0]} ${row + 1}`}
              placeholder={field.columns[0]}
              className={inputClass}
              value={value(pairId(field, row, 0))}
              onChange={(event) => onChange(pairId(field, row, 0), event.target.value)}
              autoComplete="off"
            />
            <textarea
              aria-label={`${field.columns[1]} ${row + 1}`}
              placeholder={field.columns[1]}
              rows={1}
              className={`${inputClass} min-h-[3.25rem] resize-y`}
              value={value(pairId(field, row, 1))}
              onChange={(event) => onChange(pairId(field, row, 1), event.target.value)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
