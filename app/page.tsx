import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import WorkPreview from "@/components/sections/WorkPreview";
import SpeakingPreview from "@/components/sections/SpeakingPreview";
import WorkWithMe from "@/components/sections/WorkWithMe";
import WritingPreview from "@/components/sections/WritingPreview";
import BookCTA from "@/components/sections/BookCTA";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const latestPosts = getAllArticles().slice(0, 3).map(({ slug, date, title, excerpt }) => ({ slug, date, title, excerpt }));
  return (
    <>
      <Hero />
      <About />
      <WorkPreview />
      <SpeakingPreview />
      <WorkWithMe />
      <WritingPreview posts={latestPosts} />
      <BookCTA />
    </>
  );
}
