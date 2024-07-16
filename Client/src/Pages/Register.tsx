import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";

function Register(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (username === "" || password === "") {
      setHasSubmitted(true);
      setIsSubmitted(false);
    } else {
      setHasSubmitted(true);
      setIsSubmitted(true);
      try {
        fetch("http://localhost:3001/auth/register", {
          method: "POST",
          body: JSON.stringify({
            username: username,
            password: password,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((response) => {
          if (response.status === 700) {
            setUserExists(true);
            console.log("user exists");
          } else {
            setUserExists(false);
          }
        });
      } catch (err) {
        console.log(err);
      }
      console.log("Submitted");
    }
  }

  return (
    <>
      <Link to="/" className="Logo">
        Quartzx Space
      </Link>
      <div className="Register-page">
        <form action="" method="post" onSubmit={handleSubmit}>
          <h1 className="Logo">Register</h1>
          <input
            id="username"
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            id="pwd"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {hasSubmitted && !isSubmitted ? (
            <p className="unsuccessful-login">
              Username or Password is incorrect
            </p>
          ) : null}
          <button type="submit">Register</button>
          {userExists ? (
            <div className="user-exists">User already exists</div>
          ) : null}
          <div className="already-have-an-account">
            Already have an account?{" "}
            <em>
              <strong>
                {" "}
                <Link className="login-page" to="/login">
                  {" "}
                  Login{" "}
                </Link>
              </strong>
            </em>
          </div>
        </form>
      </div>
    </>
  );
}
export default Register;
