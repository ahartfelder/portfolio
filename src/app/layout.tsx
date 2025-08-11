import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Projeto de Portfólio",
  description: "Seja bem-vindo ao projeto de portfólio do AHartfelder!",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const isPreview =
    process.env.VERCEL_ENV === "preview" ||
    process.env.NODE_ENV === "development";

  const bannerHeight = 40;
  const headerHeight = 60;
  const totalHeight = isPreview ? bannerHeight + headerHeight : headerHeight;

  return (
    <html lang="pt-BR">
      <body className="min-h-screen flex flex-col">
        {isPreview && (
          <div
            className="fixed top-0 left-0 w-full bg-amber-400 text-gray-800 text-center py-2 font-bold z-50"
            style={{ height: bannerHeight }}
          >
            Ambiente de Desenvolvimento
          </div>
        )}

        <Header top={isPreview ? bannerHeight : 0} height={headerHeight} />

        <main
          className="flex-grow flex flex-col container mx-auto"
          style={{ paddingTop: totalHeight }}
        >
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
