import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { name, email, subject, message, honeypot } = await req.json();

    // Honeypot: rejeita silenciosamente se preenchido
    if (honeypot) {
      return NextResponse.json({ ok: true });
    }

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Campos obrigatórios faltando." },
        { status: 400 },
      );
    }

    await resend.emails.send({
      from: "Portfólio <onboarding@resend.dev>",
      to: `${process.env.PERSONAL_EMAIL}`,
      subject: `[Portfólio] ${subject || "Novo contato"} — ${name}`,
      text: `Nome: ${name}\nE-mail: ${email}\n\nMensagem:\n${message}`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] Erro ao enviar e-mail:", err);
    return NextResponse.json(
      { error: "Erro interno ao enviar a mensagem." },
      { status: 500 },
    );
  }
}
