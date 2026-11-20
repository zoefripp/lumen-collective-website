"use client";
import { useState } from "react";

const TOPICS = [
  "Booking a free intro call",
  "Counselling",
  "Psychosocial Recovery Coaching",
  "Support Coordination",
  "Something else",
] as const;

const TOPIC_PARAM_MAP: Record<string, string> = {
  "intro-call": "Booking a free intro call",
  counselling: "Counselling",
  "psychosocial-recovery-coaching": "Psychosocial Recovery Coaching",
  "support-coordination": "Support Coordination",
};

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-sage-soft bg-white text-brown text-sm placeholder:text-brown/40 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/50 transition-colors";

const labelCls = "block text-sm font-medium text-brown mb-1.5";

type Props = { initialTopic?: string };
type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm({ initialTopic = "" }: Props) {
  const resolvedTopic = TOPIC_PARAM_MAP[initialTopic] ?? initialTopic;
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [phone, setPhone]     = useState("");
  const [topic, setTopic]     = useState(resolvedTopic);
  const [message, setMessage] = useState("");
  const [status, setStatus]   = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, topic, message, website: "" }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-sage-tint rounded p-8">
        <p className="text-brown font-semibold text-lg mb-1">Message received.</p>
        <p className="text-brown/80 text-sm">Thanks for getting in touch. I will reply within one business day.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelCls}>Name <span className="text-peach">*</span></label>
          <input
            id="cf-name" type="text" required autoComplete="name"
            value={name} onChange={(e) => setName(e.target.value)}
            placeholder="Your name" className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelCls}>Email <span className="text-peach">*</span></label>
          <input
            id="cf-email" type="email" required autoComplete="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com" className={inputCls}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className={labelCls}>Phone <span className="text-brown/50 font-normal">(optional)</span></label>
          <input
            id="cf-phone" type="tel" autoComplete="tel"
            value={phone} onChange={(e) => setPhone(e.target.value)}
            placeholder="04xx xxx xxx" className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="cf-topic" className={labelCls}>What can I help with? <span className="text-peach">*</span></label>
          <select
            id="cf-topic" required
            value={topic} onChange={(e) => setTopic(e.target.value)}
            className={inputCls}
          >
            <option value="" disabled>Select a topic</option>
            {TOPICS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelCls}>Message <span className="text-peach">*</span></label>
        <textarea
          id="cf-message" required rows={5}
          value={message} onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell me a bit about what you are looking for..."
          className={`${inputCls} resize-y`}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-brown bg-peach-tint border border-peach/30 rounded-xl px-4 py-3">
          {errorMsg}{" "}
          <a href="mailto:admin@lumencollective.com.au" className="underline font-medium">
            admin@lumencollective.com.au
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-peach text-brown font-semibold rounded-full px-8 py-3 hover:bg-peach/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}
