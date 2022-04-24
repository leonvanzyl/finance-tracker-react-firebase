import { useState } from "react";

// Hooks
import { useAuthContext } from "./useAuthContext";

// Import firebase auth
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  async function signup(email, password, displayName) {
    // Set isPending to true
    setError(null);
    setIsPending(true);

    // Sign up the user
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(auth.currentUser, { displayName });

      // Dispatch login action
      dispatch({ type: "LOGIN", payload: auth.currentUser });
    } catch (error) {
      setError(error.message);
      setIsPending(false);
    }

    // Set isPending to false
    setIsPending(false);
  }

  return { error, isPending, signup };
};
