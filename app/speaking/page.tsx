"use client";
import { motion } from "framer-motion";

const topics = [
  {
    title: "Media Infrastructure for Founders",
    description:
      "How to move beyond content creation into media systems — the architecture that turns attention into authority and compounds over time.",
  },
  {
    title: "Building Thought Leadership Systems",
    description:
      "The frameworks founders use to establish category leadership — not through volume, but through strategic positioning and consistent point of view.",
  },
  {
    title: "The Architecture of Creative Ecosystems",
    description:
      "How to design an interconnected media, community, and revenue ecosystem that generates demand without depending on any single channel.",
  },
  {
    title: "From Content to Category Leader",
    description:
      "What separates brands with content from brands with infrastructure — and the strategic decisions that determine which side you end up on.",
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
    body: "Deep-dive media infrastructure and ecosystem design engagements for founders and organisations ready to build systems that compound.",
  },
  {
    label: "Workshop",
    body: "Half-day and full-day workshops on media infrastructure, thought leadership systems, and building creative ecosystems that scale.",
  },
];

const testimonials = [
  {
    quote:
      "Dwayne brought a level of clarity and creative confidence to our event that we hadn't seen before. Our audience was engaged from the first sentence.",
    name: "Jordan McKenzie",
    role: "Executive Director, Creative Connect",
  },
  {
    quote:
      "The frameworks Dwayne shared in his keynote became the foundation of how we now think about content across our entire organisation. Genuinely transformative.",
    name: "Aisha Thompson",
    role: "Head of Brand, Luvbay",
  },
  {
    quote:
      "What sets Dwayne apart is that he doesn't speak from theory — he speaks from the work. Every insight lands because it's earned.",
    name: "Marcus Reid",
    role: "Founder, Black Screen Office",
  },
];

const galleryImages = [
  { label: "Keynote, Creative Connect Summit 2025", aspect: "landscape" },
  { label: "Panel, Black Screen Office Forum 2024", aspect: "portrait" },
  { label: "Workshop, Corex Creative Labs 2025", aspect: "portrait" },
  { label: "Keynote, Toronto Founders Collective 2024", aspect: "landscape" },
  { label: "Moderation, CTC Annual Summit 2025", aspect: "landscape" },
  { label: "Masterclass, Creative Connect 2024", aspect: "portrait" },
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
          and the architecture of creative ecosystems — combining practitioner
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
            gridTemplateRows: "auto auto",
            gap: "1rem",
          }}
          className="gallery-grid"
        >
          {galleryImages.map(({ label, aspect }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.07, ease }}
              style={{
                position: "relative",
                aspectRatio: aspect === "landscape" ? "4/3" : "3/4",
                backgroundColor: "var(--charcoal)",
                backgroundImage: `radial-gradient(ellipse 80% 80% at ${30 + i * 15}% ${40 + i * 8}%, rgba(201,168,76,0.07) 0%, transparent 70%)`,
                overflow: "hidden",
                gridColumn: i === 0 ? "span 2" : "span 1",
                gridRow: i === 0 ? "span 1" : "span 1",
              }}
            >
              {/* Placeholder treatment — replace with real images */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "flex-end",
                  padding: "1.25rem",
                  background: "linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(200,194,180,0.5)",
                  }}
                >
                  {label}
                </p>
              </div>
            </motion.div>
          ))}
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
