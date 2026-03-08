"use client";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

const packages = [
  {
    id: "01",
    label: "Creative Strategy Session",
    price: "$247",
    priceNote: "1-hour session",
    tagline: "Come with your questions. Leave with a clear strategy.",
    description:
      "A focused 60-minute session built around your specific challenge. Whether you are navigating a brand pivot, unsure about your content direction, or need a second opinion on a major decision, this session gives you direct access to strategic thinking and creative direction you can act on immediately.",
    who: "Founders, creatives, and brand managers who need directional clarity without a long engagement.",
    includes: [
      "60-minute video session",
      "Pre-session intake form to focus the conversation",
      "Session notes and 3 priority action items delivered within 24 hours",
      "One follow-up email for clarifying questions within 7 days",
    ],
    cta: "Book a Session",
    href: "https://calendar.app.google/qeycC86WguwLnjt1A",
    highlight: false,
    external: true,
  },
  {
    id: "02",
    label: "Strategic Brand & Growth Session",
    price: "$3,497",
    priceNote: "one-time investment",
    tagline: "90 minutes to diagnose, position, and build your roadmap.",
    description:
      "This is the session where the real work begins. A deep-dive strategy engagement that covers your brand positioning, content infrastructure, audience architecture, and revenue clarity. You walk away with a concrete roadmap built around your business model and goals, not a generic template.",
    who: "Founders and brand leaders who are serious about building a media presence that compounds over time.",
    includes: [
      "90-minute strategic deep dive session",
      "Pre-session brand and positioning audit",
      "Positioning statement and messaging framework",
      "Content infrastructure blueprint",
      "Prioritized 90-day action roadmap",
      "Full session recording",
      "30-day follow-up check-in call",
    ],
    cta: "Book This Session",
    href: "https://calendar.app.google/qeycC86WguwLnjt1A",
    highlight: true,
    external: true,
  },
  {
    id: "03",
    label: "Production & Strategy",
    price: "Custom",
    priceNote: "project-based or retainer",
    tagline: "Full-scale cinematic brand storytelling, built to last.",
    description:
      "For founders and enterprise brands ready to build a media infrastructure that does the heavy lifting. This is end-to-end: strategy, production, distribution systems, and content architecture designed to generate authority, attract opportunity, and compound over time.",
    who: "Established brands and growth-stage founders who need a trusted creative partner, not just a vendor.",
    includes: [
      "Brand strategy and positioning",
      "Cinematic documentary-style content production",
      "Multi-platform content systems and distribution",
      "Thought leadership and founder content",
      "Media infrastructure design and buildout",
      "Ongoing creative direction and strategic oversight",
    ],
    cta: "Start the Conversation",
    href: "mailto:dwayne@corexcreative.com?subject=Production%20%26%20Strategy%20Inquiry",
    highlight: false,
    external: true,
  },
];

const process = [
  {
    step: "01",
    title: "Book a call",
    body: "Select the session that fits where you are. If you are unsure, start with a Book a Call and we will figure out the right path together.",
  },
  {
    step: "02",
    title: "Pre-session intake",
    body: "Before every engagement, you complete a focused intake form. This ensures we use every minute of our time on what matters most to your business.",
  },
  {
    step: "03",
    title: "The session",
    body: "We get into it. No fluff, no slides for the sake of slides. Real strategic thinking applied directly to your situation.",
  },
  {
    step: "04",
    title: "Your roadmap",
    body: "You leave with something tangible. A clear next step, a prioritized plan, or a full blueprint depending on which engagement you choose.",
  },
];

