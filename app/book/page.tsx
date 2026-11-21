import type { Metadata } from "next";
import BookingWidget from "@/components/BookingWidget";

export const metadata: Metadata = {
  title: "Book a session",
  description:
    "Book a free intro call or a counselling session with Lumen Collective online or in person across the Illawarra and Greater Sydney.",
};

export default function BookPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-brown mb-3">Book a session</h1>
        <p className="text-brown/85 max-w-xl">
          Choose a service below and pick a time that works for you. If you have any questions
          first, you&apos;re welcome to{" "}
          <a href="/contact" className="underline underline-offset-2 hover:text-brown transition-colors">
            get in touch
          </a>
          .
        </p>
      </div>
      <BookingWidget />
    </div>
  );
}
