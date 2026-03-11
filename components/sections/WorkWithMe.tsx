"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const testimonials = [
  {
    quote:
      "Dwayne has been an integral part of my success online. He created my entire online persona and helped me grow into the largest Real Estate Developer account in Canada. His filming is on a level unseen before and he has great vision.",
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
      "Dwayne is a gifted creative leader who has a unique ability to bring initiatives to life through powerful storytelling, photography, and videography. He is a trusted partner, an innovative thinker, and simply a wonderful person to work with.",
    name: "Letecia Rose",
    role: "Chief Equity, Diversity & Inclusion Officer, Canadian Tire",
  },
];

const tiers = [
  {
    label: "Creative Strategy Session",
    price: "$247",
    priceNote: "1-hour session",
    features: [
      "60-minute video session",
      "Session notes & 3 action items",
      "One follow-up email (7 days)",
    ],
    cta: "Book a Session",
    href: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1wvra2q2NrE-VbCzPrVxNzwUGK2PTcNHkDFMZ7VVhFQ047CbGSp_YVPkT5A2AJK3I03_f9J4vS?gv=true",
    highlight: false,
  },
  {
    label: "Strategic Brand & Growth Session",
    price: "$3,497",
    priceNote: "one-time investment",
    features: [
      "90-min strategy deep dive",
      "Positioning & messaging framework",
      "Prioritized 90-day roadmap",
    ],
    cta: "Book This Session",
    href: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08-awbVrViK-zftiLE4XecqfL_Y7i3tv0XG7WZfH1rWs-ZXD24iECcP340121SFVu9LdnXCUAy?gv=true",
    highlight: true,
  },
  {
    label: "Production & Strategy",
    price: "Custom",
    priceNote: "project-based or retainer",
    features: [
      "Full-scale cinematic production",
      "Multi-platform content systems",
      "Ongoing creative direction",
    ],
    cta: "Start the Conversation",
    href: "mailto:dwayne@corexcreative.com?subject=Production%20%26%20Strategy%20Inquiry",
    highlight: false,
  },
  {
    label: "Book Dwayne to Speak",
    price: "Custom",
    priceNote: "per engagement",
    features: [
      "Keynotes, panels & workshops",
      "Tailored to your audience",
      "Post-event attendee resources",
    ],
    cta: "Send a Speaking Inquiry",
    href: "mailto:dwayne@corexcreative.com?subject=Speaking%20Inquiry",
    highlight: false,
  },
];

export default function WorkWithMe() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);


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
        {/* Testimonial carousel */}
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
          <div style={{ minHeight: "10rem", position: "relative" }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.5, ease }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "clamp(1.125rem, 2.2vw, 1.5rem)",
                    fontStyle: "italic",
                    color: "var(--cream)",
                    lineHeight: 1.6,
                    letterSpacing: "-0.01em",
                    marginBottom: "1.75rem",
                  }}
                >
                  &ldquo;{testimonials[active].quote}&rdquo;
                </p>
                <p
                  style={{
                    fontSize: "0.8125rem",
                    color: "var(--cream)",
                    fontWeight: 600,
                    marginBottom: "0.25rem",
                  }}
                >
                  {testimonials[active].name}
                </p>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 500,
                  }}
                >
                  {testimonials[active].role}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
          {/* Dot navigation */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.625rem",
              marginTop: "2rem",
            }}
          >
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
                style={{
                  width: i === active ? "1.5rem" : "0.5rem",
                  height: "0.5rem",
                  borderRadius: "999px",
                  backgroundColor:
                    i === active ? "var(--gold)" : "rgba(201,168,76,0.25)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "width 0.3s ease, background-color 0.2s ease",
                }}
              />
            ))}
          </div>
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

        {/* Pricing rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
        >
          {tiers.map((tier, i) => (
            <motion.div
              key={tier.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
              style={{
                display: "grid",
                gridTemplateColumns: "220px 1fr auto",
                alignItems: "center",
                gap: "2.5rem",
                padding: "2rem 0",
                borderTop: i === 0
                  ? "1px solid rgba(200,194,180,0.15)"
                  : "1px solid rgba(200,194,180,0.08)",
                borderBottom: i === tiers.length - 1
                  ? "1px solid rgba(200,194,180,0.15)"
                  : "none",
              }}
              className="work-with-me-row"
            >
              {/* Column 1: Label + Price */}
              <div>
                <p
                  style={{
                    fontSize: "0.6875rem",
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: tier.highlight ? "var(--gold)" : "var(--cream-dim)",
                    fontWeight: 500,
                    marginBottom: "0.5rem",
                  }}
                >
                  {tier.label}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    color: "var(--cream)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1,
                  }}
                >
                  {tier.price}
                </p>
                {tier.priceNote && (
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      color: "var(--cream-dim)",
                      letterSpacing: "0.04em",
                      marginTop: "0.25rem",
                    }}
                  >
                    {tier.priceNote}
                  </p>
                )}
              </div>

              {/* Column 2: Features (stacked vertically for alignment) */}
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.5rem",
                }}
              >
                {tier.features.map((feat) => (
                  <span
                    key={feat}
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--cream-dim)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.75rem" }}>✓</span>
                    {feat}
                  </span>
                ))}
              </div>

              {/* Column 3: CTA */}
              <a
                href={tier.href}
                target={tier.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  padding: "0.75rem 1.75rem",
                  backgroundColor: tier.highlight ? "var(--gold)" : "transparent",
                  color: tier.highlight ? "var(--black)" : "var(--cream-dim)",
                  border: tier.highlight ? "1px solid var(--gold)" : "1px solid rgba(200,194,180,0.25)",
                  fontSize: "0.625rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 700,
                  textDecoration: "none",
                  textAlign: "center",
                  cursor: "pointer",
                  transition: "opacity 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {tier.cta.toUpperCase()}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
