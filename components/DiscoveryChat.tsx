"use client";

import {
  useState,
  useEffect,
  useRef,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { motion, AnimatePresence } from "framer-motion";

type Role = "user" | "assistant";
type Phase = "idle" | "chatting" | "email" | "results";

interface ChatMessage {
  role: Role;
  content: string;
}

const ease = [0.25, 0.46, 0.45, 0.94] as const;
const TOTAL_QUESTIONS = 5;

const INTRO_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hey, welcome. I'm Dwayne's brand discovery assistant. In the next few minutes, I'll walk you through 5 quick questions to uncover the story at the core of your brand. No fluff, just the real stuff.\n\nReady? Let's get into it.",
};

// Count how many user answers have been given
function countAnswers(messages: ChatMessage[]): number {
  return messages.filter((m) => m.role === "user").length;
}

export default function DiscoveryChat() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [insights, setInsights] = useState("");
  const [emailError, setEmailError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const answersGiven = countAnswers(messages);
  const sessionComplete = answersGiven >= TOTAL_QUESTIONS;

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  // Focus input when chat opens
  useEffect(() => {
    if (open && phase === "chatting" && !sessionComplete) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [open, phase, sessionComplete]);

  // Kick off the session when chat opens for the first time
  async function startSession() {
    setPhase("chatting");
    setMessages([INTRO_MESSAGE]);
    setLoading(true);
    try {
      const res = await fetch("/api/discovery/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [] }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages([INTRO_MESSAGE, { role: "assistant", content: data.message }]);
      }
    } catch {
      setMessages([
        INTRO_MESSAGE,
        {
          role: "assistant",
          content:
            "Something went wrong starting the session. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleOpen() {
    setOpen(true);
    if (phase === "idle") {
      startSession();
    }
  }

  function handleClose() {
    setOpen(false);
  }

  async function handleSend() {
    const text = input.trim();
    if (!text || loading) return;

    const userMessage: ChatMessage = { role: "user", content: text };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Filter out the static intro message — the API expects alternating user/assistant turns
      const apiMessages = newMessages.filter((m) => m !== INTRO_MESSAGE);
      const res = await fetch("/api/discovery/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });
      const data = await res.json();
      if (data.message) {
        const updated = [
          ...newMessages,
          { role: "assistant" as Role, content: data.message },
        ];
        setMessages(updated);
        // After 5 user answers, the bot will wrap up — switch to email phase
        if (countAnswers(updated) >= TOTAL_QUESTIONS) {
          setTimeout(() => setPhase("email"), 800);
        }
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection issue. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  }

  async function handleEmailSubmit(e: FormEvent) {
    e.preventDefault();
    setEmailError("");
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setLoading(true);
    try {
      const res = await fetch("/api/discovery/results", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, messages }),
      });
      const data = await res.json();
      if (data.insights) {
        setInsights(data.insights);
        setPhase("results");
      } else {
        setEmailError("Something went wrong. Please try again.");
      }
    } catch {
      setEmailError("Connection issue. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const progressPercent = Math.min((answersGiven / TOTAL_QUESTIONS) * 100, 100);

  return (
    <>
      {/* Floating trigger button */}
      <AnimatePresence>
        {!open && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 16 }}
            transition={{ duration: 0.4, ease }}
            onClick={handleOpen}
            aria-label="Start free brand discovery session"
            className="discovery-trigger"
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "2rem",
              zIndex: 50,
              display: "flex",
              alignItems: "center",
              gap: "0.625rem",
              padding: "0.75rem 1.25rem",
              backgroundColor: "var(--charcoal)",
              border: "1px solid rgba(201,168,76,0.4)",
              color: "var(--cream)",
              cursor: "pointer",
              backdropFilter: "blur(12px)",
              boxShadow:
                "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(201,168,76,0.08)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            {/* Pulse dot */}
            <span
              style={{ position: "relative", display: "flex", width: 10, height: 10 }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  backgroundColor: "var(--gold)",
                  opacity: 0.4,
                  animation: "pulse-ring 2s ease-out infinite",
                }}
              />
              <span
                style={{
                  position: "relative",
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  backgroundColor: "var(--gold)",
                }}
              />
            </span>
            <span
              style={{
                fontSize: "0.6875rem",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                fontWeight: 600,
                color: "var(--cream)",
              }}
            >
              Free Discovery Session
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 24 }}
            transition={{ duration: 0.35, ease }}
            style={{
              position: "fixed",
              bottom: "2rem",
              left: "2rem",
              zIndex: 50,
              width: "min(400px, calc(100vw - 4rem))",
              height: "min(560px, calc(100vh - 6rem))",
              backgroundColor: "var(--charcoal)",
              border: "1px solid rgba(201,168,76,0.2)",
              display: "flex",
              flexDirection: "column",
              boxShadow:
                "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(201,168,76,0.06)",
              overflow: "hidden",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "1rem 1.25rem",
                borderBottom: "1px solid rgba(200,194,180,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: "0.625rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "var(--gold)",
                    fontWeight: 600,
                    marginBottom: "0.2rem",
                  }}
                >
                  Free Session
                </p>
                <p
                  style={{
                    fontSize: "0.875rem",
                    fontWeight: 600,
                    color: "var(--cream)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  Brand Story Discovery
                </p>
              </div>
              <button
                onClick={handleClose}
                aria-label="Close"
                style={{
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "transparent",
                  border: "none",
                  color: "var(--cream-dim)",
                  cursor: "pointer",
                  fontSize: "1.125rem",
                  lineHeight: 1,
                }}
              >
                ×
              </button>
            </div>

            {/* Progress bar */}
            {phase === "chatting" || phase === "email" ? (
              <div
                style={{
                  height: "2px",
                  backgroundColor: "rgba(200,194,180,0.08)",
                  flexShrink: 0,
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    backgroundColor: "var(--gold)",
                    width: `${progressPercent}%`,
                  }}
                  animate={{ width: `${progressPercent}%` }}
                  transition={{ duration: 0.6, ease }}
                />
              </div>
            ) : null}

            {/* Messages area */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "1.25rem",
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
                scrollbarWidth: "none",
              }}
            >
              {phase === "chatting" || phase === "email" ? (
                <>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, ease }}
                      style={{
                        display: "flex",
                        justifyContent:
                          msg.role === "user" ? "flex-end" : "flex-start",
                      }}
                    >
                      <div
                        style={{
                          maxWidth: "85%",
                          padding: "0.75rem 1rem",
                          backgroundColor:
                            msg.role === "user"
                              ? "rgba(201,168,76,0.12)"
                              : "rgba(200,194,180,0.06)",
                          border:
                            msg.role === "user"
                              ? "1px solid rgba(201,168,76,0.25)"
                              : "1px solid rgba(200,194,180,0.1)",
                          fontSize: "0.875rem",
                          lineHeight: 1.6,
                          color:
                            msg.role === "user"
                              ? "var(--cream)"
                              : "var(--cream-dim)",
                          whiteSpace: "pre-wrap",
                        }}
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}

                  {/* Typing indicator */}
                  {loading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      style={{ display: "flex", justifyContent: "flex-start" }}
                    >
                      <div
                        style={{
                          padding: "0.75rem 1rem",
                          backgroundColor: "rgba(200,194,180,0.06)",
                          border: "1px solid rgba(200,194,180,0.1)",
                          display: "flex",
                          gap: "0.3rem",
                          alignItems: "center",
                        }}
                      >
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            style={{
                              width: 5,
                              height: 5,
                              borderRadius: "50%",
                              backgroundColor: "var(--gold)",
                              opacity: 0.6,
                              animation: `typing-dot 1.2s ease-in-out ${i * 0.2}s infinite`,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Email capture */}
                  {phase === "email" && !loading && (
                    <motion.div
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2, ease }}
                      style={{
                        marginTop: "0.5rem",
                        padding: "1.25rem",
                        backgroundColor: "rgba(201,168,76,0.05)",
                        border: "1px solid rgba(201,168,76,0.2)",
                      }}
                    >
                      <p
                        style={{
                          fontSize: "0.6875rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--gold)",
                          fontWeight: 600,
                          marginBottom: "0.75rem",
                        }}
                      >
                        Unlock Your Insights
                      </p>
                      <form onSubmit={handleEmailSubmit}>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="your@email.com"
                          disabled={loading}
                          style={{
                            width: "100%",
                            padding: "0.625rem 0.875rem",
                            backgroundColor: "rgba(200,194,180,0.06)",
                            border: emailError
                              ? "1px solid rgba(220,80,80,0.5)"
                              : "1px solid rgba(200,194,180,0.2)",
                            color: "var(--cream)",
                            fontSize: "0.875rem",
                            outline: "none",
                            marginBottom: "0.625rem",
                            boxSizing: "border-box",
                          }}
                        />
                        {emailError && (
                          <p
                            style={{
                              fontSize: "0.75rem",
                              color: "rgba(220,80,80,0.9)",
                              marginBottom: "0.625rem",
                            }}
                          >
                            {emailError}
                          </p>
                        )}
                        <button
                          type="submit"
                          disabled={loading}
                          style={{
                            width: "100%",
                            padding: "0.6875rem",
                            backgroundColor: "var(--gold)",
                            color: "var(--black)",
                            border: "none",
                            fontSize: "0.6875rem",
                            letterSpacing: "0.18em",
                            textTransform: "uppercase",
                            fontWeight: 700,
                            cursor: loading ? "not-allowed" : "pointer",
                            opacity: loading ? 0.7 : 1,
                          }}
                        >
                          {loading ? "Generating…" : "Get My Insights →"}
                        </button>
                      </form>
                    </motion.div>
                  )}
                </>
              ) : phase === "results" ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
                >
                  <p
                    style={{
                      fontSize: "0.6875rem",
                      letterSpacing: "0.22em",
                      textTransform: "uppercase",
                      color: "var(--gold)",
                      fontWeight: 600,
                    }}
                  >
                    Your Brand Story Insights
                  </p>
                  <div
                    style={{
                      fontSize: "0.875rem",
                      lineHeight: 1.75,
                      color: "var(--cream-dim)",
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {insights}
                  </div>
                  <div
                    style={{
                      height: "1px",
                      backgroundColor: "rgba(201,168,76,0.15)",
                      margin: "0.5rem 0",
                    }}
                  />
                  <a
                    href="https://calendar.app.google/qeycC86WguwLnjt1A"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "block",
                      padding: "0.75rem",
                      backgroundColor: "var(--gold)",
                      color: "var(--black)",
                      fontSize: "0.6875rem",
                      letterSpacing: "0.18em",
                      textTransform: "uppercase",
                      fontWeight: 700,
                      textDecoration: "none",
                      textAlign: "center",
                    }}
                  >
                    Book a Strategy Call →
                  </a>
                </motion.div>
              ) : null}

              <div ref={messagesEndRef} />
            </div>

            {/* Input area */}
            {phase === "chatting" && !sessionComplete && (
              <div
                style={{
                  padding: "0.875rem 1.25rem",
                  borderTop: "1px solid rgba(200,194,180,0.08)",
                  display: "flex",
                  gap: "0.625rem",
                  flexShrink: 0,
                }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type your answer…"
                  disabled={loading}
                  style={{
                    flex: 1,
                    padding: "0.625rem 0.875rem",
                    backgroundColor: "rgba(200,194,180,0.06)",
                    border: "1px solid rgba(200,194,180,0.15)",
                    color: "var(--cream)",
                    fontSize: "0.875rem",
                    outline: "none",
                  }}
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  aria-label="Send"
                  style={{
                    width: 40,
                    height: 40,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor:
                      loading || !input.trim()
                        ? "rgba(201,168,76,0.15)"
                        : "var(--gold)",
                    border: "none",
                    color:
                      loading || !input.trim() ? "var(--gold)" : "var(--black)",
                    cursor:
                      loading || !input.trim() ? "not-allowed" : "pointer",
                    flexShrink: 0,
                    transition: "background-color 0.2s ease",
                  }}
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </div>
            )}

            {/* Footer label */}
            <div
              style={{
                padding: "0.5rem 1.25rem",
                borderTop: "1px solid rgba(200,194,180,0.05)",
                flexShrink: 0,
              }}
            >
              <p
                style={{
                  fontSize: "0.625rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(200,194,180,0.25)",
                  textAlign: "center",
                }}
              >
                Powered by Corex Creative
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Keyframe animations */}
      <style>{`
        @keyframes pulse-ring {
          0% { transform: scale(1); opacity: 0.4; }
          70% { transform: scale(2.2); opacity: 0; }
          100% { transform: scale(2.2); opacity: 0; }
        }
        @keyframes typing-dot {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
        .discovery-trigger:hover {
          box-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 20px rgba(201,168,76,0.35), 0 0 40px rgba(201,168,76,0.15) !important;
          border-color: rgba(201,168,76,0.7) !important;
        }
      `}</style>
    </>
  );
}
