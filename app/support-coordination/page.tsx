import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Support Coordination",
  description:
    "NDIS Support Coordination (Level 2) and Specialist Support Coordination (Level 3) across the Illawarra and Greater Sydney.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/support-coordination",
  },
};

const faqs = [
  {
    q: "What does a Support Coordinator actually do?",
    a: "I help you understand your NDIS plan, find and connect with providers, and make sure your supports are working well together. I also help with plan reviews and act as your point of contact when things change.",
  },
  {
    q: "Do I need Support Coordination in my plan?",
    a: "Support Coordination needs to be funded in your NDIS plan. If you are not sure whether you have it, check under Capacity Building in your plan, or contact your Local Area Coordinator.",
  },
];

export default function SupportCoordinationPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-5">NDIS funded</p>
          <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">
            Support Coordination
          </h1>
        </div>
      </section>

      {/* Service descriptions */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-sage-soft">
            <div className="pb-10">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-sage mb-4">Level 2</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-5">
                Support Coordination
              </h2>
              <p className="text-[17px] text-brown/85 leading-relaxed mb-4">
                For NDIS participants who want help to understand and use their
                plan. I help you make sense of your funding, find and connect
                with providers, set up service agreements and keep your supports
                working together through the life of your plan.
              </p>
              <p className="text-[17px] text-brown/85 leading-relaxed">
                I handle the administrative complexity so you can focus on what
                matters. That includes reaching out to providers, tracking
                service agreements, preparing for plan reviews and acting as a
                steady point of contact when things change or go wrong.
              </p>
            </div>

            <div className="pt-10">
              <p className="text-xs font-semibold uppercase tracking-[0.1em] text-sage mb-4">Level 3</p>
              <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-5">
                Specialist Support Coordination
              </h2>
              <p className="text-[17px] text-brown/85 leading-relaxed mb-4">
                For situations with high complexity, such as psychosocial
                disability, multiple systems involved, hospital discharge,
                housing changes or risk to your supports. I bring clarity to
                complexity and make sure nothing falls through the gaps.
              </p>
              <p className="text-[17px] text-brown/85 leading-relaxed">
                Specialist Support Coordination is funded under Capacity
                Building in your NDIS plan. It requires NDIA approval and is
                not available to all participants.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 md:py-14 border-t border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-brown mb-8">Common questions</h2>
          <div className="divide-y divide-sage-soft">
            {faqs.map(({ q, a }) => (
              <div key={q} className="py-6">
                <p className="font-semibold text-brown mb-2">{q}</p>
                <p className="text-[17px] text-brown/85 leading-relaxed">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-peach-tint py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-5 items-center">
            <Link
              href="/contact"
              className="inline-block bg-peach text-brown font-semibold rounded-full px-8 py-3.5 hover:bg-peach/90 transition-colors"
            >
              Get in touch
            </Link>
            <Link
              href="/referral"
              className="text-brown/85 font-medium hover:text-brown transition-colors underline underline-offset-4"
            >
              Make a referral
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
