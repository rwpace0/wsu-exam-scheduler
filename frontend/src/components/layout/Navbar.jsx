import { Link } from "react-router-dom";
import wsulogo from "../../assets/wsulogo.png";

const Navbar = () => {
  return (
    <nav
      className="sticky top-0 z-20 border-b border-wsu-border bg-wsu-bg/95 px-4 py-3 backdrop-blur-sm md:px-8"
      aria-label="Site"
    >
      <div className="mx-auto flex max-w-7xl items-center">
        <Link to="/" className="flex items-center rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-wsu-crimson">
          <img
            src={wsulogo}
            alt="Washington State University"
            className="h-11 w-auto object-contain"
          />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
