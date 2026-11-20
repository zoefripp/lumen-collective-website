import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Counselling",
  description:
    "Individual counselling for private clients and NDIS participants. In person in the Illawarra and Greater Sydney, or online.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/counselling",
  },
};

const howItWorks = [
  {
    n: "1",
    heading: "Free intro call",
    body: "A short chat to see if we are a good fit and answer your questions.",
  },
  {
    n: "2",
    heading: "Your first session",
    body: "We talk about what brings you here and what you would like to change.",
  },
  {
    n: "3",
    heading: "Ongoing sessions",
    body: "At a pace that suits you, in person or online.",
  },
];

const faqs = [
  {
    q: "Do I need a referral?",
    a: "No. You can book directly.",
  },
  {
    q: "Can I claim Medicare?",
    a: "No, a Medicare rebate is not available for these sessions.",
  },
  {
    q: "Can I use my NDIS funding?",
    a: "Yes, if you are self-managed or plan-managed and your plan has funding for therapy supports. I can check this with you on your free intro call.",
  },
  {
    q: "How long is a session?",
    a: "50 minutes.",
  },
  {
    q: "Where are sessions held?",
    a: "In person in the Illawarra and Greater Sydney, or online.",
  },
];

export default function CounsellingPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-5">Private and NDIS</p>
          <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">
            Counselling
          </h1>
          <p className="text-lg text-brown/85 leading-relaxed max-w-2xl mb-3">
            A calm, private space to talk things through and work out what comes
            next. Open to private clients and NDIS participants.
          </p>
          <p className="text-lg text-brown/85 leading-relaxed max-w-2xl">
            I draw on approaches such as CBT and ACT where they help. The focus
            is always on what is most useful for you.
          </p>
        </div>
      </section>

      {/* Pricing + CTA */}
      <section className="py-12 md:py-16 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="border-l-2 border-peach pl-6 space-y-2.5 text-[17px] text-brown/85 mb-8">
            <li>$120 per 50-minute session</li>
            <li>Free intro call before you book</li>
            <li>No referral needed</li>
            <li>No Medicare rebate available</li>
            <li>NDIS participants who are self-managed or plan-managed can use their plan funding</li>
            <li>In person in the Illawarra and Greater Sydney, or online</li>
          </ul>
          <Link
            href="/contact?topic=intro-call"
            className="inline-block bg-peach text-brown font-semibold rounded-full px-8 py-3.5 hover:bg-peach/90 transition-colors"
          >
            Book a free intro call
          </Link>
        </div>
      </section>

      {/* How it works */}
      <section className="py-12 md:py-16 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl md:text-3xl font-semibold text-brown mb-8">How it works</h2>
          <div className="divide-y divide-sage-soft">
            {howItWorks.map(({ n, heading, body }) => (
              <div key={n} className="flex gap-6 py-6">
                <span className="text-sm font-semibold text-sage-soft w-6 flex-shrink-0 pt-0.5">{n}.</span>
                <div>
                  <p className="font-semibold text-brown mb-1">{heading}</p>
                  <p className="text-[17px] text-brown/85 leading-relaxed">{body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-10 md:py-14">
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
    </div>
  );
}
