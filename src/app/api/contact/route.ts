import { Resend } from "resend";
import { NextResponse } from "next/server";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { z } from "zod";
import { env } from "@/env";

// ── Resend ────────────────────────────────────────────────
const resend = new Resend(env.RESEND_API_KEY);

// ── Rate limiter: máx. 3 envios por IP a cada 60 minutos ──
const ratelimit = new Ratelimit({
  redis: new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  }),
  limiter: Ratelimit.slidingWindow(3, "60 m"),
  analytics: true,
});

// ── Schema de validação ───────────────────────────────────
const contactSchema = z.object({
  name: z.string().min(2, "Nome muito curto").max(100, "Nome muito longo"),
  email: z.email("E-mail inválido"),
  subject: z.string().max(200, "Assunto muito longo").optional(),
  message: z
    .string()
    .min(10, "Mensagem muito curta")
    .max(2000, "Mensagem muito longa"),
  honeypot: z.string().max(0).optional(),
});

export async function POST(req: Request) {
  try {
    // ── 1. Rate limiting por IP ───────────────────────────
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
      req.headers.get("x-real-ip") ??
      "anonymous";

    const { success, remaining } = await ratelimit.limit(ip);

    if (!success) {
      return NextResponse.json(
        { error: "Muitas tentativas. Tente novamente em 1 hora." },
        {
          status: 429,
          headers: { "Retry-After": "3600", "X-RateLimit-Remaining": "0" },
        },
      );
    }

    // ── 2. Parse e validação com Zod ──────────────────────
    const body = await req.json();
    const parsed = contactSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.issues[0]?.message ?? "Dados inválidos." },
        { status: 400 },
      );
    }

    const { name, email, subject, message, honeypot } = parsed.data;

    // ── 3. Honeypot (segunda camada, server-side) ─────────
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    // ── 4. Envio do e-mail ────────────────────────────────
    await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>", // troque pelo seu domínio verificado
      to: env.PERSONAL_EMAIL,
      subject: `[Portfólio] ${subject || "Novo contato"} — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    });

    return NextResponse.json(
      { ok: true },
      { headers: { "X-RateLimit-Remaining": String(remaining) } },
    );
  } catch (err) {
    console.error("[contact] Erro ao enviar e-mail:", err);
    return NextResponse.json(
      { error: "Erro interno ao enviar a mensagem." },
      { status: 500 },
    );
  }
}
