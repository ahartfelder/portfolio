import type { NextConfig } from "next";

// Valida variáveis de ambiente na build — lança erro antes de subir se faltar alguma
import "./src/env";

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
              "script-src 'self' 'unsafe-inline'",
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
