import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: "Dwayne Holness | Filmmaker. Strategist. Creative Director.",
  description:
    "Dwayne Holness is a filmmaker, brand strategist, and creative director helping founders and thought leaders tell their stories with cinematic clarity.",
  keywords: ["filmmaker", "brand strategist", "creative director", "documentary", "Toronto"],
  openGraph: {
    title: "Dwayne Holness | Filmmaker. Strategist. Creative Director.",
    description:
      "Helping founders and thought leaders tell their stories with cinematic clarity.",
    url: "https://dwayneholness.com",
    siteName: "Dwayne Holness",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Dwayne Holness | Filmmaker. Strategist. Creative Director.",
    description: "Helping founders and thought leaders tell their stories with cinematic clarity.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
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
      </body>
    </html>
  );
}
