import type { Metadata } from "next";
import Image from "next/image";

const SITE = "https://dwayneholness.com";
const DESCRIPTION =
  "Dwayne Holness is a filmmaker and the founder of Corex Creative, a legacy storytelling agency for purpose-driven leaders.";

export const metadata: Metadata = {
  title: "About Dwayne Holness | Filmmaker and Founder of Corex Creative",
  description: DESCRIPTION,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About Dwayne Holness",
    description: DESCRIPTION,
    url: `${SITE}/about`,
    type: "profile",
    images: [{ url: `${SITE}/images/DH1.png`, alt: "Dwayne Holness" }],
  },
};

const facts = [
  { label: "Known for", value: "Founder and Creative Director, Corex Creative Inc." },
  { label: "Education", value: "Humber College, Multimedia Design and Production Technician, 2010 (honours)" },
  { label: "Film", value: "Director, Hodan's Story, CBC Docs (2022)" },
  { label: "Advisory", value: "Black Screen Office, Symposium Advisory Board (since 2023)" },
];

const honours = [
  { year: "2026", name: "2026 Jamaican Diaspora Impact Award", issuer: "Consulate General of Jamaica, Toronto" },
  { year: "2026", name: "CIBC Entrepreneurship Award", issuer: "BlackNorth Initiative" },
  { year: "2026", name: "Newcomer and Refugee Artist Mentorship grant (mentor)", issuer: "Toronto Arts Council" },
  { year: "2016", name: "Distinguished Men of Honour", issuer: "Black Business and Professional Association" },
  { year: "2014", name: "Youth Arts Pitch Contest, runner-up", issuer: "ArtReach Toronto" },
  { year: "2012", name: "Youth Arts Award", issuer: "ArtReach Toronto" },
  { year: "2012", name: "Certificate of Appreciation", issuer: "Hon. Judy Sgro, M.P." },
  { year: "2011", name: "Identify 'N' Impact Award", issuer: "City of Toronto" },
];

const press = [
  {
    outlet: "Ron Fanfair",
    title: "Dwayne Holness honours the mother whose sacrifice gave him a second chance",
    date: "27 October 2026",
    url: "https://www.ronfanfair.com/home/2026/10/27/seeexa4i5idir8sj7w544ptwpqrm57",
  },
  {
    outlet: "Jamaica Gleaner",
    title: "Six to be honoured at Jamaican Diaspora Impact Awards",
    date: "10 October 2026",
    url: "https://jamaica-gleaner.com/article/news/20261010/six-be-honoured-jamaican-diaspora-impact-awards",
  },
  {
    outlet: "The Caribbean Camera",
    title: "Six Honoured for Jamaican Diaspora Impact",
    date: "October 2026",
    url: "https://thecaribbeancamera.com/six-honoured-for-jamaican-diaspora-impact/",
  },
  {
    outlet: "Ron Fanfair",
    title: "Unsung heroes honoured for changing lives in Canada and Jamaica",
    date: "25 October 2026",
    url: "https://www.ronfanfair.com/home/2026/10/25/b2l4ti3b8rdqluvkgq9fcpl8tupczn",
  },
  {
    outlet: "TCN Now",
    title: "Jamaican Diaspora honours six leaders",
    date: "October 2026",
    url: "https://tcn-now.com/jamaican-diaspora-honours-six-leaders/",
  },
  {
    outlet: "Black Screen Office",
    title: "Symposium Advisory Board",
    date: "January 2025",
    url: "https://bso-ben.ca/symposium/advisory-board/",
  },
  {
    outlet: "CBC News",
    title: "Absolutely Canadian showcases independent documentaries and short films from Ontario",
    date: "August 2023",
    url: "https://www.cbc.ca/news/canada/ottawa/absolutely-canadian-returns-with-new-ontario-docs-1.6505832",
  },
  {
    outlet: "CBC Docs",
    title: "\"Don't dim your light\": Life lessons I learned from the late Somali-Canadian journalist Hodan Nalayeh",
    date: "4 October 2022",
    url: "https://www.cbc.ca/documentaries/short-docs/don-t-dim-your-light-life-lessons-i-learned-from-the-late-somali-canadian-journalist-hodan-nalayeh-1.6605279",
  },
  {
    outlet: "CBC Gem",
    title: "Hodan's Story",
    date: "4 October 2022",
    url: "https://gem.cbc.ca/hodans-story",
  },
  {
    outlet: "CBC Short Docs",
    title: "Hodan's Story",
    date: "2022",
    url: "https://www.cbc.ca/shortdocs/shorts/hodans-story",
  },
  {
    outlet: "TCN Now",
    title: "Dwayne Winston Holness aka \"Dukey Dukez\", setting the example and being that example",
    date: "18 January 2021",
    url: "https://tcn-now.com/dwayne-winston-holness-aka-dukey-dukes-setting-the-example-and-being-that-example/",
  },
  {
    outlet: "SHIFTER Magazine",
    title: "The \"E\" Project: Dwayne Holness, Film Director",
    date: "January 2018",
    url: "https://shiftermagazine.com/e-project/dwayne-holness-film-director",
  },
];

