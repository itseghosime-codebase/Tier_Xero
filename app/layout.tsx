import type { Metadata } from "next";
import localFont from 'next/font/local'
import { Sometype_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const sometype = Sometype_Mono({
  variable: "--font-sometype",
  subsets: ["latin-ext"],
});

const thedus = localFont({
  variable: "--font-thedus",
  src: [
    {
      path: '../assets/fonts/Thedus_Wide.otf',
      weight: '700',
      style: 'bold',
    },
    {
      path: '../assets/fonts/Thedus_Condensed.otf',
      weight: '400',
      style: 'normal',
    }
  ],
})
export const metadata: Metadata = {
  title: "Tier Xero – Expert Web Design, AI Agents & Digital Growth",
  description:
    "Tier Xero transforms brands into powerful digital experiences with expert web design, AI agents, creative marketing, UX design, and SEO strategies.",
  keywords: [
    "web design",
    "AI agents",
    "digital marketing",
    "UX design",
    "SEO",
    "Tier Xero",
    "creative branding",
    "business growth",
    "custom websites",
  ],
  openGraph: {
    title: "Tier Xero – Expert Web Design, AI Agents & Digital Growth",
    description:
      "We craft stunning, functional websites with AI-driven tools and marketing strategies to help your business thrive online.",
    url: "https://www.tierXero.co",
    siteName: "Tier Xero",
    images: [
      {
        url: "/og-image.jpg", // Replace with your OG image path
        width: 1200,
        height: 630,
        alt: "Tier Xero Website Preview",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tier Xero – Expert Web Design, AI Agents & Digital Growth",
    description:
      "Transform your brand’s story into a powerful digital presence with Tier Xero.",
    images: ["/og-image.jpg"], // Replace with your OG image path
  },
  alternates: {
    canonical: "https://www.tierXero.co",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${sometype.variable} ${thedus.variable} antialiased scroll-smooth`}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
