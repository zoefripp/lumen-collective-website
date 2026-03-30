import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us | Lumen Collective NDIS Support Coordination Sydney",
  description:
    "Get in touch with Lumen Collective. We support NDIS participants across Sydney, the Sutherland Shire and the Illawarra. No obligation — just a conversation.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="bg-offwhite min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Get in Touch
          </h1>
          <p className="text-lg text-muted">
            Whether you&apos;re ready to get started or just have questions,
            we&apos;d love to hear from you.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <ContactForm />
      </section>
    </div>
  );
}
