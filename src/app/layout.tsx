import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as SonnerToaster } from "@/components/ui/sonner";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const SITE_URL = "https://artouris.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Artouris — AI Trip Planner for Authentic Morocco Travel",
    template: "%s · Artouris",
  },
  description:
    "Plan your Moroccan trip with AI. Describe your ideal travel experience in one prompt and Artouris builds a personalized itinerary with authentic local recommendations, traveler matching, and destination intelligence.",
  keywords: [
    "AI Morocco trip planner",
    "Morocco travel planner",
    "AI travel planner",
    "Moroccan itinerary generator",
    "authentic Morocco travel",
    "Morocco local experiences",
    "AI tourism platform",
    "Morocco itinerary AI",
    "tourism intelligence platform",
    "destination intelligence",
    "AI trip planner",
    "travel itinerary generator",
  ],
  authors: [{ name: "Artouris" }],
  creator: "Artouris",
  publisher: "Artouris",
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/favicon.svg",
  },
  openGraph: {
    title: "Artouris — Plan Authentic Trips with AI",
    description:
      "Describe your ideal trip in one prompt. Artouris builds a personalized journey and connects you with authentic local experiences in Morocco.",
    url: SITE_URL,
    siteName: "Artouris",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.svg",
        width: 1200,
        height: 630,
        alt: "Artouris — AI Travel Planner for Authentic Morocco",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Artouris — Plan Authentic Trips with AI",
    description:
      "Describe your ideal trip in one prompt. Artouris builds a personalized journey and connects you with authentic local experiences in Morocco.",
    images: ["/og-image.svg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  category: "travel",
};

export const viewport: Viewport = {
  themeColor: "#FBF7F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Artouris",
  applicationCategory: "TravelApplication",
  operatingSystem: "Web",
  description:
    "Artouris is an AI-powered travel planning and tourism intelligence platform. Travelers describe their trip in one prompt and get a personalized itinerary with authentic local experiences. Local businesses gain visibility, and destinations receive anonymized tourism insights.",
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  areaServed: "Morocco",
  brand: { "@type": "Brand", name: "Artouris" },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${geistMono.variable} antialiased bg-background text-foreground font-sans relative`}
      >
        {children}
        <Toaster />
        <SonnerToaster position="bottom-right" richColors closeButton />
      </body>
    </html>
  );
}
