import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-grow flex flex-col items-center justify-center p-4 text-center">
      <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-gray-100">
        404
      </h1>
      <p className="text-xl mb-8 text-gray-700 dark:text-gray-300 max-w-xl">
        Ops! A página que você está procurando não foi encontrada.
      </p>
      <Link
        href="/"
        className="inline-block px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
      >
        Voltar para a Home
      </Link>
    </div>
  );
}
