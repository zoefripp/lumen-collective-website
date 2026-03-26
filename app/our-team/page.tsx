import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meet the Team | Lumen Collective",
  description: "Meet the people behind Lumen Collective — our Support Coordinators and admin who work alongside you every step of the way.",
};

const team = [
  {
    name: "Ashlee",
    title: "Support Coordinator",
    email: "ashlee.fripp@lumencollective.com.au",
    bio: "Ashlee is our admin extraordinaire, always ten steps ahead and the kind of organised that makes the rest of us look like we're winging it (we are). With a background in medical administration and nursing, Ashlee found her calling in Support Coordination because she genuinely loves walking alongside participants across every stage of their journey. She supports participants across the Greater Sydney region and offers remote Support Coordination across NSW, QLD, and VIC, with deep expertise in complex medical needs, hospital discharges, and working across the full lifespan. Whether it's maximising every dollar of your plan, navigating a reassessment, coordinating a multidisciplinary team, or connecting you with the right providers, Ashlee has it handled.",
  },
  {
    name: "Zoe",
    title: "Admin & People Connector",
    email: "admin@lumencollective.com",
    bio: "Zoe is the warm and welcoming first point of contact at Lumen Collective, she's the one who makes sure you land with the right Support Coordinator from the very start. As the face of our admin team, all your service agreements and documents flow through Zoe, and she has a genuine knack for making the paperwork side of things feel a whole lot less daunting. With a background in youth and community services, Zoe has a particular passion for working with children and young people. She brings a solid industry network and a real drive to connect participants with supports that actually mean something to them.",
  },
  {
    name: "Lorry",
    title: "Support Coordinator",
    email: "lorry.clark@lumencollective.com.au",
    bio: "Lorry is our superstar when it comes to navigating the sometimes-overwhelming world of community and mainstream supports, and she makes it look effortless. With expansive knowledge of non-government organisations and a real talent for building strong, consistent support networks, Lorry's strengths shine in coordinating multidisciplinary teams across NDIS-funded, community, and mainstream services. She loves nothing more than getting out and about, offering in-person Support Coordination across the Illawarra and Newcastle regions, with remote SC available across NSW, VIC, and QLD.",
  },
];

export default function OurTeamPage() {
  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Meet the Team
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            The people behind Lumen Collective — here to support you every step of the way.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-12 md:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {team.map((member) => (
              <div
                key={member.name}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100"
              >
                <h2 className="text-xl font-semibold text-charcoal mb-1">
                  {member.name}
                </h2>
                <p className="text-sm font-medium text-teal mb-1">
                  {member.title}
                </p>
                <a
                  href={`mailto:${member.email}`}
                  className="text-sm text-muted hover:text-teal transition-colors duration-150 mb-4 block"
                >
                  {member.email}
                </a>
                <p className="text-charcoal leading-relaxed text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
