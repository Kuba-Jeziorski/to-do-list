import {
  taskDescription,
  textareaPlaceholder,
  modalOpen,
  modalClose,
  modalBg,
  modalInputs,
  modalTextarea,
} from "./variables";

import { placeholderDisplayChange, modalOpening } from "./functions";

export const clearModalInputs = function () {
  textareaPlaceholder.style.display = "block";

  modalInputs.forEach((input) => {
    if (
      (input as HTMLInputElement).type === "text" ||
      (input as HTMLInputElement).type === "date"
    ) {
      (input as HTMLInputElement).value = "";
    }
  });
  (modalTextarea as HTMLTextAreaElement).value = "";
};

modalOpen?.addEventListener("click", () => modalOpening("NEW TASK"));

modalClose?.addEventListener("click", function () {
  modalBg?.classList.remove("active");
  clearModalInputs();
});

document.addEventListener("keydown", function (event) {
  if (modalBg?.classList.contains("active") && event.key === "Escape") {
    modalBg.classList.remove("active");
    clearModalInputs();
  }
});

taskDescription.addEventListener("input", placeholderDisplayChange);
