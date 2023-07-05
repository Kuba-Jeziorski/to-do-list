import { createdDiv, daysRemaining, taskContainerFunctions } from "./functions";

import {
  taskName,
  taskDescription,
  taskContainerActive,
  taskContainerFinished,
  taskCategories,
  taskDeadline,
  taskInstances,
  taskImportance,
} from "./variables";

export class Task {
  name: string;
  description: string;
  deadline: number;
  category: string;
  private static idCounter: number = 0;
  public id: number;
  currentDate: string;
  importance: string;
  state: string;

  constructor(
    name: string,
    description: string,
    deadline: number,
    category: string,
    importance: string
  ) {
    this.name = name;
    this.description = description;
    this.deadline = deadline;
    this.category = category;
    this.id = Task.idCounter;
    this.currentDate = this.checkingCurrentDate();
    this.importance = importance;
    this.state = `active`;
    Task.idCounter++;
  }

  checkingCurrentDate(): string {
    const currentDate = new Date();
    const currentDay = String(currentDate.getDate()).padStart(2, "0");
    const currentMonth = String(currentDate.getMonth() + 1).padStart(2, "0");
    const currentYear = String(currentDate.getFullYear());

    const formattedDate = `${currentDay}.${currentMonth}.${currentYear}`;
    return formattedDate;
  }

  idAttribute(): number {
    return this.id;
  }

  print(): string {
    let returnDaysRemaining = "";
    if (!isNaN(this.deadline)) {
      returnDaysRemaining = `<p class="single-days">${this.deadline} ${
        Math.abs(this.deadline) === 1 ? "day" : "days"
      } ${this.deadline >= 0 ? "till" : "past"} deadline</p>`;
    } else {
      returnDaysRemaining = `<p class="single-days">Deadline is not set</p>`;
    }
    let importanceNameClass = ``;
    if (this.importance === `1`) {
      importanceNameClass = `low`;
    } else if (this.importance === `2`) {
      importanceNameClass = `medium`;
    } else {
      importanceNameClass = `high`;
    }
    const returnName = `<h3 class="single-name ${importanceNameClass}">${this.name}</h3>`;
    const returnCategory = `<p class="single-category">${this.category}</p>`;
    const returnDescription = `<p class="single-description">${this.description}</p>`;
    const returnCurrentDate = `<p class="single-current">Task created on ${this.currentDate}</p>`;
    return `${returnDaysRemaining}${returnName}${returnCategory}${returnDescription}${returnCurrentDate}`;
  }
}

export const creatingTask = function (): void {
  const name = taskName.value;
  const description = taskDescription.value;
  const category = taskCategories.options[taskCategories.selectedIndex].text;
  const deadline = daysRemaining(taskDeadline);
  const importance = taskImportance.value;

  const newTask = new Task(name, description, deadline, category, importance);
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
