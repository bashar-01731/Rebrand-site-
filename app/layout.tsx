import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { LeadFormProvider } from "@/components/LeadForm";
import CustomCursor from "@/components/CustomCursor";
import LoadingScreen from "@/components/LoadingScreen";
import Grain from "@/components/Grain";

const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-fraunces",
  axes: ["SOFT", "WONK", "opsz"],
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rebrand.design"),
  title: {
    default: "RE:BRAND — Creative Digital Studio",
    template: "%s — RE:BRAND",
  },
  description:
    "RE:BRAND designs premium websites — built to make businesses look established, modern, and worth trusting. Explore six live concept sites.",
  openGraph: {
    type: "website",
    siteName: "RE:BRAND",
    title: "RE:BRAND — Creative Digital Studio",
    description:
      "Premium website design. Six live concept sites you can open and use, not screenshots.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  // Pinch-zoom is never disabled — capping it would fail WCAG 1.4.4.
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${inter.variable}`}>
      <body>
        <LeadFormProvider>
          {children}
          <CustomCursor />
          <LoadingScreen />
          <Grain />
        </LeadFormProvider>
      </body>
    </html>
  );
}
