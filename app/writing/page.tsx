import type { Metadata } from "next";
import WritingList from "./WritingList";

export const metadata: Metadata = {
  title: "Thoughts — Dwayne Holness",
  description:
    "Essays and thinking from Dwayne Holness on filmmaking, brand strategy, and creative entrepreneurship.",
};

export default function WritingPage() {
  return <WritingList />;
}
