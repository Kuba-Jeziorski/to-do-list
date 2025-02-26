import Task from "./task";

export default class TaskPrinter {
  task: Task;

  constructor(taskInstance: Task) {
    this.task = taskInstance;
  }

  printHtml(): string {
    const task = this.task;
    const absoluteTaskDeadline = Math.abs(task.deadline);
    const deadlineWhen = task.deadline >= 0 ? `till` : `past`;

    let returnDaysRemaining = "";
    if (!isNaN(task.deadline)) {
      returnDaysRemaining = `<p class="single-days">${absoluteTaskDeadline} ${
        Math.abs(task.deadline) === 1 ? "day" : "days"
      } ${deadlineWhen} deadline</p>`;
    } else {
      returnDaysRemaining = `<p class="single-days">Deadline is not set</p>`;
    }
    let importanceNameClass = ``;
    if (task.importance === `1`) {
      importanceNameClass = `low`;
    } else if (task.importance === `2`) {
      importanceNameClass = `medium`;
    } else {
      importanceNameClass = `high`;
    }
    const returnName = `<h3 class="single-name ${importanceNameClass}">${task.name}</h3>`;
    const returnCategory = `<p class="single-category">${task.category}</p>`;
    const returnDescription = `<p class="single-description">${task.description}</p>`;
    const returnCurrentDate = `<p class="single-current">Task created on ${task.currentDate}</p>`;
    return `${returnDaysRemaining}${returnName}${returnCategory}${returnDescription}${returnCurrentDate}`;
  }

  addStateClass(): string {
    const task = this.task;
    const taskState = task.state;
    return taskState === "finished" ? "finished" : "";
  }
}
