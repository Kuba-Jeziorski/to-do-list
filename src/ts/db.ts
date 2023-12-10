import Task from "./scheme/Task";

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const {
  firebaseApiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
} = require("../../config.json");

const firebaseConfig = {
  apiKey: firebaseApiKey,
  authDomain,
  projectId,
  storageBucket,
  messagingSenderId,
  appId,
};

initializeApp(firebaseConfig);

const db = getFirestore();

export const colRef = collection(db, "tasks");

export const sendTask = (task: Task): void => {
  addDoc(colRef, task.toSave());
};

export const removeTask = (taskId: string): void => {
  const docRef = doc(db, "tasks", taskId);
  deleteDoc(docRef);
};

export const updateTask = (task: Task) => {
  const dbId = task.id;
  if (!!dbId) {
    const docRef = doc(db, "tasks", dbId);
    updateDoc(docRef, task.toUpdate());
  }
};

export default db;
