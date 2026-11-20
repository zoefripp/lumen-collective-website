"use client";
import type { Answers, PairsField } from "@/lib/tools/types";

type Props = {
  field: PairsField;
  answers: Answers;
  onChange: (id: string, value: string) => void;
};

export const pairId = (field: { id: string }, row: number, column: number) => `${field.id}_${row + 1}_${column}`;

// A table with one row per entry. Two columns (e.g. "My value" / "Why I value
// it") get a short box and a longer one; wider tables use short boxes.
export default function PairsInput({ field, answers, onChange }: Props) {
  const value = (id: string) => {
    const answer = answers[id];
    return typeof answer === "string" ? answer : "";
  };
  const widths = field.widths ?? (field.columns.length === 2 ? [2, 3] : field.columns.map(() => 1));
  const template = widths.map((width) => `minmax(0,${width}fr)`).join(" ");
  const inputClass =
    "w-full rounded-xl border-2 border-gray-300 bg-white px-3 py-3 text-base text-charcoal focus:border-teal focus:outline-none";
  const twoColumns = field.columns.length === 2;

  return (
    <div>
      <div className="mb-2 hidden gap-2 sm:grid" style={{ gridTemplateColumns: template }}>
        {field.columns.map((column) => (
          <div key={column} className="text-center text-xs font-semibold uppercase tracking-wide text-[#41647a]">
            {column}
          </div>
        ))}
      </div>
      <div className="flex flex-col gap-3">
        {Array.from({ length: field.rows }, (_, row) => (
          <div key={row} className="grid gap-2 max-sm:!grid-cols-1" style={{ gridTemplateColumns: template }}>
            {field.columns.map((column, columnIndex) =>
              twoColumns && columnIndex === 1 ? (
                <textarea
                  key={column}
                  aria-label={`${column} ${row + 1}`}
                  placeholder={column}
                  rows={1}
                  className={`${inputClass} min-h-[3.25rem] resize-y`}
                  value={value(pairId(field, row, columnIndex))}
                  onChange={(event) => onChange(pairId(field, row, columnIndex), event.target.value)}
                />
              ) : (
                <input
                  key={column}
                  aria-label={`${column} ${row + 1}`}
                  placeholder={column}
                  className={inputClass}
                  value={value(pairId(field, row, columnIndex))}
                  onChange={(event) => onChange(pairId(field, row, columnIndex), event.target.value)}
                  autoComplete="off"
                />
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
