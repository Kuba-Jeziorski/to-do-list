import { createdDiv, daysRemaining, taskContainerFunctions } from "./functions";

import {
  taskName,
  taskDescription,
  taskContainerActive,
  taskContainerFinished,
  taskCategories,
  taskDeadline,
  taskInstances,
} from "./variables";

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
    const returnName = `<h3 class="single-name">${this.name}</h3>`;
    const returnDescription = `<p class="single-description">${this.description}</p>`;
    // prettier-ignore
    const returnDaysRemaining = `<p class="single-days">${this.deadline} ${Math.abs(this.deadline) === 1 ? "day" : "days"} ${this.deadline >= 0 ? "till" : "past"} deadline</p>`;
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
};

taskContainerActive?.addEventListener("click", taskContainerFunctions);
taskContainerFinished?.addEventListener("click", taskContainerFunctions);
