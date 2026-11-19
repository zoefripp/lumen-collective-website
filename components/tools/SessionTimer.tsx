"use client";
import { useEffect, useState } from "react";
import type { Section } from "@/lib/tools/types";

const clock = (ms: number) => {
  const total = Math.floor(ms / 1000);
  return `${Math.floor(total / 60)}:${String(total % 60).padStart(2, "0")}`;
};

// A small sticky timer for session plans: start, pause and reset, with the
// part of the session you'd be up to at this point.
export default function SessionTimer({ total, sections }: { total: number; sections: Section[] }) {
  const [elapsed, setElapsed] = useState(0); // ms banked while paused
  const [startedAt, setStartedAt] = useState<number | null>(null);
  const [, setTick] = useState(0);

  useEffect(() => {
    if (startedAt === null) return;
    const id = window.setInterval(() => setTick((value) => value + 1), 1000);
    return () => window.clearInterval(id);
  }, [startedAt]);

  const now = elapsed + (startedAt === null ? 0 : Date.now() - startedAt);
  const minute = now / 60000;
  const current = sections.find((section) => section.minutes && minute >= section.minutes[0] && minute < section.minutes[1]);
  const over = minute >= total;
  const running = startedAt !== null;

  const toggle = () => {
    if (running) {
      setElapsed(now);
      setStartedAt(null);
    } else {
      setStartedAt(Date.now());
    }
  };
  const reset = () => {
    setElapsed(0);
    setStartedAt(null);
  };

  return (
    <div className="sticky top-0 z-20 -mx-5 mb-6 flex items-center gap-3 border-b border-gray-200 bg-offwhite/95 px-5 py-3 backdrop-blur">
      <div className={`font-mono text-xl font-semibold tabular-nums ${over ? "text-amber-700" : "text-teal"}`}>
        {clock(now)}
        <span className="text-sm font-normal text-muted"> / {total}:00</span>
      </div>
      <div className="min-w-0 flex-1 truncate text-sm text-muted">
        {now === 0 ? "Start the timer when the session begins." : over ? "Time to close the session." : current ? `Now: ${current.title}` : ""}
      </div>
      <button
        type="button"
        onClick={toggle}
        className="rounded-full bg-teal px-4 py-2 text-sm font-semibold text-white"
      >
        {running ? "Pause" : now === 0 ? "Start" : "Resume"}
      </button>
      {now > 0 && !running && (
        <button type="button" onClick={reset} className="px-2 py-2 text-sm font-medium text-teal">
          Reset
        </button>
      )}
    </div>
  );
}
