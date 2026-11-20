import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Support coordination, specialist support coordination, psychosocial recovery coaching and counselling. NDIS and private clients welcome.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/services",
  },
};

const faqSupport = [
  {
    q: "What does a Support Coordinator actually do?",
    a: "A Support Coordinator helps you understand your NDIS plan, find and connect with providers, and make sure your supports are working well together. We also help with plan reviews and act as a point of contact when things change.",
  },
  {
    q: "Do I need Support Coordination in my plan?",
    a: "Support Coordination needs to be funded in your NDIS plan. If you are not sure whether you have it, check under Capacity Building in your plan, or contact your Local Area Coordinator.",
  },
];

const faqPRC = [
  {
    q: "Who is Psychosocial Recovery Coaching for?",
    a: "It is for NDIS participants whose primary disability relates to mental health. It focuses on building your capacity to manage day-to-day life, connect with community, and work toward your recovery goals.",
  },
  {
    q: "How is coaching different from support coordination?",
    a: "Support Coordination helps you implement your plan and connect with services. Recovery Coaching is more focused on you as a person, building your skills, confidence and independence over time.",
  },
];

const faqCounselling = [
  {
    q: "Do I need a referral?",
    a: "No referral needed. You can book a free intro call directly.",
  },
  {
    q: "Can I use my NDIS funding?",
    a: "Yes, if you are self-managed or plan-managed and your plan has funding for therapy supports. I can check this with you on your free intro call.",
  },
  {
    q: "Where are sessions held?",
    a: "In person in Fairy Meadow, or online via video call.",
  },
];

function FAQ({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="space-y-5 mt-8">
      {items.map(({ q, a }) => (
        <div key={q} className="border-l-2 border-sage-soft pl-5">
          <p className="font-semibold text-brown text-sm mb-1">{q}</p>
          <p className="text-brown/70 text-sm leading-relaxed">{a}</p>
        </div>
      ))}
    </div>
  );
}

