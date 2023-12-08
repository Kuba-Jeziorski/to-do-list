import {
  createdDiv,
  // daysRemaining,
  taskContainerFunctions,
  // currentDayCheck,
  // summaryUpdate,
} from "./functions";

import Task from "./scheme/Task";
import TaskPrinter from "./TaskPrinter";

import {
  // taskName,
  // taskDescription,
  taskContainerActive,
  taskContainerFinished,
  // taskCategories,
  // taskDeadline,
  // taskImportance,
} from "./variables";
// import { initializeApp } from "firebase/app";
import {
  // getFirestore,
  // collection,
  onSnapshot,
  // addDoc,
} from "firebase/firestore";

import { colRef } from "./db";

export let taskInstances: Task[] = [];

onSnapshot(colRef, (snapshot) => {
  const taskWrapperTasks = document.querySelectorAll(
    ".container-task-active .single-task"
  );
  taskWrapperTasks.forEach((el) => el.remove());

  taskInstances = snapshot.docs.map((doc) => {
    return new Task({
      id: doc.id,
      ...doc.data(),
    });
  });

  taskInstances.forEach((task: Task) => {
    creatingTask(task);
  });
});

export const findTask = (taskId: string): Task | undefined => {
  return taskInstances.find((task: Task) => task.id === taskId);
};

export const creatingTask = function (task: Task): void {
  console.log(`creatingTask`);
  const taskPrinter = new TaskPrinter(task);
  const newTaskPrint = taskPrinter.printHtml();
  const newTaskState = taskPrinter.addStateClass();
  if (task.state === "active") {
    taskContainerActive?.insertAdjacentHTML(
      "afterbegin",
      createdDiv(task.id, newTaskPrint, newTaskState)
    );
  } else {
    taskContainerFinished?.insertAdjacentHTML(
      "afterbegin",
      createdDiv(task.id, newTaskPrint, newTaskState)
    );
  }
};

window.addEventListener("load", function () {
  taskContainerActive.addEventListener("click", taskContainerFunctions);
  taskContainerFinished.addEventListener("click", taskContainerFunctions);
});
