import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lumen Collective. We support NDIS participants and private clients across Sydney, the Sutherland Shire and the Illawarra, and online.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/contact",
  },
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { topic?: string };
}) {
  return (
    <div className="bg-cream min-h-screen">
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-brown mb-4">
            Get in touch
          </h1>
          <p className="text-lg text-brown/70 leading-relaxed">
            Whether you are ready to get started or just have a question, fill
            in the form and we will come back to you as soon as we can.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm initialTopic={searchParams.topic ?? ""} />
        </div>
      </section>
    </div>
  );
}
