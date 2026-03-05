import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-border mt-auto">
      <div className="max-w-5xl mx-auto px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
        <p className="font-mono text-[12px] text-faint">
          &copy; {new Date().getFullYear()} ahartfelder
        </p>

        <div className="flex items-center gap-5">
          <a
            href="https://github.com/ahartfelder"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="flex items-center gap-2 font-mono text-[12px] text-muted hover:text-foreground transition-colors duration-150"
          >
            <FaGithub className="w-4 h-4" />
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/ahartfelder"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="flex items-center gap-2 font-mono text-[12px] text-muted hover:text-foreground transition-colors duration-150"
          >
            <FaLinkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href="mailto:ahartfelder@gmail.com"
            aria-label="E-mail"
            className="flex items-center gap-2 font-mono text-[12px] text-muted hover:text-foreground transition-colors duration-150"
          >
            <MdEmail className="w-4 h-4" />
            E-mail
          </a>
        </div>
      </div>
    </footer>
  );
}
