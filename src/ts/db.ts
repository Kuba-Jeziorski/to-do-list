import {
  createdDiv,
  daysRemaining,
  taskContainerFunctions,
  // currentDayCheck,
  summaryUpdate,
  currentTaskId,
} from "./functions";

import Task from "./scheme/Task";
import TaskPrinter from "./TaskPrinter";

import {
  taskName,
  taskDescription,
  taskContainerActive,
  taskContainerFinished,
  taskCategories,
  taskDeadline,
  taskImportance,
} from "./variables";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
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

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

console.log(db);

// collection ref
export const colRef = collection(db, "tasks");

export const sendTask = (task: Task): void => {
  addDoc(colRef, task.toSave()).then((data) => {
    console.log(`submited`);
    // newTask.databaseId = data.id;
  });
};

export const removeTask = (taskId: string): void => {
  console.log("taskId", taskId);
  const docRef = doc(db, "tasks", taskId);
  deleteDoc(docRef);
};

export const updateTask = (task: Task) => {
  const dbId = task.id;
  if (!!dbId) {
    const docRef = doc(db, "tasks", dbId);
    updateDoc(docRef, task.toUpdate()).then(() =>
      console.log(`properties updated`)
    );
  }
};

export default db;
