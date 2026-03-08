import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<
  string,
  {
    date: string;
    readTime: string;
    title: string;
    subtitle: string;
    tags: string[];
    content: { type: "p" | "h2" | "blockquote"; text: string }[];
    nextSlug: string;
    nextTitle: string;
  }
> = {
  "why-most-brand-films-fail": {
    date: "February 2026",
    readTime: "6 min read",
    title: "Why Most Brand Films Fail Before They're Shot",
    subtitle:
      "Great brand filmmaking starts long before the camera turns on. It starts with clarity about what you're actually trying to say — and most brands never get there.",
    tags: ["Filmmaking", "Brand Strategy"],
    content: [
      {
        type: "p",
        text: "I've been on the set of a lot of brand films that had no business being made. Not because the production was bad — often the crew was excellent, the gear was state-of-the-art, and the client had a real budget. They failed because nobody asked the fundamental question before the first frame was captured: what is this actually trying to do?",
      },
      {
        type: "h2",
        text: "The strategy gap nobody talks about",
      },
      {
        type: "p",
        text: "Most brand films fail in a meeting room, not on set. They fail when someone in a boardroom says \"we need a video\" and everyone nods, and production gets briefed before strategy has been anywhere near the room. The result is a beautiful piece of content that says nothing to nobody — polished, expensive, and completely forgettable.",
      },
      {
        type: "p",
        text: "The brands that get brand film right start differently. They start with a simple but demanding question: what do we want someone to feel, believe, or do differently after watching this? Not what do we want to show — what shift are we trying to create? That question, honestly answered, is the entire brief.",
      },
      {
        type: "h2",
        text: "Clarity is the brief",
      },
      {
        type: "p",
        text: "I've developed a pre-production framework I call the \"Three Anchors\" — three questions every brand film needs answered before we talk about cinematography, locations, or music:",
      },
      {
        type: "p",
        text: "First: Who is this for, specifically? Not \"young professionals\" or \"our target demographic\" — a real human being with a specific tension in their life that this brand resolves. Second: What do they need to believe for this film to move them? Not what we want to say — what they need to hear. Third: What is the single most important thing this film needs to communicate? Not five things. One.",
      },
      {
        type: "blockquote",
        text: "A brand film without a point of view isn't a film. It's a screensaver.",
      },
      {
        type: "h2",
        text: "The craft serves the intention",
      },
      {
        type: "p",
        text: "Once those three questions are answered, the creative brief writes itself. The visual language, the tone, the structure, the music — every decision becomes easier because every decision can be evaluated against the intention. Does this serve what we're trying to create? Or is this just cool?",
      },
      {
        type: "p",
        text: "The best brand films I've been involved in all had one thing in common: the client knew what they were trying to say before we ever talked about how we'd say it. That clarity gave the creative team permission to make real decisions — to choose story over spectacle, to resist the pull of the trendy and stay committed to the true.",
      },
      {
        type: "h2",
        text: "Start with the why. Build from there.",
      },
      {
        type: "p",
        text: "If you're planning a brand film and you haven't answered the Three Anchors, don't touch the camera yet. Sit in a room with your strategist, your creative director, and the people who know your audience best. Stay there until you can answer them clearly. Everything after that — the locations, the cinematography, the edit — is just execution. The hard work is in the clarity.",
      },
    ],
    nextSlug: "founder-led-content",
    nextTitle: "The Case for Founder-Led Content in 2026",
  },
  "founder-led-content": {
    date: "January 2026",
    readTime: "8 min read",
    title: "The Case for Founder-Led Content in 2026",
    subtitle:
      "Audiences are exhausted by polished corporate content. The founders who win in 2026 are the ones willing to be specific, human, and real.",
    tags: ["Content Strategy", "Founder Brand"],
    content: [
      {
        type: "p",
        text: "The polished corporate content era is over. It has been for a while — but 2026 is when the evidence became undeniable. Audiences have developed a highly sophisticated filter for content that was made to impress rather than to connect, and they are applying it aggressively.",
      },
      {
        type: "h2",
        text: "The trust deficit",
      },
      {
        type: "p",
        text: "We are living through a trust deficit. Institutions, media brands, and corporations have all seen significant erosion in public trust over the past five years. Into that vacuum has stepped the individual — the founder, the practitioner, the person with a point of view and the credibility to back it up. People trust people. And they're making purchasing, partnership, and career decisions based on who they trust.",
      },
      {
        type: "p",
        text: "This is the structural argument for founder-led content. It's not about trends or platform algorithms — it's about the fundamental human tendency to extend trust to individuals before institutions. The founder who shows up consistently, who has a real point of view, who is willing to be specific and occasionally wrong — that founder earns a position in their audience's mind that no amount of brand advertising can replicate.",
      },
      {
        type: "h2",
        text: "Specificity is the unlock",
      },
      {
        type: "blockquote",
        text: "The founder who says something nobody else will say earns the audience that nobody else can reach.",
      },
      {
        type: "p",
        text: "The most common mistake founders make with content is trying to appeal to everyone. The result is content that resonates with nobody. The founders winning with content in 2026 are the ones willing to be specific — specific about their industry, their point of view, their methodology, their mistakes. Specificity is what makes content shareable: people don't share things they agree with, they share things that say what they've been thinking but couldn't articulate.",
      },
      {
        type: "h2",
        text: "Building the content system",
      },
      {
        type: "p",
        text: "Founder-led content doesn't need to be complex. It needs to be consistent. The simplest version: one clear point of view, one primary format, one primary platform, published on a reliable schedule. That's it. The founders who burn out on content are the ones trying to be everywhere at once — three platforms, four formats, daily publishing. Consistency at lower volume beats sporadic bursts every time.",
      },
      {
        type: "p",
        text: "The format matters less than the authenticity of what's inside it. A 60-second video of a founder explaining a hard lesson they learned is more valuable than a perfectly produced brand film that says nothing. The production quality can come later — the point of view has to come first.",
      },
    ],
    nextSlug: "cinematic-positioning",
    nextTitle: "Cinematic Positioning: How Visual Language Builds Brands",
  },
  "cinematic-positioning": {
    date: "December 2025",
    readTime: "7 min read",
    title: "Cinematic Positioning: How Visual Language Builds Brands",
    subtitle:
      "Positioning isn't just messaging. The visual vocabulary you choose communicates who you are before you say a word.",
    tags: ["Brand Strategy", "Visual Identity"],
    content: [
      {
        type: "p",
        text: "Most brand strategy conversations are obsessed with language. The positioning statement, the tagline, the brand voice — these are the tools most strategists reach for first. And they matter. But they are not where positioning lives in the mind of your audience.",
      },
      {
        type: "h2",
        text: "Vision before language",
      },
      {
        type: "p",
        text: "Your audience encounters your brand visually before they encounter it linguistically. The colours, the typography, the photography style, the video treatment, the spatial relationships on a page — these communicate before the first word is read. And they communicate things that words often can't: authority, warmth, precision, rebellion, heritage, innovation.",
      },
      {
        type: "p",
        text: "Cinematic positioning is the practice of making these visual choices deliberately — not aesthetically, but strategically. It asks: what does our brand need to communicate, and how does our visual language reinforce or undermine that?",
      },
      {
        type: "h2",
        text: "The gap most brands miss",
      },
      {
        type: "blockquote",
        text: "The most expensive mistake in brand strategy is a premium positioning statement paired with a commodity visual identity.",
      },
      {
        type: "p",
        text: "I see this constantly. A founder has invested heavily in brand messaging — sharp positioning, compelling copy, clear differentiation. And then the visual execution tells a completely different story. Stock photography that could belong to any company in their category. Colours chosen because someone liked them. Typography that feels default rather than deliberate. The gap between the positioning and the visual reality is where trust erodes.",
      },
      {
        type: "h2",
        text: "What visual language actually signals",
      },
      {
        type: "p",
        text: "Every visual choice is a signal. Deep, desaturated tones signal seriousness and longevity. High-contrast, kinetic imagery signals energy and disruption. Open space signals confidence and restraint. Dense, layered compositions signal complexity and depth. None of these is inherently right or wrong — the question is whether the signals your visual language sends align with the position you're trying to own.",
      },
      {
        type: "p",
        text: "The most effective brands I've worked with treat visual language with the same rigour they apply to verbal language. They define not just what their brand looks like, but why — and they hold every execution accountable to that rationale.",
      },
    ],
    nextSlug: "authority-without-audience",
    nextTitle: "How to Build Authority Without a Mass Audience",
  },
  "authority-without-audience": {
    date: "November 2025",
    readTime: "5 min read",
    title: "How to Build Authority Without a Mass Audience",
    subtitle:
      "You don't need a million followers to be the most trusted voice in your category. You need precision, consistency, and a clear point of view.",
    tags: ["Authority Building", "Strategy"],
    content: [
      {
        type: "p",
        text: "The biggest misconception about authority is that it requires scale. It doesn't. Some of the most authoritative voices I know in their respective fields have audiences of a few thousand people — and those audiences are so aligned, so trusting, and so activated that they generate outsized business results.",
      },
      {
        type: "h2",
        text: "Authority is not reach",
      },
      {
        type: "p",
        text: "Reach is the number of people who see you. Authority is the quality of what they believe about you. These are different metrics and they require different strategies. Optimising for reach — follower counts, viral content, broad appeal — often actively undermines authority. Authority is built on specificity, and specificity is the enemy of mass appeal.",
      },
      {
        type: "p",
        text: "The authority-building strategy I recommend to founders is counterintuitive: narrow down. Define a more specific audience. Develop a more specific point of view. Solve a more specific problem. The smaller and sharper your target, the faster authority compounds. A 5,000-person audience that is exactly right will outperform a 100,000-person audience that is loosely interested.",
      },
      {
        type: "h2",
        text: "The three pillars of credible authority",
      },
      {
        type: "blockquote",
        text: "You become the authority when you're the clearest, most consistent voice on a specific thing that a specific group of people care about.",
      },
      {
        type: "p",
        text: "Precision: You have a sharply defined point of view on something specific. Not \"leadership\" — \"how Black founders navigate institutional fundraising.\" Not \"content strategy\" — \"how professional services firms build authority through long-form video.\" Precision makes you findable, memorable, and referrable.",
      },
      {
        type: "p",
        text: "Consistency: You show up repeatedly on that specific thing. Not daily, necessarily — but reliably. The rhythm matters less than the reliability. People need to know you're going to keep showing up before they'll invest the cognitive effort of making you part of their mental landscape.",
      },
      {
        type: "p",
        text: "Courage: You say things other people won't say. You disagree with received wisdom when you have grounds to. You share your actual experience — the failures, the wrong turns, the hard lessons — not just the polished outcomes. Courage is what transforms competence into authority.",
      },
    ],
    nextSlug: "documentary-mindset",
    nextTitle: "The Documentary Mindset: What Every Brand Could Learn",
  },
  "documentary-mindset": {
    date: "October 2025",
    readTime: "9 min read",
    title: "The Documentary Mindset: What Every Brand Could Learn",
    subtitle:
      "Documentarians don't make up stories — they find them. The best brand filmmakers I know operate the same way.",
    tags: ["Filmmaking", "Brand Story"],
    content: [
      {
        type: "p",
        text: "I came to brand filmmaking through documentary. Before I was making films for companies, I was making films about people — following subjects through their lives, trying to find the moments that reveal something true. That training changed how I see everything about brand communication.",
      },
      {
        type: "h2",
        text: "Documentarians find stories. Brands make them up.",
      },
      {
        type: "p",
        text: "The fundamental difference between documentary filmmaking and most brand content is the relationship to reality. Documentarians start with the world as it is and look for the story within it. Brand content creators typically start with the story they want to tell and then go looking for evidence to support it. The results are completely different — one feels true, one feels manufactured.",
      },
      {
        type: "p",
        text: "The brands that produce genuinely compelling content have adopted a documentary mindset. They are curious about their own reality. They look for the genuine tension, the unexpected detail, the story that's actually there — and they trust that story enough to tell it without decoration.",
      },
      {
        type: "h2",
        text: "The four principles of the documentary mindset",
      },
      {
        type: "p",
        text: "Curiosity over messaging: Great documentarians are genuinely curious about their subjects. They ask questions they don't know the answers to. They're willing to be surprised. Brands that approach their own storytelling with real curiosity — about their customers, their impact, their history — produce content that feels discovered rather than manufactured.",
      },
      {
        type: "blockquote",
        text: "The best brand story you can tell is the one that's already true. Your job is to find it.",
      },
      {
        type: "p",
        text: "Specificity over generality: Documentary subjects are specific. Not \"a small business owner\" but \"Marcus, who has run the same Jamaican restaurant in Scarborough for 22 years and watched the neighbourhood change around him.\" The specificity is what creates the universal resonance. Brands that resist the instinct to genericise their stories — to smooth out the particular in favour of the broadly relatable — produce work that actually connects.",
      },
      {
        type: "p",
        text: "Patience: Good documentary requires time. Time to build trust, to wait for the right moment, to let the story emerge rather than forcing it. Brand filmmakers who build that patience into their process — who spend time with their subjects before the cameras come out — consistently produce richer, truer work.",
      },
      {
        type: "p",
        text: "Trust in the audience: Documentarians don't over-explain. They trust the audience to feel and interpret. Brand content too often feels compelled to underline every point, to make sure the message lands. That over-explanation is exactly what kills the emotional effect. Trust the story. Trust the audience. Get out of the way.",
      },
      {
        type: "h2",
        text: "How to bring this mindset into your brand",
      },
      {
        type: "p",
        text: "Start with real conversations — not focus groups or surveys, but actual human conversations with the people your brand serves. Ask about their lives, not your product. Look for the tension you didn't know was there. When you find a story that surprises you, that's the one to tell. The story that surprises you will surprise your audience too.",
      },
    ],
    nextSlug: "why-most-brand-films-fail",
    nextTitle: "Why Most Brand Films Fail Before They're Shot",
  },
};

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) return {};
  return {
    title: `${post.title} — Dwayne Holness`,
    description: post.subtitle,
  };
}

