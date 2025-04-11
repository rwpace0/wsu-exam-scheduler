import { Link } from "react-router-dom";
import { Home, Search, BookOpen, Calendar } from "lucide-react";
import wsulogo from "../assets/wsulogo.png";

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-10 w-full bg-transparent px-6 py-4 backdrop-blur-sm">
      {/* Full width navigation layout */}
      <div className="flex w-full items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img
              src={wsulogo}
              className="flex h-12 w-12 items-center justify-center"
            />
          </Link>
        </div>

        {/* Home */}
        <div className="group relative">
          <Link
            to="/"
            className="flex flex-col items-center justify-center p-3 text-white hover:text-gray-200"
          >
            <Home className="h-8 w-8 transition-opacity group-hover:opacity-0" />
            <span className="absolute text-lg opacity-0 transition-opacity group-hover:opacity-100">
              Home
            </span>
          </Link>
        </div>

        {/* Search */}
        <div className="group relative">
          <Link
            to="/search"
            className="flex flex-col items-center justify-center p-3 text-white hover:text-gray-200"
          >
            <Search className="h-8 w-8 transition-opacity group-hover:opacity-0" />
            <span className="absolute text-lg opacity-0 transition-opacity group-hover:opacity-100">
              Search
            </span>
          </Link>
        </div>

        {/* View */}
        <div className="group relative">
          <Link
            to="/export"
            className="flex flex-col items-center justify-center p-3 text-white hover:text-gray-200"
          >
            <Calendar className="h-8 w-8 transition-opacity group-hover:opacity-0" />
            <span className="absolute text-lg opacity-0 transition-opacity group-hover:opacity-100">
              Export
            </span>
          </Link>
        </div>

        {/* About Me */}
        <div className="group relative">
          <Link
            to="/about"
            className="flex flex-col items-center justify-center p-3 text-white hover:text-gray-200"
          >
            <BookOpen className="h-8 w-8 transition-opacity group-hover:opacity-0" />
            <span className="absolute whitespace-nowrap text-lg opacity-0 transition-opacity group-hover:opacity-100">
              About Me
            </span>
          </Link>
        </div>

        {/* View Exams Button */}
        <div>
          <button
            className="rounded border border-white bg-black px-5 py-3 text-lg text-white transition-colors hover:bg-gray-900"
            onClick={() =>
              window.open(
                "https://registrar.schedule.wsu.edu/exams/final-exams/",
                "_blank",
              )
            }
          >
            View Exams
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
