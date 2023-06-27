import { taskUpdate } from "./ts/functions";
import { creatingTask } from "./ts/task";
import { taskSubmit, modalTitle } from "./ts/variables";
// import "./styles.scss";

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();

  if (modalTitle && modalTitle.textContent === "NEW TASK") {
    creatingTask();
  } else {
    taskUpdate();
  }
});
