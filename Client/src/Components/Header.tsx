import { Link, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { LogOut } from "lucide-react";
import "../Styles/Header.css";

function Header() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  return (
    <nav>
      <h2>Quartzx Space</h2>
      <ul>
        {!cookies.access_token ? (
          <>
            {" "}
            <li>
              <Link to="/Login" className="">
                Login
              </Link>
            </li>
            <li>
              <Link to="/Register">Register</Link>
            </li>
          </>
        ) : (
          <li>
            <LogOut
              className="Logout-button"
              onClick={() => {
                setCookies("access_token", "");
                window.localStorage.removeItem("access_token");
                window.localStorage.removeItem("userID");
                navigate("/");
                console.log("Logged out");
              }}
            >
              Logout
            </LogOut>
          </li>
        )}

        <li>
          {" "}
          <Link
            to={cookies.access_token ? "/Dashboard" : "/Login"}
            className="Our-Services"
          >
            Use Our Product
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default Header;
