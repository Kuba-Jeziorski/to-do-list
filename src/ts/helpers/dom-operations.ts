import { filterModal } from "../constants";

export const isCheckbox = (x: unknown): x is HTMLInputElement => {
  if ((x as HTMLInputElement).type === "radio") {
    return true;
  }
  return false;
};

const $ = (selector: string, scope: ParentNode = document) => {
  const result = scope.querySelector(selector);

  if (result === null) {
    throw new Error(`Cannot find with this selector: ${selector}`);
  }

  return result;
};
const $$ = (selector: string) => document.querySelectorAll(selector);

export const querySingleTaskElement = (id: string | null) =>
  $(`.single-task[data-task-id="${id}"]`);

export const queryTaskSingleProperty = (task: ParentNode, query: string) =>
  $(query, task);

export const queryActiveWrapperDiv = () =>
  $$(".container-task-active .single-task");

export const queryFinishedWrapperDiv = () =>
  $$(".container-task-finished .single-task");

export const queryActiveTasksDiv = () => $$("#container-active .single-task");

export const queryFinishedTasksDiv = () =>
  $$("#container-finished .single-task");

export const queryActiveTasksDisplay = () => $("span.act");

export const queryFinishedTasksDisplay = () => $("span.fin");

export const queryAllTasksDisplay = () => $("span.all");

export const queryDefaultSort = () => {
  const result = $(
    '#tab-sort input[type="radio"][name="sorting"][category="timeStamp-2"]'
  );
  if (!isCheckbox(result)) {
    throw new Error(`Cannot find defaultSort radio button!`);
  }
  return result;
};

export const querySingleTaskName = () => $(".single-task .single-name");

export const activeRadioButton = () => $("#tab-sort input[type=radio]:checked");

export const listingState = () => filterModal.getAttribute("listing-state");
