import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import TimelineExperience from "@/components/timeline/TimelineExperience";
import "./timeline.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-tl-display",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

export const metadata: Metadata = {
  title: "Time Capsoul",
  description:
    "Thirty-eight years of Dwayne Winston Holness, laid out as a timeline you can scrub.",
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: { index: false, follow: false },
  },
};

export default function TimelinePage() {
  return (
    <div className={fraunces.variable}>
      <TimelineExperience />
    </div>
  );
}
