import Task from "./scheme/Task";

export default class TaskPrinter {
  task: Task;

  constructor(taskInstance: Task) {
    this.task = taskInstance;
  }

  printHtml(): string {
    const task = this.task;
    let returnDaysRemaining = "";
    if (!isNaN(task.deadline)) {
      returnDaysRemaining = `<p class="single-days">${task.deadline} ${
        Math.abs(task.deadline) === 1 ? "day" : "days"
      } ${task.deadline >= 0 ? "till" : "past"} deadline</p>`;
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
}

// export const creatingTask = function (): void {
//   const newTaskPrint = newTask.print();
//   const newTaskID = newTask.databaseId;

//   taskContainerActive?.insertAdjacentHTML(
//     "beforebegin",
//     createdDiv(newTaskID, newTaskPrint)
//   );

//   // firebase
//   //   addDoc(colRef, newTask.save()).then((data) => {
//   //     console.log(`submited`);
//   //     newTask.databaseId = data.id;
//   //   });
// };
