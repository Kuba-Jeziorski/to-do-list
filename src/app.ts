import { Task } from "./ts/task.js";
import { taskDelete } from "./ts/functions.js";

const modalOpen = document.querySelector(".modal-open");
const modalBg = document.querySelector(".modal-bg");
modalOpen?.addEventListener("click", function () {
  modalBg?.classList.add("active");
});

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
    `<div class="single-task" style='display: flex;'><p>${newTaskPrint}</p><div class="btn"></div></div>`
  );

  if (modalBg?.classList.contains("active")) {
    (modalBg as HTMLElement).classList.remove("active");
  }
});

const btnCheck = document.querySelector("#btn-check");
btnCheck?.addEventListener("click", function () {
  const btnNode = document.querySelectorAll(".btn");
  console.log(btnNode);
});

taskContainer?.addEventListener("click", taskDelete);
