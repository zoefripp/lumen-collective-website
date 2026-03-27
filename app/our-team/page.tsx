import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Meet the Team",
  description:
    "Meet the Lumen Collective team — a small group of Support Coordinators and admin staff supporting NDIS participants across Sydney, NSW, QLD and VIC.",
};

const team = [
  {
    name: "Ashlee Fripp",
    title: "Support Coordinator",
    email: "ashlee.fripp@lumencollective.com.au",
    initial: "A",
    bio: "Ashlee is our admin extraordinaire, always ten steps ahead and the kind of organised that makes the rest of us look like we're winging it (we are). With a background in medical administration and nursing, Ashlee found her calling in Support Coordination because she genuinely loves walking alongside participants across every stage of their journey. She supports participants across the Greater Sydney region and offers remote Support Coordination across NSW, QLD, and VIC, with deep expertise in complex medical needs, hospital discharges, and working across the full lifespan. Whether it's maximising every dollar of your plan, navigating a reassessment, coordinating a multidisciplinary team, or connecting you with the right providers, Ashlee has it handled.",
  },
  {
    name: "Zoe Fripp",
    title: "Admin & People Connector",
    email: "admin@lumencollective.com.au",
    initial: "Z",
    bio: "Zoe is the warm and welcoming first point of contact at Lumen Collective — she's the one who makes sure you land with the right Support Coordinator from the very start. As the face of our admin team, all your service agreements and documents flow through Zoe, and she has a genuine knack for making the paperwork side of things feel a whole lot less daunting. With a background in youth and community services, Zoe has a particular passion for working with children and young people. She brings a solid industry network and a real drive to connect participants with supports that actually mean something to them.",
  },
  {
    name: "Lorry Clark",
    title: "Support Coordinator",
    email: "lorry.clark@lumencollective.com.au",
    initial: "L",
    bio: "Lorry is our superstar when it comes to navigating the sometimes-overwhelming world of community and mainstream supports, and she makes it look effortless. With expansive knowledge of non-government organisations and a real talent for building strong, consistent support networks, Lorry's strengths shine in coordinating multidisciplinary teams across NDIS-funded, community, and mainstream services. She loves nothing more than getting out and about, offering in-person Support Coordination across the Illawarra and Newcastle regions, with remote SC available across NSW, VIC, and QLD.",
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

      {/* Team cards */}
      <section className="py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
