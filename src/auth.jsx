import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from "firebase/auth";

import { useState, useEffect } from "react";

import { app, addUserToCollection } from "./database";
const auth = getAuth(app);

export async function signUp(email, password, confirmPassword, username) {
  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (password.length < 6) {
    throw new Error("Password should be at least 6 characters long");
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await addUserToCollection(user.uid, username, email);

    return user;
  } catch (error) {
    window.alert("error during sign up: ", error.message);
  }
}

export async function signIn(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    return user;
  } catch (error) {
    console.log("error during sign in", error.message);
    window.alert(error.message);
    return null;
  }
}

export async function signOutUser() {
  try {
    await signOut(auth);
  } catch (error) {
    window.alert("error during signout: ", error.message);
  }
}

export function getCurrentUserId() {
  const user = auth.currentUser;

  if (user) {
    return user.uid;
  } else {
    return null;
  }
}

export async function resetPassword(email) {
  try {
    await sendPasswordResetEmail(auth, email);
    window.alert("Küldünk email-t, benne a további utasításokkal!");
  } catch (e) {
    window.alert("Error during resetpasword email:", e);
  }
}
