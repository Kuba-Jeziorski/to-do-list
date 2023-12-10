import { createdDiv, taskContainerFunctions, summaryUpdate } from "./functions";

import Task from "./scheme/Task";
import TaskPrinter from "./TaskPrinter";

import { taskContainerActive, taskContainerFinished } from "./variables";

import { onSnapshot } from "firebase/firestore";

import { colRef } from "./db";

export let taskInstances: Task[] = [];

onSnapshot(colRef, (snapshot) => {
  const taskWrapperActive = document.querySelectorAll(
    ".container-task-active .single-task"
  );
  const taskWrapperFinished = document.querySelectorAll(
    ".container-task-finished .single-task"
  );
  taskWrapperActive.forEach((singleTask) => singleTask.remove());
  taskWrapperFinished.forEach((singleTask) => singleTask.remove());

  taskInstances = snapshot.docs.map((doc) => {
    return new Task({
      id: doc.id,
      ...doc.data(),
    });
  });

  taskInstances.forEach((task: Task) => {
    creatingTask(task);
  });

  summaryUpdate();
  console.log(`all taskInstances`);
  console.log(taskInstances);
});

export const findTask = (taskId: string): Task | undefined => {
  return taskInstances.find((task: Task) => task.id === taskId);
};

export const creatingTask = function (task: Task): void {
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
