import {
  createdDiv,
  daysRemaining,
  taskContainerFunctions,
  currentDayCheck,
} from "./functions";

import {
  taskName,
  taskDescription,
  taskContainerActive,
  taskContainerFinished,
  taskCategories,
  taskDeadline,
  // taskInstances,
  taskImportance,
} from "./variables";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export let taskInstances: object[] = [];

const creatingTaskFromBase = function (object: any): void {
  const name = object.name;
  const description = object.description;
  const category = object.category;
  const deadline = object.deadline;
  const importance = object.importance;
  const id = object.id;
  const currentDate = object.currentDate;

  const newTaskID = id;
  //prettier-ignore
  const printBase: string = printFromBase(name, description, category, deadline, importance, currentDate);

  taskContainerActive?.insertAdjacentHTML(
    "afterbegin",
    createdDiv(newTaskID, printBase)
  );
};

const printFromBase = function (
  name: string,
  description: string,
  category: string,
  deadline: number,
  importance: string,
  currentDate: string
): string {
  let returnDaysRemaining = "";
  if (!isNaN(deadline)) {
    returnDaysRemaining = `<p class="single-days">${deadline} ${
      Math.abs(deadline) === 1 ? "day" : "days"
    } ${deadline >= 0 ? "till" : "past"} deadline</p>`;
  } else {
    returnDaysRemaining = `<p class="single-days">Deadline is not set</p>`;
  }
  let importanceNameClass = ``;
  if (importance === `1`) {
    importanceNameClass = `low`;
  } else if (importance === `2`) {
    importanceNameClass = `medium`;
  } else {
    importanceNameClass = `high`;
  }
  const returnName = `<h3 class="single-name ${importanceNameClass}">${name}</h3>`;
  const returnCategory = `<p class="single-category">${category}</p>`;
  const returnDescription = `<p class="single-description">${description}</p>`;
  const returnCurrentDate = `<p class="single-current">Task created on ${currentDate}</p>`;
  return `${returnDaysRemaining}${returnName}${returnCategory}${returnDescription}${returnCurrentDate}`;
};

const firebaseConfig = {
  apiKey: "AIzaSyDjIYSECgWl3N4T_B6YTgV_HrRhx-vQaQs",
  authDomain: "to-do-list-c0916.firebaseapp.com",
  projectId: "to-do-list-c0916",
  storageBucket: "to-do-list-c0916.appspot.com",
  messagingSenderId: "877853950236",
  appId: "1:877853950236:web:14674812d58b2056d77ad9",
};

// init firebase app
initializeApp(firebaseConfig);

// init services
const db = getFirestore();

// collection ref
const colRef = collection(db, "tasks");

// dynamically changes while there is a change (no need to refresh page)
let tasksArray: any[] = [];
onSnapshot(colRef, (snapshot) => {
  tasksArray = [];
  taskInstances = [];
  snapshot.docs.forEach((doc) => {
    tasksArray.push({ ...doc.data() });
  });
  console.log(tasksArray);
  console.log(tasksArray.length);
  taskInstances = [...tasksArray];
  // IMPORTANT for every single item, all of the tasksArray items are created again
  tasksArray.map((singleTask) => {
    creatingTaskFromBase(singleTask);
  });
  console.log(`line: 111, in onSnapshot`);
  return tasksArray;
});
console.log(`line: 114, after onSnapshot`);

export class Task {
  name: string;
  description: string;
  deadline: number;
  category: string;
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
    // this.id = idNumber;
    this.id = tasksArray.length;
    this.currentDate = currentDayCheck();
    this.importance = importance;
    this.state = `active`;
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

  // console.log(`id: ${idNumber}`);

  // firebase
  addDoc(colRef, {
    category: taskCategories.options[taskCategories.selectedIndex].text,
    currentDate: currentDayCheck(),
    deadline: daysRemaining(taskDeadline),
    description: description,
    id: newTask.idAttribute(),
    importance: taskImportance.value,
    name: name,
    state: "active",
  }).then(() => {
    console.log(`submited`);
  });
  // firebase
};

taskContainerActive?.addEventListener("click", taskContainerFunctions);
taskContainerFinished?.addEventListener("click", taskContainerFunctions);
