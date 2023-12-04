import {
  clearModalInputs,
  taskUpdate,
  summaryUpdate,
  inputValidation,
  getOptionValue,
} from "./ts/functions";
// import { creatingTask } from "./ts/task";
import {
  taskSubmit,
  taskName,
  taskDescription,
  taskImportance,
  modalBg,
  modalTitle,
  validateModal,
} from "./ts/variables";
import { sendTask } from "./ts/db";
import Task from "./ts/scheme/Task";

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();

  if (modalTitle && modalTitle.textContent === "NEW TASK") {
    if (inputValidation()) {
      const newTask = new Task({
        category: getOptionValue(),
        deadline: 4,
        description: taskDescription.value,
        importance: taskImportance.value,
        name: taskName.value,
      });
      sendTask(newTask);
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
