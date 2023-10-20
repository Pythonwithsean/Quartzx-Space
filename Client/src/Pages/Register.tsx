import { useState } from "react";
import { Link } from "react-router-dom";
import "../Styles/Login.css";

function Register(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <>
      <Link to="/" className="Logo">
        Quartzx Space
      </Link>
      <div className="Register-page">
        <form action="" method="post">
          <h1>Register</h1>
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
          <button type="submit">Register</button>
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </>
  );
}
export default Register;
