import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference Check | Lumen Collective",
  description: "Reference check form for Lumen Collective.",
};

const inputClass =
  "w-full rounded-md border border-gray-300 bg-white px-4 py-2.5 text-sm text-charcoal placeholder:text-gray-400 focus:border-[#1a6b6b] focus:outline-none focus:ring-1 focus:ring-[#1a6b6b]";

const labelClass = "block text-sm font-medium text-charcoal mb-1";

export default function ReferenceCheckPage() {
  return (
    <div className="bg-offwhite min-h-screen">
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Reference Check
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Please complete the form below. Thank you for your time.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            action="https://formspree.io/f/mgawkbon"
            method="POST"
            className="bg-white rounded-xl shadow-sm p-8 space-y-6"
          >
            <input
              type="hidden"
              name="_subject"
              value="Reference Check — Lumen Collective"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="referee_name" className={labelClass}>
                  Your full name <span className="text-red-500">*</span>
                </label>
                <input
                  id="referee_name"
                  name="referee_name"
                  type="text"
                  required
                  placeholder="Full name"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="referee_email" className={labelClass}>
                  Your email <span className="text-red-500">*</span>
                </label>
                <input
                  id="referee_email"
                  name="referee_email"
                  type="email"
                  required
                  placeholder="you@example.com"
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="referee_phone" className={labelClass}>
                  Your phone number
                </label>
                <input
                  id="referee_phone"
                  name="referee_phone"
                  type="tel"
                  placeholder="04xx xxx xxx"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="relationship" className={labelClass}>
                  Relationship to applicant <span className="text-red-500">*</span>
                </label>
                <input
                  id="relationship"
                  name="relationship"
                  type="text"
                  required
                  placeholder="e.g. Manager, Colleague"
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label htmlFor="duration_known" className={labelClass}>
                How long have you known the applicant?
              </label>
              <input
                id="duration_known"
                name="duration_known"
                type="text"
                placeholder="e.g. 3 years"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="comments" className={labelClass}>
                Please provide your reference / comments{" "}
                <span className="text-red-500">*</span>
              </label>
              <textarea
                id="comments"
                name="comments"
                required
                rows={6}
                placeholder="Please share your experience working with the applicant…"
                className={`${inputClass} resize-y`}
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#1a6b6b] hover:bg-[#154f4f] text-white font-semibold py-3 px-6 rounded-md transition-colors duration-150"
            >
              Submit Reference
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
