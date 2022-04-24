import React, { useState, useContext } from "react";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(null);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setIsPending(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError(null);
      setIsPending(false);
      dispatch({ type: "LOGIN", payload: auth.currentUser });
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }
  };

  return { isPending, error, login };
};
