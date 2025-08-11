import Link from "next/link";

interface HeaderProps {
  top: number;
  height: number;
}

export default function Header({ top, height }: HeaderProps) {
  return (
    <header
      className="fixed left-0 w-full bg-white/90 backdrop-blur-md shadow-md z-50 transition-all duration-300"
      style={{ top, height }}
    >
      <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-center md:justify-between">
        <Link
          href="/"
          className="text-xl font-bold text-gray-900 select-none cursor-pointer"
        >
          ahartfelder
        </Link>
      </div>
    </header>
  );
}
