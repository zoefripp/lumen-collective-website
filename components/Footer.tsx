import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-charcoal text-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
          {/* Left: copyright */}
          <p className="text-sm text-gray-400">
            &copy; 2025 Lumen Collective. All rights reserved.
          </p>

          {/* Right: nav links */}
          <div className="flex flex-wrap gap-6">
            <Link
              href="/about"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              About
            </Link>
            <Link
              href="/our-team"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              Team
            </Link>
            <Link
              href="/blog"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              Blog
            </Link>
            <Link
              href="/contact"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              Contact
            </Link>
            <Link
              href="/ndis-support-coordination-sutherland-shire"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              Sutherland Shire
            </Link>
            <Link
              href="/ndis-support-coordination-illawarra"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              Illawarra
            </Link>
            <Link
              href="/support-in-a-crisis"
              className="text-sm text-gray-300 hover:text-white transition-colors duration-150"
            >
              Crisis Support
            </Link>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-gray-700">
          <p className="text-xs text-gray-500">
            Lumen Collective provides NDIS Support Coordination services.
            Supporting participants across Sydney, the Sutherland Shire, the
            Illawarra, NSW, QLD and VIC.
          </p>
        </div>
      </div>
    </footer>
  );
}
