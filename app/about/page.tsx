import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "Lumen Collective is a small, independent support coordination practice offering support coordination, psychosocial recovery coaching and counselling across the Illawarra and Greater Sydney.",
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
          <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">
            About Lumen
          </h1>
          <p className="text-lg text-brown/70 leading-relaxed max-w-2xl">
            I started Lumen Collective to offer a service that is responsive,
            effective and reliable. Too often people are left waiting for
            call-backs, passed between workers or handed a plan that looks good
            on paper and does not work in real life. Lumen is small on purpose,
            so the person you speak to is the person doing the work.
          </p>
        </div>
      </section>

      {/* Meet Zoe */}
      <section id="meet-zoe" className="py-14 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-5">About me</p>
          <h2 className="text-3xl md:text-[2.75rem] font-semibold text-brown leading-[1.15] mb-6">
            Meet Zoe
          </h2>
          <div className="space-y-4 text-[17px] text-brown/70 leading-relaxed mb-6">
            <p>
              I&apos;m Zoe. I have more than 12 years&apos; experience in the disability
              and community sector, with a background in youth and community
              development work, counselling and support coordination. I have
              supported people through every stage of life, from young people
              finding their feet to older people managing layered and complex
              care needs.
            </p>
          </div>
          <p className="text-sm text-brown mb-10">
            Bachelor of Social Science &middot; Diploma of Youth Work &middot; Diploma of
            Counselling &middot; Mental Health First Aid
          </p>

          {/* Three numbered rows */}
          <div className="divide-y divide-sage-soft">
            {[
              {
                n: "01",
                heading: "As your Support Coordinator",
                body: "I am organised, efficient and easy to reach. I have worked across complex care needs and psychosocial disability, coordinating multidisciplinary teams, linking people with local services and supporting plan reassessments. My job is to make the system simpler for you, not the other way around.",
              },
              {
                n: "02",
                heading: "As your Counsellor",
                body: "I offer a compassionate, non-judgemental space where you can say what is really going on. I work with people at all stages of life, whether you are dealing with stress, a big change, relationships or just feeling stuck. Sessions are paced around you, and I draw on approaches such as CBT and ACT where they help.",
              },
              {
                n: "03",
                heading: "As your Recovery Coach",
                body: "Recovery coaching is about building a life that works for you. I use a strengths-based approach and practical tools for goals, routines, coping and values, so progress is something you can see. My background in youth work and Mental Health First Aid means I understand that recovery is rarely a straight line.",
              },
            ].map(({ n, heading, body }) => (
              <div key={n} className="flex gap-6 md:gap-10 py-8">
                <span className="text-sm font-semibold text-sage-soft w-8 flex-shrink-0 pt-1">{n}</span>
                <div>
                  <h3 className="text-lg font-semibold text-brown mb-3">{heading}</h3>
                  <p className="text-[17px] text-brown/70 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA: peach tint band */}
      <section className="bg-peach-tint py-14 md:py-18">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-4">Ready to talk?</h2>
          <p className="text-[17px] text-brown/70 leading-relaxed mb-8 max-w-xl">
            Get in touch and we will work out together whether Lumen is the right
            fit. Referrals from allied health, hospitals and families are always
            welcome.
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
