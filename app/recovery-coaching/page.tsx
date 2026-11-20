import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Psychosocial Recovery Coaching",
  description:
    "Strengths-based psychosocial recovery coaching for NDIS participants living with psychosocial disability, across the Illawarra and Greater Sydney.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/recovery-coaching",
  },
};

const faqs = [
  {
    q: "Who is Psychosocial Recovery Coaching for?",
    a: "It is for NDIS participants whose primary disability relates to mental health. It focuses on building your capacity to manage day-to-day life, connect with community, and work toward your recovery goals.",
  },
  {
    q: "How is coaching different from support coordination?",
    a: "Support Coordination helps you implement your plan and connect with services. Recovery Coaching is more focused on you as a person, building your skills, confidence and independence over time.",
  },
];

export default function RecoveryCoachingPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-5">NDIS funded</p>
          <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">
            Psychosocial Recovery Coaching
          </h1>
        </div>
      </section>

      {/* Body */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-[17px] text-brown/85 leading-relaxed">
          <p>
            For NDIS participants living with psychosocial disability. Together
            we work on your goals, build skills and confidence, strengthen your
            connections and plan for the harder days. Funded through your NDIS
            plan under Capacity Building.
          </p>
          <p>
            A Recovery Coach works alongside you to understand your goals,
            identify what gets in the way, and develop practical strategies for
            building a life that feels meaningful and manageable. This is not
            clinical treatment, it sits alongside any clinical supports you
            already have.
          </p>
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
