import {
  createdDiv,
  daysRemaining,
  taskContainerFunctions,
} from "./functions.js";

import {
  modalBg,
  taskName,
  taskDescription,
  taskContainerActive,
  taskContainerFinished,
  taskCategories,
  taskDeadline,
  taskInstances,
} from "./variables.js";

import { clearModalInputs } from "./modal.js";

export class Task {
  name: string;
  description: string;
  deadline: number;
  category: string;
  private static idCounter: number = 0;
  public id: number;

  constructor(
    name: string,
    description: string,
    deadline: number,
    category: string
  ) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.category = category;
    this.id = Task.idCounter;
    Task.idCounter++;
  }

  idAttribute(): number {
    return this.id;
  }

  print(): string {
    const returnName = `<h3>${this.name}</h3>`;
    const returnDescription = `<p class="single-description">${this.description}</p>`;
    const returnDaysRemaining = `<p class="single-days">${this.deadline} days till deadline</p>`;
    const returnCatrgory = `<p class="single-category">${this.category}</p>`;
    return `${returnDaysRemaining}${returnName}${returnCatrgory}${returnDescription}`;
  }
}

export const creatingTask = function (): void {
  const name = taskName.value;
  const description = taskDescription.value;
  const category = taskCategories.options[taskCategories.selectedIndex].text;
  const deadline = daysRemaining(taskDeadline);

  const newTask = new Task(name, description, deadline, category);
  taskInstances.push(newTask);
  const newTaskPrint = newTask.print();
  const newTaskID = newTask.idAttribute();

  taskContainerActive?.insertAdjacentHTML(
    "afterbegin",
    createdDiv(newTaskID, newTaskPrint)
  );

  clearModalInputs();

  if (modalBg?.classList.contains("active")) {
    (modalBg as HTMLElement).classList.remove("active");
  }
};

taskContainerActive?.addEventListener("click", taskContainerFunctions);
taskContainerFinished?.addEventListener("click", taskContainerFunctions);
