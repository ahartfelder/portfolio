import Link from "next/link";

interface HeaderProps {
  top: number;
  height: number;
}

export default function Header({ top, height }: HeaderProps) {
  return (
    <header
      className="fixed left-0 w-full z-50 transition-all duration-300"
      style={{ top, height }}
    >
      {/* backdrop */}
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md border-b border-border" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 h-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group select-none">
          {/* Icon mark */}
          <div className="w-9 h-9 rounded-lg bg-accent flex items-center justify-center flex-shrink-0 transition-transform duration-200 group-hover:scale-105">
            <span className="font-mono text-[14px] font-bold text-[#0d0d0d] leading-none tracking-tight">
              ah
            </span>
          </div>
          {/* Wordmark */}
          <div className="flex flex-col leading-none gap-0.5">
            <span className="font-mono text-[15px] font-medium text-foreground tracking-tight">
              ahartfelder
            </span>
            <span className="font-mono text-[11px] text-muted tracking-[0.06em]">
              full-stack dev
            </span>
          </div>
        </Link>

        {/* Status badge */}
        <div className="flex items-center gap-2.5 font-mono text-[12px] text-muted bg-surface border border-border rounded-full px-4 py-2">
          <span className="w-2 h-2 rounded-full bg-amber-400 flex-shrink-0 shadow-[0_0_6px_rgba(251,191,36,0.7)] animate-pulse" />
          <span className="hidden sm:inline">portfólio em construção</span>
          <span className="sm:hidden">em construção</span>
        </div>
      </div>
    </header>
  );
}
