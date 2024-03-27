import { createdDiv } from "./create-div";
import Task from "../classes/task";
import TaskPrinter from "../classes/task-printer";
import { taskContainerActive, taskContainerFinished } from "../constants";

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
