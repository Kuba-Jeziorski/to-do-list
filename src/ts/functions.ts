import {
  deleteModal,
  modalOpen,
  modalClose,
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
  taskName,
  taskCategories,
  taskDeadline,
  textareaPlaceholder,
  taskImportance,
  taskImportanceObj,
  validateBtn,
  validateModal,
  filterDefault,
  filterTabCheckboxes,
  filterSubmit,
  filterTab1,
  filterTab2,
  taskSubmit,
} from "./variables";

import { doc, updateDoc } from "firebase/firestore";

import { taskInstances, findTask } from "./tasks";
import Task from "./scheme/Task";
import db, { updateTask, removeTask } from "./db";

let editedTaskID: any;

const updateTaskState = function (docRef: any, newState: any) {
  if (docRef) {
    updateDoc(docRef, { state: newState });
  }
};

const stateChange = function (event: any) {
  const target = event.target;

  if (target.classList.contains("single-state")) {
    const closestSingleTask = target.closest(".single-task");
    const closestSingleTaskID = closestSingleTask.getAttribute("data-task-id");

    const properSingleTask = findTask(closestSingleTaskID);

    if (properSingleTask) {
      const dbId = properSingleTask.id;
      const docRef = dbId ? doc(db, "tasks", dbId) : null;

      if (properSingleTask.state === "active") {
        closestSingleTask.classList.add("finished");
        updateTaskState(docRef, "finished");
      } else {
        closestSingleTask.classList.remove("finished");
        updateTaskState(docRef, "active");
      }
    }
  }
};

export const currentTaskId = (event: any) => {
  const target = event.target;
  const taskId = target.getAttribute("data-task-id");
  return taskId;
};

export const countingDeadline = function (date: string): number {
  if (date) {
    const currentDate = new Date();
    const targetDate = new Date(date);
    const timeDifference = Number(targetDate) - Number(currentDate);
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    return daysRemaining;
  } else {
    return NaN;
  }
};

export const selectedCategory = function () {
  const thisOption = +taskCategories.value;
  return taskCategories.options[thisOption].textContent;
};

export const dynamicImportanceClass = function (target: any, forbidden: any) {
  const importanceValue = +taskImportance.value;
  const importanceName = forbidden[importanceValue as keyof typeof forbidden];
  target.textContent = importanceName;

  const forbiddenClasses: string[] = [];
  for (const [_, value] of Object.entries(forbidden)) {
    if (value && typeof value === "string") {
      forbiddenClasses.push(value.toLocaleLowerCase());
    }
  }

  forbiddenClasses.map((singleClass) => target.classList.remove(singleClass));
  target.classList.add(importanceName.toLowerCase());
};

const fillingEditInputs = function (event: any) {
  const target = event.target;

  const closestSingleTask = target.closest(".single-task");
  const closestSingleTaskID = closestSingleTask.getAttribute("data-task-id");

  const taskInstance: Task | undefined = findTask(closestSingleTaskID);

  if (typeof taskInstance !== "undefined") {
    if (taskName) {
      taskName.value = taskInstance.name;
    }

    if (taskDescription) {
      taskDescription.value = taskInstance.description;
      if (taskDescription.value == "") {
        textareaPlaceholder.style.display = "block";
      } else {
        textareaPlaceholder.style.display = "none";
      }
    }

    if (taskCategories) {
      const selectOptions = [...taskCategories.options];
      let currentCategory;
      selectOptions.map((single, index) => {
        if (single.textContent === taskInstance.category) {
          currentCategory = index;
        }
      });
      if (currentCategory) {
        taskCategories.value = currentCategory;
      }
    }

    if (taskImportance) {
      taskImportance.value = taskInstance.importance;
      const importanceName =
        taskImportanceObj[
          +taskImportance.value as keyof typeof taskImportanceObj
        ];
      importanceRange.textContent = importanceName;

      dynamicImportanceClass(importanceRange, taskImportanceObj);
    }

    if (taskDeadline) {
      countingDeadline(taskDeadline.value);
      taskDeadline.value = taskInstance.dateOfDeadline;
    }
  }
};

export const modalSubmitValue = function (name: string) {
  taskSubmit.value = name;
};

