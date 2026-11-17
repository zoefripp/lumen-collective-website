"use client";
import { useEffect, useState } from "react";

type Status = { mail: boolean; device: boolean } | null;

const setupMessages: Record<string, { tone: "good" | "bad"; text: string }> = {
  done: { tone: "good", text: "This device is now set up to email completed forms." },
  "wrong-key": { tone: "bad", text: "That setup link isn't right. Check it matches the key saved in Vercel." },
  "not-configured": { tone: "bad", text: "The setup key hasn't been added in Vercel yet." },
};

// Shows on the forms menu whether finishing a form will email the PDF.
export default function MailStatus() {
  const [status, setStatus] = useState<Status>(null);
  const [setup, setSetup] = useState<string | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const result = params.get("setup");
    if (result) {
      setSetup(result);
      window.history.replaceState(null, "", window.location.pathname); // keep the key out of history
    }
    fetch("/api/tools/status", { cache: "no-store" })
      .then((response) => response.json())
      .then(setStatus)
      .catch(() => setStatus(null));
  }, []);

  const notice = setup ? setupMessages[setup] : undefined;
  let line: { tone: "good" | "bad"; text: string } | null = null;
  if (status) {
    if (!status.mail) line = { tone: "bad", text: "Automatic email isn't connected yet. Finished forms can be saved or shared from this device." };
    else if (!status.device) line = { tone: "bad", text: "This device isn't set up to email forms yet. Open your setup link on this device once." };
    else line = { tone: "good", text: "Finished forms are emailed to you automatically." };
  }

  return (
    <div className="mb-6 flex flex-col gap-2">
      {notice && <Banner tone={notice.tone} text={notice.text} />}
      {line && !(notice?.tone === "good" && line.tone === "good") && <Banner tone={line.tone} text={line.text} />}
    </div>
  );
}

function Banner({ tone, text }: { tone: "good" | "bad"; text: string }) {
  return (
    <p
      role="status"
      className={`rounded-xl px-5 py-3 text-sm font-medium ${
        tone === "good" ? "bg-teal/10 text-teal" : "bg-amber-50 text-amber-800"
      }`}
    >
      {text}
    </p>
  );
}
