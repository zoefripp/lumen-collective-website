import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Make a Referral — prominent conversion action */}
        <div className="mb-8 pb-8 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <p className="text-charcoal font-semibold text-sm mb-1">
              Know someone who could benefit from our services?
            </p>
            <p className="text-muted text-xs">
              Referrals from allied health, hospitals, and families are always welcome.
            </p>
          </div>
          <Link
            href="/referral"
            className="flex-shrink-0 inline-block bg-[#1a6b6b] hover:bg-[#154f4f] text-white text-sm font-semibold px-5 py-2.5 rounded-md transition-colors duration-150"
          >
            Make a Referral
          </Link>
        </div>

        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left: copyright */}
          <p className="text-sm text-muted">
            &copy; 2026 Lumen Collective. All rights reserved.
          </p>

          {/* Right: nav links */}
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link href="/about" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">About</Link>
            <Link href="/our-team" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">Team</Link>
            <Link href="/blog" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">Blog</Link>
            <Link href="/contact" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">Contact</Link>
            <Link href="/ndis-support-coordination-sutherland-shire" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">Sutherland Shire</Link>
            <Link href="/ndis-support-coordination-illawarra" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">Illawarra</Link>
            <Link href="/support-in-a-crisis" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">Crisis Support</Link>
            <Link href="/feedback-and-complaints" className="text-sm text-muted hover:text-charcoal transition-colors duration-150">Feedback &amp; Complaints</Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-200">
          <p className="text-xs text-muted">
            Lumen Collective provides NDIS Support Coordination services.
            Supporting participants across Sydney, the Sutherland Shire, the
            Illawarra, NSW, QLD and VIC.
          </p>
          <p className="text-xs text-muted mt-1">
            ABN: 59 407 161 672 &nbsp;|&nbsp; NDIS Provider Number: 4050174532
          </p>
        </div>
      </div>
    </footer>
  );
}
