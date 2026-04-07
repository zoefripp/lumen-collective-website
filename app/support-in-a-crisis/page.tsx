import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support in a Crisis",
  description:
    "A directory of crisis support services in Australia — including mental health, disability, family violence, and emergency contacts. Available to NDIS participants, carers, and families.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/support-in-a-crisis",
  },
};

type Service = {
  name: string;
  phone?: string;
  website?: string;
  hours: string;
  description: string;
};

type Category = {
  title: string;
  colour: string;
  services: Service[];
};

const categories: Category[] = [
  {
    title: "Emergency & Police",
    colour: "#b91c1c",
    services: [
      {
        name: "Emergency Services",
        phone: "000",
        hours: "24/7",
        description:
          "Call 000 for police, ambulance, or fire in a life-threatening emergency. If someone is in immediate danger, always call 000 first.",
      },
      {
        name: "Police Assistance Line (Non-Urgent)",
        phone: "131 444",
        hours: "24/7",
        description:
          "For non-urgent police matters in NSW — reporting minor incidents, seeking general assistance, or following up on non-emergency situations. Not a substitute for 000 in urgent situations.",
      },
    ],
  },
  {
    title: "Mental Health Crisis",
    colour: "#1a6b6b",
    services: [
      {
        name: "Mental Health Line (NSW)",
        phone: "1800 011 511",
        hours: "24/7",
        description:
          "A NSW Health service providing immediate telephone support, assessment, and referral for people experiencing a mental health crisis. Available to individuals, families, and carers.",
      },
      {
        name: "Lifeline",
        phone: "13 11 14",
        website: "lifeline.org.au",
        hours: "24/7 phone · Online chat available",
        description:
          "Crisis support and suicide prevention for people experiencing emotional distress. Available by phone, text (0477 13 11 14, 6pm–midnight), and online chat.",
      },
      {
        name: "Beyond Blue",
        phone: "1300 22 4636",
        website: "beyondblue.org.au",
        hours: "24/7 phone · Online chat available",
        description:
          "Support for anxiety, depression, and suicide. Provides information, counselling, and referral. Online chat available 3pm–midnight daily via the website.",
      },
      {
        name: "SANE",
        phone: "1800 187 263",
        website: "sane.org",
        hours: "Mon–Fri, 10am–10pm AEST",
        description:
          "Support for people living with complex mental health issues — including schizophrenia, bipolar disorder, and personality disorders — as well as their families and carers.",
      },
      {
        name: "Medicare Mental Health",
        phone: "1800 595 212",
        website: "medicareaustralia.gov.au",
        hours: "24/7",
        description:
          "Free Medicare-funded mental health phone counselling. Available to people with a Mental Health Treatment Plan from their GP, and for immediate support during a crisis.",
      },
    ],
  },
  {
    title: "Disability Support",
    colour: "#1a6b6b",
    services: [
      {
        name: "National Disability Abuse and Neglect Hotline",
        phone: "1800 880 052",
        hours: "Mon–Fri, 9am–5pm AEST",
        description:
          "A confidential reporting line for concerns about abuse, neglect, or exploitation of people with disability. Can be used by participants, families, carers, or workers.",
      },
      {
        name: "Disability Gateway",
        phone: "1800 643 787",
        website: "disabilitygateway.gov.au",
        hours: "Mon–Fri, 8am–8pm · Sat, 9am–7pm AEST",
        description:
          "A government-funded service connecting people with disability to local supports, services, and information. A good first call if you're not sure where to turn.",
      },
      {
        name: "National Disability Advocacy Program (NDAP)",
        website: "dss.gov.au/disability/national-disability-advocacy-program",
        hours: "Varies by provider",
        description:
          "Funds local disability advocacy organisations across Australia. If you need help understanding your rights, navigating a complaint, or speaking up in a difficult situation, an NDAP advocate can support you at no cost.",
      },
      {
        name: "People with Disability Australia (PWDA)",
        phone: "1800 422 015",
        website: "pwd.org.au",
        hours: "Mon–Fri, 9am–5pm AEST",
        description:
          "A national cross-disability rights and advocacy organisation. Provides information and referrals, and can connect people with disability to advocacy and legal support.",
      },
    ],
  },
  {
    title: "Carers",
    colour: "#1a6b6b",
    services: [
      {
        name: "Carer Gateway",
        phone: "1800 422 737",
        website: "carergateway.gov.au",
        hours: "24/7",
        description:
          "The national support service for unpaid carers. Provides counselling, peer support, practical assistance, and connections to local services. Free and available to all carers regardless of location.",
      },
    ],
  },
  {
    title: "Family & Relationships",
    colour: "#1a6b6b",
    services: [
      {
        name: "1800RESPECT",
        phone: "1800 737 732",
        website: "1800respect.org.au",
        hours: "24/7",
        description:
          "National sexual assault, domestic and family violence counselling service. Free, confidential support for people experiencing, or at risk of, family and domestic violence.",
      },
      {
        name: "Parentline NSW",
        phone: "1300 1300 52",
        website: "parentline.org.au",
        hours: "Mon–Fri, 9am–9pm · Sat, 4pm–9pm AEST",
        description:
          "Telephone counselling and support for parents and carers of children from birth through to 18 years. No issue is too big or too small — parenting stress, behaviour, school, or family relationships.",
      },
      {
        name: "MensLine Australia",
        phone: "1300 78 99 78",
        website: "mensline.org.au",
        hours: "24/7",
        description:
          "Telephone and online counselling for men experiencing emotional difficulties, stress, anger, or relationship problems. Free, confidential, and available anywhere in Australia.",
      },
    ],
  },
  {
    title: "Young People",
    colour: "#1a6b6b",
    services: [
      {
        name: "Kids Helpline",
        phone: "1800 551 800",
        website: "kidshelpline.com.au",
        hours: "24/7",
        description:
          "Australia's only free, private, and confidential telephone and online counselling service specifically for young people aged 5 to 25. Available by phone, web chat, and email.",
      },
      {
        name: "Headspace",
        phone: "1800 650 890",
        website: "headspace.org.au",
        hours: "Centre hours vary · Online support available",
        description:
          "National youth mental health support for people aged 12–25. Centres offer free or low-cost mental health, physical health, work, and study support. Online and phone support available through the website.",
      },
    ],
  },
  {
    title: "Community & Identity",
    colour: "#1a6b6b",
    services: [
      {
        name: "13YARN",
        phone: "13 92 76",
        website: "13yarn.org.au",
        hours: "24/7",
        description:
          "A free, confidential crisis support line for Aboriginal and Torres Strait Islander peoples. Yarning with an Aboriginal or Torres Strait Islander crisis supporter.",
      },
      {
        name: "QLife",
        phone: "1800 184 527",
        website: "qlife.org.au",
        hours: "Daily, 3pm–midnight AEST",
        description:
          "Anonymous and free LGBTIQ+ peer support and referral for people in Australia. Available by phone and web chat for support around sexuality, gender, bodies, feelings, and relationships.",
      },
    ],
  },
  {
    title: "Practical & Access Support",
    colour: "#1a6b6b",
    services: [
      {
        name: "National Relay Service (NRS)",
        phone: "133 677",
        website: "accesshub.gov.au/nrs",
        hours: "24/7 (hours vary by relay type)",
        description:
          "A government-funded service helping people who are deaf, hard of hearing, or have a speech or communication impairment to make and receive phone calls. Multiple relay options available at accesshub.gov.au/nrs.",
      },
      {
        name: "Translating and Interpreting Service (TIS National)",
        phone: "131 450",
        website: "tisnational.gov.au",
        hours: "24/7",
        description:
          "A free government interpreting service for people who don't speak English and for agencies and organisations that need to communicate with their non-English speaking clients. Over 150 languages.",
      },
      {
        name: "Ask Izzy",
        website: "askizzy.org.au",
        hours: "Available anytime online",
        description:
          "A free website and mobile app connecting people in need with housing, food, health, money help, and support services nearby. Search by postcode to find local resources across Australia.",
      },
      {
        name: "Link2Home (NSW Homelessness)",
        phone: "1800 152 152",
        hours: "24/7",
        description:
          "NSW Government information and referral service for people who are homeless or at risk of homelessness. Can connect callers to emergency accommodation and support services.",
      },
    ],
  },
];

