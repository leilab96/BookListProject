import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { styles } from "../static/loginStyle";
import { signIn, resetPassword } from "../auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpClick = (e) => {
    navigate("signup");
  };

  const handleLogin = async () => {
    try {
      const user = await signIn(email, password);
      if (user) {
        console.log("Login successful!");
        navigate("home");
      }
    } catch (error) {
      // Handle login error
      console.error("Login failed:", error.message);
    }
  };

  const handleResetPassword = async () => {
    console.log("Password reset...");
    if (email === "") {
      window.alert(
        "Töltsd ki az email címedet majd nyomd meg újra ezt a gombot"
      );
    } else if (!email.match(/\S+@\S+\.\S+/)) {
      window.alert("Email cím nem megfelelő formátumú");
    } else {
      await resetPassword(email);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <FontAwesomeIcon icon={faUser} style={styles.profileIcon} />
      <h2 style={styles.title}>Welcome to MyBookList!</h2>
      <h1 style={styles.h1}>User Login</h1>
      <div style={styles.formContainer}>
        <label style={styles.formLabel} htmlFor="email">
          Email:
        </label>
        <input
          type="text"
          id="email"
          name="email"
          style={styles.input}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label style={styles.formLabel} htmlFor="password">
          Password:
        </label>
        <input
          type="password"
          id="password"
          name="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" style={styles.button} onClick={handleLogin}>
          Login
        </button>
        <div style={styles.optionsContainer}>
          <div style={styles.newUser}>
            New user?{" "}
            <p style={styles.signUpLink} onClick={handleSignUpClick}>
              Sign-up
            </p>
          </div>
          <span style={styles.forgotPassword} onClick={handleResetPassword}>
            Forgot your password?
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
