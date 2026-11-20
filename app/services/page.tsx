import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Support coordination, psychosocial recovery coaching and counselling. NDIS and private clients welcome.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">Services</h1>
          <p className="text-lg text-brown/70 leading-relaxed max-w-2xl">
            Three services, one point of contact. All delivered by me, Zoe, so
            the person you speak to is always the person doing the work.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="divide-y divide-sage-soft">
            {[
              {
                href: "/support-coordination",
                label: "NDIS funded",
                title: "Support Coordination",
                body: "Help to understand and use your NDIS plan, find the right providers and keep everything working together. Level 2 and Specialist (Level 3).",
              },
              {
                href: "/recovery-coaching",
                label: "NDIS funded",
                title: "Psychosocial Recovery Coaching",
                body: "Practical, strengths-based coaching for people living with psychosocial disability. Goals, routines, coping and connection, at your pace.",
              },
              {
                href: "/counselling",
                label: "$120 · 50 minutes",
                title: "Counselling",
                body: "A calm, private space to talk things through. Open to private clients and NDIS participants. No referral needed.",
              },
            ].map(({ href, label, title, body }) => (
              <Link
                key={href}
                href={href}
                className="group flex items-start gap-6 py-8 hover:bg-sage-tint/40 -mx-4 px-4 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-2 flex-wrap">
                    <h2 className="text-xl font-semibold text-brown">{title}</h2>
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-sage">{label}</span>
                  </div>
                  <p className="text-[17px] text-brown/70 leading-relaxed">{body}</p>
                </div>
                <svg className="w-5 h-5 text-sage-soft group-hover:text-sage transition-colors flex-shrink-0 mt-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
