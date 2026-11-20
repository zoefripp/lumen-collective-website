import type { Metadata } from "next";
import FeedbackForm from "@/components/FeedbackForm";

export const metadata: Metadata = {
  title: "Feedback and complaints",
  description:
    "Share a compliment, suggestion or complaint. Your feedback helps me improve and will never affect the support you receive.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/feedback-and-complaints",
  },
};

export default function FeedbackAndComplaintsPage() {
  return (
    <div className="bg-cream min-h-screen">
      {/* Header */}
      <section className="py-16 md:py-20 border-b border-sage-soft">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-sage mb-5">
            Feedback and complaints
          </p>
          <h1 className="text-5xl md:text-[4.25rem] font-semibold text-brown leading-[1.1] mb-6">
            Tell me how I&apos;m doing
          </h1>
          <div className="space-y-4 text-lg text-brown/85 leading-relaxed max-w-2xl">
            <p>
              Your feedback helps me improve. Whether it is a compliment, a
              suggestion or a complaint, I want to hear it. Giving feedback or
              making a complaint will never affect the support you receive. You
              can stay anonymous if you prefer, and you are welcome to have a
              family member, friend or advocate help you.
            </p>
            <p>
              I will acknowledge your feedback within 2 business days and let
              you know what happens next.
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-12 md:py-16">
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <FeedbackForm />
        </div>
      </section>

      {/* Other ways to raise a concern */}
      <section className="py-12 md:py-16 border-t border-sage-soft">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-semibold text-brown mb-6">
            Other ways to raise a concern
          </h2>
          <div className="space-y-4 text-[17px] text-brown/85 leading-relaxed">
            <p>
              Email me directly at{" "}
              <a
                href="mailto:admin@lumencollective.com.au"
                className="underline underline-offset-4 text-brown hover:text-brown/85 transition-colors"
              >
                admin@lumencollective.com.au
              </a>
              .
            </p>
            <p>
              If you are not happy with how your complaint was handled, or would
              rather not speak to me, you can contact the NDIS Quality and
              Safeguards Commission on{" "}
              <a
                href="tel:1800035544"
                className="underline underline-offset-4 text-brown hover:text-brown/85 transition-colors"
              >
                1800 035 544
              </a>{" "}
              (Monday to Friday) or at{" "}
              <a
                href="https://www.ndiscommission.gov.au"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4 text-brown hover:text-brown/85 transition-colors"
              >
                ndiscommission.gov.au
              </a>
              . National Relay Service users can ask for 1800 035 544.
            </p>
            <p>
              If you or someone else is in immediate danger, call{" "}
              <a
                href="tel:000"
                className="underline underline-offset-4 text-brown hover:text-brown/85 transition-colors"
              >
                000
              </a>
              .
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
