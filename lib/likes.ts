/** Initial like counts per article slug — these are the seed values shown on first visit. */
export const INITIAL_LIKES: Record<string, number> = {
  "10-frameworks-every-creative-needs-to-build-something-real": 9,
  "accountability-is-not-cruelty": 5,
  "attention-is-not-infrastructure": 10,
  "authority-without-audience": 6,
  "cinematic-positioning": 7,
  "documentary-mindset": 8,
  "founder-led-content": 7,
  "i-learned-to-run-a-business-by-leading-a-gang": 8,
  "if-growth-feels-hard-something-is-unclear": 6,
  "producers-vs-consumers-the-real-ai-divide": 9,
  "why-most-brand-films-fail": 7,
  "your-path-is-not-a-liability": 5,
};

export function getInitialLikes(slug: string): number {
  return INITIAL_LIKES[slug] ?? 6;
}
