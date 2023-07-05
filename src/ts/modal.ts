import { taskDescription, modalOpen, modalClose, modalBg } from "./variables";

import {
  clearModalInputs,
  placeholderDisplayChange,
  modalOpening,
} from "./functions";

export const consoleModal = `artificial linking to module.ts`;
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
