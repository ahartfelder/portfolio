import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV === "development";

// Em desenvolvimento, o Turbopack usa eval() internamente para Server Components.
// 'unsafe-eval' é necessário apenas nesse contexto — nunca em produção.
const scriptSrc = isDev
  ? "script-src 'self' 'unsafe-inline' 'unsafe-eval'"
  : "script-src 'self' 'unsafe-inline'";

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          // ── Impede clickjacking
          { key: "X-Frame-Options", value: "DENY" },

          // ── Impede MIME sniffing
          { key: "X-Content-Type-Options", value: "nosniff" },

          // ── Controla o header Referer
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },

          // ── Força HTTPS por 1 ano
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },

          // ── Restringe APIs sensíveis do browser
          {
            key: "Permissions-Policy",
            value:
              "camera=(), microphone=(), geolocation=(), interest-cohort=()",
          },

          // ── Content Security Policy
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              scriptSrc,
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com",
              "img-src 'self' data:",
              "connect-src 'self' https://api.resend.com",
              "frame-ancestors 'none'",
              "object-src 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
