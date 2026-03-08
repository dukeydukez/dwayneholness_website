"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

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
    href: "https://calendar.app.google/qeycC86WguwLnjt1A",
    highlight: false,
    external: true,
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
    href: "https://calendar.app.google/qeycC86WguwLnjt1A",
    highlight: true,
    external: true,
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
    external: true,
  },
];

export default function WorkWithMe() {
  const [active, setActive] = useState(0);
  const gcalRef = useRef<HTMLDivElement>(null);
  const gcalRef2 = useRef<HTMLDivElement>(null);
  const gcalRef3 = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((i) => (i + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  // Load Google Calendar scheduling button for Creative Strategy Session
  useEffect(() => {
    if (!document.getElementById("gcal-css")) {
      const link = document.createElement("link");
      link.id = "gcal-css";
      link.rel = "stylesheet";
      link.href = "https://calendar.google.com/calendar/scheduling-button-script.css";
      document.head.appendChild(link);
    }

    function initGcal() {
      if (!gcalRef.current || gcalRef.current.dataset.gcalInit) return;
      gcalRef.current.dataset.gcalInit = "1";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).calendar?.schedulingButton?.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1wvra2q2NrE-VbCzPrVxNzwUGK2PTcNHkDFMZ7VVhFQ047CbGSp_YVPkT5A2AJK3I03_f9J4vS?gv=true",
        color: "#C9A84C",
        label: "BOOK A SESSION",
        target: gcalRef.current,
      });
    }

    function initGcal2() {
      if (!gcalRef2.current || gcalRef2.current.dataset.gcalInit) return;
      gcalRef2.current.dataset.gcalInit = "1";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).calendar?.schedulingButton?.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08-awbVrViK-zftiLE4XecqfL_Y7i3tv0XG7WZfH1rWs-ZXD24iECcP340121SFVu9LdnXCUAy?gv=true",
        color: "#C9A84C",
        label: "BOOK THIS SESSION",
        target: gcalRef2.current,
      });
    }

    function initGcal3() {
      if (!gcalRef3.current || gcalRef3.current.dataset.gcalInit) return;
      gcalRef3.current.dataset.gcalInit = "1";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).calendar?.schedulingButton?.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ1RLqWdgiUkQWuGzyH_VFox5mTz7u0OqaNQcRvmgY5vFblcd8gwxP4BRvIuK-aC8bBdFuMOLmKh?gv=true",
        color: "#C9A84C",
        label: "START THE CONVERSATION",
        target: gcalRef3.current,
      });
    }

    if (!document.getElementById("gcal-js")) {
      const script = document.createElement("script");
      script.id = "gcal-js";
      script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      script.async = true;
      script.onload = () => { initGcal(); initGcal2(); initGcal3(); };
      document.body.appendChild(script);
    } else {
      initGcal();
      initGcal2();
      initGcal3();
    }
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

        {/* Pricing cards */}
        <div
          style={{
            display: "grid",
            gap: "1.5rem",
            maxWidth: "1100px",
            margin: "0 auto",
          }}
          className="md-grid-cols-3"
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

              {/* Label — minHeight reserves space for 2 lines so price always starts at the same point */}
              <p
                style={{
                  fontSize: "0.6875rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "var(--cream-dim)",
                  fontWeight: 500,
                  marginBottom: "1.5rem",
                  minHeight: "2.25rem",
                }}
              >
                {tier.label}
              </p>

              {/* Price header */}
              <div style={{ minHeight: "5.5rem", marginBottom: "2.25rem" }}>
                <p
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                    fontWeight: 700,
                    color: "var(--cream)",
                    letterSpacing: "-0.03em",
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
              {tier.label === "Creative Strategy Session" ? (
                <div ref={gcalRef} />
              ) : tier.label === "Strategic Brand & Growth Session" ? (
                <div ref={gcalRef2} />
              ) : (
                <div ref={gcalRef3} />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
