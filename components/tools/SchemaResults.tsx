"use client";
import { useState } from "react";
import { highlightedSchemas, schemaResults, SCHEMA_DOMAINS, type SchemaResult } from "@/lib/tools/forms/schema-shared";
import { buildPdf, pdfFilename } from "@/lib/tools/pdf";
import { shareOrDownloadPdf } from "@/lib/tools/share";
import type { Answers, Details, FormDef, SchemaResultsField } from "@/lib/tools/types";

type Props = {
  field: SchemaResultsField;
  answers: Answers;
  details: Details;
  form: FormDef;
};

export const BAND_STYLE: Record<SchemaResult["band"], { bar: string; label: string }> = {
  strong: { bar: "bg-[#154f4f]", label: "Strong pattern" },
  some: { bar: "bg-[#3b8f86]", label: "Shows up sometimes" },
  low: { bar: "bg-[#b8d3d0]", label: "Less of a pattern" },
};

// A results-only version of the quiz for the participant: their chart and
// belief cards, with no coach prompts, reflections or signatures.
export function participantResultsForm(form: FormDef, field: SchemaResultsField): FormDef {
  const about = form.sections[0];
  return {
    ...form,
    title: "My Schema Quiz Results",
    sections: [
      { ...about, fields: about.fields.filter((item) => item.type === "note" && item.print && item.id === "about") },
      { title: "My results", fields: [field] },
    ],
    scores: undefined,
    summary: undefined,
    signatures: [],
    hideEmpty: true,
  };
}

export default function SchemaResults({ field, answers, details, form }: Props) {
  const [busy, setBusy] = useState(false);
  const results = schemaResults(answers);
  const byId = new Map(results.map((item) => [item.schema.id, item]));
  const highlighted = highlightedSchemas(results);

  if (!results.length) {
    return <p className="text-muted">Your results will appear here as you answer the quiz.</p>;
  }

  const download = async () => {
    setBusy(true);
    try {
      const clientForm = participantResultsForm(form, field);
      const bytes = await buildPdf({
        form: clientForm,
        details,
        answers,
        scores: {},
        summary: [],
        signatures: {},
      });
      await shareOrDownloadPdf(bytes, pdfFilename(clientForm, details));
    } finally {
      setBusy(false);
    }
  };

  return (
    <div>
      <p className="mb-4 text-muted">
        Each pattern scores from 2 to 10. Higher scores mean the pattern is more likely to show up in your life.
        {results.length < 18 && ` ${results.length} of 18 answered so far.`}
      </p>

      {/* Chart */}
      <div className="mb-3 flex flex-wrap gap-4 text-xs text-muted">
        {(Object.keys(BAND_STYLE) as SchemaResult["band"][]).map((band) => (
          <span key={band} className="flex items-center gap-1.5">
            <span className={`inline-block h-3 w-3 rounded-sm ${BAND_STYLE[band].bar}`} />
            {BAND_STYLE[band].label}
          </span>
        ))}
      </div>
      <div className="flex flex-col gap-4">
        {SCHEMA_DOMAINS.map((domain) => (
          <div key={domain.name}>
            <div className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-teal">{domain.name}</div>
            <div className="flex flex-col gap-1.5">
              {domain.schemas.map((schema) => {
                const result = byId.get(schema.id);
                return (
                  <div key={schema.id} className="grid grid-cols-[minmax(0,11rem)_1fr_2.5rem] items-center gap-3 sm:grid-cols-[minmax(0,15rem)_1fr_2.5rem]">
                    <span className="truncate text-sm text-charcoal">{schema.name}</span>
                    <div className="h-4 rounded-full bg-gray-100">
                      {result && (
                        <div
                          className={`h-4 rounded-full ${BAND_STYLE[result.band].bar}`}
                          style={{ width: `${(result.score / 10) * 100}%` }}
                        />
                      )}
                    </div>
                    <span className="text-right text-sm font-semibold text-charcoal">{result ? result.score : "–"}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Cards */}
      <h3 className="mb-3 mt-8 text-lg font-semibold text-charcoal">
        {highlighted.some((item) => item.band !== "low") ? "Your strongest patterns" : "Your highest scores"}
      </h3>
      <div className="flex flex-col gap-4">
        {highlighted.map(({ schema, score, band }) => (
          <div key={schema.id} className="rounded-xl border border-gray-200 bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <div className="text-lg font-semibold text-charcoal">{schema.name}</div>
                <div className="text-sm text-muted">{schema.formal}</div>
              </div>
              <span className={`shrink-0 rounded-full px-3 py-1 text-sm font-semibold text-white ${BAND_STYLE[band].bar}`}>
                {score}/10
              </span>
            </div>
            <p className="mt-3 text-charcoal">{schema.meaning}</p>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal">Common beliefs</div>
            <ul className="mt-1 list-disc pl-5 text-charcoal">
              {schema.beliefs.map((belief) => (
                <li key={belief}>&ldquo;{belief}&rdquo;</li>
              ))}
            </ul>
            <div className="mt-3 text-xs font-semibold uppercase tracking-wide text-teal">A more balanced thought to try</div>
            <p className="mt-1 italic text-charcoal">&ldquo;{schema.balanced}&rdquo;</p>
          </div>
        ))}
      </div>

      <p className="mt-5 text-sm text-muted">
        These results are a starting point for reflection, not a diagnosis. Patterns can change with time, support and practice.
      </p>

      <button
        type="button"
        onClick={download}
        disabled={busy}
        className="mt-5 w-full rounded-xl border-2 border-teal px-6 py-4 font-semibold text-teal disabled:opacity-50"
      >
        {busy ? "Preparing…" : `Download results for ${details.participant.trim() || "the participant"}`}
      </button>
      <p className="mt-2 text-center text-xs text-muted">
        A clean copy of these results to give them, with no notes or coach prompts. Opens the share sheet to AirDrop, print or message it.
      </p>
    </div>
  );
}
