import {
  deleteModal,
  deleteModalButtons,
  filterActiveBtn,
  filterClose,
  filterModal,
  filterFinishedBtn,
  importanceRange,
  modalBg,
  modalInputs,
  modalTextarea,
  modalTitle,
  taskContainerActive,
  taskContainerFinished,
  taskDescription,
  taskInstances,
  taskName,
  taskCategories,
  taskDeadline,
  textareaPlaceholder,
  taskImportance,
  validateBtn,
  validateModal,
} from "./variables";

taskImportance.addEventListener("change", function () {
  if (taskImportance.value === `1`) {
    importanceRange.textContent = `Low`;
  } else if (taskImportance.value === `2`) {
    importanceRange.textContent = `Medium`;
  } else {
    importanceRange.textContent = `High`;
  }
});

validateBtn.addEventListener("click", function () {
  validateModal.classList.remove("active");
});

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
  summaryUpdate();
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
    if (taskDescription.value == "") {
      textareaPlaceholder.style.display = "block";
    } else {
      textareaPlaceholder.style.display = "none";
    }
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

  if (taskImportance) {
    taskImportance.value = (taskInstance as { importance: string }).importance;
  }

  if (taskDeadline) {
    const daysTillDeadline = (taskInstance as { deadline: number }).deadline;

    if (isNaN(daysTillDeadline)) {
      taskDeadline.value = "";
    } else {
      const currentDate = new Date();
      // prettier-ignore
      const dateOfDeadline = new Date(currentDate.setDate(currentDate.getDate() + daysTillDeadline));
      const dataInputValue = dateOfDeadline.toISOString().split("T")[0];
      taskDeadline.value = dataInputValue;
    }
  }
};

let editedTaskID = 0;
const openEditModal = function (event: any): number {
  const target = event.target;
  if (target.classList.contains("single-edit")) {
    modalOpening("EDITING TASK");
    fillingEditInputs(event);

    const taskInstance = taskInstances[taskAttributeID(target)];
    editedTaskID = (taskInstance as { id: number }).id;
    return editedTaskID;
  }
  return 1;
};