export default function SupportInACrisisPage() {
  return (
    <div className="bg-[#faf8f5] min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#1a1a1a] mb-4">
            Support in a Crisis
          </h1>
          <p className="text-lg text-[#555555] leading-relaxed">
            Whether you or someone you care about is experiencing a mental health
            crisis, family violence, an NDIS concern, or another difficult
            situation — help is available. Below is a directory of trusted
            Australian support services with their contact details and hours.
          </p>
        </div>
      </section>

      {/* Emergency banner */}
      <section className="bg-[#b91c1c] py-5">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-white font-semibold text-center text-base md:text-lg">
            If someone is in immediate danger, call{" "}
            <a href="tel:000" className="underline underline-offset-2 font-bold">
              000
            </a>{" "}
            immediately.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 md:py-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {categories.map((category) => (
            <div key={category.title}>
              <h2 className="text-xl font-semibold text-[#1a1a1a] mb-5 pb-2 border-b border-gray-200">
                {category.title}
              </h2>
              <div className="space-y-4">
                {category.services.map((service) => (
                  <div
                    key={service.name}
                    className="bg-white rounded-lg border border-gray-200 p-5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                      <h3 className="font-semibold text-[#1a1a1a] text-base">
                        {service.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 shrink-0">
                        {service.phone && (
                          <a
                            href={`tel:${service.phone.replace(/\s/g, "")}`}
                            className="inline-flex items-center gap-1.5 bg-[#1a6b6b] hover:bg-[#154f4f] text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-150 whitespace-nowrap"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 8V5z"
                              />
                            </svg>
                            {service.phone}
                          </a>
                        )}
                        {service.website && (
                          <a
                            href={`https://${service.website}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 border border-[#1a6b6b] text-[#1a6b6b] hover:bg-[#1a6b6b] hover:text-white text-sm font-medium px-3 py-1.5 rounded-md transition-colors duration-150 whitespace-nowrap"
                          >
                            <svg
                              className="w-3.5 h-3.5"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                              />
                            </svg>
                            Website
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="text-xs font-medium text-[#1a6b6b] mb-2">
                      {service.hours}
                    </p>
                    <p className="text-sm text-[#555555] leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="pb-16">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs text-[#555555] border-t border-gray-200 pt-8">
            Service details are correct to the best of our knowledge. Hours and
            contact information may change — please verify directly with each
            service if you are unsure. This page is a resource guide only and is
            not a substitute for emergency services. If you are in immediate
            danger, call 000.
          </p>
        </div>
      </section>
    </div>
  );
}
