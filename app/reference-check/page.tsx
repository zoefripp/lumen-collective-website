import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference Check | Lumen Collective",
  description: "Reference check form for Disability Support Worker applicants at Lumen Collective.",
};

const inputCls =
  "w-full px-3 py-2.5 border border-gray-200 rounded-md text-sm text-charcoal bg-white focus:outline-none focus:ring-2 focus:ring-[#1a6b6b] focus:border-[#1a6b6b]";
const labelCls = "block text-sm font-semibold text-charcoal mb-1.5";
const hintCls = "block font-normal text-xs text-muted mt-0.5";
const cardCls = "bg-white border border-gray-200 rounded-xl p-6 mb-5";
const legendCls =
  "text-xs font-bold uppercase tracking-widest text-[#1a6b6b] mb-1";
const subCls = "text-xs text-muted mb-5";

const ratingOptions = [
  "Excellent",
  "Good",
  "Satisfactory",
  "Needs improvement",
  "Not able to comment",
];

export default function ReferenceCheckPage({
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
              Thank you
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Your reference has been received. We appreciate you taking the
              time to complete this.
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
            Reference check — Disability Support Worker
          </h1>
          <p className="text-muted leading-relaxed mb-2">
            Thank you for taking the time to complete this. The person named
            below has applied for a Disability Support Worker role with Lumen
            Collective and has given us your details as a referee.
          </p>
          <p className="text-muted leading-relaxed mb-2">
            We support NDIS participants in their homes and in the community, so
            we ask about reliability, communication and professional boundaries
            as well as the work itself. Answer what you can and leave anything
            you are not able to comment on.
          </p>
          <p className="text-muted leading-relaxed">
            Your answers go to Lumen Collective only. We use them to decide
            about this application, we keep them with the applicant&apos;s
            recruitment file, and we do not share them with the applicant unless
            we are required to by law.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-10 md:py-14">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <form
            action="https://formspree.io/f/mgawkbon"
            method="POST"
          >
            {/* Formspree hidden fields */}
            <input
              type="hidden"
              name="_subject"
              value="Reference check - Disability Support Worker"
            />
            <input
              type="hidden"
              name="_next"
              value="https://www.lumencollective.com.au/reference-check?success=1"
            />
            <input
              type="text"
              name="_gotcha"
              style={{ display: "none" }}
              tabIndex={-1}
              autoComplete="off"
            />

            {/* About you */}
            <div className={cardCls}>
              <p className={legendCls}>About you</p>
              <p className={subCls}>The referee completing this form.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="referee_name" className={labelCls}>
                    Your full name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="referee_name"
                    name="Referee name"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="referee_position" className={labelCls}>
                    Your position <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="referee_position"
                    name="Referee position"
                    required
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="referee_org" className={labelCls}>
                  Organisation <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="referee_org"
                  name="Referee organisation"
                  required
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="email" className={labelCls}>
                    Email <span className="text-red-600">*</span>
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
                  <label htmlFor="referee_phone" className={labelCls}>
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="referee_phone"
                    name="Referee phone"
                    className={inputCls}
                  />
                </div>
              </div>
            </div>

            {/* The applicant */}
            <div className={cardCls}>
              <p className={legendCls}>The applicant</p>

              <div className="mb-4">
                <label htmlFor="applicant_name" className={labelCls}>
                  Applicant&apos;s full name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="applicant_name"
                  name="Applicant name"
                  required
                  className={inputCls}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="relationship" className={labelCls}>
                  What was your working relationship with them?{" "}
                  <span className="text-red-600">*</span>
                  <span className={hintCls}>
                    For example, direct supervisor, team leader, coordinator,
                    colleague.
                  </span>
                </label>
                <input
                  type="text"
                  id="relationship"
                  name="Working relationship"
                  required
                  className={inputCls}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="date_from" className={labelCls}>
                    They worked with you from{" "}
                    <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    id="date_from"
                    name="Employment start date"
                    required
                    className={inputCls}
                  />
                </div>
                <div>
                  <label htmlFor="date_to" className={labelCls}>
                    Until
                    <span className={hintCls}>
                      Leave blank if they still work with you.
                    </span>
                  </label>
                  <input
                    type="date"
                    id="date_to"
                    name="Employment end date"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="job_title" className={labelCls}>
                  Their role or job title <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  id="job_title"
                  name="Applicant role or job title"
                  required
                  className={inputCls}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="employment_type" className={labelCls}>
                  Type of employment
                </label>
                <select
                  id="employment_type"
                  name="Employment type"
                  className={inputCls}
                >
                  <option value="">Select one</option>
                  <option>Permanent full-time</option>
                  <option>Permanent part-time</option>
                  <option>Casual</option>
                  <option>Contract or agency</option>
                  <option>Volunteer or placement</option>
                  <option>Other</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="duties" className={labelCls}>
                  What did the role involve day to day?
                  <span className={hintCls}>
                    Personal care, community access, domestic assistance,
                    transport, behaviour support, and so on.
                  </span>
                </label>
                <textarea
                  id="duties"
                  name="Duties of the role"
                  rows={3}
                  className={inputCls}
                />
              </div>

              <div>
                <label htmlFor="reason_leaving" className={labelCls}>
                  Why did they leave?
                  <span className={hintCls}>
                    Leave blank if they are still employed with you.
                  </span>
                </label>
                <input
                  type="text"
                  id="reason_leaving"
                  name="Reason for leaving"
                  className={inputCls}
                />
              </div>
            </div>

            {/* How they worked */}
            <div className={cardCls}>
              <p className={legendCls}>How they worked</p>
              <p className={subCls}>Rate each area, then add a comment if you have one.</p>

              {[
                {
                  name: "Reliability rating",
                  label: "Reliability and punctuality",
                  hint: "Turning up on time, for the shifts they accepted, and giving notice when they could not.",
                },
                {
                  name: "Communication rating",
                  label: "Communication with participants, families and the team",
                  hint: null,
                },
                {
                  name: "Boundaries rating",
                  label: "Professional boundaries",
                  hint: "Keeping the relationship professional, handling gifts, money, social contact and personal information appropriately.",
                },
                {
                  name: "Following plans rating",
                  label: "Following support plans and written instructions",
                  hint: null,
                },
                {
                  name: "Record keeping rating",
                  label: "Record keeping and reporting",
                  hint: "Progress notes, shift notes, incident reports.",
                },
                {
                  name: "Working unsupervised rating",
                  label: "Working without close supervision",
                  hint: "Most of our shifts are one worker alone in a participant's home or in the community.",
                },
              ].map((item) => (
                <div key={item.name} className="mb-5">
                  <label className={labelCls}>
                    {item.label} <span className="text-red-600">*</span>
                    {item.hint && <span className={hintCls}>{item.hint}</span>}
                  </label>
                  <div className="flex flex-wrap gap-2 mt-1">
                    {ratingOptions.map((opt) => (
                      <label
                        key={opt}
                        className="flex items-center gap-1.5 text-sm text-charcoal border border-gray-200 rounded-md px-3 py-1.5 bg-white cursor-pointer"
                      >
                        <input
                          type="radio"
                          name={item.name}
                          value={opt}
                          required
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </div>
              ))}

              <div>
                <label htmlFor="ratings_comment" className={labelCls}>
                  Comments on any of the above
                </label>
                <textarea
                  id="ratings_comment"
                  name="Comments on ratings"
                  rows={3}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Judgement and conduct */}
            <div className={cardCls}>
              <p className={legendCls}>Judgement and conduct</p>

              <div className="mb-5">
                <label htmlFor="incident_example" className={labelCls}>
                  How did they handle a difficult situation or an incident?
                  <span className={hintCls}>
                    For example, a participant becoming distressed or unwell, a
                    behaviour of concern, or a support that did not go to plan.
                    An example is more useful to us than a general comment.
                  </span>
                </label>
                <textarea
                  id="incident_example"
                  name="Handling of a difficult situation"
                  rows={4}
                  className={inputCls}
                />
              </div>

              <div className="mb-4">
                <label className={labelCls}>
                  Were there any performance concerns, formal warnings or
                  disciplinary action? <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {["No", "Yes", "I am not able to disclose this"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-start gap-2.5 text-sm text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="Performance concerns"
                        value={opt === "I am not able to disclose this" ? "Not able to disclose" : opt}
                        required
                        className="mt-0.5"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label htmlFor="performance_detail" className={labelCls}>
                  If yes, what were they?
                </label>
                <textarea
                  id="performance_detail"
                  name="Performance concerns detail"
                  rows={3}
                  className={inputCls}
                />
              </div>

              <div className="mb-4">
                <label className={labelCls}>
                  Are you aware of any concern raised, complaint or
                  investigation about how they treated a person they supported?{" "}
                  <span className="text-red-600">*</span>
                  <span className={hintCls}>
                    This includes anything reported to the NDIS Quality and
                    Safeguards Commission.
                  </span>
                </label>
                <div className="space-y-2">
                  {["No", "Yes", "I am not able to disclose this"].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-start gap-2.5 text-sm text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="Safeguarding concerns"
                        value={opt === "I am not able to disclose this" ? "Not able to disclose" : opt}
                        required
                        className="mt-0.5"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="safeguarding_detail" className={labelCls}>
                  If yes, please tell us what you are able to
                </label>
                <textarea
                  id="safeguarding_detail"
                  name="Safeguarding concerns detail"
                  rows={3}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Overall */}
            <div className={cardCls}>
              <p className={legendCls}>Overall</p>

              <div className="mb-5">
                <label className={labelCls}>
                  Would you employ them again?{" "}
                  <span className="text-red-600">*</span>
                </label>
                <div className="space-y-2">
                  {[
                    "Yes, without hesitation",
                    "Yes, with some reservations",
                    "No",
                    "I am not able to comment",
                  ].map((opt) => (
                    <label
                      key={opt}
                      className="flex items-start gap-2.5 text-sm text-charcoal cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="Would re-employ"
                        value={opt === "I am not able to comment" ? "Not able to comment" : opt}
                        required
                        className="mt-0.5"
                      />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label htmlFor="anything_else" className={labelCls}>
                  Anything else we should know
                </label>
                <textarea
                  id="anything_else"
                  name="Anything else"
                  rows={4}
                  className={inputCls}
                />
              </div>
            </div>

            {/* Declaration */}
            <div className="bg-[#eef4f4] border border-[#cfdcdc] rounded-xl p-5 mb-6">
              <label className="flex items-start gap-3 text-sm text-charcoal cursor-pointer">
                <input
                  type="checkbox"
                  name="Declaration"
                  value="Confirmed"
                  required
                  className="mt-0.5"
                />
                <span>
                  I confirm the information I have given is true and correct to
                  the best of my knowledge, and I understand Lumen Collective
                  will use it to decide about this application.
                </span>
              </label>
            </div>

            <div className="mb-6">
              <label htmlFor="date_completed" className={labelCls}>
                Date completed <span className="text-red-600">*</span>
              </label>
              <input
                type="date"
                id="date_completed"
                name="Date completed"
                required
                className={`${inputCls} max-w-xs`}
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto bg-[#1a6b6b] hover:bg-[#154f4f] text-white font-semibold px-8 py-3 rounded-md transition-colors duration-150"
            >
              Submit reference
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
