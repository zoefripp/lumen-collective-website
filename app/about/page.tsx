import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About Lumen Collective | NDIS Support Coordinators Sydney",
  description:
    "Lumen Collective is a small, independent NDIS Support Coordination collective supporting participants across Sydney and remotely throughout NSW, QLD, and VIC.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            About Lumen Collective
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Thoughtful support coordination supporting participants across Sydney
            and remotely across NSW, QLD and VIC.
          </p>
        </div>
      </section>

      {/* Body content */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* TODO: Add team photo here */}

          <div className="prose prose-lg max-w-none">
            <p className="text-charcoal leading-relaxed mb-6">
              Lumen Collective is a small, independent Support Coordination
              collective supporting participants across Sydney, and remotely
              throughout NSW, QLD, and VIC.
            </p>

            <p className="text-charcoal leading-relaxed mb-6">
              Lumen Collective was established in response to a clear need
              within the sector. While the NDIS offers significant opportunity,
              navigating it can feel complex and overwhelming — particularly
              when supports span multiple providers, health systems and life
              stages. Participants and families are often managing complexity at
              the very time they need steadiness and coordination the most.
            </p>

            <p className="text-charcoal leading-relaxed mb-6">
              We provide Level 2 and Level 3 Support Coordination as well as
              Psychosocial Recovery Coaching. Our work is grounded in
              structured, practical implementation. We focus on ensuring plans
              are not only approved, but actively functioning in a cohesive and
              sustainable way.
            </p>

            <p className="text-charcoal leading-relaxed mb-6">
              We are particularly experienced in supporting participants
              navigating psychosocial disability, complex care needs and
              periods of significant transition. Whether working alongside
              families of young children, supporting young people building
              independence, coordinating layered supports for older
              participants, or assisting women navigating health-related
              complexity, we bring a calm, organised and responsive approach.
            </p>

            <p className="text-charcoal leading-relaxed mb-6">
              Our strengths lie in our ability to bring clarity to complexity.
              We understand multidisciplinary systems and prioritise clear
              communication, steady follow-through and collaborative
              problem-solving. We do not operate as a high-volume model. As a
              small collective, participants work directly with their
              coordinator — allowing for continuity, accountability and
              consistent oversight of supports.
            </p>

            <p className="text-charcoal leading-relaxed">
              At its core, Lumen Collective exists to provide coordination that
              feels dependable, informed and grounded in real-world experience.
              We aim to strengthen connections between services, reduce
              administrative overwhelm and ensure participants feel supported
              at every stage of their plan.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 border-t border-gray-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-charcoal mb-3">
            Ready to work with us?
          </h2>
          <p className="text-muted mb-6">
            We&apos;d love to hear about your situation and see how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-[#1a6b6b] hover:bg-[#154f4f] text-white font-medium px-6 py-3 rounded-md transition-colors duration-150"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