export default function PackagesPage() {
  const gcalRef = useRef<HTMLDivElement>(null);
  const gcalRef2 = useRef<HTMLDivElement>(null);
  const gcalRef3 = useRef<HTMLDivElement>(null);
  const gcalRefCta = useRef<HTMLDivElement>(null);

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

    function initGcalCta() {
      if (!gcalRefCta.current || gcalRefCta.current.dataset.gcalInit) return;
      gcalRefCta.current.dataset.gcalInit = "1";
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).calendar?.schedulingButton?.load({
        url: "https://calendar.google.com/calendar/appointments/schedules/AcZssZ08-awbVrViK-zftiLE4XecqfL_Y7i3tv0XG7WZfH1rWs-ZXD24iECcP340121SFVu9LdnXCUAy?gv=true",
        color: "#C9A84C",
        label: "BOOK A CALL",
        target: gcalRefCta.current,
      });
    }

    if (!document.getElementById("gcal-js")) {
      const script = document.createElement("script");
      script.id = "gcal-js";
      script.src = "https://calendar.google.com/calendar/scheduling-button-script.js";
      script.async = true;
      script.onload = () => { initGcal(); initGcal2(); initGcal3(); initGcalCta(); };
      document.body.appendChild(script);
    } else {
      initGcal();
      initGcal2();
      initGcal3();
      initGcalCta();
    }
  }, []);


  return (
    <div style={{ backgroundColor: "var(--black)", minHeight: "100vh", paddingTop: "6rem" }}>

      {/* Page Header */}
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
          Work With Me
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.0,
            color: "var(--cream)",
            letterSpacing: "-0.025em",
            maxWidth: "18ch",
            marginBottom: "2rem",
          }}
        >
          Choose your{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>path.</em>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease }}
          style={{
            fontSize: "1.125rem",
            color: "var(--cream-dim)",
            lineHeight: 1.7,
            maxWidth: "56ch",
          }}
        >
          Every engagement is built around one goal: giving you the clarity, strategy, and creative direction to build something that lasts. Pick the level that matches where you are right now.
        </motion.p>
      </div>

      {/* Packages */}
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 2rem" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          {packages.map(({ id, label, price, priceNote, tagline, description, who, includes, cta, href, highlight, external }, i) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.1, ease }}
              style={{
                padding: "3.5rem",
                backgroundColor: highlight ? "rgba(201,168,76,0.04)" : "rgba(200,194,180,0.02)",
                border: highlight ? "1px solid rgba(201,168,76,0.35)" : "1px solid rgba(200,194,180,0.1)",
                position: "relative",
              }}
            >
              {highlight && (
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
              {highlight && (
                <div
                  style={{
                    position: "absolute",
                    top: "1.5rem",
                    right: "2rem",
                    fontSize: "0.625rem",
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                    padding: "0.25rem 0.75rem",
                    border: "1px solid rgba(201,168,76,0.4)",
                    backgroundColor: "rgba(201,168,76,0.08)",
                  }}
                >
                  Most Popular
                </div>
              )}

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "1fr",
                  gap: "3rem",
                }}
                className="md-grid-cols-2"
              >
                {/* Left: Overview */}
                <div>
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: 500,
                      marginBottom: "0.75rem",
                    }}
                  >
                    {id} — {label}
                  </p>
                  <div style={{ marginBottom: "1.5rem" }}>
                    <p
                      style={{
                        fontFamily: "var(--font-display), sans-serif",
                        fontSize: "clamp(2rem, 4vw, 3rem)",
                        fontWeight: 700,
                        color: "var(--cream)",
                        letterSpacing: "-0.03em",
                        lineHeight: 1,
                        marginBottom: "0.375rem",
                      }}
                    >
                      {price}
                    </p>
                    <p
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--cream-dim)",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {priceNote}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-display), sans-serif",
                      fontSize: "1.125rem",
                      fontStyle: "italic",
                      color: "var(--cream)",
                      lineHeight: 1.4,
                      marginBottom: "1.25rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {tagline}
                  </p>
                  <p
                    style={{
                      fontSize: "0.9375rem",
                      color: "var(--cream-dim)",
                      lineHeight: 1.75,
                      marginBottom: "1.5rem",
                    }}
                  >
                    {description}
                  </p>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--cream-dim)",
                      lineHeight: 1.6,
                      padding: "1rem 1.25rem",
                      borderLeft: "2px solid rgba(201,168,76,0.4)",
                      backgroundColor: "rgba(201,168,76,0.03)",
                    }}
                  >
                    <span style={{ color: "var(--gold)", fontWeight: 600, fontSize: "0.6875rem", letterSpacing: "0.1em", textTransform: "uppercase" }}>Who this is for: </span>
                    {who}
                  </p>
                </div>

                {/* Right: Includes + CTA */}
                <div style={{ display: "flex", flexDirection: "column" }}>
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      color: "var(--cream-dim)",
                      fontWeight: 500,
                      marginBottom: "1.25rem",
                    }}
                  >
                    What&apos;s included
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "0 0 2.5rem",
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.875rem",
                      flex: 1,
                    }}
                  >
                    {includes.map((item) => (
                      <li
                        key={item}
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
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
                            marginTop: "0.1rem",
                          }}
                        >
                          ✓
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                  {id === "01" ? (
                    <div ref={gcalRef} />
                  ) : id === "02" ? (
                    <div ref={gcalRef2} />
                  ) : (
                    <div ref={gcalRef3} />
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* How It Works */}
      <div
        style={{
          backgroundColor: "var(--charcoal)",
          borderTop: "1px solid rgba(200,194,180,0.08)",
          padding: "5rem 2rem",
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
            The Process
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
              marginBottom: "4rem",
              maxWidth: "24ch",
            }}
          >
            How it works.
          </motion.h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr",
              gap: "2rem",
            }}
            className="md-grid-cols-2"
          >
            {process.map(({ step, title, body }, i) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, delay: i * 0.08, ease }}
                style={{
                  padding: "2.5rem",
                  border: "1px solid rgba(200,194,180,0.08)",
                  backgroundColor: "rgba(200,194,180,0.02)",
                }}
              >
                <p
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--gold)",
                    letterSpacing: "0.08em",
                    fontWeight: 500,
                    marginBottom: "1.25rem",
                  }}
                >
                  {step}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-display), sans-serif",
                    fontSize: "1.25rem",
                    fontWeight: 600,
                    color: "var(--cream)",
                    letterSpacing: "-0.01em",
                    marginBottom: "0.875rem",
                  }}
                >
                  {title}
                </h3>
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
      </div>

      {/* Bottom CTA */}
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "6rem 2rem",
          textAlign: "center",
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          style={{
            fontSize: "0.6875rem",
            letterSpacing: "0.22em",
            textTransform: "uppercase",
            color: "var(--gold)",
            fontWeight: 500,
            marginBottom: "1rem",
          }}
        >
          Not sure where to start?
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease }}
          style={{
            fontFamily: "var(--font-display), sans-serif",
            fontSize: "clamp(2rem, 4vw, 3.25rem)",
            fontWeight: 700,
            color: "var(--cream)",
            letterSpacing: "-0.02em",
            marginBottom: "1.5rem",
          }}
        >
          Book a 15-minute intro call.
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          style={{
            fontSize: "1rem",
            color: "var(--cream-dim)",
            lineHeight: 1.7,
            maxWidth: "48ch",
            margin: "0 auto 2.5rem",
          }}
        >
          We will talk through where you are, what you are building, and which path makes the most sense for your goals.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3, ease }}
        >
          <div ref={gcalRefCta} />
        </motion.div>
      </div>
    </div>
  );
}
