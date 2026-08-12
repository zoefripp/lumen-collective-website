import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Reference Check | Lumen Collective",
  description: "Reference check form for Lumen Collective.",
};

export default function ReferenceCheckPage() {
  return (
    <div className="bg-offwhite min-h-screen">
      <section className="py-16 md:py-20 bg-white border-b border-gray-100">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl md:text-4xl font-semibold text-charcoal mb-4">
            Reference Check
          </h1>
          <p className="text-lg text-muted leading-relaxed">
            Please complete the form below. Thank you for your time.
          </p>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <iframe
            src="https://formspree.io/f/mgawkbon"
            style={{ border: "none", width: "100%", minHeight: "600px" }}
            title="Reference Check Form"
          />
        </div>
      </section>
    </div>
  );
}
