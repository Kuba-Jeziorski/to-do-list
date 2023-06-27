import {
  taskContainerActive,
  taskContainerFinished,
  taskDescription,
  taskInstances,
  textareaPlaceholder,
  taskCategories,
  taskDeadline,
  modalTitle,
  modalBg,
  taskName,
} from "./variables.js";

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

const fillingEditInputs = function (event: any) {
  const target = event.target;

  const taskInstance = taskInstances[taskAttributeID(target)];
  console.log(taskInstance);

  if (taskName) {
    taskName.value = (taskInstance as { name: string }).name;
  }

  if (taskDescription) {
    // prettier-ignore
    taskDescription.value = (taskInstance as { description: string }).description;
    textareaPlaceholder.style.display = "none";
  }

  if (taskCategories) {
    const selectedOption = (taskInstance as { category: string }).category;
    const taskCategoriesOptions = taskCategories.options;
    for (let i = 0; i < taskCategoriesOptions.length; i++) {
      if (taskCategoriesOptions[i].text === selectedOption) {
        const selectedOptionValue = taskCategoriesOptions[i].value;
        taskCategories.selectedIndex = +selectedOptionValue;
      }
    }
  }

  if (taskDeadline) {
    const daysTillDeadline = (taskInstance as { deadline: number }).deadline;
    const currentDate = new Date();
    // prettier-ignore
    const dateOfDeadline = new Date(currentDate.setDate(currentDate.getDate() + daysTillDeadline));
    const dataInputValue = dateOfDeadline.toISOString().split("T")[0];
    taskDeadline.value = dataInputValue;
  }
};

const openEditModal = function (event: any) {
  const target = event.target;
  if (target.classList.contains("single-edit")) {
    modalOpening("EDITING TASK");
    fillingEditInputs(event);
  }
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

const taskAttributeID = function (event: any) {
  return event.closest(".single-task").getAttribute("data-task-id");
};

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

export const createdDiv = function (id: number, data: string) {
  return `
  <div class="single-task" data-task-id="${id}">
  ${data}
    <div class="single-btn">
    </div>
    <div class="single-state">
    </div>
    <div class="single-edit">
    </div>
  </div>`;
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

export const modalOpening = function (title: string) {
  if (modalTitle) {
    modalTitle.textContent = title;
  }
  modalBg?.classList.add("active");
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

export const taskContainerFunctions = function (event: any) {
  taskDelete(event);
  taskToggle(event);
  stateChange(event);
  containerChange(event);
  openEditModal(event);
};

export const taskUpdate = function () {
  // update values of instance
  console.log(`Task updated - new values in this instance`);
};
