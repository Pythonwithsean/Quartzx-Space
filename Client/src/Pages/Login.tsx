import "../Styles/Login.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function Login(): JSX.Element {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false);

  useEffect(() => {
    if (hasSubmitted && isSubmitted && !userExists) {
      // Redirect after a 2-second delay (adjust the delay as needed)
      setTimeout(() => {
        window.location.href = "http://localhost:5173/"; // Redirect to the desired page
      }, 2000);
    }
  }, [hasSubmitted, isSubmitted, userExists]);

  const submitForm = () => {
    if (username === "" || password === "") {
      setHasSubmitted(true);
      setIsSubmitted(false);
    } else {
      setHasSubmitted(true);
      setIsSubmitted(true);
      try {
        fetch("http://localhost:4000/auth/login", {
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
            console.log("user exists");
          } else {
            setUserExists(false);
            console.log("user does not exist");
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
        <form action="http://localhost:4000/auth/login" method="POST">
          <h1>Login</h1>
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
