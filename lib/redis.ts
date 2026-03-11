import { Redis } from "@upstash/redis";

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error(
    "Missing UPSTASH_REDIS_REST_URL or UPSTASH_REDIS_REST_TOKEN environment variables"
  );
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

/** Reaction types available on articles */
export const REACTION_TYPES = ["heart", "fire", "lightbulb", "accurate"] as const;
export type ReactionType = (typeof REACTION_TYPES)[number];

/** Redis key for a specific reaction on an article */
export function reactionKey(slug: string, type: ReactionType): string {
  return `reactions:${slug}:${type}`;
}

/** Redis key for article view counts */
export function viewsKey(slug: string): string {
  return `views:${slug}`;
}

/** Legacy likes key (for migration) */
export function likesKey(slug: string): string {
  return `likes:${slug}`;
}
