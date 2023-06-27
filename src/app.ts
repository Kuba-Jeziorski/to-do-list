import { taskUpdate } from "./ts/functions.js";
import { creatingTask } from "./ts/task.js";
import { taskSubmit, modalTitle } from "./ts/variables.js";

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();

  if (modalTitle && modalTitle.textContent === "NEW TASK") {
    creatingTask();
  } else {
    taskUpdate();
  }
});
