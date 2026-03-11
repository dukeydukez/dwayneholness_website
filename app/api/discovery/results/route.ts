import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";
import { redis } from "@/lib/redis";

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type MessageParam = {
  role: "user" | "assistant";
  content: string;
};

async function generateInsights(messages: MessageParam[]): Promise<string> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5",
    max_tokens: 800,
    system: `You are Dwayne Holness — filmmaker, creative director, and brand strategist at Corex Creative. You've just completed a discovery session with someone. Based on their answers, write a personalized brand story insights report.

Structure your response exactly like this:

[Opening — 2 sentences that name the specific thread or tension you noticed across their answers. Be specific, not generic.]

Your 3 Brand Story Insights:

1. [Title in 3-5 words] — [1-2 sentences of specific insight tied to what they actually said]

2. [Title in 3-5 words] — [1-2 sentences of specific insight tied to what they actually said]

3. [Title in 3-5 words] — [1-2 sentences of specific insight tied to what they actually said]

[Closing — 2 sentences. Name one clear next step they could take, and end with an invitation to book a strategy session at dwayneholness.com]

Tone: direct, warm, cinematic. Like a trusted advisor who sees them clearly. No corporate language. No generic advice. Make it feel written specifically for them.`,
    messages: [
      ...messages,
      {
        role: "user",
        content:
          "Based on everything I've shared, please write my personalized brand story insights.",
      },
    ],
  });

  return response.content.find((b) => b.type === "text")?.text ?? "";
}

async function syncToBeehiiv(email: string): Promise<void> {
  if (!BEEHIIV_API_KEY || !BEEHIIV_PUBLICATION_ID) return;

  const res = await fetch(
    `https://api.beehiiv.com/v2/publications/${BEEHIIV_PUBLICATION_ID}/subscriptions`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${BEEHIIV_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        reactivate_existing: false,
        send_welcome_email: false,
        utm_source: "discovery-session",
      }),
    }
  );

  if (!res.ok) {
    console.error("Beehiiv sync failed:", res.status);
  }
}

export async function POST(req: NextRequest) {
  let body: { email?: string; messages?: MessageParam[] };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  const messages = body.messages ?? [];

  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json(
      { error: "Invalid email address" },
      { status: 400 }
    );
  }

  const insights = await generateInsights(messages);

  // Store lead + sync to Beehiiv in parallel (non-blocking for response)
  Promise.all([
    redis.sadd(
      "discovery:leads",
      JSON.stringify({ email, timestamp: Date.now() })
    ),
    syncToBeehiiv(email),
  ]).catch((err) => console.error("Lead storage error:", err));

  return NextResponse.json({ success: true, insights });
}
