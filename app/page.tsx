import Hero from "@/components/sections/Hero";
import LogoBar from "@/components/sections/LogoBar";
import About from "@/components/sections/About";
import WorkPreview from "@/components/sections/WorkPreview";
import MidPageCTA from "@/components/sections/MidPageCTA";
import SpeakingPreview from "@/components/sections/SpeakingPreview";
import WhoIWorkWith from "@/components/sections/WhoIWorkWith";
import WorkWithMe from "@/components/sections/WorkWithMe";
import FreeResource from "@/components/sections/FreeResource";
import WritingPreview from "@/components/sections/WritingPreview";
import BookCTA from "@/components/sections/BookCTA";
import { getAllArticles } from "@/lib/articles";

export default function Home() {
  const latestPosts = getAllArticles().slice(0, 3).map(({ slug, date, title, excerpt }) => ({ slug, date, title, excerpt }));
  return (
    <>
      <Hero />
      <LogoBar />
      <About />
      <WorkPreview />
      <MidPageCTA />
      <SpeakingPreview />
      <WhoIWorkWith />
      <WorkWithMe />
      <FreeResource />
      <WritingPreview posts={latestPosts} />
      <BookCTA />
    </>
  );
}
