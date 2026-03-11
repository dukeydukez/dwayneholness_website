import { NextRequest, NextResponse } from "next/server";
import { redis } from "@/lib/redis";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const BEEHIIV_API_KEY = process.env.BEEHIIV_API_KEY;
const BEEHIIV_PUBLICATION_ID = process.env.BEEHIIV_PUBLICATION_ID;

/** Sync subscriber to Beehiiv (fire-and-forget, non-blocking) */
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
        send_welcome_email: true,
        utm_source: "dwayneholness.com",
      }),
    }
  );

  if (!res.ok) {
    console.error("Beehiiv sync failed:", res.status, await res.text());
  }
}

/** POST /api/newsletter — subscribe an email */
export async function POST(req: NextRequest) {
  let body: { email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
  }

  // Store in Redis as backup + sync to Beehiiv for sending
  await Promise.all([
    redis.sadd("newsletter:subscribers", email),
    syncToBeehiiv(email),
  ]);

  return NextResponse.json({ success: true });
}

/** GET /api/newsletter — return subscriber count */
export async function GET() {
  const count = await redis.scard("newsletter:subscribers");
  return NextResponse.json({ count });
}
