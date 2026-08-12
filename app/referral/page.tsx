import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Referral | Lumen Collective",
  description:
    "Refer a participant to Lumen Collective for NDIS Support Coordination. Complete our referral form and we'll be in touch promptly.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/referral",
  },
};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:border-[#1a6b6b] focus:outline-none focus:ring-1 focus:ring-[#1a6b6b]";

const labelClass = "block text-sm font-medium text-charcoal mb-1";

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
          <form
            action="https://formspree.io/f/mgawkbkz"
            method="POST"
            className="bg-white rounded-xl shadow-sm p-8 space-y-6"
          >
            <input
              type="hidden"
              name="_next"
              value="https://www.lumencollective.com.au/referral?submitted=true"
            />
            <input type="hidden" name="_subject" value="New Referral — Lumen Collective" />

            <p className="text-sm font-semibold text-[#1a6b6b] uppercase tracking-wide">
              Your details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="referrer_name" className={labelClass}>
                  Your name <span className="text-red-500">*</span>
                </label>
                <input
                  id="referrer_name"
                  name="referrer_name"
                  type="text"
                  required
                  placeholder="Jane Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="referrer_role" className={labelClass}>
                  Your role / organisation
                </label>
                <input
                  id="referrer_role"
                  name="referrer_role"
                  type="text"
                  placeholder="Social worker, GP practice…"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="referrer_email" className={labelClass}>
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  id="referrer_email"
                  name="referrer_email"
                  type="email"
                  required
                  placeholder="jane@example.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="referrer_phone" className={labelClass}>
                  Your phone
                </label>
                <input
                  id="referrer_phone"
                  name="referrer_phone"
                  type="tel"
                  placeholder="04xx xxx xxx"
                  className={inputClass}
                />
              </div>
            </div>

            <hr className="border-gray-100" />

            <p className="text-sm font-semibold text-[#1a6b6b] uppercase tracking-wide">
              Participant details
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="participant_name" className={labelClass}>
                  Participant name <span className="text-red-500">*</span>
                </label>
                <input
                  id="participant_name"
                  name="participant_name"
                  type="text"
                  required
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="participant_contact" className={labelClass}>
                  Participant contact number
                </label>
                <input
                  id="participant_contact"
                  name="participant_contact"
                  type="tel"
                  placeholder="04xx xxx xxx"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="ndis_number" className={labelClass}>
                  NDIS number (if known)
                </label>
                <input
                  id="ndis_number"
                  name="ndis_number"
                  type="text"
                  placeholder="43xxxxxxx"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="plan_management" className={labelClass}>
                  Plan management type
                </label>
                <select
                  id="plan_management"
                  name="plan_management"
                  className={inputClass}
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select…
                  </option>
                  <option>Plan managed</option>
                  <option>Self managed</option>
                  <option>NDIA managed</option>
                  <option>Not sure</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="referral_reason" className={labelClass}>
                Reason for referral / areas of support needed{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="referral_reason"
                name="referral_reason"
                required
                rows={5}
                placeholder="Please describe the participant's situation and what support they need…"
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a6b6b] hover:bg-[#154f4f] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-150"
            >
              Submit Referral
            </button>

            <p className="text-xs text-muted text-center">
              We&apos;ll be in touch within one business day.
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
