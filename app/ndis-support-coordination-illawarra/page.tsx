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

const services = [
  {
    title: "Support Coordination (Level 2)",
    body: "I will work alongside you to implement your NDIS plan in a way that is practical and sustainable. That means connecting you with the right providers across the Illawarra, keeping your supports coordinated and making sure your plan is genuinely working, not just sitting in a drawer.",
  },
  {
    title: "Specialist Support Coordination (Level 3)",
    body: "For participants managing complex or layered support needs, I bring structure to situations that can feel overwhelming. Whether you are navigating psychosocial disability, a significant life transition or supports across multiple systems, I know how to hold it all together.",
  },
  {
    title: "Psychosocial Recovery Coaching",
    body: "Practical, strengths-based coaching for participants living with psychosocial disability. I focus on building capacity and stability, helping you get more out of your plan and more connected to the things that matter.",
  },
];

const checkItems = [
  "In-person support from a coordinator who actually knows the Illawarra",
  "Extensive local knowledge of Illawarra-based providers and services",
  "Small practice model — you work directly with me, every time",
  "Deep experience in coordinating multidisciplinary teams across NDIS, community and mainstream services",
  "Calm, organised approach to complex and layered support needs",
];

export default function IllawarraPage() {
  return (
    <div className="bg-cream min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-semibold text-brown mb-5 leading-tight">
            NDIS Support Coordination in the Illawarra
          </h1>
          <p className="text-lg text-brown/70 leading-relaxed mb-4">
            The Illawarra has a strong community, and navigating the NDIS within
            it should not feel isolating. I provide NDIS Support Coordination
            across the Illawarra region, supporting participants in Wollongong,
            Shellharbour, Dapto, Kiama, Albion Park, Warrawong, Figtree and
            surrounding areas.
          </p>
          <p className="text-lg text-brown/70 leading-relaxed">
            I know the local provider network and bring a calm, organised approach
            to even the most complex support situations.
          </p>
        </div>
      </section>

      {/* Services as lines */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-8">
            Services in the Illawarra
          </h2>
          <div className="divide-y divide-sage-soft">
            {services.map(({ title, body }) => (
              <div key={title} className="py-7">
                <h3 className="text-lg font-semibold text-brown mb-3">{title}</h3>
                <p className="text-[17px] text-brown/70 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose */}
      <section className="py-14 bg-sage-tint border-y border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-8">
            Why Illawarra participants choose Lumen Collective
          </h2>
          <ul className="divide-y divide-sage-soft">
            {checkItems.map((item) => (
              <li key={item} className="py-3.5 text-[17px] text-brown/70 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Suburbs */}
      <section className="py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brown mb-4">
            Suburbs across the Illawarra
          </h2>
          <p className="text-[17px] text-brown/70 leading-relaxed">
            I provide in-person NDIS Support Coordination across the Illawarra,
            including Wollongong, North Wollongong, Thirroul, Figtree, Keiraville,
            Shellharbour, Warilla, Albion Park, Dapto, Kiama, Gerringong,
            Warrawong, Port Kembla and surrounding areas.
          </p>
        </div>
      </section>

      {/* CTA: peach tint */}
      <section className="bg-peach-tint py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-4">
            Ready to get started?
          </h2>
          <p className="text-[17px] text-brown/70 leading-relaxed mb-8 max-w-xl">
            I would love to hear about your situation and see how I can help.
            There is no obligation, just a conversation to see if I am the right
            fit.
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
      </section>
    </div>
  );
}
