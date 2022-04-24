import { useContext } from "react";
import { useCollection } from "../../hooks/useCollection";

// styles
import styles from "./Home.module.css";

// components
import TransactionForm from "./TransactionForm";
import TransactionList from "../../components/TransactionList/TransactionList";

// Context
import { useAuthContext } from "../../hooks/useAuthContext";

import { AuthContext } from "../../context/AuthContext";

export default function Home() {
  const { user } = useContext(AuthContext);

  // Include a query in order to select transactions for logged in user only
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>
      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
