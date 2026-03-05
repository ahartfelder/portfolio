import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ahartfelder — Desenvolvedor Full-Stack",
  description:
    "Desenvolvedor Full-Stack especializado em Next.js, Node.js, TypeScript e PostgreSQL.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development";

  const bannerHeight = 36;
  const headerHeight = 72;
  const totalHeight = isPreview ? bannerHeight + headerHeight : headerHeight;

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        {isPreview && (
          <div
            className="fixed top-0 left-0 w-full bg-amber-400 text-gray-900 text-center text-sm font-semibold z-50 flex items-center justify-center"
            style={{ height: bannerHeight }}
          >
            Ambiente de Desenvolvimento
          </div>
        )}

        <Header top={isPreview ? bannerHeight : 0} height={headerHeight} />

        <main
          className="relative z-10 flex-grow flex flex-col container mx-auto"
          style={{ paddingTop: totalHeight }}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
