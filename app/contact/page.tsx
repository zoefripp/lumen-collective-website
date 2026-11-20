import type { Metadata } from "next";
import Link from "next/link";
import ContactForm from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Lumen Collective. I offer support coordination, psychosocial recovery coaching and counselling across the Illawarra and Greater Sydney, and online.",
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
          <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">
            Get in touch
          </h1>
          <p className="text-lg text-brown/70 leading-relaxed mb-4">
            Whether you are ready to start or just have questions, I would love
            to hear from you. I am available Monday to Friday, 9am to 5pm, and
            reply within one business day.
          </p>
          <a
            href="mailto:admin@lumencollective.com.au"
            className="text-brown font-medium hover:text-brown/70 transition-colors underline underline-offset-4"
          >
            admin@lumencollective.com.au
          </a>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactForm initialTopic={searchParams.topic ?? ""} />
          <p className="mt-8 text-sm text-brown/70 leading-relaxed border-t border-sage-soft pt-6">
            If you or someone else is in immediate danger, call 000. For other
            urgent support, see the{" "}
            <Link href="/support-in-a-crisis" className="underline underline-offset-4 hover:text-brown transition-colors">
              Crisis Support page
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
