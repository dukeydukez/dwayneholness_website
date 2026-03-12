import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent MIME-type sniffing
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Block page from loading in frames (clickjacking protection)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop sending referrer info to cross-origin domains
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Restrict browser features
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
  // Content Security Policy
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      // Next.js requires unsafe-inline for its inline scripts/styles
      "script-src 'self' 'unsafe-inline' https://calendar.google.com https://plausible.io",
      "style-src 'self' 'unsafe-inline'",
      // Allow images from self, data URIs (Next.js), and https sources (article images)
      "img-src 'self' data: https:",
      // iframes: YouTube, Vimeo, Google Calendar scheduling
      "frame-src https://www.youtube.com https://player.vimeo.com https://calendar.google.com",
      "font-src 'self'",
      "connect-src 'self' https://plausible.io",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
