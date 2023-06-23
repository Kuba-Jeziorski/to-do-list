import {
  taskDelete,
  taskToggle,
  daysRemaining,
  createdDiv,
} from "./functions.js";

import {
  modalBg,
  taskName,
  taskDescription,
  taskContainer,
  taskCategories,
  taskDeadline,
} from "./variables.js";

import { clearModalInputs } from "./modal.js";

export class Task {
  name: string;
  description: string;
  deadline: any;
  category: string;
  private static idCounter: number = 0;
  public id: number;

  constructor(
    name: string,
    description: string,
    deadline: any,
    category: string
  ) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.category = category;
    this.id = Task.idCounter;
    Task.idCounter++;
  }

  print() {
    const returnName = `<h3>${this.name}</h3>`;
    const returnDescription = `<p class="single-description">${this.description}</p>`;
    const returnDaysRemaining = `<p class="single-days">${this.deadline} days till deadline</p>`;
    const returnCatrgory = `<p class="single-category">${this.category}</p>`;
    const returnId = `<p class="single-id">id: ${this.id}</p>`;
    return `${returnDaysRemaining}${returnName}${returnCatrgory}${returnDescription}${returnId}`;
  }
}

export const creatingTask = function () {
  const name = taskName.value;
  const description = taskDescription.value;
  const category = taskCategories.options[taskCategories.selectedIndex].text;
  const deadline = daysRemaining(taskDeadline);

  const newTask = new Task(name, description, deadline, category);
  const newTaskPrint = newTask.print();

  taskContainer?.insertAdjacentHTML("afterbegin", createdDiv(newTaskPrint));

  clearModalInputs();

  if (modalBg?.classList.contains("active")) {
    (modalBg as HTMLElement).classList.remove("active");
  }
};

taskContainer?.addEventListener("click", taskDelete);
taskContainer?.addEventListener("click", taskToggle);
