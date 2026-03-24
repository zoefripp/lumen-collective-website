"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const navLinks = [
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
];

// SETUP: To use a logo image, drop your file into /public/ and update this
// path to match the filename. e.g. "/logo.png" or "/Logo - Variant.png"
const LOGO_SRC = "/logo-trimmed.png";

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  // Default to text logo. After mount we probe whether the image file exists;
  // if it loads successfully we switch to showing it. This avoids any
  // SSR/hydration mismatch that would occur if we tried to render the image
  // server-side when the file may not be present.
  const [logoSrc, setLogoSrc] = useState<string | null>(null);

  useEffect(() => {
    const img = new Image();
    img.onload = () => setLogoSrc(LOGO_SRC);
    img.onerror = () => setLogoSrc(null);
    img.src = LOGO_SRC;
  }, []);

  return (
    <nav className="bg-[#1a6b6b] sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo — shows image if LOGO_SRC loads; otherwise renders "lumen." text */}
          <Link href="/" className="flex items-center" aria-label="Lumen Collective home">
            {logoSrc ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={logoSrc}
                alt="Lumen Collective"
                className="h-12 w-auto max-w-[240px] object-contain"
              />
            ) : (
              <span className="text-2xl font-semibold text-white font-poppins tracking-tight">
                lumen.
              </span>
            )}
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition-colors duration-150 ${
                  pathname === link.href
                    ? "text-white underline underline-offset-4"
                    : "text-white/80 hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-md text-white hover:text-white/80 focus:outline-none"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile dropdown */}
        {menuOpen && (
          <div className="md:hidden py-3 border-t border-white/20">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-2 py-2 text-sm font-medium rounded-md transition-colors duration-150 ${
                    pathname === link.href
                      ? "text-white bg-white/20"
                      : "text-white/80 hover:text-white hover:bg-white/10"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
