import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Lumen Collective | NDIS Support Coordination",
    template: "%s | Lumen Collective",
  },
  description:
    "Lumen Collective is a small, independent NDIS Support Coordination collective supporting participants across Sydney and remotely throughout NSW, QLD, and VIC.",
  keywords: [
    "NDIS",
    "Support Coordination",
    "Specialist Support Coordination",
    "Psychosocial Recovery Coaching",
    "Sydney",
    "NSW",
    "QLD",
    "VIC",
  ],
  openGraph: {
    siteName: "Lumen Collective",
    type: "website",
    locale: "en_AU",
    // TODO: Replace og-image.jpg with a real branded 1200×630px image in /public
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Lumen Collective — NDIS Support Coordination",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins antialiased bg-offwhite text-charcoal">
        {/* Google Analytics 4 — Replace G-XXXXXXXXXX with your real GA4 Measurement ID from analytics.google.com */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-XXXXXXXXXX');
          `}
        </Script>
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
