import { Link } from "react-router-dom";

function Header(): JSX.Element {
  return (
    <nav className="Nav">
      <ul className="">
        <li>
          <Link to="/Login">Login</Link>
        </li>
        <li>
          <Link to="/">Register</Link>
        </li>
        <li>
          {" "}
          <Link to="/" className="Our-Services">
            Use Our Product
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default Header;
