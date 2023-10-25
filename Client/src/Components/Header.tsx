import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";

function Header(): JSX.Element {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  return (
    <nav className="Nav">
      <ul className="">
        {!cookies.access_token ? (
          <>
            {" "}
            <li>
              <Link to="/Login">Login</Link>
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
                navigate("/Login");
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
            to={cookies.access_token ? "/QuartzxSpace" : "/Login"}
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
