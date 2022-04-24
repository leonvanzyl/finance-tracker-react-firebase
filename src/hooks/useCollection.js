import { useState, useEffect, useRef } from "react";
import {
  collection,
  onSnapshot,
  where,
  query,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../firebase/config";

export const useCollection = (col, _q, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // useRef to avoid infinite loop
  // Because an array is an object that is recreated, it causes an infinite loop
  const q = useRef(_q).current;
  const ordBy = useRef(_orderBy).current;

  useEffect(() => {
    let ref = collection(db, col);

    if (q) {
      ref = query(ref, where(...q));
    }

    if (ordBy) {
      ref = query(ref, orderBy(...ordBy));
    }

    const unsub = onSnapshot(
      ref,
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError(error);
      }
    );

    return () => unsub();
  }, [col, q]);

  return { documents, error };
};
