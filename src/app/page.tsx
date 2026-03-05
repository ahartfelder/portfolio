"use client";

import { useState } from "react";

const SKILLS = [
  {
    group: "Web & Full-Stack",
    items: [
      "Next.js",
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "REST APIs",
    ],
  },
  {
    group: "Banco de dados & Infra",
    items: ["PostgreSQL", "Redis", "Docker", "Vercel", "Git / GitHub"],
  },
  {
    group: "WordPress",
    items: ["WordPress", "WooCommerce", "CartFlows"],
  },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function Home() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const subject = (data.get("subject") as string)?.trim();
    const message = (data.get("message") as string)?.trim();
    const honeypot = (data.get("website") as string)?.trim();

    // Honeypot: bots preenchem, humanos não
    if (honeypot) return;

    const newErrors: Record<string, boolean> = {};
    if (!name) newErrors.name = true;
    if (!email) newErrors.email = true;
    if (!message) newErrors.message = true;

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setFormState("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, subject, message, honeypot }),
      });

      if (!res.ok) throw new Error("Falha no envio");

      setFormState("success");
      form.reset();
    } catch {
      setFormState("error");
    }
  }

  function clearError(field: string) {
    setErrors((prev) => ({ ...prev, [field]: false }));
  }

  return (
    <div className="flex-grow flex flex-col px-4 sm:px-6 lg:px-8 py-16 max-w-5xl mx-auto w-full">
      {/* ── Grid layout ── */}
      <div className="flex-grow grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">
        {/* ── LEFT ── */}
        <div className="animate-fade-up" style={{ animationDelay: "0.05s" }}>
          <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-accent mb-5 opacity-80">
            Full-Stack Developer
          </p>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light tracking-tight leading-[1.08] text-foreground mb-5">
            Em breve, <strong className="font-medium">algo melhor.</strong>
          </h1>

          <p className="text-sm text-muted leading-relaxed mb-12 max-w-sm">
            Estou construindo meu portfólio. Enquanto isso, conheça meu stack e
            entre em contato se tiver um projeto em mente.
          </p>

          {/* Skills */}
          <div className="flex flex-col gap-7">
            {SKILLS.map((group) => (
              <div key={group.group}>
                <p className="font-mono text-[10px] tracking-[0.1em] uppercase text-muted mb-2.5">
                  {group.group}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="font-mono text-[11px] text-ink bg-surface border border-border2 rounded-md px-2.5 py-1 tracking-wide transition-colors duration-150 hover:border-accent/30 hover:text-accent hover:bg-accent/5 cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Contact Form ── */}
        <div className="animate-fade-up" style={{ animationDelay: "0.15s" }}>
          <div className="bg-card border border-border rounded-xl p-7 sm:p-8">
            <p className="text-[15px] font-medium tracking-tight text-foreground mb-1.5">
              Vamos conversar
            </p>
            <p className="text-[13px] text-muted leading-relaxed mb-7">
              Tem um projeto ou quer trocar uma ideia? Me manda uma mensagem.
            </p>

            {formState === "success" ? (
              <div className="rounded-lg border border-green-500/20 bg-green-500/8 px-4 py-3.5 font-mono text-[12px] text-green-400 leading-relaxed">
                ✓ Mensagem enviada com sucesso! Responderei em breve.
              </div>
            ) : formState === "error" ? (
              <div className="flex flex-col gap-4">
                <div className="rounded-lg border border-red-400/20 bg-red-400/5 px-4 py-3.5 font-mono text-[12px] text-red-400 leading-relaxed">
                  ✕ Não foi possível enviar a mensagem. Tente novamente ou entre
                  em contato pelo{" "}
                  <a
                    href="mailto:contato@ahartfelder.com"
                    className="underline underline-offset-2 hover:text-red-300 transition-colors"
                  >
                    e-mail
                  </a>
                  .
                </div>
                <button
                  onClick={() => setFormState("idle")}
                  className="font-mono text-[12px] text-muted hover:text-foreground transition-colors text-left cursor-pointer"
                >
                  ← Tentar novamente
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="flex flex-col gap-3.5"
              >
                {/* Name + Email */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="name"
                      className="font-mono text-[10px] tracking-[0.08em] uppercase text-muted"
                    >
                      Nome
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Seu nome"
                      onChange={() => clearError("name")}
                      className={`bg-surface text-foreground text-[14px] rounded-lg px-3 py-2.5 outline-none border transition-all placeholder:text-faint
                        ${
                          errors.name
                            ? "border-red-400/50 ring-2 ring-red-400/10"
                            : "border-border2 focus:border-accent/40 focus:ring-2 focus:ring-accent/8"
                        }`}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label
                      htmlFor="email"
                      className="font-mono text-[10px] tracking-[0.08em] uppercase text-muted"
                    >
                      E-mail
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="seu@email.com"
                      onChange={() => clearError("email")}
                      className={`bg-surface text-foreground text-[14px] rounded-lg px-3 py-2.5 outline-none border transition-all placeholder:text-faint
                        ${
                          errors.email
                            ? "border-red-400/50 ring-2 ring-red-400/10"
                            : "border-border2 focus:border-accent/40 focus:ring-2 focus:ring-accent/8"
                        }`}
                    />
                  </div>
                </div>

                {/* Subject */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="subject"
                    className="font-mono text-[10px] tracking-[0.08em] uppercase text-muted"
                  >
                    Assunto
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    className="bg-surface text-foreground text-[14px] rounded-lg px-3 py-2.5 outline-none border border-border2 focus:border-accent/40 focus:ring-2 focus:ring-accent/8 transition-all cursor-pointer appearance-none"
                  >
                    <option value="">Selecione...</option>
                    <option value="freelance">Projeto freelance</option>
                    <option value="job">Oportunidade de emprego</option>
                    <option value="collab">Colaboração / open source</option>
                    <option value="other">Outro</option>
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="font-mono text-[10px] tracking-[0.08em] uppercase text-muted"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    placeholder="Descreva seu projeto ou dúvida..."
                    onChange={() => clearError("message")}
                    className={`bg-surface text-foreground text-[14px] rounded-lg px-3 py-2.5 outline-none border resize-y transition-all placeholder:text-faint leading-relaxed
                      ${
                        errors.message
                          ? "border-red-400/50 ring-2 ring-red-400/10"
                          : "border-border2 focus:border-accent/40 focus:ring-2 focus:ring-accent/8"
                      }`}
                  />
                </div>

                {/* Honeypot — visível apenas para bots */}
                <input
                  type="text"
                  name="website"
                  autoComplete="off"
                  tabIndex={-1}
                  aria-hidden="true"
                  className="hidden"
                />

                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className="mt-1 bg-accent text-[#0d0d0d] text-[13px] font-medium rounded-lg px-6 py-3 transition-all hover:opacity-85 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
                >
                  {formState === "loading"
                    ? "Enviando..."
                    : "Enviar mensagem →"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* fade-up animation */}
      <style jsx global>{`
        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(14px);
          }
          to {
            opacity: 1;
            transform: none;
          }
        }
        .animate-fade-up {
          opacity: 0;
          animation: fadeUp 0.55s ease forwards;
        }
      `}</style>
    </div>
  );
}
