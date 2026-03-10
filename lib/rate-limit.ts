/**
 * Sliding-window in-memory rate limiter.
 *
 * Works per-serverless-instance (suitable for low-traffic sites).
 * To scale across instances, swap the store for Upstash Redis:
 * https://upstash.com/docs/redis/sdks/ratelimit-ts/overview
 */

interface RateLimitEntry {
  count: number;
  windowStart: number;
}

// keyed by `${route}:${ip}`
const store = new Map<string, RateLimitEntry>();

export interface RateLimitConfig {
  /** Max requests allowed in the window */
  limit: number;
  /** Window duration in milliseconds */
  windowMs: number;
}

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetAt: number; // Unix ms
}

export function checkRateLimit(
  key: string,
  { limit, windowMs }: RateLimitConfig
): RateLimitResult {
  const now = Date.now();
  const entry = store.get(key);

  if (!entry || now - entry.windowStart >= windowMs) {
    store.set(key, { count: 1, windowStart: now });
    return { allowed: true, remaining: limit - 1, resetAt: now + windowMs };
  }

  if (entry.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      resetAt: entry.windowStart + windowMs,
    };
  }

  entry.count += 1;
  return {
    allowed: true,
    remaining: limit - entry.count,
    resetAt: entry.windowStart + windowMs,
  };
}

/** Prune expired entries to prevent unbounded memory growth */
export function pruneStore(windowMs: number): void {
  const now = Date.now();
  for (const [key, entry] of store.entries()) {
    if (now - entry.windowStart >= windowMs) {
      store.delete(key);
    }
  }
}
