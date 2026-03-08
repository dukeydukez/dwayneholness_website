"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const topics = [
  {
    title: "Media Infrastructure for Founders",
    description:
      "How to move beyond content creation into media systems: the architecture that turns attention into authority and compounds over time.",
  },
  {
    title: "Building Thought Leadership Systems",
    description:
      "The frameworks founders use to establish category leadership, not through volume, but through strategic positioning and consistent point of view.",
  },
  {
    title: "The Architecture of Creative Ecosystems",
    description:
      "How to design an interconnected media, community, and revenue ecosystem that generates demand without depending on any single channel.",
  },
  {
    title: "From Content to Category Leader",
    description:
      "What separates brands with content from brands with infrastructure, and the strategic decisions that determine which side you end up on.",
  },
];

const offerings = [
  {
    label: "Keynote",
    body: "45–90 minute signature talks for conferences, summits, and corporate events. Topics tailored to your audience.",
  },
  {
    label: "Panel & Moderation",
    body: "Thoughtful facilitation and panel contribution at industry events across media, entrepreneurship, and creative industries.",
  },
  {
    label: "Strategic Consulting",
    body: "Deep-dive media infrastructure and ecosystem design engagements for founders and organizations ready to build systems that compound.",
  },
  {
    label: "Workshop",
    body: "Half-day and full-day workshops on media infrastructure, thought leadership systems, and building creative ecosystems that scale.",
  },
];

const testimonials = [
  {
    quote:
      "Dwayne has been an integral part of my success online. He created my entire online persona and helped me grow into the largest Real Estate Developer account in Canada. His filming is on a level unseen before and he has great vision. He also has tremendous patience and dedication.",
    name: "Sherard McQueen",
    role: "Real Estate Developer, M5V Developments Inc",
  },
  {
    quote:
      "With Dwayne, you never feel you are getting last year's cool trend but an authentic and relevant brand lens. He cares about relationships, the end product, and his own team. It shows in the work. And probably most important, he's fun to work with.",
    name: "Leigh Himel",
    role: "Entrepreneur, Writer & Brand Storyteller",
  },
  {
    quote:
      "Dwayne is a gifted creative leader who has a unique ability to bring initiatives to life through powerful storytelling, photography, and videography. His team's work captured the essence of our programming, events, and milestones in ways that truly validated their impact — many of which are now featured in Canadian Tire's annual DIB Year in Review.",
    name: "Letecia Rose",
    role: "Chief Equity, Diversity & Inclusion Officer, Canadian Tire",
  },
];

