import { NextRequest, NextResponse } from "next/server";
import { redis, viewsKey } from "@/lib/redis";

const SAFE_SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/** GET /api/views/[slug] — return current view count */
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SAFE_SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const count = (await redis.get<number>(viewsKey(slug))) ?? 0;
  return NextResponse.json({ slug, views: count });
}

/** POST /api/views/[slug] — increment view count by 1 */
export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  if (!SAFE_SLUG_RE.test(slug)) {
    return NextResponse.json({ error: "Invalid slug" }, { status: 400 });
  }

  const views = await redis.incr(viewsKey(slug));
  return NextResponse.json({ slug, views });
}
