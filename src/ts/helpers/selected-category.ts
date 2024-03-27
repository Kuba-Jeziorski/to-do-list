import { taskCategories } from "../constants";

export const selectedCategory = function () {
  const thisOption = +taskCategories.value;
  return taskCategories.options[thisOption].textContent ?? "";
};
