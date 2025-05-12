"use client";

import type React from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { useCookies } from "react-cookie";
import { ArrowRight, User, Lock, AlertCircle } from "lucide-react";
import "../Styles/Login.css";

function Login() {
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
        fetch("http://localhost:3001/auth/login", {
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
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome Back</h1>
          <p>Sign in to continue your learning journey</p>
        </div>

        <div className="login-form">
          <div className="form-group">
            <label htmlFor="username">
              <User size={18} className="input-icon" />
              Username
            </label>
            <input
              type="text"
              id="username"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={handleEnter}
              className={hasSubmitted && username === "" ? "input-error" : ""}
            />
            {hasSubmitted && username === "" && (
              <div className="error-message">
                <AlertCircle size={16} />
                Username is required
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              <Lock size={18} className="input-icon" />
              Password
            </label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={handleEnter}
              className={hasSubmitted && password === "" ? "input-error" : ""}
            />
            {hasSubmitted && password === "" && (
              <div className="error-message">
                <AlertCircle size={16} />
                Password is required
              </div>
            )}
          </div>

          {userExists && (
            <div className="auth-error">
              <AlertCircle size={16} />
              Invalid username or password
            </div>
          )}

          <div className="form-actions">
            <button className="login-button" onClick={submitForm}>
              Sign In <ArrowRight size={16} className="button-icon" />
            </button>
          </div>

          <div className="forgot-password">
            <a href="#">Forgot password?</a>
          </div>

          <div className="register-prompt">
            <p>
              Don't have an account? <Link to="/Register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>

      <div className="login-footer">
        <p>
          &copy; {new Date().getFullYear()} Learning Platform. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}

export default Login;
