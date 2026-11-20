"use client";
import { useState } from "react";

const SERVICES = [
  "Support Coordination (Level 2)",
  "Specialist Support Coordination (Level 3)",
  "Psychosocial Recovery Coaching",
  "Counselling",
  "Not sure",
];

const REFERRER_TYPES = [
  "The person needing support, referring myself",
  "A family member, carer or nominee",
  "A Local Area Coordinator or Early Childhood Partner",
  "From a hospital or health service",
  "From another provider or service",
  "Someone else",
];

const CONSENT_OPTIONS = ["Yes, I am the person", "Yes, they agree", "Not yet"];
const URGENCY_OPTIONS = ["Urgent, within 24 hours", "Soon, within a week", "Not urgent"];
const HEAR_OPTIONS = [
  "Google or web search",
  "Facebook or social media",
  "Word of mouth",
  "A Local Area Coordinator or the NDIA",
  "A hospital or health service",
  "Another provider",
  "We have worked together before",
  "Other",
];
const CONTACT_METHOD_OPTIONS = [
  "Phone call to them",
  "Phone call to the person referring",
  "Text message",
  "Email",
];
const PLAN_MANAGEMENT_OPTIONS = [
  "Agency managed",
  "Plan managed",
  "Self managed",
  "A combination",
  "Not sure",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputCls =
  "w-full px-4 py-2.5 rounded-xl border border-sage-soft bg-white text-brown text-sm placeholder:text-brown/40 focus:outline-none focus:border-sage focus:ring-1 focus:ring-sage/50 transition-colors";
const labelCls  = "block text-sm font-medium text-brown mb-1.5";
const sectionHd = "text-xs font-bold uppercase tracking-widest text-sage mb-4";
const divider   = <hr className="border-sage-soft my-7" />;

function RadioGroup({
  name, options, value, onChange,
}: { name: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <div className="space-y-2.5">
      {options.map((opt) => (
        <label key={opt} className="flex items-start gap-3 cursor-pointer">
          <input
            type="radio" name={name} value={opt}
            checked={value === opt} onChange={() => onChange(opt)}
            className="mt-0.5 h-4 w-4 accent-sage border-sage-soft shrink-0"
          />
          <span className="text-sm text-brown">{opt}</span>
        </label>
      ))}
    </div>
  );
}

export default function ReferralForm() {
  const [referrerType,         setReferrerType]         = useState("");
  const [referrerName,         setReferrerName]         = useState("");
  const [referrerOrganisation, setReferrerOrganisation] = useState("");
  const [referrerEmail,        setReferrerEmail]        = useState("");
  const [referrerPhone,        setReferrerPhone]        = useState("");
  const [services,             setServices]             = useState<string[]>([]);
  const [personFullName,       setPersonFullName]       = useState("");
  const [personPreferredName,  setPersonPreferredName]  = useState("");
  const [personDob,            setPersonDob]            = useState("");
  const [personSuburb,         setPersonSuburb]         = useState("");
  const [personPostcode,       setPersonPostcode]       = useState("");
  const [personPhone,          setPersonPhone]          = useState("");
  const [personEmail,          setPersonEmail]          = useState("");
  const [personContactMethod,  setPersonContactMethod]  = useState("");
  const [personContactNote,    setPersonContactNote]    = useState("");
  const [ndisNumber,           setNdisNumber]           = useState("");
  const [ndisPlanStart,        setNdisPlanStart]        = useState("");
  const [ndisPlanEnd,          setNdisPlanEnd]          = useState("");
  const [planManagement,       setPlanManagement]       = useState("");
  const [planManager,          setPlanManager]          = useState("");
  const [nomineeContactName,   setNomineeContactName]   = useState("");
  const [nomineeContactPhone,  setNomineeContactPhone]  = useState("");
  const [nomineeContactEmail,  setNomineeContactEmail]  = useState("");
  const [consentStatus,        setConsentStatus]        = useState("");
  const [urgency,              setUrgency]              = useState("");
  const [hearAboutUs,          setHearAboutUs]          = useState("");
  const [anythingElse,         setAnythingElse]         = useState("");
  const [status,               setStatus]               = useState<Status>("idle");
  const [errorMsg,             setErrorMsg]             = useState("");
  const [clientErrors,         setClientErrors]         = useState<string[]>([]);

  function toggleService(s: string) {
    setServices((prev) =>
      prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]
    );
  }

  const showNdis = services.some((s) => s !== "Not sure");

  function validate(): string[] {
    const errs: string[] = [];
    if (!referrerType)   errs.push("Please tell us who you are.");
    if (!referrerName)   errs.push("Your name is required.");
    if (!referrerEmail)  errs.push("Your email is required.");
    if (!referrerPhone)  errs.push("Your phone number is required.");
    if (services.length === 0) errs.push("Please select at least one service.");
    if (!consentStatus)  errs.push("Please indicate consent status.");
    if (!urgency)        errs.push("Please indicate how soon support is needed.");
    if (!hearAboutUs)    errs.push("Please tell us how you heard about us.");
    return errs;
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const errs = validate();
    if (errs.length > 0) { setClientErrors(errs); return; }
    setClientErrors([]);
    setStatus("submitting");

    try {
      const res = await fetch("/api/referral", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          referrerType, referrerName, referrerOrganisation, referrerEmail, referrerPhone,
          services,
          personFullName, personPreferredName, personDob, personSuburb, personPostcode,
          personPhone, personEmail, personContactMethod, personContactNote,
          ...(showNdis ? { ndisNumber, ndisPlanStart, ndisPlanEnd, planManagement, planManager, nomineeContactName, nomineeContactPhone, nomineeContactEmail } : {}),
          consentStatus, urgency, hearAboutUs, anythingElse,
          website: "",
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg("Something went wrong. Please try again or email us directly.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong. Please try again or email us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="bg-sage-tint border border-sage-soft rounded-2xl p-10 text-center">
        <p className="text-brown font-semibold text-xl mb-2">Referral received.</p>
        <p className="text-brown/70">We will be in touch shortly to follow up.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot */}
      <div className="sr-only" aria-hidden="true">
        <label htmlFor="rf-website">Website</label>
        <input id="rf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="bg-white rounded-2xl border border-sage-soft p-8 space-y-7">

        {/* Section 1 */}
        <section>
          <h2 className={sectionHd}>1. About you</h2>
          <div className="mb-5">
            <p className={labelCls}>I am <span className="text-peach">*</span></p>
            <RadioGroup name="referrerType" options={REFERRER_TYPES} value={referrerType} onChange={setReferrerType} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="rf-rname" className={labelCls}>Your name <span className="text-peach">*</span></label>
              <input id="rf-rname" type="text" required value={referrerName} onChange={(e) => setReferrerName(e.target.value)} placeholder="Full name" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-rorg" className={labelCls}>Organisation <span className="text-brown/50 font-normal">(optional)</span></label>
              <input id="rf-rorg" type="text" value={referrerOrganisation} onChange={(e) => setReferrerOrganisation(e.target.value)} placeholder="Hospital, LAC, provider..." className={inputCls} />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-5">
            <div>
              <label htmlFor="rf-remail" className={labelCls}>Your email <span className="text-peach">*</span></label>
              <input id="rf-remail" type="email" required value={referrerEmail} onChange={(e) => setReferrerEmail(e.target.value)} placeholder="you@example.com" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-rphone" className={labelCls}>Your phone <span className="text-peach">*</span></label>
              <input id="rf-rphone" type="tel" required value={referrerPhone} onChange={(e) => setReferrerPhone(e.target.value)} placeholder="04xx xxx xxx" className={inputCls} />
            </div>
          </div>
        </section>

        {divider}

        {/* Section 2 */}
        <section>
          <h2 className={sectionHd}>2. Service needed</h2>
          <p className="text-sm text-brown/60 mb-4">Tick all that apply. <span className="text-peach">At least one is required.</span></p>
          <div className="space-y-3">
            {SERVICES.map((s) => (
              <label key={s} className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox" value={s}
                  checked={services.includes(s)} onChange={() => toggleService(s)}
                  className="h-4 w-4 rounded accent-sage border-sage-soft shrink-0"
                />
                <span className="text-sm text-brown">{s}</span>
              </label>
            ))}
          </div>
        </section>

        {divider}

        {/* Section 3 */}
        <section>
          <h2 className={sectionHd}>3. The person being referred</h2>
          <p className="text-sm text-brown/60 mb-5">All fields in this section are optional.</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="rf-pfull" className={labelCls}>Full name</label>
              <input id="rf-pfull" type="text" value={personFullName} onChange={(e) => setPersonFullName(e.target.value)} placeholder="Full name" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-ppref" className={labelCls}>Preferred name</label>
              <input id="rf-ppref" type="text" value={personPreferredName} onChange={(e) => setPersonPreferredName(e.target.value)} placeholder="Name they go by" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-pdob" className={labelCls}>Date of birth</label>
              <input id="rf-pdob" type="text" value={personDob} onChange={(e) => setPersonDob(e.target.value)} placeholder="DD/MM/YYYY" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-psuburb" className={labelCls}>Suburb</label>
              <input id="rf-psuburb" type="text" value={personSuburb} onChange={(e) => setPersonSuburb(e.target.value)} placeholder="Suburb" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-ppostcode" className={labelCls}>Postcode</label>
              <input id="rf-ppostcode" type="text" inputMode="numeric" value={personPostcode} onChange={(e) => setPersonPostcode(e.target.value)} placeholder="2500" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-pphone" className={labelCls}>Phone</label>
              <input id="rf-pphone" type="tel" value={personPhone} onChange={(e) => setPersonPhone(e.target.value)} placeholder="04xx xxx xxx" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-pemail" className={labelCls}>Email</label>
              <input id="rf-pemail" type="email" value={personEmail} onChange={(e) => setPersonEmail(e.target.value)} placeholder="their@email.com" className={inputCls} />
            </div>
            <div>
              <label htmlFor="rf-pcontact" className={labelCls}>Best way to make contact</label>
              <select id="rf-pcontact" value={personContactMethod} onChange={(e) => setPersonContactMethod(e.target.value)} className={inputCls}>
                <option value="">Select...</option>
                {CONTACT_METHOD_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
              </select>
            </div>
          </div>
          <div className="mt-5">
            <label htmlFor="rf-pnote" className={labelCls}>Anything I should know about getting in touch?</label>
            <textarea id="rf-pnote" rows={3} value={personContactNote} onChange={(e) => setPersonContactNote(e.target.value)} placeholder="e.g. best time to call, communication preferences..." className={`${inputCls} resize-y`} />
          </div>
        </section>

        {/* Section 4 — conditional */}
        {showNdis && (
          <>
            {divider}
            <section>
              <h2 className={sectionHd}>4. NDIS details</h2>
              <p className="text-sm text-brown/60 mb-5">All fields in this section are optional.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="rf-ndisnum" className={labelCls}>NDIS number</label>
                  <input id="rf-ndisnum" type="text" value={ndisNumber} onChange={(e) => setNdisNumber(e.target.value)} placeholder="43xxxxxxxx" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="rf-pmgmt" className={labelCls}>How the plan is managed</label>
                  <select id="rf-pmgmt" value={planManagement} onChange={(e) => setPlanManagement(e.target.value)} className={inputCls}>
                    <option value="">Select...</option>
                    {PLAN_MANAGEMENT_OPTIONS.map((o) => <option key={o} value={o}>{o}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="rf-pstart" className={labelCls}>Plan start date</label>
                  <input id="rf-pstart" type="text" value={ndisPlanStart} onChange={(e) => setNdisPlanStart(e.target.value)} placeholder="DD/MM/YYYY" className={inputCls} />
                </div>
                <div>
                  <label htmlFor="rf-pend" className={labelCls}>Plan end date</label>
                  <input id="rf-pend" type="text" value={ndisPlanEnd} onChange={(e) => setNdisPlanEnd(e.target.value)} placeholder="DD/MM/YYYY" className={inputCls} />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="rf-pmgr" className={labelCls}>Plan manager</label>
                  <input id="rf-pmgr" type="text" value={planManager} onChange={(e) => setPlanManager(e.target.value)} placeholder="Plan management company or person" className={inputCls} />
                </div>
              </div>
              <p className={`${labelCls} mt-6`}>Plan nominee (name, phone and email)</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-1">
                <input type="text" value={nomineeContactName} onChange={(e) => setNomineeContactName(e.target.value)} placeholder="Full name" className={inputCls} />
                <input type="tel" value={nomineeContactPhone} onChange={(e) => setNomineeContactPhone(e.target.value)} placeholder="Phone" className={inputCls} />
                <input type="email" value={nomineeContactEmail} onChange={(e) => setNomineeContactEmail(e.target.value)} placeholder="Email" className={inputCls} />
              </div>
            </section>
          </>
        )}

        {divider}

        {/* Section 5 */}
        <section>
          <h2 className={sectionHd}>5. Consent and timing</h2>
          <div className="mb-6">
            <p className={labelCls}>Does the person know about and agree to this referral? <span className="text-peach">*</span></p>
            <RadioGroup name="consentStatus" options={CONSENT_OPTIONS} value={consentStatus} onChange={setConsentStatus} />
          </div>
          <div>
            <p className={labelCls}>How soon is support needed? <span className="text-peach">*</span></p>
            <RadioGroup name="urgency" options={URGENCY_OPTIONS} value={urgency} onChange={setUrgency} />
          </div>
        </section>

        {divider}

        {/* Section 6 */}
        <section>
          <h2 className={sectionHd}>6. Last thing</h2>
          <div className="mb-6">
            <p className={labelCls}>How did you hear about us? <span className="text-peach">*</span></p>
            <RadioGroup name="hearAboutUs" options={HEAR_OPTIONS} value={hearAboutUs} onChange={setHearAboutUs} />
          </div>
          <div>
            <label htmlFor="rf-extra" className={labelCls}>Anything else? <span className="text-brown/50 font-normal">(optional)</span></label>
            <textarea id="rf-extra" rows={4} value={anythingElse} onChange={(e) => setAnythingElse(e.target.value)} placeholder="Any other context that would be helpful..." className={`${inputCls} resize-y`} />
          </div>
        </section>

        {/* Validation errors */}
        {clientErrors.length > 0 && (
          <div className="bg-peach-tint border border-peach/30 rounded-xl px-5 py-4">
            <p className="text-sm font-semibold text-brown mb-2">Please check the following:</p>
            <ul className="list-disc list-inside space-y-1">
              {clientErrors.map((err) => (
                <li key={err} className="text-sm text-brown">{err}</li>
              ))}
            </ul>
          </div>
        )}

        {/* Server error */}
        {status === "error" && (
          <p className="text-sm text-brown bg-peach-tint border border-peach/30 rounded-xl px-4 py-3">
            {errorMsg}{" "}
            <a href="mailto:admin@lumencollective.com.au" className="underline font-medium">
              admin@lumencollective.com.au
            </a>
          </p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="bg-peach text-brown font-semibold rounded-full px-8 py-3 hover:bg-peach/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "submitting" ? "Submitting..." : "Submit referral"}
        </button>
      </div>
    </form>
  );
}