export default async function WritingPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  const { date, readTime, title, subtitle, tags, content, nextSlug, nextTitle } = post;

  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>
      {/* Header */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem 5rem",
          borderBottom: "1px solid rgba(200,194,180,0.1)",
        }}
      >
        <Link
          href="/writing"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--cream-dim)",
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            marginBottom: "3rem",
          }}
        >
          ← All Writing
        </Link>

        <div
          style={{
            display: "flex",
            gap: "2rem",
            marginBottom: "2rem",
            flexWrap: "wrap",
            alignItems: "center",
          }}
        >
          <p style={{ fontSize: "0.8125rem", color: "var(--cream-dim)" }}>{date}</p>
          <p
            style={{
              fontSize: "0.75rem",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: "var(--gold)",
            }}
          >
            {readTime}
          </p>
          <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--cream-dim)",
                  padding: "0.25rem 0.625rem",
                  border: "1px solid rgba(200,194,180,0.15)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 5vw, 4rem)",
            fontWeight: 700,
            lineHeight: 1.1,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            maxWidth: "24ch",
            marginBottom: "1.75rem",
          }}
        >
          {title}
        </h1>
        <p
          style={{
            fontSize: "1.125rem",
            color: "var(--cream-dim)",
            lineHeight: 1.7,
            maxWidth: "60ch",
            fontStyle: "italic",
          }}
        >
          {subtitle}
        </p>
      </div>

      {/* Article body */}
      <div
        style={{
          maxWidth: "760px",
          margin: "0 auto",
          padding: "5rem 2rem 7rem",
        }}
      >
        {content.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2
                key={i}
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1.375rem, 2.5vw, 1.875rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                  marginTop: "3.5rem",
                  marginBottom: "1.25rem",
                }}
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "blockquote") {
            return (
              <blockquote
                key={i}
                style={{
                  borderLeft: "3px solid var(--gold)",
                  paddingLeft: "2rem",
                  margin: "3rem 0",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.25rem",
                    color: "var(--cream)",
                    lineHeight: 1.5,
                    fontStyle: "italic",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {block.text}
                </p>
              </blockquote>
            );
          }
          return (
            <p
              key={i}
              style={{
                fontSize: "1.0625rem",
                color: "var(--cream-dim)",
                lineHeight: 1.85,
                marginBottom: "1.75rem",
              }}
            >
              {block.text}
            </p>
          );
        })}

        {/* Author bio */}
        <div
          style={{
            marginTop: "5rem",
            paddingTop: "3rem",
            borderTop: "1px solid rgba(200,194,180,0.1)",
            display: "flex",
            gap: "2rem",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: "0.625rem",
              }}
            >
              Written by
            </p>
            <p
              style={{
                fontSize: "1rem",
                color: "var(--cream)",
                fontWeight: 600,
                marginBottom: "0.5rem",
              }}
            >
              Dwayne Holness
            </p>
            <p
              style={{
                fontSize: "0.875rem",
                color: "var(--cream-dim)",
                lineHeight: 1.6,
                maxWidth: "48ch",
              }}
            >
              Filmmaker, brand strategist, and creative director. Founder of Corex Creative — a Toronto-based creative media agency building cinematic brand stories for founders and thought leaders.
            </p>
          </div>
        </div>
      </div>

      {/* Next article */}
      <div
        style={{
          borderTop: "1px solid rgba(200,194,180,0.1)",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "4rem 2rem",
        }}
      >
        <p
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--cream-dim)",
            marginBottom: "1rem",
          }}
        >
          Next Essay
        </p>
        <Link
          href={`/writing/${nextSlug}`}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            fontWeight: 700,
            color: "var(--cream)",
            textDecoration: "none",
            letterSpacing: "-0.015em",
            display: "inline-flex",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          {nextTitle} <span style={{ color: "var(--gold)" }}>→</span>
        </Link>
      </div>
    </div>
  );
}
