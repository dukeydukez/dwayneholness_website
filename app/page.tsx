import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WorkPreview from "@/components/sections/WorkPreview";
import SpeakingPreview from "@/components/sections/SpeakingPreview";
import WorkWithMe from "@/components/sections/WorkWithMe";
import WritingPreview from "@/components/sections/WritingPreview";
import BookCTA from "@/components/sections/BookCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <WorkPreview />
      <SpeakingPreview />
      <WorkWithMe />
      <WritingPreview />
      <BookCTA />
    </>
  );
}
