import { NextRequest, NextResponse } from "next/server";
import { redis, likesKey } from "@/lib/redis";
import { INITIAL_LIKES } from "@/lib/likes";

const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** GET /api/likes/[slug] — return current like count */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!SAFE_SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const key = likesKey(slug);
  let count = await redis.get<number>(key);

  // Seed from initial likes if this slug has never been stored
  if (count === null) {
    count = INITIAL_LIKES[slug] ?? 0;
    await redis.set(key, count);
  }

  return NextResponse.json({ slug, count });
}

/** POST /api/likes/[slug] — increment like count by 1, return new count */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;

  if (!SAFE_SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const key = likesKey(slug);
  const exists = await redis.exists(key);

  // Seed first if this slug was never stored
  if (!exists) {
    const seed = INITIAL_LIKES[slug] ?? 0;
    await redis.set(key, seed);
  }

  const count = await redis.incr(key);
  return NextResponse.json({ slug, count });
}
