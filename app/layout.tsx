import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup";
import DiscoveryChat from "@/components/DiscoveryChat";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dwayne Holness | Speaker · Media Infrastructure · Strategist",
  description:
    "Dwayne Holness is a speaker, media infrastructure expert, and strategist helping founders and enterprise brands build media systems that compound authority over time.",
  keywords: ["speaker", "media infrastructure", "brand strategist", "thought leadership", "Toronto"],
  openGraph: {
    title: "Dwayne Holness | Speaker · Media Infrastructure · Strategist",
    description:
      "Helping founders and enterprise brands build media systems that compound authority over time.",
    url: "https://dwayneholness.com",
    siteName: "Dwayne Holness",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwayne Holness | Speaker · Media Infrastructure · Strategist",
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
      </head>
      <body
        className="antialiased"
        style={{
          fontFamily: "var(--font-body), system-ui, sans-serif",
          backgroundColor: "var(--black)",
          color: "var(--cream)",
        }}
      >
        <Nav />
        <main>{children}</main>
        <Footer />
        <ScrollToTop />
        <NewsletterPopup />
        <DiscoveryChat />
      </body>
    </html>
  );
}
