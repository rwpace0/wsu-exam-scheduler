import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <Link to="/">home</Link>
      <ul>
        <li>
          <Link to="/search">search</Link>
        </li>
        <li>
          <Link to="/view">view</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
