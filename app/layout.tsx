import type { Metadata } from "next";
import Script from "next/script";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import DiscoveryChat from "@/components/DiscoveryChat";
import ReadingProgressBar from "@/components/ReadingProgressBar";
import { PostHogProvider } from "./providers";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://dwayneholness.com/#person",
      name: "Dwayne Holness",
      url: "https://dwayneholness.com",
      jobTitle: "Speaker, Brand Architect & Strategist",
      worksFor: {
        "@type": "Organization",
        name: "Corex Creative Inc.",
        url: "https://corexcreative.com",
      },
      sameAs: [
        "https://www.linkedin.com/in/dwayneholness",
        "https://twitter.com/dwayneholness",
      ],
      knowsAbout: [
        "Brand Strategy",
        "Media Infrastructure",
        "Thought Leadership",
        "Documentary Filmmaking",
        "Creative Direction",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://dwayneholness.com/#website",
      url: "https://dwayneholness.com",
      name: "Dwayne Holness",
      publisher: { "@id": "https://dwayneholness.com/#person" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://dwayneholness.com/#service",
      name: "Dwayne Holness — Brand Architecture & Strategy",
      url: "https://dwayneholness.com/packages",
      provider: { "@id": "https://dwayneholness.com/#person" },
      areaServed: { "@type": "Country", name: "Canada" },
      serviceType: [
        "Brand Strategy",
        "Content Infrastructure",
        "Keynote Speaking",
        "Creative Direction",
      ],
    },
  ],
};

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dwayne Holness | Speaker · Brand Architect · Strategist",
  description:
    "Dwayne Holness is a speaker, brand architect, and strategist helping founders and enterprise brands build media systems that compound authority over time.",
  keywords: ["speaker", "brand architect", "brand strategist", "thought leadership", "Toronto"],
  openGraph: {
    title: "Dwayne Holness | Speaker · Brand Architect · Strategist",
    description:
      "Helping founders and enterprise brands build media systems that compound authority over time.",
    url: "https://dwayneholness.com",
    siteName: "Dwayne Holness",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwayne Holness | Speaker · Brand Architect · Strategist",
    description: "Helping founders and enterprise brands build media systems that compound authority over time.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable} suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("theme");if(t==="light")document.documentElement.setAttribute("data-theme","light")}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Script
          defer
          data-domain="dwayneholness.com"
          src="https://plausible.io/js/script.js"
          strategy="afterInteractive"
        />
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          backgroundColor: "var(--black)",
          color: "var(--cream)",
        }}
      >
        <PostHogProvider>
          <ReadingProgressBar />
          <Nav />
          <main>{children}</main>
          <Footer />
          <ScrollToTop />
          <NewsletterPopup />
          <DiscoveryChat />
        </PostHogProvider>
      </body>
    </html>
  );
}
