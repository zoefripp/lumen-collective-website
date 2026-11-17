"use client";
import { useState } from "react";

export default function ToolsLogin() {
  const [passcode, setPasscode] = useState("");
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setBusy(true);
    setMessage("");
    try {
      const response = await fetch("/api/tools/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passcode }),
      });
      if (response.ok) {
        window.location.href = "/tools";
        return;
      }
      setMessage(
        response.status === 503
          ? "A passcode hasn't been set up for this page yet."
          : "That passcode isn't right. Please try again."
      );
    } catch {
      setMessage("Couldn't connect. Check the internet connection and try again.");
    }
    setBusy(false);
  };

  return (
    <form onSubmit={submit} className="max-w-sm mx-auto px-5 py-20">
      <h1 className="text-2xl font-semibold text-charcoal mb-2">Staff access</h1>
      <p className="text-muted mb-6">Enter the passcode to open the forms.</p>
      <label htmlFor="passcode" className="block mb-2 font-medium text-charcoal">
        Passcode
      </label>
      <input
        id="passcode"
        type="password"
        value={passcode}
        onChange={(event) => setPasscode(event.target.value)}
        autoComplete="current-password"
        className="w-full rounded-xl border-2 border-gray-300 bg-white px-4 py-3 text-base text-charcoal focus:border-teal focus:outline-none"
      />
      {message && (
        <p role="alert" className="mt-3 font-medium text-red-600">
          {message}
        </p>
      )}
      <button
        type="submit"
        disabled={busy || !passcode}
        className="mt-6 w-full rounded-xl bg-teal px-6 py-4 text-lg font-semibold text-white disabled:opacity-60"
      >
        {busy ? "Checking…" : "Open forms"}
      </button>
    </form>
  );
}
