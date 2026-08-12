import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Referral | Lumen Collective",
  description:
    "Refer a participant to Lumen Collective for NDIS Support Coordination. Complete our referral form and we'll be in touch promptly.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/referral",
  },
};

export default function ReferralPage() {
  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Make a Referral
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Thank you for thinking of us. Please complete the form below and one
            of our coordinators will follow up with you directly.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <iframe
            src="https://formspree.io/f/mgawkbkz"
            style={{ border: "none", width: "100%", minHeight: "700px" }}
            title="Referral Form"
          />
        </div>
      </section>
    </div>
  );
}
