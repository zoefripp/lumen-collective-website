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

const checkItems = [
  "You work directly with your coordinator — no handoffs, no inconsistency",
  "We understand complex and layered support needs, including psychosocial disability",
  "We prioritise clear communication and steady follow-through",
  "We are experienced across the full lifespan — from young children to older participants",
  "We know the local provider landscape and can connect you with the right people faster",
];

export default function SutherlandShirePage() {
  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-brown mb-5 leading-tight">
            NDIS Support Coordination in the Sutherland Shire
          </h1>
          <p className="text-lg text-brown/70 leading-relaxed mb-4">
            Finding the right support coordinator matters — especially when you
            want someone who actually knows your community. Lumen Collective
            provides NDIS Support Coordination across the Sutherland Shire,
            working with participants in Cronulla, Miranda, Caringbah,
            Sutherland, Gymea, Engadine, Menai, Kirrawee and surrounding
            suburbs.
          </p>
          <p className="text-lg text-brown/70 leading-relaxed">
            We are a small collective, not a call centre. When you work with
            us, you are working directly with your coordinator — the same
            person, every time.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-8">
            Our services in the Sutherland Shire
          </h2>
          <div className="space-y-6">
            {[
              {
                title: "Support Coordination (Level 2)",
                body: "We work alongside you to make sense of your NDIS plan — connecting you with the right providers, keeping your supports working together, and making sure your funding is being used in a way that actually reflects your goals. Whether you are just starting out with the NDIS or navigating a reassessment, we are here to take the overwhelm out of it.",
              },
              {
                title: "Specialist Support Coordination (Level 3)",
                body: "For participants with complex needs — including psychosocial disability, layered support systems, or significant life transitions — we bring calm, structured coordination to situations that can feel unmanageable. We understand how multidisciplinary systems work and know how to get the right outcomes within them.",
              },
              {
                title: "Psychosocial Recovery Coaching",
                body: "Strengths-based, practical coaching for participants living with psychosocial disability. We focus on building capacity, stability and meaningful connection to community — at a pace that works for you.",
              },
            ].map(({ title, body }) => (
              <div key={title} className="bg-white rounded-2xl border border-sage-soft p-7">
                <h3 className="text-lg font-semibold text-sage mb-3">{title}</h3>
                <p className="text-brown/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 bg-sage-tint">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-8">
            Why families in the Sutherland Shire choose Lumen Collective
          </h2>
          <ul className="space-y-4">
            {checkItems.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <span className="mt-1 flex-shrink-0 w-5 h-5 rounded-full bg-sage/20 flex items-center justify-center">
                  <svg className="w-3 h-3 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-brown/80 leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Suburbs */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brown mb-4">
            Suburbs we support across the Sutherland Shire
          </h2>
          <p className="text-brown/70 leading-relaxed">
            We support participants in-person across the Sutherland Shire,
            including Cronulla, Miranda, Caringbah, Sutherland, Gymea, Gymea
            Bay, Engadine, Menai, Kirrawee, Jannali, Como, Oyster Bay, Loftus,
            Heathcote and surrounding areas. Not sure if we cover your suburb?{" "}
            <Link href="/contact" className="text-sage font-medium hover:text-sage/80 transition-colors">
              Get in touch
            </Link>{" "}
            — we would love to help.
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-14 bg-brown">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold text-cream mb-4">
            Ready to get started?
          </h2>
          <p className="text-cream/80 leading-relaxed mb-8 max-w-xl mx-auto">
            We would love to hear about your situation and see how we can help.
            Reach out for a no-obligation conversation — we will take it from
            there.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-peach text-brown font-semibold rounded-full px-8 py-3.5 hover:bg-peach/90 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