const openEditModal = function (event: any) {
  const target = event.target;
  if (target.classList.contains("single-edit")) {
    modalOpening("EDITING TASK");
    modalSubmitValue("UPDATE");

    fillingEditInputs(event);

    const closestSingleTask = target.closest(".single-task");
    const closestSingleTaskID = closestSingleTask.getAttribute("data-task-id");

    //prettier-ignore
    const taskInstance = findTask(closestSingleTaskID);
    if (typeof taskInstance !== "undefined") {
      editedTaskID = taskInstance.id;
      return editedTaskID;
    }
  }
};

const taskDelete = function (event: any) {
  const target = event.target;
  if (!target.classList.contains("single-btn")) return;
  const parent = target.closest(".single-task");
  const parentId = parent.getAttribute("data-task-id");

  deleteModal?.classList.add("active");

  deleteModalButtons?.addEventListener("click", function (event: any) {
    const target = event.target;

    if (target.id === "delete-yes") removeTask(parentId);
    deleteModal?.classList.remove("active");
  });
};

const taskToggleDescription = function (event: any) {
  const target = event.target;
  if (
    !["single-state", "single-edit", "single-btn"].some((className) =>
      target.classList.contains(className)
    )
  ) {
    const closestSingleTask = target.closest(".single-task");
    closestSingleTask.classList.toggle("open");
  }
};

export const currentDayCheck = function (): string {
  const currentDate = new Date();
  const currentDay = String(currentDate.getDate()).padStart(2, "0");
  const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
  const currentYear = String(currentDate.getFullYear());

  const formattedDate = `${currentYear}-${currentMonth}-${currentDay}`;
  return formattedDate;
};

export const summaryUpdate = function () {
  const activeTasksDisplay = document.querySelector("span.act");
  const finishedTasksDisplay = document.querySelector("span.fin");
  const allTasksDisplay = document.querySelector("span.all");

  const activeTasksAmount = document.querySelectorAll(
    "#container-active .single-task"
  );

  const finishedTasksAmount = document.querySelectorAll(
    "#container-finished .single-task"
  );

  if (activeTasksDisplay) {
    activeTasksDisplay.textContent = activeTasksAmount.length.toString();
  }

  if (finishedTasksDisplay) {
    finishedTasksDisplay.textContent = finishedTasksAmount.length.toString();
  }

  if (allTasksDisplay) {
    allTasksDisplay.textContent = (
      activeTasksAmount.length + finishedTasksAmount.length
    ).toString();
  }
};

