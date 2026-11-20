import type { Metadata } from "next";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Feedback & Complaints | Lumen Collective",
  description:
    "We welcome your feedback. If you have a concern or complaint, please use this form and we will respond promptly.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/feedback-and-complaints",
  },
};

export default function FeedbackAndComplaintsPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-brown mb-4">
            Feedback &amp; Complaints
          </h1>
          <p className="text-lg text-brown/85 leading-relaxed">
            Your feedback helps us improve. If something has not met your
            expectations, please let us know — we take all feedback seriously
            and will respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Astalty embedded form — renders into the div below */}
          <div id="astalty-feedback-form" />
          <Script
            src="https://api.app.astalty.com.au/v2/forms/a19bd520-f5b8-49a0-bb49-0916572a5874/embed.js"
            strategy="lazyOnload"
          />
        </div>
      </section>
    </div>
  );
}
