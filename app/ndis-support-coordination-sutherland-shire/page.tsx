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

const services = [
  {
    title: "Support Coordination (Level 2)",
    body: "I work alongside you to make sense of your NDIS plan — connecting you with the right providers, keeping your supports working together and making sure your funding is being used in a way that reflects your goals. Whether you are just starting out with the NDIS or navigating a reassessment, I am here to take the overwhelm out of it.",
  },
  {
    title: "Specialist Support Coordination (Level 3)",
    body: "For participants with complex needs — including psychosocial disability, layered support systems or significant life transitions — I bring calm, structured coordination to situations that can feel unmanageable.",
  },
  {
    title: "Psychosocial Recovery Coaching",
    body: "Strengths-based, practical coaching for participants living with psychosocial disability. I focus on building capacity, stability and meaningful connection to community, at a pace that works for you.",
  },
];

const checkItems = [
  "You work directly with me — no handoffs, no inconsistency",
  "I understand complex and layered support needs, including psychosocial disability",
  "I prioritise clear communication and steady follow-through",
  "I am experienced across the full lifespan — from young children to older participants",
  "I know the local provider landscape and can connect you with the right people faster",
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
          <h1 className="text-4xl md:text-5xl font-semibold text-brown mb-5 leading-tight">
            NDIS Support Coordination in the Sutherland Shire
          </h1>
          <p className="text-lg text-brown/70 leading-relaxed mb-4">
            Finding the right support coordinator matters, especially when you
            want someone who actually knows your community. I provide NDIS
            Support Coordination across the Sutherland Shire, working with
            participants in Cronulla, Miranda, Caringbah, Sutherland, Gymea,
            Engadine, Menai, Kirrawee and surrounding suburbs.
          </p>
          <p className="text-lg text-brown/70 leading-relaxed">
            Lumen is small on purpose. When you work with us, you are working
            directly with your coordinator, the same person, every time.
          </p>
        </div>
      </section>

      {/* Services as lines */}
      <section className="py-14 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-8">
            Services in the Sutherland Shire
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
            Why families in the Sutherland Shire choose Lumen Collective
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
            Suburbs across the Sutherland Shire
          </h2>
          <p className="text-[17px] text-brown/70 leading-relaxed">
            I support participants in-person across the Sutherland Shire,
            including Cronulla, Miranda, Caringbah, Sutherland, Gymea, Gymea
            Bay, Engadine, Menai, Kirrawee, Jannali, Como, Oyster Bay, Loftus,
            Heathcote and surrounding areas. Not sure if I cover your suburb?{" "}
            <Link href="/contact" className="text-brown underline underline-offset-4 hover:text-brown/70 transition-colors">
              Get in touch
            </Link>{" "}
            and I would love to help.
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
            Reach out for a no-obligation conversation and we will take it from
            there.
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
