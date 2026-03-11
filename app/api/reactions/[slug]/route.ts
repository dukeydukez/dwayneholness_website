import { NextRequest, NextResponse } from "next/server";
import { redis, reactionKey, likesKey, REACTION_TYPES } from "@/lib/redis";
import type { ReactionType } from "@/lib/redis";
import { INITIAL_LIKES } from "@/lib/likes";

const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** GET /api/reactions/[slug] — return all reaction counts */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SAFE_SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const counts: Record<string, number> = {};
  await Promise.all(
    REACTION_TYPES.map(async (type) => {
      const val = await redis.get<number>(reactionKey(slug, type));
      counts[type] = val ?? 0;
    })
  );

  // Migrate legacy likes → heart if heart is 0 and old likes key exists
  if (counts.heart === 0) {
    const legacyLikes = await redis.get<number>(likesKey(slug));
    if (legacyLikes !== null && legacyLikes > 0) {
      await redis.set(reactionKey(slug, "heart"), legacyLikes);
      counts.heart = legacyLikes;
    } else if (INITIAL_LIKES[slug]) {
      await redis.set(reactionKey(slug, "heart"), INITIAL_LIKES[slug]);
      counts.heart = INITIAL_LIKES[slug];
    }
  }

  // Seed non-heart reactions to 1 if they haven't been set yet
  const SEED_TYPES: ReactionType[] = ["fire", "lightbulb", "accurate"];
  for (const t of SEED_TYPES) {
    if (counts[t] === 0) {
      const exists = await redis.exists(reactionKey(slug, t));
      if (!exists) {
        await redis.set(reactionKey(slug, t), 1);
        counts[t] = 1;
      }
    }
  }

  return NextResponse.json({ slug, reactions: counts });
}

/** POST /api/reactions/[slug] — increment a reaction type */
export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SAFE_SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  let body: { type?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const type = body.type as ReactionType;
  if (!REACTION_TYPES.includes(type)) {
    return NextResponse.json(
      { error: `Invalid reaction type. Must be one of: ${REACTION_TYPES.join(", ")}` },
      { status: 400 }
    );
  }

  // Migrate legacy likes on first heart reaction if needed
  const key = reactionKey(slug, type);
  if (type === "heart") {
    const exists = await redis.exists(key);
    if (!exists) {
      const legacy = await redis.get<number>(likesKey(slug));
      const seed = legacy ?? INITIAL_LIKES[slug] ?? 0;
      if (seed > 0) await redis.set(key, seed);
    }
  }

  const count = await redis.incr(key);
  return NextResponse.json({ slug, type, count });
}
