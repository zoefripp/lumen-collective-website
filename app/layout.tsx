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
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
