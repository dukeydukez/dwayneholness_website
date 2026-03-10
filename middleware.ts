import { NextRequest, NextResponse } from "next/server";
import { checkRateLimit } from "@/lib/rate-limit";

// Route-specific limits. Add entries here as you create API routes.
const ROUTE_LIMITS: Record<string, { limit: number; windowMs: number }> = {
  "/api/contact": { limit: 5, windowMs: 60_000 },      // 5 req/min
  "/api/newsletter": { limit: 3, windowMs: 60_000 },   // 3 req/min
};

const DEFAULT_LIMIT = { limit: 30, windowMs: 60_000 };  // 30 req/min fallback

function getIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    "unknown"
  );
}

export function middleware(req: NextRequest): NextResponse {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  const config = ROUTE_LIMITS[pathname] ?? DEFAULT_LIMIT;
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