export const createdDiv = function (id: any, data: string, state: string) {
  return `
  <div class="single-task ${state}" data-task-id="${id}">
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
    )
      (input as HTMLInputElement).value = "";
  });
  (modalTextarea as HTMLTextAreaElement).value = "";

  taskCategories.selectedIndex = 0;

  taskImportance.value = `2`;
  importanceRange.innerText = `Medium`;
};

export const inputValidation = function () {
  const validationArray: number[] = [];

  validationArray.push(taskName.value === `` ? 0 : 1);
  validationArray.push(taskDescription.value === `` ? 0 : 1);
  //prettier-ignore
  validationArray.push(taskCategories.options[taskCategories.selectedIndex].value === "0" ? 0 : 1);

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
    textareaPlaceholder.style.display =
      taskDescription.value.length > 0 ? "none" : "block";
  }
};

export const taskContainerFunctions = function (event: any) {
  taskDelete(event);
  taskToggleDescription(event);
  stateChange(event);
  openEditModal(event);
};

export const taskUpdate = function () {
  //prettier-ignore
  const taskInstance: Task = findTask(editedTaskID)!;

  console.log(`Task changed from:`);
  console.log(taskInstance);

  taskInstance.name = taskName.value;
  taskInstance.description = taskDescription.value;
  taskInstance.category =
    taskCategories.options[taskCategories.selectedIndex].text;
  taskInstance.deadline = daysRemaining(taskDeadline);
  taskInstance.importance = taskImportance.value;
  taskInstance.dateOfDeadline = taskDeadline.value;

  updateTask(taskInstance);

  console.log(`Task changed to:`);
  console.log(taskInstance);

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
  // prettier-ignore

  if (!isNaN(daysRemaining(taskDeadline))) {
    const deadlineWhen = daysRemaining(taskDeadline) >= 0 ? `till` : `past`;
    const absoluteDaysRemaining = Math.abs(daysRemaining(taskDeadline));
    currentTaskDays.textContent = `${absoluteDaysRemaining.toString()} ${
      Math.abs(daysRemaining(taskDeadline)) === 1 ? "day" : "days"
    } ${deadlineWhen} deadline`;
  }

  const nameImportance = document.querySelector(".single-task .single-name");
  const forbiddenClasses: string[] = [];
  for (const [_, value] of Object.entries(taskImportanceObj)) {
    if (value && typeof value === "string") {
      forbiddenClasses.push(value.toLocaleLowerCase());
    }
  }

  forbiddenClasses.map((singleClass) =>
    nameImportance?.classList.remove(singleClass)
  );

  const importanceName =
    taskImportanceObj[+taskImportance.value as keyof typeof taskImportanceObj];

  nameImportance?.classList.add(importanceName);

  currentTaskName.textContent = taskName.value;
  currentTaskCategory.textContent =
    taskCategories.options[taskCategories.selectedIndex].text;
  currentTaskDescription.textContent = taskDescription.value;
};
// end here
const closeModalByOutsideClick = function (event: any) {
  const target = event.target;
  if (
    modalBg?.classList.contains("active") &&
    target.classList.contains("modal-bg")
  ) {
    modalBg.classList.remove("active");
    clearModalInputs();
  }
};

validateBtn.addEventListener("click", function () {
  validateModal.classList.remove("active");
});

taskImportance.addEventListener("change", function () {
  const importanceValue = +taskImportance.value;

  // prettier-ignore
  importanceRange.textContent = taskImportanceObj[importanceValue as keyof typeof taskImportanceObj];

  dynamicImportanceClass(importanceRange, taskImportanceObj);
});

let filteredArray: any[] = [];
filterActiveBtn.addEventListener("click", function (): any[] {
  filterModal.classList.add("active");
  // prevent from adding duplicated items
  filteredArray = [];

  taskInstances.forEach((singleInstance) => {
    if (singleInstance.state === `active`) {
      filteredArray.push(singleInstance);
    }
  });
  console.log(`Amount of all items: ${taskInstances.length}`);
  console.log(
    `Amount of filtered (active state) items: ${filteredArray.length}`
  );

  console.log(filteredArray);
  return filteredArray;
});

filterFinishedBtn.addEventListener("click", function () {
  filterModal.classList.add("active");
  const filteredArray: any[] = [];

  taskInstances.forEach((singleInstance) => {
    if (singleInstance.state === `finished`) {
      filteredArray.push(singleInstance);
    }
  });

  console.log(`Amount of all items: ${taskInstances.length}`);
  console.log(
    `Amount of filtered (finished state) items: ${filteredArray.length}`
  );

  console.log(filteredArray);
});

filterClose?.addEventListener("click", function () {
  console.log(`close clicked`);
  filterModal.classList.remove("active");
});

filterDefault.addEventListener("click", function () {
  // filter tab
  if (filterTab1.checked) {
    filterTabCheckboxes.forEach((singleCheckbox) => {
      (singleCheckbox as HTMLInputElement).checked = false;
    });
  }

  // sort tab
  if (filterTab2.checked) {
    const defaultSort = document.querySelector(
      '#tab-sort input[type="radio"][name="sorting"][category="timeStamp-2"]'
    ) as HTMLInputElement;
    defaultSort.checked = true;
  }
});

// filterSubmit.addEventListener("click", function () {
//   console.log(`filterSubmit tasks`);
//   console.log(filteredArray);

//   // filter tab
//   if (filterTab1.checked) {
//     const checkboxesNamesArray: string[] = [];
//     filterTabCheckboxes.forEach((singleCheckbox) => {
//       if ((singleCheckbox as HTMLInputElement).checked) {
//         checkboxesNamesArray.push((singleCheckbox as HTMLInputElement).name);
//       }
//     });

//     const importanceArray: string[] = [];
//     const categoryArray: string[] = [];
//     const deadlineArray: string[] = [];

//     console.log(`checkboxesNamesArray`);
//     console.log(checkboxesNamesArray);

//     checkboxesNamesArray.map((singleName) => {
//       console.log(`singleName`);
//       console.log(singleName);
//       if (singleName.includes("importance")) {
//         importanceArray.push(singleName);
//       } else if (singleName.includes("category")) {
//         categoryArray.push(singleName);
//       } else {
//         deadlineArray.push(singleName);
//       }
//     });
//     console.log(`filteredArray`);
//     console.log(filteredArray);
//     if (checkboxesNamesArray.length > 0) {
//       filteredArray.map((singleTask) => {
//         let thisTaskID = singleTask.databaseId;
//         //prettier-ignore
//         let thisTaskDiv = document.querySelector(`.single-task[data-task-id="${thisTaskID}"]`) as HTMLElement;
//         //prettier-ignore
//         const thisTaskImportance = singleTask.importance;
//         const thisTaskCategory = singleTask.category;
//         //prettier-ignore
//         const thisTaskDeadline = Math.abs(singleTask.deadline);

//         (thisTaskDiv as HTMLElement).style.display = "none";

//         //prettier-ignore
//         const selectedImportance = importanceArray.map(item => item.replace('importance-', ''));
//         //prettier-ignore
//         const selectedCategories = categoryArray.map(item => item.replace('category-', ''));
//         //prettier-ignore
//         const selectedDeadline = deadlineArray.map(item => item.replace("deadline-", ""));

//         //prettier-ignore
//         const importanceMatch = selectedImportance.length === 0 || selectedImportance.includes(`${thisTaskImportance}`);
//         //prettier-ignore
//         const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(`${thisTaskCategory}`);
//         //prettier-ignore
//         const deadlineMatch = selectedDeadline.length === 0 || thisTaskDeadline <= +selectedDeadline[0];

//         if (importanceMatch && categoryMatch && deadlineMatch) {
//           thisTaskDiv.style.display = "flex";
//         }
//       });
//     } else {
//       filteredArray.map((singleTask) => {
//         let thisTaskID = singleTask.databaseId;
//         //prettier-ignore
//         let thisTaskDiv = document.querySelector(`.single-task[data-task-id="${thisTaskID}"]`) as HTMLElement;

//         (thisTaskDiv as HTMLElement).style.display = "flex";
//       });
//     }
//   }

//   // sort tab
//   if (filterTab2.checked) {
//     //prettier-ignore
//     const allRadioInputs = document.querySelectorAll('#tab-sort input[type="radio"]');

//     let sortBy: string = "";
//     allRadioInputs.forEach((singleRadio) => {
//       if ((singleRadio as HTMLInputElement).checked) {
//         sortBy = (singleRadio as HTMLInputElement).getAttribute("category")!;
//       }
//     });
//     const sortCategory = sortBy.replace(/-(1|2)$/, "");
//     const sortType = sortBy.slice(-1);

//     const filteredArrayCopy = [...filteredArray];
//     let sortedArray: Task[];
//     if (sortType == `1`) {
//       sortedArray = filteredArrayCopy.sort((first, last) =>
//         //prettier-ignore
//         last[sortCategory] < first[sortCategory] ? 1 : last[sortCategory] > first[sortCategory] ? -1 : 0
//       );
//     } else {
//       sortedArray = filteredArrayCopy.sort((first, last) =>
//         //prettier-ignore
//         first[sortCategory] < last[sortCategory] ? 1 : first[sortCategory] > last[sortCategory] ? -1 : 0
//       );
//     }

//     sortedArray.map((singleTask: Task, singleIndex) => {
//       //prettier-ignore
//       const singleTaskDOM = document.querySelector(`.single-task[data-task-id="${singleTask.databaseId}"]`)!;

//       //prettier-ignore
//       (singleTaskDOM as HTMLElement).style.order = `${singleIndex - sortedArray.length}`;
//     });
//   }

//   filterModal.classList.remove("active");
// });

modalOpen?.addEventListener("click", () => {
  modalOpening("NEW TASK");
  modalSubmitValue("CREATE");
});

modalClose?.addEventListener("click", function () {
  modalBg?.classList.remove("active");
  clearModalInputs();
});

document.addEventListener("keydown", function (event) {
  //prettier-ignore
  if (modalBg?.classList.contains("active") && event.key === "Escape") {
    modalBg.classList.remove("active");
    clearModalInputs();
  }
  if (filterModal?.classList.contains("active") && event.key === "Escape") {
    filterTabCheckboxes.forEach((singleCheckbox) => {
      (singleCheckbox as HTMLInputElement).checked = false;
    });
    filterModal.classList.remove("active");
  }
});

document.addEventListener("click", closeModalByOutsideClick);

taskCategories.addEventListener("change", selectedCategory);

taskDescription.addEventListener("input", placeholderDisplayChange);
