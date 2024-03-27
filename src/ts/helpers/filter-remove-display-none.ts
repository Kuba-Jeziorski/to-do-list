import {
  listingState,
  queryActiveTasksDiv,
  queryFinishedTasksDiv,
} from "./dom-operations";

export const defaultFilterTasksDisplay = () => {
  const currentContainer =
    listingState() === "active"
      ? queryActiveTasksDiv()
      : queryFinishedTasksDiv();

  currentContainer.forEach((singleTask) => {
    singleTask.classList.remove("display-none");
  });
};
