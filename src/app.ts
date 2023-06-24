import { creatingTask } from "./ts/task.js";
import { taskSubmit } from "./ts/variables.js";

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();
  creatingTask();
});
