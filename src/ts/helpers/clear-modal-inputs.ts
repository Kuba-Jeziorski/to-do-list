import {
  importanceRange,
  modalInputs,
  modalTextarea,
  taskCategories,
  textareaPlaceholder,
  taskImportance,
} from "../constants";

export const clearModalInputs = function () {
  textareaPlaceholder.style.display = "block";

  modalInputs.forEach((input) => {
    if (
      (input as HTMLInputElement).type === "text" ||
      (input as HTMLInputElement).type === "date"
    )
      (input as HTMLInputElement).value = "";
  });
  (modalTextarea as HTMLTextAreaElement).value = "";

  taskCategories.selectedIndex = 0;

  taskImportance.value = `2`;
  importanceRange.innerText = `Medium`;
};
