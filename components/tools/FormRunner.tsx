"use client";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import SignaturePad from "./SignaturePad";
import WheelInput from "./WheelInput";
import ValuesPicker from "./ValuesPicker";
import PairsInput from "./PairsInput";
import SessionTimer from "./SessionTimer";
import FunnelPicker from "./FunnelPicker";
import CirclesInput from "./CirclesInput";
import { getForm } from "@/lib/tools/forms";
import { computeScores, sectionVisible, todayIso } from "@/lib/tools/scoring";
import { buildPdf, pdfFilename, toBase64 } from "@/lib/tools/pdf";
import type { Answers, AnswerValue, Details, Field, Signatures } from "@/lib/tools/types";

type Status = "editing" | "sending" | "sent" | "failed";

const inputClass =
  "w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-charcoal focus:border-teal focus:outline-none";

const failureMessages: Record<string, string> = {
  not_configured: "Automatic email isn't set up yet.",
  device_not_set_up: "This device isn't set up to email forms yet. Open your setup link on this device once, then come back and finish again.",
  mail_auth_failed: "Microsoft 365 didn't accept the website's sign-in details.",
  mail_send_failed: "Microsoft 365 couldn't send the email.",
  too_large: "The PDF was too large to email.",
  offline: "There's no internet connection right now.",
};

