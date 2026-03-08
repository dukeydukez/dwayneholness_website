import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const projects: Record<
  string,
  {
    id: string;
    title: string;
    category: string;
    year: string;
    client: string;
    role: string;
    overview: string;
    challenge: string;
    approach: string;
    outcome: string;
    tags: string[];
    nextSlug: string;
    nextTitle: string;
    youtubeId?: string;
    coverImage?: string;
  }
> = {
  "infrastructure-of-influence": {
    id: "01",
    title: "The Infrastructure of Influence",
    category: "Documentary · Brand Film",
    year: "2025",
    client: "Personal Project",
    role: "Director, Writer, Producer",
    overview:
      "A feature-length documentary exploring how founders build lasting authority, not through hype, but through consistent presence, authentic narrative, and strategic positioning. Shot across Toronto over six months, the film profiles five entrepreneurs at different stages of their journeys.",
    challenge:
      "Authority is abstract. Most founders know they need it but don't understand how it's actually built over time. The challenge was making the invisible visible: capturing the habits, decisions, and long-game thinking that separate category leaders from everyone else.",
    approach:
      "Inspired by the observational style of Frederick Wiseman, the film eschews narration and talking-head interviews in favour of immersive, fly-on-the-wall sequences. We spent weeks embedded with each subject before filming, building the trust needed for genuine access. Each chapter is anchored by a single idea about authority, and the cinematography reinforces that idea visually.",
    outcome:
      "The film premiered at a private industry screening in Toronto to a room of 200 founders and creative leaders. It has since been used as a centrepiece content asset by two of its featured subjects to build their own authority positioning. A public digital release is in development.",
    tags: ["Documentary", "Brand Film", "Self-directed", "Toronto"],
    nextSlug: "luvbay-radio",
    nextTitle: "Luvbay Radio",
  },
  "luvbay-radio": {
    id: "02",
    title: "Luvbay Radio",
    category: "Content Series",
    year: "2025",
    client: "Luvbay",
    role: "Creative Director, Director of Photography",
    overview:
      "A 12-episode long-form social content series for Luvbay, a Toronto-based music and culture brand, capturing raw, unscripted conversations at the intersection of entrepreneurship, music, and identity. Each episode runs 20–40 minutes and is cut for both YouTube and short-form distribution.",
    challenge:
      "Luvbay had a clear voice and audience, but no consistent content presence. The challenge was building a repeatable content system that felt authentic to the culture while being sustainable to produce, without sacrificing quality for volume.",
    approach:
      "We designed a minimal, controlled studio environment that could be set up in under two hours, allowing production agility without losing the cinematic look Luvbay needed to stand apart. Every episode followed a loose structural framework: origins, craft, vision. But the conversations were always allowed to breathe and go wherever they needed to.",
    outcome:
      "All 12 episodes were delivered on schedule over a 4-month production run. Average episode view count: 14K across platforms. Two episodes exceeded 30K views. The series established Luvbay as a serious editorial voice in Toronto's music and creative community.",
    tags: ["Social Content", "Series", "Long-form", "YouTube"],
    nextSlug: "creative-connect",
    nextTitle: "Creative Connect",
  },
  "creative-connect": {
    id: "03",
    title: "Creative Connect",
    category: "Brand Identity · Strategy",
    year: "2024",
    client: "Creative Connect",
    role: "Brand Strategist, Creative Director",
    overview:
      "A full brand overhaul for Creative Connect, Toronto's leading community for creative entrepreneurs. The engagement covered brand positioning, visual identity, content strategy, and the narrative architecture underpinning all external communications.",
    challenge:
      "Creative Connect had strong community loyalty but a brand that didn't reflect its ambition. The organization was growing beyond its grassroots roots and needed positioning that would attract corporate partners and established founders, without alienating the community that built it.",
    approach:
      "We started with a deep positioning workshop with the founder and core team, uncovering what made Creative Connect irreplaceable, not just useful. From that session, we derived a positioning statement and brand voice that sat at the intersection of access and excellence. The visual identity was built to feel premium without being exclusionary, grounded in deep tones, purposeful typography, and photography that centred real community members.",
    outcome:
      "Creative Connect launched its new brand to its community of 4,000+ members to overwhelming positive reception. Within 90 days of the rebrand, the organization secured two new corporate partnerships and saw a 60% increase in event registrations.",
    tags: ["Brand Identity", "Community", "Strategy", "Toronto"],
    nextSlug: "ctc-black-history-month",
    nextTitle: "CTC Black History Month",
  },
  "ctc-black-history-month": {
    id: "04",
    title: "CTC Black History Month",
    category: "Institutional Campaign",
    year: "2025",
    client: "CTC",
    role: "Lead Creative Director, Campaign Producer",
    overview:
      "A multi-format campaign for CTC honouring Black History Month, spanning cinematic hero films, a social content series, event production, and internal communications assets. The campaign centred authentic stories of Black leadership within the organization and the broader community.",
    challenge:
      "Institutional Black History Month campaigns often feel performative, a checklist moment rather than a genuine expression of values. The challenge was creating something with enough creative ambition to feel meaningful, while working within the constraints of a large organization's approvals process and timelines.",
    approach:
      "We anchored the campaign in story, not statement. Rather than leading with data or slogans, we identified three individuals within CTC whose stories embodied the theme and built the entire campaign around them. The hero film used a documentary visual language: available light, observational framing, to create intimacy and authenticity. All assets were then built to feel cohesive across every channel.",
    outcome:
      "The campaign was the most-engaged piece of content CTC produced that quarter across all internal and external channels. The hero film received internal recognition and a commendation from leadership. The campaign framework has since been adopted as the model for future institutional moments.",
    tags: ["Campaign", "Institutional", "Multi-format", "Cinematic"],
    nextSlug: "corex-founder-series",
    nextTitle: "Corex Founder Series",
  },
  "corex-founder-series": {
    id: "05",
    title: "Corex Founder Series",
    category: "Brand Film Series",
    year: "2024–2025",
    client: "Corex Creative",
    role: "Director, Executive Producer",
    overview:
      "An ongoing documentary-style interview series produced by Corex Creative, profiling founders, creatives, and executives building companies worth believing in. Each episode is a standalone portrait of a person, their company, and the principles that guide them.",
    challenge:
      "Most founder content is promotional by default: press releases with a camera pointed at them. We wanted to build something that felt like editorial journalism: curious, challenging, and genuinely interested in the person behind the company.",
    approach:
      "Each shoot begins with a pre-interview process to uncover the real story: the decisions that mattered, the moments of doubt, the unconventional beliefs. The visual language is consistent across episodes: deep backgrounds, practical lighting, minimal movement. The result is a series that feels authored, not produced.",
    outcome:
      "17 episodes produced across two seasons. The series has become a pipeline driver for Corex Creative; multiple clients have engaged Corex after appearing in or watching the Founder Series. It is now the flagship content property for Corex's own brand.",
    tags: ["Brand Film", "Interviews", "Ongoing", "Documentary Style"],
    nextSlug: "hodans-story",
    nextTitle: "Hodan's Story",
  },
  "hodans-story": {
    id: "06",
    title: "Hodan's Story",
    category: "Documentary · CBC Short Docs",
    year: "2019",
    client: "CBC Short Docs",
    role: "Director, Videographer",
    overview:
      "A short documentary following Somali-Canadian journalist, activist, and single mother of two, Hodan Nalayeh, as she returns to her birth country of Somalia 25 years after fleeing. Hodan founded Integration TV to share positive stories about the Somali diaspora and spent her life working to shift the narrative around a people the world had largely written off. This film chronicles her mission to spread light in places where many only see darkness.",
    challenge:
      "Hodan's story was one of extraordinary hope set against an equally extraordinary backdrop of trauma, displacement, and global misunderstanding. The challenge was honouring the weight of that context without letting it define her. She was not a refugee story. She was a leader, a mother, and a builder. The film had to hold that truth from frame one.",
    approach:
      "The visual approach was observational and intimate. We followed Hodan through her daily life, her conversations, her moments of quiet reflection and fierce advocacy. Rather than constructing a narrative through interview, we let the camera bear witness. Every editorial decision was made to amplify her voice, not interpret it. The result is a portrait built on presence.",
    outcome:
      "The film was released on CBC Gem and YouTube as part of CBC Short Docs. Hodan Nalayeh was killed in a hotel bombing in Kismayo, Somalia in July 2019, while pregnant, shortly after filming. The film has since become a tribute to her life, her work, and the communities she gave everything to serve. It remains one of the most personal and meaningful projects of my career.",
    tags: ["Documentary", "CBC", "Human Interest", "Somali-Canadian"],
    nextSlug: "infrastructure-of-influence",
    nextTitle: "The Infrastructure of Influence",
    youtubeId: "CqbUHMJmnfc",
    coverImage: "/images/Hodans_Story.png",
  },
};

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return {};
  return {
    title: `${project.title} | Dwayne Holness`,
    description: project.overview,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  const { id, title, category, year, client, role, overview, challenge, approach, outcome, tags, nextSlug, nextTitle, youtubeId, coverImage } = project;

  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>
      {/* Hero */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem 4rem",
          borderBottom: "1px solid rgba(200,194,180,0.1)",
        }}
      >
        <Link
          href="/work"
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
          ← All Work
        </Link>

        <div
          style={{
            display: "flex",
            gap: "3rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
            }}
          >
            {category}
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--cream-dim)",
            }}
          >
            {client} · {year}
          </span>
          <span
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "var(--cream-dim)",
            }}
          >
            {role}
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            maxWidth: "22ch",
            marginBottom: "3rem",
          }}
        >
          {title}
        </h1>

        {/* Project visual: cover image or placeholder */}
        {coverImage ? (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/7",
              position: "relative",
              overflow: "hidden",
              marginBottom: "0.5rem",
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={coverImage}
              alt={title}
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        ) : (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/7",
              backgroundColor: "var(--charcoal)",
              backgroundImage: "radial-gradient(ellipse 80% 80% at 50% 50%, rgba(201,168,76,0.08) 0%, transparent 70%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(200,194,180,0.2)",
              }}
            >
              {id} / {title}
            </span>
          </div>
        )}

        {/* YouTube embed */}
        {youtubeId && (
          <div
            style={{
              width: "100%",
              aspectRatio: "16/9",
              marginTop: "2rem",
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${youtubeId}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ display: "block" }}
            />
          </div>
        )}
      </div>

      {/* Case Study Body */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "5rem",
          }}
          className="md:grid-cols-3"
        >
          {/* Sidebar */}
          <div>
            <p
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "var(--gold)",
                fontWeight: 500,
                marginBottom: "1.5rem",
              }}
            >
              Tags
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", marginBottom: "3rem" }}>
              {tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--cream-dim)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
            <Link
              href="/speaking#book"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.875rem 1.75rem",
                backgroundColor: "var(--gold)",
                color: "var(--black)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Work Together →
            </Link>
          </div>

          {/* Main content */}
          <div style={{ gridColumn: "span 2" }}>
            <Section label="Overview" body={overview} />
            <Section label="The Challenge" body={challenge} />
            <Section label="The Approach" body={approach} />
            <Section label="The Outcome" body={outcome} />
          </div>
        </div>
      </div>

      {/* Next project */}
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
          Next Project
        </p>
        <Link
          href={`/work/${nextSlug}`}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(1.5rem, 3.5vw, 2.75rem)",
            fontWeight: 600,
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

function Section({ label, body }: { label: string; body: string }) {
  return (
    <div style={{ marginBottom: "3.5rem" }}>
      <p
        style={{
          fontSize: "0.6875rem",
          letterSpacing: "0.2em",
          textTransform: "uppercase",
          color: "var(--gold)",
          fontWeight: 500,
          marginBottom: "1.25rem",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontSize: "1.0625rem",
          color: "var(--cream-dim)",
          lineHeight: 1.85,
        }}
      >
        {body}
      </p>
    </div>
  );
}
