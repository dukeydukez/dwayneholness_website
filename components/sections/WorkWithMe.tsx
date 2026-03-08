"use client";
import Link from "next/link";
import { motion } from "framer-motion";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const tiers = [
  {
    label: "Production & Strategy",
    price: "Contact for Quote",
    priceNote: null,
    features: [
      "Full-scale content production",
      "Brand storytelling systems",
      "Enterprise media strategy",
    ],
    cta: "Start Project",
    href: "/speaking#book",
    highlight: false,
  },
  {
    label: "Discovery Session",
    price: "$3,500",
    priceNote: "one-time",
    features: [
      "90-min strategy deep dive",
      "Actionable roadmap",
      "Founders & Brand leaders",
    ],
    cta: "Book Session",
    href: "/speaking#book",
    highlight: true,
  },
];

export default function WorkWithMe() {
  return (
    <section
      style={{
        backgroundColor: "var(--charcoal)",
        padding: "7rem 2rem",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background radial accent */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(201,168,76,0.05) 0%, transparent 70%)",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease }}
          style={{
            textAlign: "center",
            maxWidth: "680px",
            margin: "0 auto 7rem",
          }}
        >
          <div
            style={{
              width: "1px",
              height: "3rem",
              backgroundColor: "rgba(201,168,76,0.3)",
              margin: "0 auto 3rem",
            }}
          />
          <p
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              fontStyle: "italic",
              color: "var(--cream)",
              lineHeight: 1.55,
              letterSpacing: "-0.01em",
              marginBottom: "2rem",
            }}
          >
            &ldquo;Dwayne is the bridge between culture, commerce, and creative
            legacy.&rdquo;
          </p>
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
            }}
          >
            Brand Partner, Corporate Client
          </p>
        </motion.div>

        {/* Section heading */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease }}
          style={{ textAlign: "center", marginBottom: "4rem" }}
        >
          <p
            style={{
              fontSize: "0.6875rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: "var(--gold)",
              fontWeight: 500,
              marginBottom: "1rem",
            }}
          >
            Work With Me
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display), sans-serif",
              fontSize: "clamp(2.25rem, 5vw, 4rem)",
              fontWeight: 700,
              color: "var(--cream)",
              letterSpacing: "-0.025em",
              lineHeight: 1.05,
            }}
          >
            Choose your path.
          </h2>
        </motion.div>

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            maxWidth: "860px",
            margin: "0 auto",
          }}
          className="md:grid-cols-2"
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease }}
              whileHover={{
                y: -6,
                transition: { type: "spring", stiffness: 400, damping: 22 },
              }}
              style={{
                padding: "2.75rem",
                backgroundColor: tier.highlight
                  ? "rgba(201,168,76,0.06)"
                  : "rgba(200,194,180,0.03)",
                border: tier.highlight
                  ? "1px solid rgba(201,168,76,0.4)"
                  : "1px solid rgba(200,194,180,0.12)",
                position: "relative",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Gold top rule on highlighted card */}
              {tier.highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "2px",
                    backgroundColor: "var(--gold)",
                  }}
                />
              )}

              {/* Label */}
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cream-dim)",
                  fontWeight: 500,
                  marginBottom: "1.5rem",
                }}
              >
                {tier.label}
              </p>

              {/* Price header — fixed minHeight so features align across both cards */}
              <div style={{ minHeight: "5.5rem", marginBottom: "2.25rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize:
                      tier.price === "Contact for Quote"
                        ? "1.625rem"
                        : "clamp(2.25rem, 4vw, 3.25rem)",
                    fontWeight: 700,
                    color: "var(--cream)",
                    letterSpacing:
                      tier.price === "Contact for Quote" ? "-0.01em" : "-0.03em",
                    lineHeight: 1,
                    marginBottom: tier.priceNote ? "0.375rem" : 0,
                  }}
                >
                  {tier.price}
                </p>
                {tier.priceNote && (
                  <p
                    style={{
                      fontSize: "0.75rem",
                      color: "var(--cream-dim)",
                      letterSpacing: "0.06em",
                      marginBottom: 0,
                    }}
                  >
                    {tier.priceNote}
                  </p>
                )}
              </div>

              {/* Features */}
              <ul
                style={{
                  listStyle: "none",
                  padding: 0,
                  margin: "0 0 2.5rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.875rem",
                }}
              >
                {tier.features.map((feat) => (
                  <li
                    key={feat}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.875rem",
                      fontSize: "0.9375rem",
                      color: "var(--cream-dim)",
                      lineHeight: 1.5,
                    }}
                  >
                    <span
                      style={{
                        color: "var(--gold)",
                        fontSize: "0.875rem",
                        flexShrink: 0,
                        fontWeight: 600,
                      }}
                    >
                      ✓
                    </span>
                    {feat}
                  </li>
                ))}
              </ul>

              {/* Spacer — pushes CTA to the bottom of each card */}
              <div style={{ flex: 1 }} />

              {/* CTA */}
              <Link
                href={tier.href}
                style={{
                  display: "block",
                  textAlign: "center",
                  padding: "0.9375rem 2rem",
                  backgroundColor: tier.highlight ? "var(--gold)" : "transparent",
                  color: tier.highlight ? "var(--black)" : "var(--cream)",
                  border: tier.highlight
                    ? "none"
                    : "1px solid rgba(200,194,180,0.25)",
                  fontSize: "0.8125rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  fontWeight: 600,
                  textDecoration: "none",
                }}
              >
                {tier.cta} <span aria-hidden>→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
