"use client";
import { useState } from "react";

const inputCls =
  "w-full px-4 py-2.5 rounded border border-sage-soft bg-white text-brown text-sm placeholder:text-brown/40 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/50 transition-colors";

const labelCls = "block text-sm font-medium text-brown mb-1.5";

const radioCls =
  "flex items-center gap-2.5 py-2 cursor-pointer text-sm text-brown select-none";

type Status = "idle" | "submitting" | "success" | "error";

export default function FeedbackForm() {
  const [feedbackType, setFeedbackType]   = useState("");
  const [anonymous, setAnonymous]         = useState("");
  const [name, setName]                   = useState("");
  const [email, setEmail]                 = useState("");
  const [phone, setPhone]                 = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [aboutWho, setAboutWho]           = useState("");
  const [aboutService, setAboutService]   = useState("");
  const [whatHappened, setWhatHappened]   = useState("");
  const [whenDate, setWhenDate]           = useState("");
  const [whatNext, setWhatNext]           = useState("");
  const [advocate, setAdvocate]           = useState("");
  const [honeypot, setHoneypot]           = useState("");
  const [status, setStatus]               = useState<Status>("idle");
  const [errorMsg, setErrorMsg]           = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          feedbackType,
          anonymous,
          name: anonymous === "No" ? name : "",
          email: anonymous === "No" ? email : "",
          phone: anonymous === "No" ? phone : "",
          contactMethod: anonymous === "No" ? contactMethod : "",
          aboutWho,
          aboutService,
          whatHappened,
          whenDate,
          whatNext,
          advocate,
          website: honeypot,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again or email me directly.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email me directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-sage-tint rounded p-8">
        <p className="text-brown font-semibold text-lg mb-1">Thank you.</p>
        <p className="text-brown/85 text-sm">
          Your feedback has been sent. If you left your details, I will be in
          touch within 2 business days.
        </p>
      </div>
    );
  }

  const showIdentity = anonymous === "No";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Honeypot */}
      <div aria-hidden="true" className="absolute -top-[9999px] left-0 w-0 h-0 overflow-hidden">
        <label htmlFor="ff-website">Website</label>
        <input
          id="ff-website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
        />
      </div>

      {/* 1. Feedback type */}
      <fieldset>
        <legend className={labelCls}>
          What would you like to share? <span className="text-peach">*</span>
        </legend>
        <div className="mt-1 divide-y divide-sage-soft/60">
          {["A compliment", "A suggestion", "A complaint"].map((opt) => (
            <label key={opt} className={radioCls}>
              <input
                type="radio"
                name="feedbackType"
                value={opt}
                required
                checked={feedbackType === opt}
                onChange={() => setFeedbackType(opt)}
                className="accent-sage w-4 h-4 flex-shrink-0"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 2. Anonymous */}
      <fieldset>
        <legend className={labelCls}>
          Would you like to stay anonymous? <span className="text-peach">*</span>
        </legend>
        <div className="mt-1 divide-y divide-sage-soft/60">
          {["Yes", "No"].map((opt) => (
            <label key={opt} className={radioCls}>
              <input
                type="radio"
                name="anonymous"
                value={opt}
                required
                checked={anonymous === opt}
                onChange={() => setAnonymous(opt)}
                className="accent-sage w-4 h-4 flex-shrink-0"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 2b. Identity fields (shown if not anonymous) */}
      {showIdentity && (
        <div className="space-y-5 pl-6 border-l-2 border-sage-soft">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="ff-name" className={labelCls}>
                Your name <span className="text-peach">*</span>
              </label>
              <input
                id="ff-name"
                type="text"
                required
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="ff-email" className={labelCls}>
                Email <span className="text-peach">*</span>
              </label>
              <input
                id="ff-email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={inputCls}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="ff-phone" className={labelCls}>
                Phone{" "}
                <span className="text-brown/50 font-normal">(optional)</span>
              </label>
              <input
                id="ff-phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="04xx xxx xxx"
                className={inputCls}
              />
            </div>
            <div>
              <label htmlFor="ff-contact" className={labelCls}>
                Best way to contact you{" "}
                <span className="text-brown/50 font-normal">(optional)</span>
              </label>
              <select
                id="ff-contact"
                value={contactMethod}
                onChange={(e) => setContactMethod(e.target.value)}
                className={inputCls}
              >
                <option value="">Select</option>
                <option>Email</option>
                <option>Phone call</option>
                <option>Text message</option>
              </select>
            </div>
          </div>
        </div>
      )}

      {/* 3. Who is this about */}
      <fieldset>
        <legend className={labelCls}>
          Who is this about?{" "}
          <span className="text-brown/50 font-normal">(optional)</span>
        </legend>
        <div className="mt-1 divide-y divide-sage-soft/60">
          {[
            "Me",
            "Someone I support or care for",
            "I am a provider or professional",
          ].map((opt) => (
            <label key={opt} className={radioCls}>
              <input
                type="radio"
                name="aboutWho"
                value={opt}
                checked={aboutWho === opt}
                onChange={() => setAboutWho(opt)}
                className="accent-sage w-4 h-4 flex-shrink-0"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 4. Which service */}
      <fieldset>
        <legend className={labelCls}>
          Which service is this about?{" "}
          <span className="text-brown/50 font-normal">(optional)</span>
        </legend>
        <div className="mt-1 divide-y divide-sage-soft/60">
          {[
            "Support Coordination",
            "Psychosocial Recovery Coaching",
            "Counselling",
            "Something else or not sure",
          ].map((opt) => (
            <label key={opt} className={radioCls}>
              <input
                type="radio"
                name="aboutService"
                value={opt}
                checked={aboutService === opt}
                onChange={() => setAboutService(opt)}
                className="accent-sage w-4 h-4 flex-shrink-0"
              />
              {opt}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 5. What happened */}
      <div>
        <label htmlFor="ff-what" className={labelCls}>
          What happened? <span className="text-peach">*</span>
        </label>
        <p className="text-xs text-brown/85 mb-1.5">
          Tell me as much or as little as you like.
        </p>
        <textarea
          id="ff-what"
          required
          rows={5}
          value={whatHappened}
          onChange={(e) => setWhatHappened(e.target.value)}
          className={`${inputCls} resize-y`}
        />
      </div>

      {/* 6. When */}
      <div>
        <label htmlFor="ff-when" className={labelCls}>
          When did it happen?{" "}
          <span className="text-brown/50 font-normal">(optional)</span>
        </label>
        <input
          id="ff-when"
          type="date"
          value={whenDate}
          onChange={(e) => setWhenDate(e.target.value)}
          className={`${inputCls} max-w-xs`}
        />
      </div>

      {/* 7. What next */}
      <div>
        <label htmlFor="ff-next" className={labelCls}>
          What would you like to happen now?{" "}
          <span className="text-brown/50 font-normal">(optional)</span>
        </label>
        <textarea
          id="ff-next"
          rows={3}
          value={whatNext}
          onChange={(e) => setWhatNext(e.target.value)}
          className={`${inputCls} resize-y`}
        />
      </div>

      {/* 8. Advocate */}
      <div>
        <label htmlFor="ff-advocate" className={labelCls}>
          Is someone helping you with this feedback?{" "}
          <span className="text-brown/50 font-normal">(optional)</span>
        </label>
        <p className="text-xs text-brown/85 mb-1.5">
          Name and relationship, for example a family member or advocate.
        </p>
        <input
          id="ff-advocate"
          type="text"
          value={advocate}
          onChange={(e) => setAdvocate(e.target.value)}
          className={inputCls}
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-brown bg-peach-tint border border-peach/30 rounded px-4 py-3">
          {errorMsg}{" "}
          <a
            href="mailto:admin@lumencollective.com.au"
            className="underline font-medium"
          >
            admin@lumencollective.com.au
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-peach text-brown font-semibold rounded-full px-8 py-3 hover:bg-peach/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {status === "submitting" ? "Sending..." : "Send feedback"}
      </button>
    </form>
  );
}
