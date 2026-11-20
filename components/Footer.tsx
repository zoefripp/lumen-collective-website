import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-sage-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Make a Referral CTA */}
        <div className="mb-8 pb-8 border-b border-sage-soft flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-brown font-semibold text-sm mb-1">
              Know someone who could benefit from our services?
            </p>
            <p className="text-brown/60 text-xs">
              Referrals from allied health, hospitals, and families are always welcome.
            </p>
          </div>
          <Link
            href="/referral"
            className="flex-shrink-0 inline-block bg-peach hover:bg-peach/90 text-brown text-sm font-semibold rounded-full px-5 py-2.5 transition-colors duration-150"
          >
            Make a Referral
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          <p className="text-sm text-brown/60">
            &copy; 2026 Lumen Collective. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/about" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">About</Link>
            <Link href="/services" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">Services</Link>
            <Link href="/blog" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">Blog</Link>
            <Link href="/contact" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">Contact</Link>
            <Link href="/ndis-support-coordination-sutherland-shire" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">Sutherland Shire</Link>
            <Link href="/ndis-support-coordination-illawarra" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">Illawarra</Link>
            <Link href="/support-in-a-crisis" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">Crisis Support</Link>
            <Link href="/feedback-and-complaints" className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">Feedback &amp; Complaints</Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-sage-soft">
          <p className="text-xs text-brown/60">
            Support coordination, psychosocial recovery coaching and counselling
            across the Illawarra and Greater Sydney, and online.
          </p>
          <p className="text-xs text-brown/60 mt-1">
            ABN: 59 407 161 672 &nbsp;|&nbsp; NDIS Provider Number: 4050174532
          </p>
        </div>
      </div>
    </footer>
  );
}
