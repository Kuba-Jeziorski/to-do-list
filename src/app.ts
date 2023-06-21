import { Task } from "./ts/task.js";
import { taskDelete } from "./ts/functions.js";
import { modalBg, emptyModalInputs } from "./ts/modal.js";
import "./ts/modal.js";

const taskName = document.querySelector("#name") as HTMLInputElement;
const taskDescription = document.querySelector("#desc") as HTMLInputElement;
const taskDays = document.querySelector("#num") as HTMLInputElement;
const taskSubmit = document.querySelector("#submit") as HTMLElement;
const taskContainer = document.querySelector("#container");

taskSubmit?.addEventListener("click", function (event) {
  event.preventDefault();

  const name = taskName.value;
  const description = taskDescription.value;
  const days = +taskDays.value;

  const newTask = new Task(name, description, days);
  const newTaskPrint = newTask.print();

  taskContainer?.insertAdjacentHTML(
    "afterbegin",
    `<div class="single-task">${newTaskPrint}<div class="single-btn"></div></div>`
  );

  emptyModalInputs();

  if (modalBg?.classList.contains("active")) {
    (modalBg as HTMLElement).classList.remove("active");
  }
});

taskContainer?.addEventListener("click", taskDelete);

// textarea placeholder
const textareaPlaceholder = document.querySelector(
  ".textarea-placeholder"
) as HTMLElement;
taskDescription.addEventListener("input", function () {
  if (textareaPlaceholder) {
    if (this.value.length > 0) {
      textareaPlaceholder.style.display = "none";
    } else {
      textareaPlaceholder.style.display = "block";
    }
  }
});
