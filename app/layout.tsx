import type { Metadata } from "next";
import { Poppins } from "next/font/google";
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
    default: "Lumen Collective | Support Coordination, Recovery Coaching and Counselling",
    template: "%s | Lumen Collective",
  },
  description:
    "Support coordination, psychosocial recovery coaching and counselling across Sydney, the Sutherland Shire and the Illawarra, and online.",
  keywords: [
    "NDIS",
    "Support Coordination",
    "Specialist Support Coordination",
    "Psychosocial Recovery Coaching",
    "Counselling",
    "Sydney",
    "NSW",
    "QLD",
    "VIC",
  ],
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: "/apple-icon.png",
    other: { rel: "icon", url: "/icon-512.png", sizes: "512x512" },
  },
  openGraph: {
    siteName: "Lumen Collective",
    type: "website",
    locale: "en_AU",
    images: [
      {
        url: "/lumen-brand-files/lumen-website-banner-sage.png",
        width: 1200,
        height: 630,
        alt: "Lumen Collective",
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
      <body className="font-poppins antialiased bg-cream text-brown">
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
