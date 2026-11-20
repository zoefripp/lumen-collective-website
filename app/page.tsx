import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Lumen Collective | Support Coordination, Recovery Coaching and Counselling",
  description:
    "Support coordination, psychosocial recovery coaching and counselling across the Illawarra and Greater Sydney, and online.",
  alternates: {
    canonical: "https://www.lumencollective.com.au",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Lumen Collective",
  description:
    "Support coordination, psychosocial recovery coaching and counselling across the Illawarra and Greater Sydney, and online.",
  url: "https://www.lumencollective.com.au",
  telephone: "0452278055",
  email: "admin@lumencollective.com.au",
  areaServed: [
    { "@type": "AdministrativeArea", name: "Illawarra" },
    { "@type": "AdministrativeArea", name: "Greater Sydney" },
    { "@type": "State", name: "New South Wales" },
  ],
  sameAs: ["https://www.facebook.com/LumenCollective/"],
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* ── Hero ── cream background, two columns */}
      <section className="relative overflow-hidden bg-cream py-20 md:py-28 lg:py-32">
        {/* Decorative rings — purely visual, aria-hidden */}
        <svg
          viewBox="0 0 600 600"
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 -translate-y-1/2 -right-[280px] w-[560px] h-[560px] opacity-70"
        >
          <circle
            cx="300" cy="300" r="200"
            fill="none" stroke="#7E9A84" strokeWidth="1.5"
            strokeLinecap="round" strokeDasharray="832 424"
            transform="rotate(-60 300 300)"
          />
          <circle
            cx="300" cy="300" r="300"
            fill="none" stroke="#B9CBB4" strokeWidth="1.5"
            strokeLinecap="round" strokeDasharray="1257 629"
            transform="rotate(110 300 300)"
          />
        </svg>

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left: text */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-6">
                Illawarra · Greater Sydney · Remote and online
              </p>
              <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">
                Support that meets you where you are.
              </h1>
              <p className="text-lg text-brown/70 leading-relaxed mb-8">
                I&apos;m Zoe. I offer support coordination, psychosocial recovery
                coaching and counselling, so you can work with one person who
                already knows your story.
              </p>
              <div className="flex flex-wrap gap-5 items-center">
                <Link
                  href="/contact"
                  className="inline-block bg-peach text-brown font-semibold rounded-full px-8 py-3.5 hover:bg-peach/90 transition-colors"
                >
                  Get in touch
                </Link>
                <Link
                  href="/referral"
                  className="text-brown/70 font-medium hover:text-brown transition-colors underline underline-offset-4"
                >
                  Make a referral
                </Link>
              </div>
            </div>

            {/* Right: stacked logo on sage-tint panel */}
            <div className="flex justify-center md:justify-end">
              <div
                className="bg-sage-tint rounded flex items-center justify-center w-full max-w-sm min-h-[300px] md:min-h-[520px]"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lumen-brand-files/lumen-logo-stacked.svg"
                  alt="Lumen Collective"
                  className="h-56 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Sage band: who I am ── */}
      <section className="bg-sage py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <p className="text-[2.375rem] md:text-[2.625rem] font-medium text-cream leading-[1.2]">
              Lumen is small on purpose. The person you speak to is the person
              doing the work.
            </p>
            <div className="space-y-5 text-cream/85 text-lg leading-relaxed">
              <p>
                I started Lumen Collective to offer a service that is responsive,
                effective and reliable. I have spent more than 12 years in the
                disability and community sector, in youth work, community
                development, counselling and support coordination.
              </p>
              <Link
                href="/about"
                className="inline-block text-cream/85 font-medium hover:text-cream transition-colors underline underline-offset-4"
              >
                More about me
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── What I do: numbered service rows ── */}
      <section className="bg-cream py-16 md:py-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between mb-10 md:mb-14 gap-6 flex-wrap">
            <h2 className="text-3xl md:text-[2.75rem] font-semibold text-brown leading-[1.15]">
              What I do
            </h2>
            <p className="text-sm text-brown max-w-xs text-right leading-relaxed">
              Three services, one point of contact. Pick what fits now and change
              as you go.
            </p>
          </div>

          <div className="divide-y divide-sage-soft">
            {/* 01 Support Coordination */}
            <Link
              href="/support-coordination"
              className="group flex items-start gap-6 md:gap-10 py-8 hover:bg-sage-tint/40 -mx-4 px-4 transition-colors"
            >
              <span className="text-sm font-semibold text-sage-soft w-8 flex-shrink-0 pt-1">01</span>
              <div className="flex-1 grid md:grid-cols-[1fr_auto] md:gap-10 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <h3 className="text-xl font-semibold text-brown">Support Coordination</h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-sage">NDIS funded</span>
                  </div>
                  <p className="text-brown/70 leading-relaxed text-[17px]">
                    Help to understand and use your NDIS plan, find the right
                    providers and keep everything working together. Level 2 and
                    Specialist (Level 3).
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-soft group-hover:text-sage transition-colors flex-shrink-0 mt-1 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* 02 Psychosocial Recovery Coaching */}
            <Link
              href="/recovery-coaching"
              className="group flex items-start gap-6 md:gap-10 py-8 hover:bg-sage-tint/40 -mx-4 px-4 transition-colors"
            >
              <span className="text-sm font-semibold text-sage-soft w-8 flex-shrink-0 pt-1">02</span>
              <div className="flex-1 grid md:grid-cols-[1fr_auto] md:gap-10 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <h3 className="text-xl font-semibold text-brown">Psychosocial Recovery Coaching</h3>
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-sage">NDIS funded</span>
                  </div>
                  <p className="text-brown/70 leading-relaxed text-[17px]">
                    Practical, strengths-based coaching for people living with
                    psychosocial disability. Goals, routines, coping and
                    connection, at your pace.
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-soft group-hover:text-sage transition-colors flex-shrink-0 mt-1 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>

            {/* 03 Counselling */}
            <Link
              href="/counselling"
              className="group flex items-start gap-6 md:gap-10 py-8 hover:bg-sage-tint/40 -mx-4 px-4 transition-colors"
            >
              <span className="text-sm font-semibold text-sage-soft w-8 flex-shrink-0 pt-1">03</span>
              <div className="flex-1 grid md:grid-cols-[1fr_auto] md:gap-10 items-start">
                <div>
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <h3 className="text-xl font-semibold text-brown">Counselling</h3>
                    <span className="text-xs text-brown/80">$120 · 50 minutes · in person or online</span>
                  </div>
                  <p className="text-brown/70 leading-relaxed text-[17px]">
                    A calm, private space to talk things through. Open to private
                    clients and NDIS participants. No referral needed.
                  </p>
                </div>
                <svg className="w-5 h-5 text-sage-soft group-hover:text-sage transition-colors flex-shrink-0 mt-1 hidden md:block" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Counselling band: peach tint, intro call ── */}
      <section className="bg-peach-tint py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-5">Counselling</p>
              <h2 className="text-3xl md:text-[2.75rem] font-semibold text-brown leading-[1.15] mb-5">
                Start with a free, no-pressure chat.
              </h2>
              <p className="text-lg text-brown/70 leading-relaxed mb-8">
                A short intro call to see if we are a good fit and answer your
                questions. If it feels right, we book your first session.
              </p>
              <Link
                href="/contact?topic=intro-call"
                className="inline-block bg-peach text-brown font-semibold rounded-full px-8 py-3.5 hover:bg-peach/90 transition-colors"
              >
                Book a free intro call
              </Link>
            </div>

            <dl className="border-l-2 border-peach pl-6 space-y-4">
              {[
                ["Session", "$120 for 50 minutes"],
                ["Referral", "Not needed"],
                ["Medicare", "No rebate available"],
                ["NDIS", "Self and plan managed"],
                ["Where", "Illawarra, Greater Sydney or online"],
              ].map(([dt, dd]) => (
                <div key={dt as string} className="flex gap-4">
                  <dt className="text-sm font-semibold text-brown min-w-[80px]">{dt}</dt>
                  <dd className="text-sm text-brown/70">{dd}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* ── Where I work ── */}
      <section className="bg-cream py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-[1fr_1.4fr] gap-12 items-start">
            <h2 className="text-3xl md:text-[2.75rem] font-semibold text-brown leading-[1.15]">
              Where I work
            </h2>
            <div className="space-y-4 text-[17px] text-brown/70 leading-relaxed">
              <p>
                Support coordination and coaching in person across the Illawarra
                and Greater Sydney, including the Sutherland Shire, and remotely
                across NSW, QLD and VIC.
              </p>
              <p>
                Counselling in person in the Illawarra and Greater Sydney, or
                online wherever you are.
              </p>
              <p className="text-sm text-brown">
                Referrals from allied health, hospitals and families are always
                welcome.{" "}
                <Link
                  href="/referral"
                  className="text-brown/70 hover:text-brown transition-colors underline underline-offset-4"
                >
                  Make a referral
                </Link>
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