const profiles = [
  { label: "LinkedIn", url: "https://www.linkedin.com/in/dwayneholness" },
  { label: "IMDb", url: "https://www.imdb.com/name/nm5163773/" },
  { label: "Instagram", url: "https://www.instagram.com/dukeydukez/" },
  { label: "X", url: "https://x.com/dukeydukez" },
  { label: "Facebook", url: "https://www.facebook.com/MrHolness" },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "ProfilePage",
      "@id": `${SITE}/about#profilepage`,
      url: `${SITE}/about`,
      name: "About Dwayne Holness",
      mainEntity: { "@id": `${SITE}/#person` },
    },
    {
      "@type": "Movie",
      "@id": `${SITE}/about#hodans-story`,
      name: "Hodan's Story",
      dateCreated: "2022",
      director: { "@id": `${SITE}/#person` },
      productionCompany: { "@type": "Organization", name: "CBC Docs" },
      sameAs: ["https://gem.cbc.ca/hodans-story", "https://www.cbc.ca/shortdocs/shorts/hodans-story"],
    },
  ],
};

const eyebrow = {
  fontSize: "0.6875rem",
  letterSpacing: "0.22em",
  textTransform: "uppercase" as const,
  color: "var(--gold)",
  fontWeight: 500,
  marginBottom: "1.5rem",
};

const h2 = {
  fontFamily: "var(--font-display), sans-serif",
  fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
  fontWeight: 700,
  color: "var(--cream)",
  letterSpacing: "-0.02em",
  marginBottom: "2rem",
};

const body = { fontSize: "1.0625rem", color: "var(--cream-dim)", lineHeight: 1.75, marginBottom: "1.25rem" };
const section = { maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem", borderBottom: "1px solid rgba(200,194,180,0.1)" };
const link = { color: "var(--gold)", textDecoration: "none" };

export default function AboutPage() {
  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Identity */}
      <div style={{ ...section, display: "flex", flexWrap: "wrap", gap: "4rem", alignItems: "flex-start" }}>
        <div style={{ flex: "1 1 420px", minWidth: 0 }}>
          <p style={eyebrow}>About</p>
          <h1
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(3rem, 7vw, 5.5rem)",
              fontWeight: 700,
              lineHeight: 1.0,
              color: "var(--cream)",
              letterSpacing: "-0.03em",
              marginBottom: "2rem",
            }}
          >
            Dwayne Holness
          </h1>
          <p style={{ ...body, fontSize: "1.25rem", color: "var(--cream)" }}>{DESCRIPTION}</p>
          <p style={body}>
            Born in Jamaica, Dwayne came to Canada at five and grew up in Jane and Finch. He registered his first
            business at 20, graduated with honours from Humber College in 2010 and made his first hire in 2013.
          </p>
          <p style={body}>
            <a href="https://corexcreative.com" style={link}>Corex Creative</a> has since served more than 150
            clients, including CSA Group, Canadian Tire, the LCBO, TD Bank and Rogers. Clients stay: CSA Group for
            seven years, Canadian Tire for five. Corex has paid or employed more than 380 creatives, crew and young
            professionals, including 51 young Black professionals through a partnership with the LCBO and the CEE
            Centre for Young Black Professionals.
          </p>
          <p style={body}>
            Dwayne directed <em>Hodan&apos;s Story</em> for CBC Docs. In October 2026 he received the 2026 Jamaican
            Diaspora Impact Award from the Consulate General of Jamaica in Toronto and the CIBC Entrepreneurship Award
            from the BlackNorth Initiative.
          </p>
        </div>
        <div style={{ flex: "0 1 380px", minWidth: 0, width: "100%" }}>
          <Image
            src="/images/DH1.png"
            alt="Portrait of Dwayne Holness"
            width={1500}
            height={2250}
            priority
            style={{ width: "100%", height: "auto", border: "1px solid rgba(201,168,76,0.15)" }}
          />
        </div>
      </div>

      {/* Quick facts */}
      <div style={section}>
        <p style={eyebrow}>At a glance</p>
        <dl style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "2rem" }}>
          {facts.map((f) => (
            <div key={f.label}>
              <dt style={{ ...eyebrow, color: "var(--cream-dim)", marginBottom: "0.5rem" }}>{f.label}</dt>
              <dd style={{ color: "var(--cream)", lineHeight: 1.6, margin: 0 }}>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Honours */}
      <div style={section}>
        <h2 style={h2}>Honours</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {honours.map((h) => (
            <li
              key={h.name}
              style={{ display: "flex", gap: "2rem", padding: "1rem 0", borderTop: "1px solid rgba(200,194,180,0.1)" }}
            >
              <span style={{ color: "var(--gold)", minWidth: "3rem", fontVariantNumeric: "tabular-nums" }}>{h.year}</span>
              <span style={{ color: "var(--cream)", lineHeight: 1.6 }}>
                {h.name}
                <span style={{ color: "var(--cream-dim)" }}>, {h.issuer}</span>
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Press */}
      <div style={section}>
        <h2 style={h2}>In the press</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {press.map((p) => (
            <li key={p.url} style={{ padding: "1rem 0", borderTop: "1px solid rgba(200,194,180,0.1)" }}>
              <a href={p.url} target="_blank" rel="noopener" style={{ ...link, fontSize: "1.0625rem" }}>
                {p.title}
              </a>
              <p style={{ color: "var(--cream-dim)", fontSize: "0.875rem", marginTop: "0.25rem" }}>
                {p.outlet} · {p.date}
              </p>
            </li>
          ))}
        </ul>
      </div>

      {/* Profiles */}
      <div style={{ ...section, borderBottom: "none" }}>
        <h2 style={h2}>Find Dwayne elsewhere</h2>
        <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexWrap: "wrap", gap: "1.5rem" }}>
          {profiles.map((p) => (
            <li key={p.url}>
              <a href={p.url} target="_blank" rel="me noopener" style={link}>
                {p.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
