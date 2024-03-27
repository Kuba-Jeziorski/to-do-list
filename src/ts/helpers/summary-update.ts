import {
  queryActiveTasksDisplay,
  queryActiveTasksDiv,
  queryAllTasksDisplay,
  queryFinishedTasksDisplay,
  queryFinishedTasksDiv,
} from "./dom-operations";

export const summaryUpdate = function () {
  const activeTaskDisplayResult = queryActiveTasksDisplay();
  const finishedTaskDisplayResult = queryFinishedTasksDisplay();
  const allTaskDisplayResult = queryAllTasksDisplay();

  if (activeTaskDisplayResult) {
    activeTaskDisplayResult.textContent =
      queryActiveTasksDiv().length.toString();
  }

  if (finishedTaskDisplayResult) {
    finishedTaskDisplayResult.textContent =
      queryFinishedTasksDiv().length.toString();
  }

  if (allTaskDisplayResult) {
    allTaskDisplayResult.textContent = (
      queryActiveTasksDiv().length + queryFinishedTasksDiv().length
    ).toString();
  }
};