export default function ServicesPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Page header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-brown mb-4">Services</h1>
          <p className="text-lg text-brown/70 leading-relaxed">
            We offer a range of NDIS and private services. Jump to whichever is most relevant to you.
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {[
              ["Support Coordination", "#support-coordination"],
              ["Specialist Support Coordination", "#specialist-support-coordination"],
              ["Psychosocial Recovery Coaching", "#psychosocial-recovery-coaching"],
              ["Counselling", "#counselling"],
            ].map(([label, href]) => (
              <a
                key={href}
                href={href}
                className="text-sm bg-sage-tint text-brown border border-sage-soft rounded-full px-4 py-1.5 hover:bg-sage-soft transition-colors"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Support Coordination */}
      <section id="support-coordination" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sage mb-3">Level 2</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-5">Support Coordination</h2>
          <p className="text-brown/70 leading-relaxed mb-4">
            Support Coordination helps you get the most from your NDIS plan. We work with you to
            understand what is in your plan, connect you with the right providers, and make sure
            everything is working together in a cohesive and sustainable way.
          </p>
          <p className="text-brown/70 leading-relaxed mb-4">
            We handle the administrative complexity so you can focus on what matters. That includes
            reaching out to providers, tracking service agreements, preparing for plan reviews and
            acting as a steady point of contact when things change or go wrong.
          </p>
          <p className="text-brown/70 leading-relaxed">
            Support Coordination is funded under Capacity Building in your NDIS plan.
          </p>
          <FAQ items={faqSupport} />
          <div className="mt-10">
            <Link
              href="/referral"
              className="inline-block bg-peach text-brown font-semibold rounded-full px-7 py-3 hover:bg-peach/90 transition-colors mr-3"
            >
              Make a referral
            </Link>
            <Link
              href="/contact?topic=support-coordination"
              className="inline-block border border-sage text-brown font-semibold rounded-full px-7 py-3 hover:bg-sage-tint transition-colors"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-sage-soft max-w-3xl mx-auto px-4" />

      {/* Specialist Support Coordination */}
      <section id="specialist-support-coordination" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sage mb-3">Level 3</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-5">Specialist Support Coordination</h2>
          <p className="text-brown/70 leading-relaxed mb-4">
            Specialist Support Coordination is for participants with complex needs, significant
            life transitions, or layered supports across multiple systems. It requires a higher
            level of skill, experience and coordination than Level 2.
          </p>
          <p className="text-brown/70 leading-relaxed mb-4">
            We are particularly experienced in supporting participants navigating psychosocial
            disability, complex care arrangements, hospital transitions and situations where
            supports span health, housing, justice or family systems.
          </p>
          <p className="text-brown/70 leading-relaxed">
            Specialist Support Coordination is funded under Capacity Building in your NDIS plan.
            It requires NDIA approval and is not available to all participants.
          </p>
          <div className="mt-10">
            <Link
              href="/referral"
              className="inline-block bg-peach text-brown font-semibold rounded-full px-7 py-3 hover:bg-peach/90 transition-colors mr-3"
            >
              Make a referral
            </Link>
            <Link
              href="/contact?topic=support-coordination"
              className="inline-block border border-sage text-brown font-semibold rounded-full px-7 py-3 hover:bg-sage-tint transition-colors"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-sage-soft max-w-3xl mx-auto px-4" />

      {/* Psychosocial Recovery Coaching */}
      <section id="psychosocial-recovery-coaching" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sage mb-3">NDIS Capacity Building</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-5">Psychosocial Recovery Coaching</h2>
          <p className="text-brown/70 leading-relaxed mb-4">
            Psychosocial Recovery Coaching is a strengths-based, person-centred support for NDIS
            participants whose primary disability is related to mental health. The focus is on
            building capacity, stability and connection to community at a pace that works for you.
          </p>
          <p className="text-brown/70 leading-relaxed mb-4">
            A Recovery Coach works alongside you to understand your goals, identify what gets in the
            way, and develop practical strategies for building a life that feels meaningful and
            manageable. This is not clinical treatment, it sits alongside any clinical supports you
            already have.
          </p>
          <p className="text-brown/70 leading-relaxed">
            Psychosocial Recovery Coaching is funded under Capacity Building in your NDIS plan.
          </p>
          <FAQ items={faqPRC} />
          <div className="mt-10">
            <Link
              href="/referral"
              className="inline-block bg-peach text-brown font-semibold rounded-full px-7 py-3 hover:bg-peach/90 transition-colors mr-3"
            >
              Make a referral
            </Link>
            <Link
              href="/contact?topic=psychosocial-recovery-coaching"
              className="inline-block border border-sage text-brown font-semibold rounded-full px-7 py-3 hover:bg-sage-tint transition-colors"
            >
              Ask a question
            </Link>
          </div>
        </div>
      </section>

      <hr className="border-sage-soft max-w-3xl mx-auto px-4" />

      {/* Counselling */}
      <section id="counselling" className="py-16 md:py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-bold uppercase tracking-widest text-sage mb-3">Private and NDIS</p>
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-5">Counselling</h2>
          <p className="text-brown/70 leading-relaxed mb-4">
            A calm, private space to talk things through and work out what comes next. Open to
            private clients and NDIS participants.
          </p>
          <p className="text-brown/70 leading-relaxed mb-8">
            Sessions draw on evidence-based approaches including ACT, CBT and trauma-informed
            practice. The focus is always on what is most useful for you.
          </p>

          {/* Pricing card */}
          <div className="bg-sage-tint border border-sage-soft rounded-2xl p-7 mb-8">
            <h3 className="font-semibold text-brown mb-4">Pricing</h3>
            <ul className="space-y-2 text-sm text-brown/70">
              <li>$120 per 50-minute session</li>
              <li>No referral needed</li>
              <li>In person in Fairy Meadow or online</li>
              <li>NDIS participants who are self-managed or plan-managed can use their plan funding</li>
            </ul>
            <div className="mt-6">
              <Link
                href="/contact?topic=intro-call"
                className="inline-block bg-peach text-brown font-semibold rounded-full px-7 py-3 hover:bg-peach/90 transition-colors"
              >
                Book a free intro call
              </Link>
            </div>
          </div>

          <FAQ items={faqCounselling} />
        </div>
      </section>
    </div>
  );
}
