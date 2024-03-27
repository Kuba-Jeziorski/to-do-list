import { taskDescription, taskName, taskCategories } from "../constants";

const isNotEmpty = (element: HTMLInputElement) => {
  return element.value !== "";
};

const isNotDefaultOption = (element: HTMLOptionElement) => {
  return element.value !== "0";
};

export const inputValidation = function () {
  return [
    isNotEmpty(taskName),
    isNotEmpty(taskDescription),
    isNotDefaultOption(taskCategories.options[taskCategories.selectedIndex]),
  ].every((x) => x === true);
};
