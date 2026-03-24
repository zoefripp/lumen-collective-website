"use client";

import { useState } from "react";

// SETUP: Replace YOUR_FORMSPREE_ENDPOINT with your Formspree form ID
// e.g. https://formspree.io/f/xyzabcde
// Sign in at formspree.io, create a form pointed to admin@lumencollective.com.au, and paste the ID here
const FORMSPREE_URL = "https://formspree.io/f/mdawqpzv";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch(FORMSPREE_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          phone: formData.phone,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ fullName: "", email: "", phone: "", message: "" });
      } else {
        setError(
          "Something went wrong. Please try again or email us directly."
        );
      }
    } catch {
      setError(
        "Something went wrong. Please try again or email us directly."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted">
            Whether you&apos;re ready to get started or just have questions,
            we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {submitted ? (
            <div className="bg-[#1a6b6b]/10 border border-[#1a6b6b]/20 rounded-lg p-6">
              <p className="text-[#1a6b6b] font-medium text-lg">
                Thanks for reaching out — we&apos;ll be in touch shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Full Name */}
              <div>
                <label
                  htmlFor="fullName"
                  className="block text-sm font-medium text-charcoal mb-1.5"
                >
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b6b] focus:border-transparent transition-shadow text-sm"
                  placeholder="Your full name"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-charcoal mb-1.5"
                >
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b6b] focus:border-transparent transition-shadow text-sm"
                  placeholder="you@example.com"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium text-charcoal mb-1.5"
                >
                  Phone{" "}
                  <span className="text-muted font-normal">(optional)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b6b] focus:border-transparent transition-shadow text-sm"
                  placeholder="04xx xxx xxx"
                />
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-charcoal mb-1.5"
                >
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-md text-charcoal placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#1a6b6b] focus:border-transparent transition-shadow text-sm resize-none"
                  placeholder="Tell us a bit about your situation and what you're looking for..."
                />
              </div>

              {error && (
                <p className="text-red-600 text-sm">{error}</p>
              )}

              <button
                type="submit"
                disabled={submitting}
                className="w-full sm:w-auto bg-[#1a6b6b] hover:bg-[#154f4f] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium px-8 py-3 rounded-md transition-colors duration-150"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

          {/* Direct contact */}
          <div className="mt-10 pt-8 border-t border-gray-200">
            <p className="text-sm text-muted">
              You can also reach us directly by email:
            </p>
            <a
              href="mailto:admin@lumencollective.com.au"
              className="text-[#1a6b6b] font-medium hover:text-[#154f4f] transition-colors duration-150 text-sm mt-1 inline-block"
            >
              admin@lumencollective.com.au
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
