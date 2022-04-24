import React, { useState } from "react";
import styles from "./Login.module.css";
import { useLogin } from "../../hooks/useLogin";

function Login() {
  // States
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isPending, error } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <form onSubmit={handleSubmit} className={styles["login-form"]}>
      <h2 className="text-2xl font-bold">login</h2>
      <label>
        <span>email:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </label>
      <label>
        <span>password:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
      </label>
      <button className="px-2 py-1 bg-green-50" disabled={isPending}>
        Login
      </button>
      {isPending && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default Login;
