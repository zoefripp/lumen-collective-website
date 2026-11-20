import Link from "next/link";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-cream border-t border-sage-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Col 1: Logo + legal */}
          <div>
            <Logo variant="main" className="h-11 w-auto mb-4" />
            <p className="text-xs text-brown/60 leading-relaxed">
              ABN 59 407 161 672
              <br />
              NDIS Provider 4050174532
            </p>
          </div>

          {/* Col 2: Site pages */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brown/85 mb-4">Pages</p>
            <ul className="space-y-2.5">
              {[
                { href: "/about", label: "About" },
                { href: "/support-coordination", label: "Support Coordination" },
                { href: "/recovery-coaching", label: "Recovery Coaching" },
                { href: "/counselling", label: "Counselling" },
                { href: "/blog", label: "Blog" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Contact + utilities */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-brown/85 mb-4">Contact</p>
            <ul className="space-y-2.5">
              {[
                { href: "/referral", label: "Make a referral" },
                { href: "/contact", label: "Contact" },
                { href: "/support-in-a-crisis", label: "Crisis support" },
                { href: "/feedback-and-complaints", label: "Feedback and complaints" },
              ].map(({ href, label }) => (
                <li key={href}>
                  <Link href={href} className="text-sm text-brown/60 hover:text-brown transition-colors duration-150">
                    {label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="mailto:admin@lumencollective.com.au"
                  className="text-sm text-brown/60 hover:text-brown transition-colors duration-150"
                >
                  admin@lumencollective.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-sage-soft">
          <p className="text-xs text-brown/80">
            Support coordination, psychosocial recovery coaching and counselling
            across the Illawarra and Greater Sydney, and online.
          </p>
          <p className="text-xs text-brown/85 mt-2">
            &copy; {new Date().getFullYear()} Lumen Collective. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