const stateChange = function (event: any) {
  const target = event.target;

  if (target.classList.contains("single-state")) {
    const closestTaskState = target.closest(".single-state");
    const closestSingleTask = target.closest(".single-task");
    closestTaskState.classList.toggle("finished");
    closestSingleTask.classList.toggle("finished");

    const taskInstance = taskInstances[taskAttributeID(target)];
    if ((taskInstance as { state: string }).state === `active`) {
      console.log(`active -> finished`);
      (taskInstance as { state: string }).state = `finished`;
    } else {
      console.log(`finished -> active`);
      (taskInstance as { state: string }).state = `active`;
    }
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

  deleteModal?.classList.add("active");

  deleteModalButtons?.addEventListener("click", function (event: any) {
    const target = event.target;
    console.log(`Multiple executions - why?`);
    if (target.id === "delete-yes") {
      parent.remove();
      console.log(
        `You deleted task[${clickedElement + 1}] of ${btnNodeArr.length}. ${
          btnNodeArr.length - 1
        } tasks left.`
      );
    }
    deleteModal?.classList.remove("active");
  });
};

const taskToggleDescription = function (event: any) {
  const target = event.target;
  if (
    !target.classList.contains("single-state") &&
    !target.classList.contains("single-edit")
  ) {
    const closestSingleTask = target.closest(".single-task");
    closestSingleTask.classList.toggle("open");
  }
};

export const summaryUpdate = function () {
  const activeTasksDisplay = document.querySelector("span.act")!;
  const finishedTasksDisplay = document.querySelector("span.fin")!;
  const allTasksDisplay = document.querySelector("span.all")!;

  // prettier-ignore
  const activeTasksAmount = document.querySelectorAll("#container-active .single-task");

  // prettier-ignore
  const finishedTasksAmount = document.querySelectorAll("#container-finished .single-task");

  if (activeTasksDisplay) {
    activeTasksDisplay.textContent = activeTasksAmount.length.toString();
  }

  if (finishedTasksDisplay) {
    finishedTasksDisplay.textContent = finishedTasksAmount.length.toString();
  }

  if (allTasksDisplay) {
    // prettier-ignore
    allTasksDisplay.textContent = (activeTasksAmount.length + finishedTasksAmount.length).toString();
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

export const clearModalInputs = function () {
  textareaPlaceholder.style.display = "block";

  modalInputs.forEach((input) => {
    if (
      (input as HTMLInputElement).type === "text" ||
      (input as HTMLInputElement).type === "date"
    ) {
      (input as HTMLInputElement).value = "";
    }
  });
  (modalTextarea as HTMLTextAreaElement).value = "";

  taskCategories.selectedIndex = 0;
};

export const inputValidation = function () {
  const validationArray: number[] = [];

  if (taskName.value === ``) {
    validationArray.push(0);
  } else {
    validationArray.push(1);
  }

  if (taskDescription.value === ``) {
    validationArray.push(0);
  } else {
    validationArray.push(1);
  }

  // prettier-ignore
  if (taskCategories.options[taskCategories.selectedIndex].text === `Select task category*:`) {
    validationArray.push(0);
  } else {
    validationArray.push(1);
  }

  return !validationArray.includes(0);
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
  taskToggleDescription(event);
  stateChange(event);
  containerChange(event);
  openEditModal(event);
};

export const taskUpdate = function () {
  console.log(`Task changed from:`);
  console.log(taskInstances[editedTaskID]);

  const newName = taskName.value;
  const newDescription = taskDescription.value;
  const newCategory = taskCategories.options[taskCategories.selectedIndex].text;
  const newDeadline = daysRemaining(taskDeadline);
  const newImportance = taskImportance.value;

  (taskInstances[editedTaskID] as { name: string }).name = newName;
  // prettier-ignore
  (taskInstances[editedTaskID] as { description: string }).description = newDescription;
  (taskInstances[editedTaskID] as { category: string }).category = newCategory;
  (taskInstances[editedTaskID] as { deadline: number }).deadline = newDeadline;
  // prettier-ignore
  (taskInstances[editedTaskID] as { importance: string }).importance = newImportance;

  console.log(`Task changed to:`);
  console.log(taskInstances[editedTaskID]);

  // prettier-ignore
  const currentTask = document.querySelector(`.single-task[data-task-id="${editedTaskID}"]`);
  // prettier-ignore
  let currentTaskDays = currentTask?.querySelector(".single-days") as HTMLDivElement;
  // prettier-ignore
  let currentTaskName = currentTask?.querySelector(".single-name") as HTMLDivElement;
  // prettier-ignore
  let currentTaskCategory = currentTask?.querySelector(".single-category") as HTMLDivElement;
  // prettier-ignore
  let currentTaskDescription = currentTask?.querySelector(".single-description") as HTMLDivElement;

  if (!isNaN(newDeadline)) {
    currentTaskDays.textContent = `${newDeadline.toString()} ${
      Math.abs(newDeadline) === 1 ? "day" : "days"
    } ${newDeadline >= 0 ? "till" : "past"} deadline`;
  }

  const nameImportance = document.querySelector(".single-task .single-name");
  const importanceStates = ["low", "medium", "high"];
  importanceStates.map((singleImportance) =>
    nameImportance?.classList.remove(singleImportance)
  );
  let importanceNameClass = ``;
  if (newImportance === `1`) {
    importanceNameClass = `low`;
  } else if (newImportance === `2`) {
    importanceNameClass = `medium`;
  } else {
    importanceNameClass = `high`;
  }
  nameImportance?.classList.add(importanceNameClass);

  currentTaskName.textContent = newName;
  currentTaskCategory.textContent = newCategory;
  currentTaskDescription.textContent = newDescription;
};

filterActiveBtn.addEventListener("click", function () {
  filterModal.classList.add("active");
  const filteredArray: any[] = [];

  taskInstances.forEach((singleInstance) => {
    if ((singleInstance as { state: string }).state === `active`) {
      filteredArray.push(singleInstance);
    }
  });
  console.log(`Amount of all items: ${taskInstances.length}`);
  console.log(`Amount of filtered items: ${filteredArray.length}`);

  console.log(filteredArray);
});

filterFinishedBtn.addEventListener("click", function () {
  filterModal.classList.add("active");
  const filteredArray: any[] = [];

  taskInstances.forEach((singleInstance) => {
    if ((singleInstance as { state: string }).state === `finished`) {
      filteredArray.push(singleInstance);
    }
  });

  console.log(`Amount of all items: ${taskInstances.length}`);
  console.log(`Amount of filtered items: ${filteredArray.length}`);

  console.log(filteredArray);
});

filterClose?.addEventListener("click", function () {
  console.log(`close clicked`);
  filterModal.classList.remove("active");
});
