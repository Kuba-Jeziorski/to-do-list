import { taskDescription, textareaPlaceholder } from "../constants";

export const placeholderDisplayChange = function () {
  if (textareaPlaceholder) {
    textareaPlaceholder.style.display =
      taskDescription.value.length > 0 ? "none" : "block";
  }
};
