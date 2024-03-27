import Task, { DatabaseTask } from "./classes/task";

import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  deleteDoc,
  addDoc,
  doc,
  updateDoc,
  CollectionReference,
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

type TaskDocument = Omit<DatabaseTask, "id">;

export const colRef = collection(db, "tasks") as CollectionReference<
  TaskDocument,
  TaskDocument
>;

export const sendTask = (task: Task) => {
  return addDoc(colRef, task.toSave());
};

export const removeTask = (taskId: string): void => {
  const docRef = doc(db, "tasks", taskId);
  deleteDoc(docRef);
};

export const updateTask = (task: Task) => {
  const dbId = task.id;
  if (!!dbId) {
    const docRef = doc(db, "tasks", dbId);
    return updateDoc(docRef, task.toUpdate());
  }
};

export const updateTaskState = (docRef: any, newState: any) => {
  if (docRef) {
    updateDoc(docRef, { state: newState });
  }
};

export const getDocRef = (dbId: any) => {
  return dbId ? doc(db, "tasks", dbId) : null;
};
