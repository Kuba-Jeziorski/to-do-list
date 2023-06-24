import {
  taskDescription,
  textareaPlaceholder,
  modalOpen,
  modalClose,
  modalBg,
  modalInputs,
  modalTextarea,
} from "./variables.js";

import { placeholderDisplayChange } from "./functions.js";

export const clearModalInputs = function () {
  textareaPlaceholder.style.display = "block";

  modalInputs.forEach((input) => {
    const inputType: string = (input as HTMLInputElement).type;

    if (inputType === "text" || inputType === "date") {
      (input as HTMLInputElement).value = "";
    } else {
    }
  });
  (modalTextarea as HTMLTextAreaElement).value = "";
};

modalOpen?.addEventListener("click", function () {
  modalBg?.classList.add("active");
});

modalClose?.addEventListener("click", function () {
  modalBg?.classList.remove("active");
});

document.addEventListener("keydown", function (event) {
  if (modalBg?.classList.contains("active") && event.key === "Escape") {
    modalBg.classList.remove("active");
  }
});

taskDescription.addEventListener("input", placeholderDisplayChange);
