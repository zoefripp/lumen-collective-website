import type { Metadata } from "next";
import Link from "next/link";

// Hidden staff section: not linked from the site, not indexed by search
// engines, and protected by a passcode (see middleware.ts).
export const metadata: Metadata = {
  title: "Tools",
  robots: { index: false, follow: false },
};

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <header className="bg-cream border-b border-sage-soft">
        <div className="max-w-3xl mx-auto px-5 h-16 flex items-center justify-between">
          <Link href="/tools" className="flex items-center">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/lumen-brand-files/lumen-logo-main.svg" alt="Lumen Collective" className="h-8 w-auto" />
          </Link>
          <Link href="/tools" className="text-sm font-medium text-brown/85 hover:text-brown px-3 py-3 -mr-3 transition-colors">
            All forms
          </Link>
        </div>
      </header>
      {children}
    </div>
  );
}
