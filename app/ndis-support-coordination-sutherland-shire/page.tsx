import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NDIS Support Coordination Sutherland Shire | Lumen Collective",
  description:
    "Looking for NDIS Support Coordination in the Sutherland Shire? Lumen Collective offers personalised Level 2, Level 3 and Psychosocial Recovery Coaching across Cronulla, Miranda, Caringbah and surrounding suburbs.",
  alternates: {
    canonical:
      "https://www.lumencollective.com.au/ndis-support-coordination-sutherland-shire",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Lumen Collective",
  description:
    "NDIS Support Coordination in the Sutherland Shire — Level 2, Level 3 and Psychosocial Recovery Coaching.",
  url: "https://www.lumencollective.com.au/ndis-support-coordination-sutherland-shire",
  areaServed: { "@type": "AdministrativeArea", name: "Sutherland Shire" },
};

export default function SutherlandShirePage() {
  return (
    <div className="bg-offwhite min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-5 leading-tight">
            NDIS Support Coordination in the Sutherland Shire
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-4">
            Finding the right support coordinator matters — especially when you
            want someone who actually knows your community. Lumen Collective
            provides NDIS Support Coordination across the Sutherland Shire,
            working with participants in Cronulla, Miranda, Caringbah,
            Sutherland, Gymea, Engadine, Menai, Kirrawee and surrounding
            suburbs.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            We&apos;re a small collective, not a call centre. When you work with
            us, you&apos;re working directly with your coordinator — the same
            person, every time.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 md:py-20 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-8">
            Our Services in the Sutherland Shire
          </h2>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1a6b6b] mb-3">
                Support Coordination (Level 2)
              </h3>
              <p className="text-muted leading-relaxed">
                We work alongside you to make sense of your NDIS plan —
                connecting you with the right providers, keeping your supports
                working together, and making sure your funding is being used in
                a way that actually reflects your goals. Whether you&apos;re
                just starting out with the NDIS or navigating a reassessment,
                we&apos;re here to take the overwhelm out of it.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1a6b6b] mb-3">
                Specialist Support Coordination (Level 3)
              </h3>
              <p className="text-muted leading-relaxed">
                For participants with complex needs — including psychosocial
                disability, layered support systems, or significant life
                transitions — we bring calm, structured coordination to
                situations that can feel unmanageable. We understand how
                multidisciplinary systems work and know how to get the right
                outcomes within them.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1a6b6b] mb-3">
                Psychosocial Recovery Coaching
              </h3>
              <p className="text-muted leading-relaxed">
                Strengths-based, practical coaching for participants living with
                psychosocial disability. We focus on building capacity,
                stability and meaningful connection to community — at a pace
                that works for you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-8">
            Why families in the Sutherland Shire choose Lumen Collective
          </h2>
          <ul className="space-y-4">
            {[
              "You work directly with your coordinator — no handoffs, no inconsistency",
              "We understand complex and layered support needs, including psychosocial disability",
              "We prioritise clear communication and steady follow-through",
              "We're experienced across the full lifespan — from young children to older participants",
              "We know the local provider landscape and can connect you with the right people faster",
            ].map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-[#1a6b6b]/10 flex items-center justify-center">
                  <svg
                    className="w-3 h-3 text-[#1a6b6b]"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={3}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </span>
                <span className="text-charcoal leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Suburbs */}
      <section className="py-14 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-charcoal mb-4">
            Suburbs we support across the Sutherland Shire
          </h2>
          <p className="text-muted leading-relaxed">
            We support participants in-person across the Sutherland Shire,
            including Cronulla, Miranda, Caringbah, Sutherland, Gymea, Gymea
            Bay, Engadine, Menai, Kirrawee, Jannali, Como, Oyster Bay, Loftus,
            Heathcote and surrounding areas. Not sure if we cover your suburb?{" "}
            <Link
              href="/contact"
              className="text-[#1a6b6b] font-medium hover:text-[#154f4f] transition-colors"
            >
              Get in touch
            </Link>{" "}
            — we&apos;d love to help.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-[#1a6b6b]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-4">
            Ready to get started?
          </h2>
          <p className="text-white/80 leading-relaxed mb-8 max-w-xl mx-auto">
            We&apos;d love to hear about your situation and see how we can help.
            Reach out for a no-obligation conversation — we&apos;ll take it from
            there.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#1a6b6b] font-semibold px-8 py-3 rounded-md hover:bg-gray-50 transition-colors duration-150"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
