import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "NDIS Support Coordination Illawarra | Lumen Collective",
  description:
    "Lumen Collective provides NDIS Support Coordination across the Illawarra — including Wollongong, Shellharbour, Kiama and the surrounding region. Level 2, Level 3 and Psychosocial Recovery Coaching available.",
  alternates: {
    canonical:
      "https://www.lumencollective.com.au/ndis-support-coordination-illawarra",
  },
};

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Lumen Collective",
  description:
    "NDIS Support Coordination in the Illawarra — Level 2, Level 3 and Psychosocial Recovery Coaching.",
  url: "https://www.lumencollective.com.au/ndis-support-coordination-illawarra",
  areaServed: { "@type": "AdministrativeArea", name: "Illawarra" },
};

export default function IllawarraPage() {
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
            NDIS Support Coordination in the Illawarra
          </h1>
          <p className="text-lg text-muted leading-relaxed mb-4">
            The Illawarra has a strong community — and navigating the NDIS
            within it shouldn&apos;t feel isolating. Lumen Collective provides
            NDIS Support Coordination across the Illawarra region, supporting
            participants in Wollongong, Shellharbour, Dapto, Kiama, Albion
            Park, Warrawong, Figtree, Fairy Meadow and surrounding areas.
          </p>
          <p className="text-lg text-muted leading-relaxed">
            Our coordinator Lorry Clark is based in the region and offers
            genuine in-person support — not someone dialling in from the other
            side of the country. She knows the local provider network and brings
            a calm, organised approach to even the most complex support
            situations.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-14 md:py-20 bg-offwhite">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-8">
            Our Services in the Illawarra
          </h2>

          <div className="space-y-8">
            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1a6b6b] mb-3">
                Support Coordination (Level 2)
              </h3>
              <p className="text-muted leading-relaxed">
                We&apos;ll work alongside you to implement your NDIS plan in a
                way that&apos;s practical and sustainable. That means connecting
                you with the right providers across the Illawarra, keeping your
                supports coordinated, and making sure your plan is genuinely
                working — not just sitting in a drawer.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1a6b6b] mb-3">
                Specialist Support Coordination (Level 3)
              </h3>
              <p className="text-muted leading-relaxed">
                For participants managing complex or layered support needs, we
                bring structure to situations that can feel overwhelming.
                Whether you&apos;re navigating psychosocial disability, a
                significant life transition, or supports across multiple
                systems, we know how to hold it all together.
              </p>
            </div>

            <div className="bg-white rounded-xl p-8 border border-gray-100">
              <h3 className="text-xl font-semibold text-[#1a6b6b] mb-3">
                Psychosocial Recovery Coaching
              </h3>
              <p className="text-muted leading-relaxed">
                Practical, strengths-based coaching for participants living with
                psychosocial disability. We focus on building capacity and
                stability — helping you get more out of your plan and more
                connected to the things that matter.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-14 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-8">
            Why Illawarra participants choose Lumen Collective
          </h2>
          <ul className="space-y-4">
            {[
              "In-person support from a coordinator who actually knows the Illawarra",
              "Extensive local knowledge of Illawarra-based providers and services",
              "Small collective model — you work directly with your coordinator, every time",
              "Deep experience in coordinating multidisciplinary teams across NDIS, community and mainstream services",
              "Calm, organised approach to complex and layered support needs",
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
            Suburbs we support across the Illawarra
          </h2>
          <p className="text-muted leading-relaxed">
            We provide in-person NDIS Support Coordination across the Illawarra,
            including Wollongong, North Wollongong, Fairy Meadow, Thirroul,
            Figtree, Keiraville, Shellharbour, Warilla, Albion Park, Dapto,
            Kiama, Gerringong, Warrawong, Port Kembla and surrounding areas.
            Remote support coordination is also available throughout NSW, QLD
            and VIC.
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
            There&apos;s no obligation — just a conversation to see if
            we&apos;re the right fit.
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
