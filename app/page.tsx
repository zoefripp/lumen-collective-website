import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Lumen Collective | NDIS Support Coordination Sydney",
  description:
    "Expert NDIS Support Coordination for participants across Sydney and remotely throughout NSW, QLD and VIC. Level 2, Level 3, and Psychosocial Recovery Coaching.",
};

const services = [
  {
    title: "Support Coordination (Level 2)",
    description:
      "We work alongside you to understand your NDIS plan, connect you with the right providers, and make sure your supports are working together in a cohesive and sustainable way.",
  },
  {
    title: "Specialist Support Coordination (Level 3)",
    description:
      "For participants with complex needs — including psychosocial disability, layered supports, or significant life transitions — we bring calm, organised coordination to complex situations.",
  },
  {
    title: "Psychosocial Recovery Coaching",
    description:
      "Focused, strengths-based coaching to support participants living with psychosocial disability to build capacity, stability and connection to community.",
  },
];

const values = [
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#1a6b6b]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Small collective, not a call centre",
    description:
      "Participants work directly with their coordinator. No handoffs, no inconsistency.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#1a6b6b]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
        />
      </svg>
    ),
    title: "Clarity in complexity",
    description:
      "We understand multidisciplinary systems and bring structure to situations that feel overwhelming.",
  },
  {
    icon: (
      <svg
        className="w-8 h-8 text-[#1a6b6b]"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
        />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </svg>
    ),
    title: "Sydney + remote",
    description:
      "Supporting participants in person across Sydney and remotely throughout NSW, QLD and VIC.",
  },
];

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="bg-offwhite py-20 md:py-28">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Logo centred above headline — teal background keeps white logo visible */}
          <div className="flex justify-center mb-12">
            <div className="bg-[#1a6b6b] rounded-2xl px-10 py-6">
              <Image
                src="/logo-trimmed.png"
                alt="Lumen Collective"
                width={678}
                height={174}
                className="h-14 w-auto"
                priority
              />
            </div>
          </div>
          <div className="max-w-2xl">
            <h1 className="text-4xl md:text-5xl font-semibold text-charcoal leading-tight mb-6">
              Expert Support Coordination for Your NDIS Journey
            </h1>
            <p className="text-lg text-muted mb-8 leading-relaxed">
              Thoughtful support coordination for participants across Sydney and
              remotely throughout NSW, QLD and VIC.
            </p>
            <Link
              href="/contact"
              className="inline-block bg-[#1a6b6b] hover:bg-[#154f4f] text-white font-medium px-6 py-3 rounded-md transition-colors duration-150"
            >
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-charcoal mb-10 text-center">
            How We Can Help
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service) => (
              <div
                key={service.title}
                className="bg-offwhite rounded-lg p-6 border border-gray-100"
              >
                <h3 className="text-lg font-semibold text-charcoal mb-3">
                  {service.title}
                </h3>
                <p className="text-muted text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values strip */}
      <section className="py-16 md:py-20 bg-offwhite">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-10">
            {values.map((value) => (
              <div key={value.title} className="flex flex-col items-start">
                <div className="mb-4">{value.icon}</div>
                <h3 className="text-base font-semibold text-charcoal mb-2">
                  {value.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-[#1a6b6b] py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Logo centred — white logo is visible directly on teal background */}
          <div className="flex justify-center mb-8">
            <Image
              src="/logo-trimmed.png"
              alt="Lumen Collective"
              width={678}
              height={174}
              className="h-10 w-auto"
            />
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold text-white mb-6">
            Ready to get started?
          </h2>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#1a6b6b] font-semibold px-6 py-3 rounded-md hover:bg-gray-50 transition-colors duration-150"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </>
  );
}
