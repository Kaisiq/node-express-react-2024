import { Link } from "react-router-dom";
import { BookMarkedIcon } from "./Icons";

export function Footer() {
  return (
    <footer className="flex w-full shrink-0 flex-col items-center gap-2 border-t px-4 py-4 sm:flex-row sm:py-6 md:px-6">
      <Link
        to="/"
        className="flex items-center gap-2"
      >
        <BookMarkedIcon className="h-6 w-6" />
        <span className="text-sm font-semibold tracking-wide">Две/Трети</span>
      </Link>
      <p className="text-xs text-gray-500 dark:text-gray-400">Още нямаме адрес, хаха</p>
      <nav className="flex gap-4 sm:ml-auto sm:gap-6">
        <Link
          className="text-xs underline-offset-4 hover:underline"
          to="/aboutus"
        >
          About Us
        </Link>
        <Link
          className="text-xs underline-offset-4 hover:underline"
          to="/contact"
        >
          Contact
        </Link>
        <Link
          className="text-xs underline-offset-4 hover:underline"
          to="/faq"
        >
          FAQs
        </Link>
      </nav>
    </footer>
  );
}
