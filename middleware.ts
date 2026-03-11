import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

// Route-specific limits. Add entries here as you create API routes.
// For dynamic routes like /api/likes/[slug], match on the prefix.
const ROUTE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  "/api/contact": { limit: 5, windowMs: 60_000 },       // 5 req/min
  "/api/newsletter": { limit: 3, windowMs: 60_000 },    // 3 req/min
  "/api/reactions": { limit: 30, windowMs: 60_000 },    // 30 req/min
  "/api/views": { limit: 60, windowMs: 60_000 },        // 60 req/min (page loads)
  "/api/likes": { limit: 30, windowMs: 60_000 },        // legacy
};

const DEFAULT_LIMIT = { limit: 30, windowMs: 60_000 };

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

/** Find the best matching route config by prefix */
function findRouteConfig(pathname: string) {
  // Try exact match first, then prefix match
  if (ROUTE_LIMITS[pathname]) return ROUTE_LIMITS[pathname];
  for (const [prefix, config] of Object.entries(ROUTE_LIMITS)) {
    if (pathname.startsWith(prefix + "/") || pathname === prefix) return config;
  }
  return DEFAULT_LIMIT;
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const config = findRouteConfig(pathname);
  const ip = getIp(req);
  const key = `${pathname}:${ip}`;

  const result = checkRateLimit(key, config);

  const headers = {
    "X-RateLimit-Limit": String(config.limit),
    "X-RateLimit-Remaining": String(result.remaining),
    "X-RateLimit-Reset": String(result.resetAt),
  };

  if (!result.allowed) {
    return NextResponse.json(
      { error: "Too many requests. Please try again later." },
      { status: 429, headers }
    );
  }

  const res = NextResponse.next();
  Object.entries(headers).forEach(([k, v]) => res.headers.set(k, v));
  return res;
}

export const config = {
  matcher: "/api/:path*",
};
