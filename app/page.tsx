import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Lumen Collective | Support Coordination, Recovery Coaching and Counselling",
  description:
    "Support coordination, psychosocial recovery coaching and counselling across Sydney, the Sutherland Shire and the Illawarra, and online.",
  alternates: {
    canonical: "https://www.lumencollective.com.au",
  },
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Lumen Collective",
  description:
    "Support coordination, psychosocial recovery coaching and counselling across Sydney, the Sutherland Shire and the Illawarra, and online.",
  url: "https://www.lumencollective.com.au",
  telephone: "0452278055",
  email: "admin@lumencollective.com.au",
  areaServed: [
    { "@type": "City", name: "Sydney" },
    { "@type": "AdministrativeArea", name: "Sutherland Shire" },
    { "@type": "AdministrativeArea", name: "Illawarra" },
    { "@type": "State", name: "New South Wales" },
  ],
  sameAs: ["https://www.facebook.com/LumenCollective/"],
};

const serviceCards = [
  {
    title: "Support Coordination",
    description:
      "We work alongside you to understand your NDIS plan, connect you with the right providers, and make sure your supports are working together in a cohesive and sustainable way.",
    href: "/services#support-coordination",
  },
  {
    title: "Specialist Support Coordination",
    description:
      "For participants with complex needs, significant life transitions, or layered supports across multiple systems, we bring calm, organised coordination to the complexity.",
    href: "/services#specialist-support-coordination",
  },
  {
    title: "Psychosocial Recovery Coaching",
    description:
      "Strengths-based coaching to support participants living with psychosocial disability to build capacity, stability and connection to community.",
    href: "/services#psychosocial-recovery-coaching",
  },
  {
    title: "Counselling",
    description:
      "A calm, private space to talk things through. Open to private clients and NDIS participants. $120 · 50 minutes · in person or online.",
    href: "/services#counselling",
  },
];

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      {/* Hero — sage background */}
      <section className="bg-sage py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left: text */}
            <div>
              <p className="text-sm font-semibold text-cream/70 uppercase tracking-widest mb-6">
                Illawarra · Greater Sydney · Remote and online
              </p>
              <h1 className="text-4xl md:text-5xl font-semibold text-cream leading-tight mb-6">
                Support that makes the complex feel manageable
              </h1>
              <p className="text-lg text-cream/85 mb-8 leading-relaxed">
                Support coordination, psychosocial recovery coaching and counselling
                across the Illawarra and Greater Sydney, and online.
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
                  className="text-cream/85 font-medium hover:text-cream transition-colors underline underline-offset-2"
                >
                  Make a referral
                </Link>
              </div>
            </div>
            {/* Right: stacked logo on sage-tint panel */}
            <div className="flex justify-center">
              <div className="bg-sage-tint rounded-lg p-10 flex items-center justify-center w-full max-w-sm">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/lumen-brand-files/lumen-logo-stacked.svg"
                  alt="Lumen Collective"
                  className="h-52 w-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Service cards */}
      <section className="py-16 md:py-24 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-10 text-center">
            How we can help
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {serviceCards.map((card) => (
              <Link
                key={card.title}
                href={card.href}
                className="group bg-white border border-sage-soft rounded-2xl p-7 hover:border-sage transition-colors"
              >
                <h3 className="text-lg font-semibold text-brown mb-3 group-hover:text-sage transition-colors">
                  {card.title}
                </h3>
                <p className="text-brown/70 text-sm leading-relaxed">
                  {card.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Lumen */}
      <section className="py-16 md:py-20 bg-sage-tint">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-10 text-center">
            Why Lumen Collective
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-base font-semibold text-brown mb-2">Small collective, not a call centre</h3>
              <p className="text-sm text-brown/70 leading-relaxed">You work directly with your coordinator every time. No handoffs, no inconsistency.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-brown mb-2">Clarity in complexity</h3>
              <p className="text-sm text-brown/70 leading-relaxed">We understand multidisciplinary systems and bring structure to situations that feel overwhelming.</p>
            </div>
            <div>
              <h3 className="text-base font-semibold text-brown mb-2">Sydney and online</h3>
              <p className="text-sm text-brown/70 leading-relaxed">In person across Sydney, the Sutherland Shire and the Illawarra. Counselling and coaching also available online.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="py-16 md:py-20 bg-cream">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-4 text-center">
            Areas we service
          </h2>
          <p className="text-brown/70 text-center max-w-2xl mx-auto mb-10 leading-relaxed">
            In-person support coordination across Sydney, the Sutherland Shire and the Illawarra.
            Counselling and coaching also available online.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/ndis-support-coordination-sutherland-shire"
              className="group bg-white border border-sage-soft rounded-2xl p-6 hover:border-sage transition-colors"
            >
              <h3 className="font-semibold text-brown mb-1 group-hover:text-sage transition-colors">Sutherland Shire</h3>
              <p className="text-sm text-brown/60">Cronulla, Miranda, Caringbah and surrounds</p>
            </Link>
            <Link
              href="/ndis-support-coordination-illawarra"
              className="group bg-white border border-sage-soft rounded-2xl p-6 hover:border-sage transition-colors"
            >
              <h3 className="font-semibold text-brown mb-1 group-hover:text-sage transition-colors">Illawarra</h3>
              <p className="text-sm text-brown/60">Wollongong, Shellharbour, Kiama and surrounds</p>
            </Link>
            <div className="bg-white border border-sage-soft rounded-2xl p-6">
              <h3 className="font-semibold text-brown mb-1">Online</h3>
              <p className="text-sm text-brown/60">Counselling and coaching available across NSW</p>
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-brown py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Logo variant="white" className="h-10 w-auto mx-auto mb-8" />
          <h2 className="text-2xl md:text-3xl font-semibold text-cream mb-6">
            Ready to get started?
          </h2>
          <Link
            href="/referral"
            className="inline-block bg-peach text-brown font-semibold rounded-full px-8 py-3.5 hover:bg-peach/90 transition-colors"
          >
            Make a referral
          </Link>
        </div>
      </section>
    </>
  );
}
