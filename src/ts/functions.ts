import {
  taskContainerActive,
  taskContainerFinished,
  taskDescription,
  textareaPlaceholder,
} from "./variables.js";

const taskDelete = function (event: any) {
  const target = event.target;
  if (!target.classList.contains("single-btn")) return;
  const parent = target.closest(".single-task");
  const btnNode = document.querySelectorAll(".single-btn");
  const btnNodeArr = [...btnNode];
  const clickedElement = btnNodeArr.indexOf(target);
  console.log(
    `You deleted task[${clickedElement + 1}] of ${btnNodeArr.length}. ${
      btnNodeArr.length - 1
    } tasks left.`
  );
  parent.remove();
};

const taskToggle = function (event: any) {
  const target = event.target;
  if (
    !target.classList.contains("single-state") &&
    !target.classList.contains("single-edit")
  ) {
    const closestSingleTask = target.closest(".single-task");
    closestSingleTask.classList.toggle("open");
  }
};

export const daysRemaining = function (date: any) {
  const futureDateString = date.value;

  const dateComponents = futureDateString.split("-");
  const futureDay = parseInt(dateComponents[0]);
  const futureMonth = parseInt(dateComponents[1]) - 1;
  const futureYear = parseInt(dateComponents[2]);

  const futureDate = new Date(futureDay, futureMonth, futureYear);
  const currentDate = new Date();

  const timeDiff = futureDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysRemaining;
};

export const placeholderDisplayChange = function () {
  if (textareaPlaceholder) {
    if (taskDescription.value.length > 0) {
      textareaPlaceholder.style.display = "none";
    } else {
      textareaPlaceholder.style.display = "block";
    }
  }
};

export const createdDiv = function (data: string) {
  return `<div class="single-task">${data}
  <div class="single-btn">
  </div>
  <div class="single-state">
  </div>
  <div class="single-edit">
  </div>
</div>`;
};

const stateChange = function (event: any) {
  const target = event.target;
  if (target.classList.contains("single-state")) {
    const closestTaskState = target.closest(".single-state");
    const closestSingleTask = target.closest(".single-task");
    closestTaskState.classList.toggle("finished");
    closestSingleTask.classList.toggle("finished");
  }
};

const containerChange = function (event: any) {
  const target = event.target;
  if (target.classList.contains("single-state")) {
    const closestSingleTask = target.closest(".single-task");
    if (target.classList.contains("finished")) {
      taskContainerFinished?.appendChild(closestSingleTask);
    } else {
      taskContainerActive?.appendChild(closestSingleTask);
    }
  }
};

export const taskContainerFunctions = function (event: any) {
  taskDelete(event);
  taskToggle(event);
  stateChange(event);
  containerChange(event);
  openEditModal(event);
};

const openEditModal = function (event: any) {
  const target = event.target;
  if (target.classList.contains("single-edit")) {
    console.log(`editing single task`);
  }
};
