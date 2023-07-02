import { clearModalInputs, taskUpdate, summaryUpdate } from "./ts/functions";
import { creatingTask } from "./ts/task";
import { taskSubmit, modalBg, modalTitle } from "./ts/variables";
import { consoleModal } from "./ts/modal";

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();

  if (modalTitle && modalTitle.textContent === "NEW TASK") {
    creatingTask();
    summaryUpdate();
  } else {
    taskUpdate();
  }
  clearModalInputs();

  if (modalBg?.classList.contains("active")) {
    (modalBg as HTMLElement).classList.remove("active");
  }
});

console.log(consoleModal);
