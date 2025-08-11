import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 py-6 px-6">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <p className="text-sm">
          &copy; {new Date().getFullYear()} ahartfelder. Todos os direitos
          reservados.
        </p>
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a
            href="https://github.com/ahartfelder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition flex items-center"
            aria-label="GitHub"
          >
            <FaGithub className="w-6 h-6 mr-1" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ahartfelder"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-900 dark:hover:text-white transition flex items-center"
            aria-label="LinkedIn"
          >
            <FaLinkedin className="w-6 h-6 mr-1" />
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
}
