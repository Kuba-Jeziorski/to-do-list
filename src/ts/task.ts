import {
  createdDiv,
  daysRemaining,
  taskContainerFunctions,
  currentDayCheck,
  summaryUpdate,
} from "./functions";

import {
  taskName,
  taskDescription,
  taskContainerActive,
  taskContainerFinished,
  taskCategories,
  taskDeadline,
  taskImportance,
} from "./variables";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

export let taskInstances: Task[] = [];

const creatingTaskFromBase = function (array: any): void {
  const allSingleTasks = document.querySelectorAll(".single-task");
  allSingleTasks.forEach((singleTask) => singleTask.remove());

  array.map((singleElement: any) => {
    // const name = singleElement.name;
    // const description = singleElement.description;
    // const category = singleElement.category;
    // const deadline = singleElement.deadline;
    // const importance = singleElement.importance;
    // const id = singleElement.id;
    // const currentDate = singleElement.currentDate;
    // const state = singleElement.state;

    //prettier-ignore
    const {name, description, category,deadline,importance ,id,currentDate,state} = singleElement;

    const newTaskID = id;
    //prettier-ignore
    const printBase: string = printFromBase(name, description, category, deadline, importance, currentDate);

    if (state === `active`) {
      taskContainerActive?.insertAdjacentHTML(
        "afterbegin",
        createdDiv(newTaskID, printBase)
      );
    } else {
      taskContainerFinished?.insertAdjacentHTML(
        "afterbegin",
        createdDiv(newTaskID, printBase)
      );
    }
  });

  summaryUpdate();
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
export const db = getFirestore();

// collection ref
const colRef = collection(db, "tasks");

// dynamically changes while there is a change (no need to refresh page)
// let tasksArray: Task[] = [];
let tasksArray: any[] = [];

onSnapshot(colRef, (snapshot) => {
  tasksArray = [];
  taskInstances = [];
  snapshot.docs.forEach((doc) => {
    // console.log(doc.data());
    // console.log({ name: doc.data().name });
    // tasksArray.push({ ...doc.data() });
    tasksArray.push({ ...doc.data(), databaseId: doc.id });
    // tasksArray.push({
    //   category: doc.data().category,
    //   currentDate: doc.data().currentDate,
    //   deadline: doc.data().deadline,
    //   description: doc.data().description,
    //   id: doc.data().id,
    //   importance: doc.data().importance,
    //   name: doc.data().name,
    //   state: doc.data().state,
    // });
  });
  taskInstances = [...tasksArray];
  console.log(`here`);
  // console.log();

  taskInstances = taskInstances.sort((first, last) => {
    //prettier-ignore
    const firstId = (first as { id: number }).id;
    const lastId = (last as { id: number }).id;

    if (firstId < lastId) {
      return -1;
    } else if (firstId > lastId) {
      return 1;
    } else {
      return 0;
    }
  });

  console.log(`taskInstances:`);
  console.log(taskInstances);

  creatingTaskFromBase(taskInstances);
  return taskInstances;
});

export class Task {
  name: string;
  description: string;
  deadline: number;
  category: string;
  private static taskIdStart: number =
    //prettier-ignore
    taskInstances.reduce((max, current) => {return (current as { id: number }).id > max ? (current as { id: number }).id : max;}, -Infinity) 
    // === -Infinity ? -1 : 
    === -Infinity ? 0 : 
    //prettier-ignore
    taskInstances.reduce((max, current) => {return (current as { id: number }).id > max ? (current as { id: number }).id: max;}, -Infinity);
  public id: number;
  currentDate: string;
  importance: string;
  state: string;
  timeStamp: number;
  databaseId?: string;

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
    // this.id = Task.taskIdStart++;
    this.id = Task.taskIdStart++;
    this.currentDate = currentDayCheck();
    this.importance = importance;
    this.state = `active`;
    this.timeStamp = Date.now();
    // Task.taskIdStart++;
  }

  idAttribute(): number {
    console.log(`this.id: ${this.id}`);
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
    "beforebegin",
    createdDiv(newTaskID, newTaskPrint)
  );

  // console.log(`id: ${idNumber}`);

  // firebase
  addDoc(colRef, {
    category: taskCategories.options[taskCategories.selectedIndex].text,
    currentDate: currentDayCheck(),
    deadline: daysRemaining(taskDeadline),
    description: description,
    // id: newTask.idAttribute(),
    importance: taskImportance.value,
    name: name,
    state: "active",
    timeStamp: newTask.timeStamp,
  }).then((data) => {
    console.log(`submited`);
    newTask.databaseId = data.id;
  });
  // firebase
};

window.addEventListener("load", function () {
  taskContainerActive.addEventListener("click", taskContainerFunctions);
  taskContainerFinished.addEventListener("click", taskContainerFunctions);
});
