import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-8 text-center">
      <p className="font-mono text-[11px] tracking-[0.1em] uppercase text-muted mb-4">
        Página não encontrada
      </p>
      <h1 className="text-8xl font-light tracking-tight text-foreground mb-4 leading-none">
        404
      </h1>
      <p className="text-[14px] text-muted leading-relaxed mb-8 max-w-sm">
        A página que você está procurando não existe ou foi removida.
      </p>
      <Link
        href="/"
        className="font-mono text-[12px] text-[#0d0d0d] bg-accent rounded-lg px-5 py-2.5 hover:opacity-85 transition-opacity"
      >
        Voltar para a home →
      </Link>
    </div>
  );
}
