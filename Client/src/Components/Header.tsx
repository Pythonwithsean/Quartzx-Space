import { Link, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { LogOut } from "lucide-react";
import { Send } from "lucide-react";
import "../Styles/Header.css";

function Header() {
  const [cookies, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();

  return (
    <nav>
      <h2
        style={{
          color: " rgb(26 139 126 / var(--tw-text-opacity, 1))",
        }}
      >
        Quartzx Space{" "}
        <span style={{ display: "inline-block", margin: "auto" }}>
          {" "}
          <Send size={16} />
        </span>
      </h2>
      <ul>
        {" "}
        {!cookies.access_token ? (
          <>
            {" "}
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
            Use Product
          </Link>
        </li>
        <li></li>
      </ul>
    </nav>
  );
}

export default Header;
