"use client";

import type React from "react";

import { useState } from "react";
import { User, Lock, AlertCircle, UserPlus } from "lucide-react";
import { Link, useNavigate } from "react-router";
import "../Styles/Register.css";

function Register(): JSX.Element {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const navigate = useNavigate();

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      return;
    } else {
      setPasswordsMatch(true);
    }

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
            // Show success message or redirect
          }
        });
      } catch (err) {
        console.log(err);
      }
      console.log("Submitted");
    }
  }

  return (
    <div className="register-container">
      <div className="register-card">
        <div className="register-header">
          <h1>Create Account</h1>
          <p>Join our learning platform and start your journey</p>
        </div>

        <form className="register-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">
              <User size={18} className="input-icon" />
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Choose a username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
              id="password"
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={hasSubmitted && password === "" ? "input-error" : ""}
            />
            {hasSubmitted && password === "" && (
              <div className="error-message">
                <AlertCircle size={16} />
                Password is required
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">
              <Lock size={18} className="input-icon" />
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={!passwordsMatch ? "input-error" : ""}
            />
            {!passwordsMatch && (
              <div className="error-message">
                <AlertCircle size={16} />
                Passwords do not match
              </div>
            )}
          </div>

          {userExists && (
            <div className="auth-error">
              <AlertCircle size={16} />
              Username already exists. Please choose another one.
            </div>
          )}

          {hasSubmitted && !isSubmitted && !userExists && (
            <div className="auth-error">
              <AlertCircle size={16} />
              Please fill in all required fields
            </div>
          )}

          <div className="form-actions">
            <button type="submit" className="register-button">
              Create Account <UserPlus size={16} className="button-icon" />
            </button>
          </div>

          <div className="login-prompt">
            <p>
              Already have an account? <Link to="/login">Sign in</Link>
            </p>
          </div>
        </form>
      </div>

      <div className="register-footer">
        <p>
          By registering, you agree to our{" "}
          <a href="#" className="terms-link">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="terms-link">
            Privacy Policy
          </a>
        </p>
        <p>
          &copy; {new Date().getFullYear()} Learning Platform. All rights
          reserved.
        </p>
      </div>
    </div>
  );
}

export default Register;
