import {
  // createdDiv,
  // daysRemaining,
  // taskContainerFunctions,
  currentDayCheck,
  // summaryUpdate,
} from "../functions";

type DatabaseTask = {
  id: string;
  category: string;
  currentDate: string;
  deadline: number;
  description: string;
  importance: string;
  name: string;
  state: string;
  timeStamp: number;
};

export default class Task {
  id: string | null;
  name: string;
  description: string;
  deadline: number;
  category: string;
  currentDate: string;
  importance: string;
  state: string;
  timeStamp: number;
  databaseId?: string;

  constructor(taskCreator: DatabaseTask | any) {
    this.name = taskCreator.name;
    this.description = taskCreator.description;
    this.deadline = taskCreator.deadline;
    this.category = taskCreator.category;
    this.importance = taskCreator.importance;

    this.id = taskCreator.id ?? null;
    this.currentDate = taskCreator.currentData ?? currentDayCheck();
    this.state = taskCreator.state ?? `active`;
    this.timeStamp = taskCreator.timeStamp ?? Date.now();
  }

  toSave() {
    return {
      category: this.category,
      currentDate: this.currentDate,
      deadline: this.deadline,
      description: this.description,
      importance: this.importance,
      name: this.name,
      state: this.state,
      timeStamp: this.timeStamp,
    };
  }

  toUpdate() {
    return {
      name: this.name,
      description: this.description,
      category: this.category,
      deadline: this.deadline,
      importance: this.importance,
    };
  }
}
