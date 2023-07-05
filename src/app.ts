import {
  clearModalInputs,
  taskUpdate,
  summaryUpdate,
  inputValidation,
} from "./ts/functions";
import { creatingTask } from "./ts/task";
import { taskSubmit, modalBg, modalTitle, validateModal } from "./ts/variables";
import { consoleModal } from "./ts/modal";

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();

  if (modalTitle && modalTitle.textContent === "NEW TASK") {
    if (inputValidation()) {
      creatingTask();
      summaryUpdate();

      clearModalInputs();

      if (modalBg?.classList.contains("active")) {
        (modalBg as HTMLElement).classList.remove("active");
      }
    } else {
      validateModal.classList.add("active");
    }
  } else {
    if (inputValidation()) {
      taskUpdate();
      clearModalInputs();

      if (modalBg?.classList.contains("active")) {
        modalBg.classList.remove("active");
      }
    } else {
      validateModal.classList.add("active");
    }
  }
});

console.log(consoleModal);
