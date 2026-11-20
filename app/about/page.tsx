import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lumen Collective is a small, independent support coordination practice offering support coordination, psychosocial recovery coaching and counselling across Sydney, the Sutherland Shire and the Illawarra.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/about",
  },
};

export default function AboutPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-brown mb-4">
            About Lumen Collective
          </h1>
          <p className="text-lg text-brown/70 leading-relaxed">
            Support coordination, psychosocial recovery coaching and counselling
            across Sydney, the Sutherland Shire and the Illawarra, and online.
          </p>
        </div>
      </section>

      {/* About body */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-5 text-brown/80 leading-relaxed">
          <p>
            Lumen Collective is a small, independent support coordination practice
            supporting participants across Sydney, the Sutherland Shire and the
            Illawarra, and online throughout New South Wales.
          </p>
          <p>
            We were established in response to a clear need within the sector.
            While the NDIS offers significant opportunity, navigating it can feel
            complex and overwhelming, particularly when supports span multiple
            providers, health systems and life stages. Participants and families
            are often managing complexity at the very time they need steadiness
            and coordination the most.
          </p>
          <p>
            We provide Level 2 and Level 3 Support Coordination, Psychosocial
            Recovery Coaching, and Counselling. Our work is grounded in
            structured, practical implementation. We focus on ensuring plans are
            not only approved, but actively working in a cohesive and sustainable
            way.
          </p>
          <p>
            We are particularly experienced in supporting participants navigating
            psychosocial disability, complex care needs and periods of significant
            transition. Whether working alongside families of young children,
            supporting young people building independence, coordinating layered
            supports for older participants, or assisting people navigating
            health-related complexity, we bring a calm, organised and responsive
            approach.
          </p>
          <p>
            As a small collective, participants work directly with their
            coordinator. No handoffs. No inconsistency. Just continuity,
            accountability and consistent oversight of your supports.
          </p>
        </div>
      </section>

      {/* Meet Zoe */}
      <section id="meet-zoe" className="py-14 md:py-18 bg-sage-tint border-y border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sage mb-3">Meet the team</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-6">Zoe Fripp</h2>
          <p className="text-sm font-semibold text-sage mb-5">Specialist Support Coordinator and Counsellor</p>
          <div className="space-y-4 text-brown/70 leading-relaxed text-[0.9375rem]">
            <p>
              Zoe brings warmth, genuine care, and a real talent for making people feel at ease
              from the very first conversation. With a background in youth and community services,
              she has a deep understanding of how overwhelming it can feel to navigate complex
              systems, and a genuine drive to make that experience simpler, clearer and less
              daunting for the people she works with.
            </p>
            <p>
              As a Specialist Support Coordinator, Zoe&apos;s strengths lie in coordinating
              multidisciplinary teams across NDIS-funded, community and mainstream services. With
              expansive knowledge of local non-government organisations, she is able to connect
              participants with supports that go well beyond their NDIS plan.
            </p>
            <p>
              Whether it is maximising every dollar of your funding, navigating a reassessment, or
              building a strong and consistent support network around you, Zoe has it handled. She
              is meticulous about the detail that matters without ever losing sight of the person
              at the centre of it all.
            </p>
            <p>
              Support coordination and coaching in person across the Illawarra and Greater
              Sydney, including the Sutherland Shire, and remotely across NSW, QLD and VIC.
              Counselling in person in the Illawarra and Greater Sydney, or online wherever
              you are.
            </p>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/contact"
              className="inline-block bg-peach text-brown font-semibold rounded-full px-7 py-3 hover:bg-peach/90 transition-colors"
            >
              Get in touch
            </Link>
            <Link
              href="/referral"
              className="inline-block border border-sage text-brown font-semibold rounded-full px-7 py-3 hover:bg-cream transition-colors"
            >
              Make a referral
            </Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-brown mb-3">Ready to work with us?</h2>
          <p className="text-brown/70 mb-6">
            We would love to hear about your situation and see how we can help.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-peach text-brown font-semibold rounded-full px-7 py-3 hover:bg-peach/90 transition-colors"
          >
            Get in touch
          </Link>
        </div>
      </section>
    </div>
  );
}
