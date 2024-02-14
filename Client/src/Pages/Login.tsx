import "../Styles/Login.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [_, setCookies] = useCookies(["access_token"]);

  const navigate = useNavigate();

  const submitForm = () => {
    if (username === "" || password === "") {
      setHasSubmitted(true);
      setIsSubmitted(false);
    } else {
      setHasSubmitted(true);
      setIsSubmitted(true);
      try {
        fetch("https://quartzxspace.onrender.com/auth/login", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 400) {
            setUserExists(true);
            console.log("User Does not exist");
          } else {
            setUserExists(false);
            response.json().then((data) => {
              setCookies("access_token", data.token);
              window.localStorage.setItem("userID", data.userID);
              window.localStorage.setItem("username", data.username);
              navigate("/Dashboard");
            });
          }
        });
      } catch (err) {
        console.log(err);
      }
    }
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setHasSubmitted(true);
      event.preventDefault();
      console.log("Enter key pressed");
      submitForm();
    }
  };

  return (
    <>
      <Link to="/" className="Logo">
        Quartzx Space
      </Link>
      <div className="Login-Page">
        <form
          action="https://quartzxspace.onrender.com/auth/login"
          method="POST"
        >
          <h1 className="Logo">Login</h1>
          <input
            type="text"
            name="username"
            id="username"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyPress={handleEnter}
          />
          <input
            type="password"
            name="password"
            id="pwd"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={handleEnter}
          />
          {hasSubmitted && !isSubmitted ? (
            <p className="unsuccessful-login">
              Username or Password is incorrect
            </p>
          ) : null}

          {hasSubmitted && isSubmitted ? (
            userExists ? (
              <p className="unsuccessful-login">
                Username or Password is incorrect
              </p>
            ) : (
              <p>Redirecting...</p>
            )
          ) : null}

          <p>
            By logging in you have agreed to all the Terms and Conditions of
            Quartzx Space
          </p>
        </form>
      </div>
    </>
  );
}

export default Login;
