import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet Zoe Fripp | Specialist Support Coordinator | Lumen Collective",
  description:
    "Meet Zoe Fripp, Specialist Support Coordinator at Lumen Collective — supporting NDIS participants across Sydney, Sutherland Shire and Illawarra.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/our-team",
  },
};

const team = [
  {
    name: "Zoe Fripp",
    title: "Specialist Support Coordinator",
    email: "zoe.fripp@lumencollective.com.au",
    initial: "Z",
    bio: "Zoe brings warmth, genuine care, and a real talent for making people feel at ease from the very first conversation. With a background in youth and community services, she has a deep understanding of how overwhelming it can feel to navigate complex systems — and a genuine drive to make that experience simpler, clearer, and less daunting for the people she works with. As a Specialist Support Coordinator, Zoe's strengths lie in coordinating multidisciplinary teams across NDIS-funded, community, and mainstream services. With expansive knowledge of local non-government organisations, she is able to connect participants with supports that go well beyond their NDIS plan. Whether it's maximising every dollar of your funding, navigating a reassessment, or building a strong and consistent support network around you — Zoe has it handled. She is meticulous about the detail that matters without ever losing sight of the person at the centre of it all. Zoe supports participants across Sydney and remotely throughout NSW, QLD and VIC.",
  },
];

export default function OurTeamPage() {
  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Meet the Team
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-2xl mx-auto">
            We&apos;re a small collective — and that&apos;s exactly the point.
            Participants work directly with their coordinator, every time.
          </p>
        </div>
      </section>

      {/* Team card */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 max-w-lg mx-auto gap-8">
            {team.map((member) => (
              <div
                key={member.email}
                className="bg-white rounded-xl p-8 shadow-sm flex flex-col items-center text-center"
              >
                {/* SVG avatar */}
                <svg
                  width="80"
                  height="80"
                  viewBox="0 0 80 80"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="mb-5 flex-shrink-0"
                  aria-hidden="true"
                >
                  <circle cx="40" cy="40" r="40" fill="#1a6b6b" />
                  <text
                    x="40"
                    y="40"
                    dominantBaseline="central"
                    textAnchor="middle"
                    fill="white"
                    fontSize="32"
                    fontWeight="600"
                    fontFamily="Poppins, sans-serif"
                  >
                    {member.initial}
                  </text>
                </svg>

                <h2 className="text-xl font-semibold text-charcoal mb-1">
                  {member.name}
                </h2>
                <p className="text-sm font-medium text-[#1a6b6b] mb-3">
                  {member.title}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-muted hover:text-[#1a6b6b] transition-colors duration-150 mb-5 break-all"
                >
                  {member.email}
                </a>
                <p className="text-sm text-charcoal leading-relaxed text-left">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 bg-[#1a6b6b]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl font-semibold text-white mb-3">
            Ready to get started?
          </h2>
          <p className="text-white/80 mb-6">
            We&apos;d love to hear from you — no obligation, just a conversation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-[#1a6b6b] hover:bg-gray-100 font-semibold px-8 py-3 rounded-md transition-colors duration-150"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </div>
  );
}
