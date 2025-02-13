import "../Styles/Login.css";
// import { Link, useNavigate } from "react-router";
// import { useState } from "react";
// import { useCookies } from "react-cookie";

function Login() {
  // const [username, setUsername] = useState("");
  // const [password, setPassword] = useState("");
  // const [isSubmitted, setIsSubmitted] = useState(false);
  // const [hasSubmitted, setHasSubmitted] = useState(false);
  // const [userExists, setUserExists] = useState(false);
  // const [_, setCookies] = useCookies(["access_token"]);

  // const navigate = useNavigate();

  // const submitForm = () => {
  //   if (username === "" || password === "") {
  //     setHasSubmitted(true);
  //     setIsSubmitted(false);
  //   } else {
  //     setHasSubmitted(true);
  //     setIsSubmitted(true);
  //     try {
  //       fetch("http://localhost:3001/auth/login", {
  //         method: "POST",
  //         body: JSON.stringify({
  //           username: username,
  //           password: password,
  //         }),
  //         headers: {
  //           "Content-type": "application/json; charset=UTF-8",
  //         },
  //       }).then((response) => {
  //         if (response.status === 400) {
  //           setUserExists(true);
  //           console.log("User Does not exist");
  //         } else {
  //           setUserExists(false);
  //           response.json().then((data) => {
  //             setCookies("access_token", data.token);
  //             window.localStorage.setItem("userID", data.userID);
  //             window.localStorage.setItem("username", data.username);
  //             navigate("/Dashboard");
  //           });
  //         }
  //       });
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  // const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (event.key === "Enter") {
  //     setHasSubmitted(true);
  //     event.preventDefault();
  //     console.log("Enter key pressed");
  //     submitForm();
  //   }
  // };

  return (
    <>
      <h1>Login</h1>
    </>
  );
}

export default Login;
