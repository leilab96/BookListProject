import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { styles } from "../static/loginStyle";
import { signUp } from "../auth";

const SignUpPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      await signUp(email, password, confirmPassword, username);
      navigate("/");
    } catch (error) {
      console.error(error);
      setError(error.message);
    }
  };
  return (
    <div style={styles.container}>
      <div style={styles.background}></div>
      <FontAwesomeIcon icon={faUser} style={styles.profileIcon} />
      <h2 style={styles.title}>Welcome to MyBookList!</h2>
      <h1 style={styles.h1}>Sign-up</h1>
      <div style={styles.formContainer}>
        <label style={styles.formLabel} htmlFor="username">
          Username:
        </label>
        <input
          type="text"
          id="username"
          name="username"
          style={styles.input}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label style={styles.formLabel} htmlFor="email">
          Email:
        </label>
        <input
          type="email"
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
        <label style={styles.formLabel} htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          style={styles.input}
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        <button type="submit" style={styles.button} onClick={handleSignUp}>
          Sign-up
        </button>
        {error && <p style={{ color: "red" }}>{error}</p>}
      </div>
    </div>
  );
};

export default SignUpPage;
