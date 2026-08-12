import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Make a Referral | Lumen Collective",
  description:
    "Refer a participant to Lumen Collective for NDIS Support Coordination. Complete our referral form and we'll be in touch within 24 hours.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/referral",
  },
};

const inputCls =
  "w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b6b] focus:border-[#1a6b6b]";
const labelCls = "block text-sm font-semibold text-charcoal mb-1.5";
const hintCls = "block font-normal text-xs text-muted mt-0.5";
const cardCls = "bg-white border border-gray-200 rounded-xl p-6 mb-5";
const legendCls =
  "text-xs font-bold uppercase tracking-widest text-[#1a6b6b] mb-1";
const subCls = "text-xs text-muted mb-5";

export default function ReferralPage({
  searchParams,
}: {
  searchParams: { success?: string };
}) {
  const submitted = searchParams.success === "1";

  if (submitted) {
    return (
      <div className="bg-offwhite min-h-screen">
        <section className="py-24 md:py-32">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#eef4f4] mb-6">
              <svg
                className="w-8 h-8 text-[#1a6b6b]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h1 className="text-2xl md:text-3xl font-semibold text-charcoal mb-4">
              Referral received
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Thank you — we will be in touch within 24 hours. If it is urgent,
              please call us directly.
            </p>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-14 md:py-18 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Let&apos;s get started
          </h1>
          <p className="text-muted leading-relaxed mb-2">
            Whether you are looking for a support coordinator for yourself or
            for someone you care about, this form is the first step. Fill in
            what you can and we will come back to you within 24 hours.
          </p>
          <p className="text-muted leading-relaxed">
            You do not need your plan in front of you. Anything you are unsure
            about, leave blank and we will work it out together when we talk.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            action="https://formspree.io/f/mgawkbkz"
            method="POST"
          >
            {/* Formspree hidden fields */}
            <input
              type="hidden"
              name="_subject"
              value="Support Coordination Intake"
            />
            <input
              type="hidden"
              name="_next"
              value="https://www.lumencollective.com.au/referral?success=1"
            />
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* Who is filling this in */}
            <div className={cardCls}>
              <p className={legendCls}>Who is filling this in</p>

              <div className="mb-5">
                <label className={labelCls}>
                  I am <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    "The participant, referring myself",
                    "A family member, carer or nominee",
                    "A Local Area Coordinator or Early Childhood Partner",
                    "From a hospital or health service",
                    "From another provider or service",
                    "Someone else",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-start gap-2.5 text-sm text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="Referrer type"
                        value={opt}
                        required
                        className="mt-0.5"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="referrer_name" className={labelCls}>
                    Your name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="referrer_name"
                    name="Referrer name"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="referrer_org" className={labelCls}>
                    Your organisation
                    <span className={hintCls}>Leave blank if not applicable.</span>
                  </label>
                  <input
                    type="text"
                    id="referrer_org"
                    name="Referrer organisation"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelCls}>
                    Your email <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="referrer_phone" className={labelCls}>
                    Your phone <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="referrer_phone"
                    name="Referrer phone"
                    required
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* The participant */}
            <div className={cardCls}>
              <p className={legendCls}>The participant</p>
              <p className={subCls}>
                If you are referring yourself, just add your details again here.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="participant_name" className={labelCls}>
                    Full name
                  </label>
                  <input
                    type="text"
                    id="participant_name"
                    name="Participant name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="preferred_name" className={labelCls}>
                    Preferred name
                  </label>
                  <input
                    type="text"
                    id="preferred_name"
                    name="Participant preferred name"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="dob" className={labelCls}>
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="dob"
                    name="Participant date of birth"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="ndis_number" className={labelCls}>
                    NDIS number
                    <span className={hintCls}>Optional.</span>
                  </label>
                  <input
                    type="text"
                    id="ndis_number"
                    name="NDIS number"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="suburb" className={labelCls}>
                    Suburb
                  </label>
                  <input
                    type="text"
                    id="suburb"
                    name="Participant suburb"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="postcode" className={labelCls}>
                    Postcode
                  </label>
                  <input
                    type="text"
                    id="postcode"
                    name="Participant postcode"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="participant_phone" className={labelCls}>
                    Participant phone
                  </label>
                  <input
                    type="tel"
                    id="participant_phone"
                    name="Participant phone"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="participant_email" className={labelCls}>
                    Participant email
                  </label>
                  <input
                    type="email"
                    id="participant_email"
                    name="Participant email"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="contact_method" className={labelCls}>
                  Best way to make contact
                </label>
                <select
                  id="contact_method"
                  name="Preferred contact method"
                  className={inputCls}
                >
                  <option value="">Select one</option>
                  <option>Phone call to the participant</option>
                  <option>Phone call to the person referring</option>
                  <option>Text message</option>
                  <option>Email</option>
                </select>
              </div>

              <div>
                <label htmlFor="contact_notes" className={labelCls}>
                  Anything we should know about getting in touch
                  <span className={hintCls}>
                    Best times to call, an interpreter and which language, or
                    someone who should be on the call.
                  </span>
                </label>
                <textarea
                  id="contact_notes"
                  name="Contact notes"
                  rows={3}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Plan nominee */}
            <div className={`${cardCls} border-dashed bg-[#fcfcfb]`}>
              <p className={legendCls}>Plan nominee details</p>
              <p className={subCls}>
                Only if the participant has a plan nominee. Leave blank if not.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="nominee_name" className={labelCls}>
                    Name
                  </label>
                  <input
                    type="text"
                    id="nominee_name"
                    name="Nominee name"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="nominee_dob" className={labelCls}>
                    Date of birth
                  </label>
                  <input
                    type="date"
                    id="nominee_dob"
                    name="Nominee date of birth"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label htmlFor="nominee_phone" className={labelCls}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="nominee_phone"
                    name="Nominee phone"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="nominee_email" className={labelCls}>
                    Email
                  </label>
                  <input
                    type="email"
                    id="nominee_email"
                    name="Nominee email"
                    className={inputCls}
                  />
                </div>
              </div>

              <div>
                <label className={labelCls}>
                  Does the participant know about and agree to this referral?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    "Yes",
                    "I am the participant",
                    "No, or not yet",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-start gap-2.5 text-sm text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="Participant consent to referral"
                        value={opt}
                        required
                        className="mt-0.5"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Timing */}
            <div className={cardCls}>
              <p className={legendCls}>Timing</p>

              <div>
                <label className={labelCls}>
                  How soon do you need supports?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    "Urgent - within 24 hours",
                    "Soon - within a week",
                    "Not urgent",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-start gap-2.5 text-sm text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="How soon supports are needed"
                        value={opt}
                        required
                        className="mt-0.5"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Plan details */}
            <div className={`${cardCls} border-dashed bg-[#fcfcfb]`}>
              <p className={legendCls}>Plan details</p>
              <p className={subCls}>Optional. Only if you have it handy.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="plan_start" className={labelCls}>
                    Plan start date
                  </label>
                  <input
                    type="date"
                    id="plan_start"
                    name="Plan start date"
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="plan_end" className={labelCls}>
                    Plan end date
                  </label>
                  <input
                    type="date"
                    id="plan_end"
                    name="Plan end date"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="plan_management" className={labelCls}>
                  How is the plan managed?
                </label>
                <select
                  id="plan_management"
                  name="Plan management type"
                  className={inputCls}
                >
                  <option value="">Select one</option>
                  <option>Agency managed (NDIA)</option>
                  <option>Plan managed</option>
                  <option>Self managed</option>
                  <option>A combination</option>
                  <option>Not sure</option>
                </select>
              </div>

              <div>
                <label htmlFor="plan_manager" className={labelCls}>
                  Plan manager, if they have one
                </label>
                <input
                  type="text"
                  id="plan_manager"
                  name="Plan manager"
                  className={inputCls}
                />
              </div>
            </div>

            {/* Last thing */}
            <div className={cardCls}>
              <p className={legendCls}>Last thing</p>

              <div className="mb-4">
                <label htmlFor="how_heard" className={labelCls}>
                  How did you hear about us?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <select
                  id="how_heard"
                  name="How did you hear about us"
                  required
                  className={inputCls}
                >
                  <option value="">Select one</option>
                  <option>Google or web search</option>
                  <option>Facebook or social media</option>
                  <option>Word of mouth</option>
                  <option>A Local Area Coordinator or the NDIA</option>
                  <option>A hospital or health service</option>
                  <option>Another provider</option>
                  <option>We have worked together before</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label htmlFor="anything_else" className={labelCls}>
                  Anything else you would like us to know
                </label>
                <textarea
                  id="anything_else"
                  name="Anything else"
                  rows={4}
                  className={inputCls}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1a6b6b] hover:bg-[#154f4f] text-white font-semibold px-8 py-3 rounded-md transition-colors duration-150"
            >
              Send referral
            </button>

            <p className="text-xs text-muted mt-4">
              Questions about this form:{" "}
              <a
                href="mailto:admin@lumencollective.com.au"
                className="underline hover:text-charcoal"
              >
                admin@lumencollective.com.au
              </a>
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
