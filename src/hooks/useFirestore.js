import { useState, useReducer, useEffect } from "react";
import { db } from "../firebase/config";
import {
  collection,
  addDoc,
  doc,
  deleteDoc,
  getDocs,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";

const initialState = {
  document: null,
  isPending: false,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        ...state,
        document: null,
        error: null,
        success: false,
        isPending: true,
      };

    case "ERROR":
      return {
        ...state,
        isPending: false,
        document: null,
        error: action.payload,
        success: false,
      };

    case "ADD_DOCUMENT":
      return {
        ...state,
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };

    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (col) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  const ref = collection(db, col);

  // Add document
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    console.log("Adding");

    try {
      const createdAt = Timestamp.fromDate(new Date());
      const addedDocument = await addDoc(ref, {
        ...doc,
        createdAt,
      });
      dispatch({
        type: "ADD_DOCUMENT",
        payload: addedDocument,
      });
    } catch (error) {
      console.log(error.message);
      dispatch({
        type: "ERROR",
        payload: error.message,
      });
    }
  };

  // Delete document
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const deletedDocument = await deleteDoc(doc(ref, id));
      dispatch({ type: "DELETED_DOCUMENT", payload: deletedDocument });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  return { addDocument, deleteDocument, response };
};