export default function FormRunner({ slug }: { slug: string }) {
  const form = getForm(slug);

  const [details, setDetails] = useState<Details>({ participant: "", coach: "", date: "" });
  const [answers, setAnswers] = useState<Answers>({});
  const [signatures, setSignatures] = useState<Signatures>({});
  const [missing, setMissing] = useState<string[]>([]);
  const [status, setStatus] = useState<Status>("editing");
  const [failure, setFailure] = useState("");
  const [run, setRun] = useState(0); // bumps to reset the signature pads
  const [showPrompts, setShowPrompts] = useState(true);
  const pdf = useRef<{ bytes: Uint8Array; filename: string } | null>(null);
  const dirty = useRef(false);

  // Set the date on the device (not the server) so it is the local date.
  useEffect(() => {
    setDetails((current) => (current.date ? current : { ...current, date: todayIso() }));
  }, []);

  // Coach prompts can be hidden while the participant is looking at the
  // screen. The choice is remembered on this device, separately for each form.
  const promptsKey = `lc_tools_prompts_${slug}`;
  useEffect(() => {
    try {
      localStorage.removeItem("lc_tools_prompts"); // old device-wide setting
      setShowPrompts(localStorage.getItem(promptsKey) !== "hidden");
    } catch {
      // storage unavailable: prompts stay visible
    }
  }, [promptsKey]);
  const togglePrompts = () => {
    setShowPrompts((current) => {
      try {
        localStorage.setItem(promptsKey, current ? "hidden" : "shown");
      } catch {
        // ignore
      }
      return !current;
    });
  };

  // Warn before closing or reloading a part-completed form.
  useEffect(() => {
    const warn = (event: BeforeUnloadEvent) => {
      if (dirty.current) event.preventDefault();
    };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, []);

  const scores = useMemo(() => (form ? computeScores(form, answers) : {}), [form, answers]);
  const summary = useMemo(
    () => (form?.summary ? form.summary({ answers, scores, participant: details.participant.trim() }) : []),
    [form, answers, scores, details.participant]
  );

  if (!form) return null;

  const setAnswer = (id: string, value: AnswerValue) => {
    dirty.current = true;
    setAnswers((current) => ({ ...current, [id]: value }));
    setMissing((current) => current.filter((item) => item !== id));
  };
  const setDetail = (key: keyof Details, value: string) => {
    dirty.current = true;
    setDetails((current) => ({ ...current, [key]: value }));
    setMissing((current) => current.filter((item) => item !== `detail_${key}`));
  };

  const findMissing = (): string[] => {
    const list: string[] = [];
    if (!details.participant.trim()) list.push("detail_participant");
    if (!details.coach.trim()) list.push("detail_coach");
    if (!details.date) list.push("detail_date");
    for (const section of form.sections.filter((item) => sectionVisible(item, answers))) {
      for (const field of section.fields) {
        if (!("required" in field) || !field.required) continue;
        const value = answers[field.id];
        const empty =
          value === undefined || (typeof value === "string" && !value.trim());
        if (empty) list.push(field.id);
      }
    }
    for (const signature of form.signatures) {
      if (signature.required && !signatures[signature.id]) list.push(`signature_${signature.id}`);
    }
    return list;
  };

  const finish = async () => {
    const list = findMissing();
    setMissing(list);
    if (list.length) {
      document.getElementById(`q_${list[0]}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setStatus("sending");
    setFailure("");
    try {
      const cleanDetails = {
        ...details,
        participant: details.participant.trim(),
        coach: details.coach.trim(),
      };
      const bytes = await buildPdf({ form, details: cleanDetails, answers, scores, summary, signatures });
      const filename = pdfFilename(form, cleanDetails);
      pdf.current = { bytes, filename };

      if (!navigator.onLine) throw new Error("offline");
      const response = await fetch("/api/tools/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, formTitle: form.title, pdfBase64: toBase64(bytes) }),
      });
      if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        throw new Error(typeof body?.error === "string" ? body.error : "failed");
      }
      dirty.current = false;
      setStatus("sent");
    } catch (error) {
      const code = error instanceof Error ? error.message : "failed";
      setFailure(failureMessages[code] ?? "The email could not be sent.");
      setStatus("failed");
    }
    window.scrollTo({ top: 0 });
  };

  const savePdf = async () => {
    if (!pdf.current) return;
    const { bytes, filename } = pdf.current;
    const blob = new Blob([bytes as BlobPart], { type: "application/pdf" });
    const file = new File([blob], filename, { type: "application/pdf" });
    try {
      if (navigator.canShare?.({ files: [file] })) {
        await navigator.share({ files: [file], title: filename });
        dirty.current = false;
        return;
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return; // share sheet closed
    }
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 10_000);
    dirty.current = false;
  };

  const startAgain = () => {
    pdf.current = null;
    dirty.current = false;
    setAnswers({});
    setSignatures({});
    setMissing([]);
    setDetails((current) => ({ participant: "", coach: current.coach, date: todayIso() }));
    setRun((value) => value + 1);
    setStatus("editing");
    window.scrollTo({ top: 0 });
  };

  // ---- After finishing -----------------------------------------------------
  if (status === "sent" || status === "failed") {
    const sent = status === "sent";
    return (
      <div className="max-w-xl mx-auto px-5 py-16 text-center">
        <div
          className={`mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full text-3xl text-white ${
            sent ? "bg-teal" : "bg-amber-500"
          }`}
          aria-hidden
        >
          {sent ? "✓" : "!"}
        </div>
        <h1 className="text-2xl font-semibold text-charcoal mb-3">
          {sent ? "All done — PDF sent" : "PDF ready, but not emailed"}
        </h1>
        <p className="text-muted mb-8">
          {sent
            ? `The completed ${form.title} has been emailed as a PDF.`
            : `${failure} The completed form is still here. Save the PDF now so nothing is lost.`}
        </p>
        <div className="flex flex-col gap-3">
          {!sent && (
            <button type="button" onClick={savePdf} className="rounded-xl bg-teal px-6 py-4 text-lg font-semibold text-white">
              Save or share the PDF
            </button>
          )}
          {!sent && (
            <button
              type="button"
              onClick={() => {
                // The signature pads are redrawn empty, so clear the stored
                // signatures too and ask for them again.
                setSignatures({});
                setRun((value) => value + 1);
                setStatus("editing");
              }}
              className="rounded-xl border-2 border-teal px-6 py-4 text-lg font-semibold text-teal"
            >
              Back to the form
            </button>
          )}
          {sent && (
            <button type="button" onClick={savePdf} className="rounded-xl border-2 border-teal px-6 py-4 text-lg font-semibold text-teal">
              Save a copy on this iPad
            </button>
          )}
          {sent && (
            <button type="button" onClick={startAgain} className="rounded-xl bg-teal px-6 py-4 text-lg font-semibold text-white">
              Start a new {form.title}
            </button>
          )}
          {sent && (
            <Link href="/tools" className="px-6 py-3 font-medium text-teal">
              Back to all forms
            </Link>
          )}
        </div>
      </div>
    );
  }

  // ---- The form ------------------------------------------------------------
  const isMissing = (id: string) => missing.includes(id);
  const sending = status === "sending";

  return (
    <div className="max-w-3xl mx-auto px-5 pt-8 pb-24">
      <div className="mb-2 flex items-start justify-between gap-4">
        <h1 className="text-3xl font-semibold text-charcoal">{form.title}</h1>
        {form.sections.some((section) => section.fields.some((field) => field.type === "note" && !field.print)) && (
          <button
            type="button"
            onClick={togglePrompts}
            aria-pressed={showPrompts}
            className="mt-1 shrink-0 rounded-full border-2 border-teal px-4 py-2 text-sm font-medium text-teal"
          >
            {showPrompts ? "Hide coach prompts" : "Show coach prompts"}
          </button>
        )}
      </div>
      <p className="text-muted mb-8">{form.description}</p>

      {form.sessionMinutes && <SessionTimer total={form.sessionMinutes} sections={form.sections} />}

      <Card title="Details">
        <div className="grid gap-5 sm:grid-cols-2">
          <Labelled id="q_detail_participant" label="Participant name" invalid={isMissing("detail_participant")}>
            <input
              className={inputClass}
              value={details.participant}
              onChange={(event) => setDetail("participant", event.target.value)}
              autoComplete="off"
            />
          </Labelled>
          <Labelled id="q_detail_coach" label="Recovery Coach" invalid={isMissing("detail_coach")}>
            <input
              className={inputClass}
              value={details.coach}
              onChange={(event) => setDetail("coach", event.target.value)}
              autoComplete="off"
            />
          </Labelled>
          <Labelled id="q_detail_date" label="Date" invalid={isMissing("detail_date")}>
            <input
              type="date"
              className={inputClass}
              value={details.date}
              onChange={(event) => setDetail("date", event.target.value)}
            />
          </Labelled>
        </div>
      </Card>

      {form.sections.filter((section) => sectionVisible(section, answers)).map((section) => (
        <Card key={section.title} title={section.title} intro={section.intro} minutes={section.minutes}>
          <div className="flex flex-col gap-7">
            {section.fields.map((field) =>
              field.type === "note" ? (
                field.print ? (
                  <div key={field.id} className="rounded-xl border border-gray-200 bg-offwhite px-5 py-4">
                    <div className="font-semibold text-teal">{field.label}</div>
                    <p className="mt-1 whitespace-pre-line text-charcoal">{field.text}</p>
                  </div>
                ) : !showPrompts ? null : (
                <div key={field.id} className="rounded-xl border-l-4 border-teal bg-teal/5 px-5 py-4">
                  <div className="text-xs font-semibold uppercase tracking-wide text-teal">{field.label}</div>
                  <p className="mt-1 whitespace-pre-line text-charcoal">{field.text}</p>
                </div>
                )
              ) : (
              <Labelled
                key={field.id}
                id={`q_${field.id}`}
                label={field.label}
                help={field.help}
                invalid={isMissing(field.id)}
              >
                {field.type === "wheel" ? (
                  <WheelInput field={field} answers={answers} onChange={setAnswer} />
                ) : field.type === "values" ? (
                  <ValuesPicker field={field} answers={answers} onChange={setAnswer} />
                ) : field.type === "circles" ? (
                  <CirclesInput field={field} answers={answers} onChange={setAnswer} />
                ) : field.type === "funnel" ? (
                  <FunnelPicker field={field} answers={answers} onChange={setAnswer} />
                ) : field.type === "pairs" ? (
                  <PairsInput field={field} answers={answers} onChange={setAnswer} />
                ) : (
                  <FieldInput field={field} value={answers[field.id]} onChange={(value) => setAnswer(field.id, value)} />
                )}
              </Labelled>
              )
            )}
          </div>
        </Card>
      ))}

      {(form.scores?.length || form.summary) && (
        <Card
          title={form.scores?.length ? "Score and summary" : "Summary"}
          intro="Worked out automatically from the answers above."
        >
          <div className="flex flex-col gap-3">
            {(form.scores ?? []).map((def) => {
              const score = scores[def.id];
              return (
                <div key={def.id} className="flex items-center justify-between gap-4 rounded-xl bg-teal/5 px-5 py-4">
                  <div>
                    <div className="font-semibold text-charcoal">{score.label}</div>
                    <div className="text-sm text-muted">
                      {score.value === null
                        ? `${score.answered} of ${score.total} rated so far`
                        : [score.band, score.answered < score.total ? `based on ${score.answered} of ${score.total}` : ""]
                            .filter(Boolean)
                            .join(" · ")}
                    </div>
                  </div>
                  <div className="text-2xl font-semibold text-teal whitespace-nowrap">
                    {score.value === null ? "–" : `${score.value} / ${score.outOf}`}
                  </div>
                </div>
              );
            })}
          </div>
          {summary.length > 0 && (
            <div className="mt-5 flex flex-col gap-2 text-charcoal">
              {summary.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          )}
        </Card>
      )}

      {form.signatures.length > 0 && (
        <Card title={form.signaturesTitle ?? "Signatures"}>
          <div className="grid gap-6 sm:grid-cols-2">
            {form.signatures.map((signature) => (
              <div key={`${signature.id}_${run}`} id={`q_signature_${signature.id}`}>
                <SignaturePad
                  label={signature.label}
                  invalid={isMissing(`signature_${signature.id}`)}
                  onChange={(dataUrl) => {
                    dirty.current = true;
                    setSignatures((current) => ({ ...current, [signature.id]: dataUrl }));
                    setMissing((current) => current.filter((item) => item !== `signature_${signature.id}`));
                  }}
                />
                {isMissing(`signature_${signature.id}`) && (
                  <p className="mt-2 text-sm font-medium text-red-600">A signature is needed here.</p>
                )}
              </div>
            ))}
          </div>
        </Card>
      )}

      {missing.length > 0 && (
        <p role="alert" className="mb-4 rounded-xl bg-red-50 px-5 py-4 font-medium text-red-700">
          {missing.length === 1
            ? "One item still needs to be completed. It is outlined in red."
            : `${missing.length} items still need to be completed. They are outlined in red.`}
        </p>
      )}

      <button
        type="button"
        onClick={finish}
        disabled={sending}
        className="w-full rounded-xl bg-teal px-6 py-5 text-lg font-semibold text-white disabled:opacity-60"
      >
        {sending ? "Creating and sending the PDF…" : "Finish and send PDF"}
      </button>
    </div>
  );
}

function Card({
  title,
  intro,
  minutes,
  children,
}: {
  title: string;
  intro?: string;
  minutes?: [number, number];
  children: React.ReactNode;
}) {
  return (
    <section className="mb-6 rounded-2xl border border-gray-200 bg-white p-6 sm:p-8">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-xl font-semibold text-teal">{title}</h2>
        {minutes && (
          <span className="mt-0.5 shrink-0 rounded-full bg-teal/10 px-3 py-1 text-sm font-semibold text-teal">
            {minutes[0]}–{minutes[1]} min
          </span>
        )}
      </div>
      {intro && <p className="mt-1 text-muted">{intro}</p>}
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Labelled({
  id,
  label,
  help,
  invalid,
  children,
}: {
  id: string;
  label: string;
  help?: string;
  invalid?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div id={id} className={invalid ? "rounded-xl outline outline-2 outline-offset-8 outline-red-500" : undefined}>
      <div className="mb-2 font-medium text-charcoal">{label}</div>
      {help && <div className="-mt-1 mb-2 text-sm text-muted">{help}</div>}
      {children}
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: AnswerValue;
  onChange: (value: AnswerValue) => void;
}) {
  switch (field.type) {
    case "text":
      return (
        <input
          aria-label={field.label}
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
          autoComplete="off"
        />
      );
    case "date":
      return (
        <input
          type="date"
          aria-label={field.label}
          className={inputClass}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "textarea":
      return (
        <textarea
          aria-label={field.label}
          className={`${inputClass} min-h-[7.5rem]`}
          value={typeof value === "string" ? value : ""}
          onChange={(event) => onChange(event.target.value)}
        />
      );
    case "choice":
      return (
        <div role="radiogroup" aria-label={field.label} className="flex flex-wrap gap-2">
          {field.options.map((option) => (
            <Pill key={option} role="radio" selected={value === option} onClick={() => onChange(value === option ? undefined : option)}>
              {option}
            </Pill>
          ))}
        </div>
      );
    case "multi": {
      const selected = Array.isArray(value) ? value : [];
      return (
        <div role="group" aria-label={field.label} className="flex flex-wrap gap-2">
          {field.options.map((option) => (
            <Pill
              key={option}
              role="checkbox"
              selected={selected.includes(option)}
              onClick={() =>
                onChange(
                  selected.includes(option)
                    ? selected.filter((item) => item !== option)
                    : field.options.filter((item) => item === option || selected.includes(item))
                )
              }
            >
              {option}
            </Pill>
          ))}
        </div>
      );
    }
    case "note":
    case "wheel":
    case "values":
    case "pairs":
    case "funnel":
    case "circles":
      return null;
    case "scale": {
      const steps = Array.from({ length: field.max - field.min + 1 }, (_, index) => field.min + index);
      return (
        <div>
          <div
            role="radiogroup"
            aria-label={field.label}
            className="grid gap-2"
            style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
          >
            {steps.map((step) => (
              <button
                key={step}
                type="button"
                role="radio"
                aria-checked={value === step}
                onClick={() => onChange(value === step ? undefined : step)}
                className={`h-14 rounded-xl border-2 text-lg font-semibold transition-colors ${
                  value === step
                    ? "border-teal bg-teal text-white"
                    : "border-gray-300 bg-white text-charcoal"
                }`}
              >
                {step}
              </button>
            ))}
          </div>
          {(field.minLabel || field.maxLabel) && (
            <div className="mt-1.5 flex justify-between text-sm text-muted">
              <span>{field.minLabel}</span>
              <span>{field.maxLabel}</span>
            </div>
          )}
        </div>
      );
    }
  }
}

function Pill({
  selected,
  role,
  onClick,
  children,
}: {
  selected: boolean;
  role: "radio" | "checkbox";
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      role={role}
      aria-checked={selected}
      onClick={onClick}
      className={`min-h-[3rem] rounded-full border-2 px-5 py-2 text-base font-medium transition-colors ${
        selected ? "border-teal bg-teal text-white" : "border-gray-300 bg-white text-charcoal"
      }`}
    >
      {children}
    </button>
  );
}
