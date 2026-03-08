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
    youtubeIds?: string[];
    vimeoIds?: string[];
    coverImage?: string;
    links?: { label: string; href: string }[];
  }
> = {
  "hodans-story": {
    id: "01",
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
    nextSlug: "historica-canada-the-blackburns",
    nextTitle: "Historica Canada – The Blackburns",
    youtubeIds: ["CqbUHMJmnfc"],
    coverImage: "/images/Hodans_Story.png",
  },
  "historica-canada-the-blackburns": {
    id: "02",
    title: "Historica Canada – The Blackburns",
    category: "Heritage Film · Documentary",
    year: "2023",
    client: "Historica Canada",
    role: "Director, Director of Photography",
    overview:
      "A heritage documentary short produced for Historica Canada, telling the story of Thornton and Lucie Blackburn: freedom seekers who escaped enslavement in Kentucky and built a new life in Toronto in the 1830s, ultimately becoming the city's first Black cab operators. The film brings one of Canada's most significant but underrecognized Black history stories to a new generation of audiences.",
    challenge:
      "Heritage storytelling carries the weight of responsibility: get it wrong and you dishonour the people whose lives it represents. The challenge was producing something that felt cinematic, emotionally alive, and respectful of the Blackburns' legacy, while staying true to the historical record. We needed to make history feel urgent, not archival.",
    approach:
      "The visual language was rooted in warmth and intimacy, honouring the humanity of the Blackburns rather than reducing them to symbols. We used a combination of dramatic re-enactment-style framing, evocative natural light, and a restrained colour palette that grounded the film in the period without feeling like a museum exhibit. Every editorial decision was made to serve the emotional truth of the story.",
    outcome:
      "The film was produced for Historica Canada, the organization behind Canada's beloved Heritage Minutes, and stands as a testament to the richness of Black Canadian history. It has been used in educational and public history contexts to bring the Blackburns' story to broader audiences across the country.",
    tags: ["Heritage Film", "Documentary", "Black Canadian History", "Historica Canada"],
    nextSlug: "lcbo-spirit-of-sustainability",
    nextTitle: "LCBO – Spirit of Sustainability",
    vimeoIds: ["801325699"],
  },
  "lcbo-spirit-of-sustainability": {
    id: "03",
    title: "LCBO – Spirit of Sustainability",
    category: "Brand Film Series · Corporate",
    year: "2021",
    client: "LCBO",
    role: "Director, Director of Photography",
    overview:
      "A three-part brand film series produced for LCBO, Ontario's provincial liquor authority, exploring the organization's commitment to environmental sustainability. Each film profiles a different dimension of the Spirit of Sustainability initiative, bringing LCBO's values to life through story rather than statement.",
    challenge:
      "Corporate sustainability content rarely inspires. Most of it reads like an annual report with a camera pointed at it: numbers, pledges, and talking points. LCBO needed something that would resonate emotionally with Ontarians and communicate genuine commitment, not just compliance. The challenge was making institutional values feel human.",
    approach:
      "We built each film around a person or a place, not a policy. By anchoring the series in specific, concrete stories, we gave the abstract idea of sustainability a face, a location, and a feeling. The visual language was clean and grounded, favouring natural environments and available light to reinforce the spirit of the initiative without over-designing the message.",
    outcome:
      "The three-film series delivered a cohesive brand narrative across LCBO's corporate and consumer channels, demonstrating that sustainability communications can carry the same creative ambition as brand advertising. The series stands as an example of how institutional storytelling can be both responsible and genuinely compelling.",
    tags: ["Brand Film", "Corporate", "Sustainability", "LCBO"],
    nextSlug: "creative-connect",
    nextTitle: "Creative Connect",
    vimeoIds: ["601135120", "601135549", "601136003"],
  },
  "creative-connect": {
    id: "04",
    title: "Creative Connect",
    category: "Podcast · Community Platform",
    year: "2024",
    client: "Corex Creative",
    role: "Creator, Host, Executive Producer",
    overview:
      "Creative Connect is a podcast dedicated to shining a light on the often overlooked stars of the creative world. Artists, designers, filmmakers, musicians, and other creatives step out from behind the scenes and into the spotlight. Each episode offers an intimate look into the lives, passions, and processes of those who shape the art and culture we all consume.",
    challenge:
      "The creative industry is full of extraordinary talent that never gets the platform it deserves. Most media focuses on the finished product, not the person who made it, the process behind it, or the obstacles overcome to bring it to life. Creative Connect was built to close that gap: to give the makers the spotlight, not just the made.",
    approach:
      "Through open and honest conversations, each episode digs deep into the who, what, why, and how of our guests' creative journeys. We explore the motivations that drive them, the challenges they face, and the triumphs that define their careers. The format is intentionally intimate: no panels, no gimmicks, just two people going deep on craft, purpose, and the reality of building a creative life.",
    outcome:
      "Creative Connect has grown into a platform for revealing the untold stories behind the art, giving listeners a unique and inspiring glimpse into the world of creativity. Whether you're a seasoned professional, someone aspiring to break into the creative industries, or simply a fan of the arts, Creative Connect offers valuable insights, inspiration, and a genuine sense of community.",
    tags: ["Podcast", "Community", "Creative Industries", "Toronto"],
    nextSlug: "hodans-story",
    nextTitle: "Hodan's Story",
    youtubeIds: ["LYPeCo5TsfE", "xAlwzsPEDlA"],
    links: [
      { label: "Listen Now", href: "https://corexcreative.com/listen/" },
      { label: "Instagram", href: "https://www.instagram.com/corexcreativeinc/" },
      { label: "Facebook", href: "https://www.facebook.com/corexcreative/" },
      { label: "LinkedIn", href: "https://www.linkedin.com/company/corex-creative/" },
      { label: "TikTok", href: "https://www.tiktok.com/@corexcreative" },
    ],
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

  const { id, title, category, year, client, role, overview, challenge, approach, outcome, tags, nextSlug, nextTitle, youtubeIds, vimeoIds, coverImage, links } = project;

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

        {/* Project visual: cover image or placeholder (placeholder hidden when videos exist) */}
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
        ) : (!youtubeIds || youtubeIds.length === 0) && (!vimeoIds || vimeoIds.length === 0) ? (
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
        ) : null}

        {/* Vimeo embeds */}
        {vimeoIds && vimeoIds.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: vimeoIds.length === 3 ? "1fr 1fr 1fr" : vimeoIds.length > 1 ? "1fr 1fr" : "1fr",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {vimeoIds.map((vid) => (
              <div key={vid} style={{ width: "100%", aspectRatio: "16/9" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://player.vimeo.com/video/${vid}`}
                  title={title}
                  frameBorder="0"
                  allow="autoplay; fullscreen; picture-in-picture"
                  allowFullScreen
                  style={{ display: "block" }}
                />
              </div>
            ))}
          </div>
        )}

        {/* YouTube embeds */}
        {youtubeIds && youtubeIds.length > 0 && (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: youtubeIds.length > 1 ? "1fr 1fr" : "1fr",
              gap: "1rem",
              marginTop: "2rem",
            }}
          >
            {youtubeIds.map((id) => (
              <div key={id} style={{ width: "100%", aspectRatio: "16/9" }}>
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${id}`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  style={{ display: "block" }}
                />
              </div>
            ))}
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
          className="md-grid-cols-3"
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
            <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
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

            {links && links.length > 0 && (
              <>
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
                  Links
                </p>
                <div style={{ display: "flex", flexDirection: "row", flexWrap: "wrap", gap: "0.75rem", marginBottom: "3rem" }}>
                  {links.map(({ label, href }) => (
                    <a
                      key={href}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--cream-dim)",
                        textDecoration: "none",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: "0.375rem",
                      }}
                    >
                      {label} <span aria-hidden style={{ opacity: 0.5 }}>↗</span>
                    </a>
                  ))}
                </div>
              </>
            )}

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