const galleryImages = [
  { src: "/images/BHMCorexCT-4621.jpeg", label: "Keynote, Creative Connect Summit 2025", aspect: "landscape" },
  { src: "/images/BHMCorexCT-4626.jpeg", label: "Panel, Black Screen Office Forum 2024", aspect: "portrait" },
  { src: "/images/BHMCorexCT-4673.jpeg", label: "Workshop, Corex Creative Labs 2025", aspect: "portrait" },
  { src: "/images/BHMCorexCT-4870.jpeg", label: "Keynote, Toronto Founders Collective 2024", aspect: "landscape" },
  { src: "/images/BHMCorexCT-4898.jpeg", label: "Moderation, CTC Annual Summit 2025", aspect: "landscape" },
  { src: "/images/CorexRBC-5088.jpeg", label: "Masterclass, Creative Connect 2024", aspect: "portrait" },
  { src: "/images/CorexRBC-5097.jpeg", label: "Panel, Media Infrastructure Summit 2025", aspect: "landscape" },
  { src: "/images/CorexRBC-5110.jpeg", label: "Keynote, Founders Collective 2025", aspect: "landscape" },
  { src: "/images/CorexRBC-5194.jpeg", label: "Workshop, Corex Labs 2024", aspect: "portrait" },
];

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function SpeakingPage() {
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.25em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "1.5rem",
          }}
        >
          Speaking &amp; Consulting
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(3rem, 7vw, 6rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            maxWidth: "18ch",
            marginBottom: "2rem",
          }}
        >
          Ideas worth
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            building systems around.
          </em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease }}
          style={{
            fontSize: "1.125rem",
            color: "var(--cream-dim)",
            lineHeight: 1.75,
            maxWidth: "56ch",
          }}
        >
          Dwayne speaks on media infrastructure, thought leadership systems,
          and the architecture of creative ecosystems, combining practitioner
          depth with strategic clarity for founders and enterprise brands.
        </motion.p>
      </div>

      {/* Offerings */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem",
          borderBottom: "1px solid rgba(200,194,180,0.1)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "3rem",
          }}
        >
          Formats
        </motion.p>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: "2rem",
          }}
          className="md:grid-cols-2"
        >
          {offerings.map(({ label, body }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              style={{
                padding: "2rem",
                backgroundColor: "var(--charcoal)",
                borderTop: "2px solid rgba(201,168,76,0.3)",
              }}
            >
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  color: "var(--gold)",
                  fontWeight: 500,
                  marginBottom: "0.875rem",
                }}
              >
                {label}
              </p>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--cream-dim)",
                  lineHeight: 1.7,
                }}
              >
                {body}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Topics */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem",
          borderBottom: "1px solid rgba(200,194,180,0.1)",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "3rem",
          }}
        >
          Signature Topics
        </motion.p>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {topics.map(({ title, description }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              style={{
                display: "grid",
                gridTemplateColumns: "1fr",
                gap: "1rem",
                padding: "2.5rem 0",
                borderTop:
                  i === 0
                    ? "1px solid rgba(200,194,180,0.15)"
                    : "1px solid rgba(200,194,180,0.08)",
                borderBottom:
                  i === topics.length - 1
                    ? "1px solid rgba(200,194,180,0.15)"
                    : "none",
              }}
              className="md:grid-cols-2"
            >
              <h2
                style={{
                  fontFamily: "var(--font-display), sans-serif",
                  fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
                  fontWeight: 700,
                  color: "var(--cream)",
                  lineHeight: 1.2,
                  letterSpacing: "-0.01em",
                }}
              >
                {title}
              </h2>
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--cream-dim)",
                  lineHeight: 1.7,
                }}
              >
                {description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Image Gallery */}
      <div
        style={{
          backgroundColor: "var(--charcoal)",
          padding: "5rem 2rem",
          borderTop: "1px solid rgba(200,194,180,0.08)",
          borderBottom: "1px solid rgba(200,194,180,0.08)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              marginBottom: "0.75rem",
            }}
          >
            On Stage
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, delay: 0.1, ease }}
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(1.75rem, 3.5vw, 2.75rem)",
              fontWeight: 700,
              color: "var(--cream)",
              letterSpacing: "-0.02em",
              marginBottom: "3rem",
              maxWidth: "20ch",
            }}
          >
            In the room where it happens.
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "1.5rem",
            }}
            className="gallery-grid"
          >
            {galleryImages.map(({ src, label }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.07, ease }}
              >
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4/3",
                    overflow: "hidden",
                    border: "1px solid rgba(201,168,76,0.25)",
                  }}
                >
                  <Image
                    src={src}
                    alt={label}
                    fill
                    style={{ objectFit: "cover", objectPosition: "center top" }}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--cream-dim)",
                    marginTop: "0.75rem",
                    opacity: 0.7,
                  }}
                >
                  {label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div
        style={{
          backgroundColor: "var(--charcoal)",
          padding: "5rem 2rem",
          borderBottom: "1px solid rgba(200,194,180,0.1)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, ease }}
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              marginBottom: "3rem",
            }}
          >
            What Organisers Say
          </motion.p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2.5rem",
            }}
            className="md:grid-cols-3"
          >
            {testimonials.map(({ quote, name, role }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.1, ease }}
                style={{
                  borderTop: "2px solid rgba(201,168,76,0.25)",
                  paddingTop: "2rem",
                }}
              >
                <p
                  style={{
                    fontSize: "1rem",
                    color: "var(--cream)",
                    lineHeight: 1.75,
                    marginBottom: "1.5rem",
                    fontStyle: "italic",
                  }}
                >
                  &ldquo;{quote}&rdquo;
                </p>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--gold)",
                    fontWeight: 600,
                    marginBottom: "0.25rem",
                  }}
                >
                  {name}
                </p>
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--cream-dim)",
                    letterSpacing: "0.04em",
                  }}
                >
                  {role}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Book CTA */}
      <div
        id="book"
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "5rem 2rem 7rem",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "1.5rem",
          }}
        >
          Book a Call
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 4.5vw, 3.75rem)",
            fontWeight: 700,
            lineHeight: 1.05,
            color: "var(--cream)",
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          Ready to bring Dwayne
          <br />
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            to your stage?
          </em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            fontSize: "1rem",
            color: "var(--cream-dim)",
            lineHeight: 1.75,
            maxWidth: "52ch",
            margin: "0 auto 2.5rem",
          }}
        >
          Send an inquiry with details about your event, conference, or
          consulting need and we&apos;ll be in touch within 48 hours.
        </motion.p>
        <motion.a
          href="mailto:dwayne@corexcreative.com?subject=Speaking%20Inquiry"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
          whileHover={{ scale: 1.02 }}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            padding: "1rem 2.5rem",
            backgroundColor: "var(--gold)",
            color: "var(--black)",
            fontSize: "0.875rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            fontWeight: 600,
            textDecoration: "none",
          }}
        >
          Send an Inquiry <span aria-hidden>→</span>
        </motion.a>
      </div>
    </div>
  );
}
