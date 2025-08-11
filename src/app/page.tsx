"use client";

export default function Home() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 animate-fadeInUp">
        🚧 Portfólio em Desenvolvimento 🚧
      </h1>
      <p className="text-lg md:text-xl max-w-lg leading-relaxed animate-fadeInUp animation-delay-200">
        Estou trabalhando para criar um portfólio incrível.
        <br />
        Em breve, você poderá conferir meus projetos e habilidades aqui.
        <br />
        Obrigado pela paciência!
      </p>

      <style jsx>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 1s ease forwards;
        }
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
      `}</style>
    </div>
  );
}
