import type { Metadata } from "next";
import ReferralForm from "@/components/ReferralForm";

export const metadata: Metadata = {
  title: "Make a Referral",
  description:
    "Refer someone to Lumen Collective for support coordination, psychosocial recovery coaching or counselling. Fill in what you can and we will come back to you within 24 hours.",
  alternates: {
    canonical: "https://www.lumencollective.com.au/referral",
  },
};

export default function ReferralPage() {
  return (
    <div className="bg-cream min-h-screen">
      <section className="py-14 md:py-18 border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-brown mb-4">
            Make a referral
          </h1>
          <p className="text-brown/85 leading-relaxed mb-2">
            Whether you are looking for support for yourself or for someone you
            care about, this form is the first step. Fill in what you can and we
            will come back to you within 24 hours.
          </p>
          <p className="text-brown/85 leading-relaxed">
            You do not need your plan in front of you. Anything you are unsure
            about, leave blank and we will work it out together when we talk.
          </p>
        </div>
      </section>

      <section className="py-10 md:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <ReferralForm />
        </div>
      </section>
    </div>
  );
}
