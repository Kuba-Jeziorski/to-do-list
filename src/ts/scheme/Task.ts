import { currentDayCheck } from "../functions";

type DatabaseTask = {
  id: string;
  category: string;
  currentDate: string;
  dateOfDeadline: string;
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
  dateOfDeadline: string;
  deadline: number;
  category: string;
  currentDate: string;
  importance: string;
  state: string;
  timeStamp: number;

  constructor(taskCreator: DatabaseTask | any) {
    this.name = taskCreator.name;
    this.description = taskCreator.description;
    this.deadline = taskCreator.deadline;
    this.dateOfDeadline = taskCreator.dateOfDeadline;
    this.category = taskCreator.category;
    this.importance = taskCreator.importance;

    this.id = taskCreator.id ?? null;
    this.currentDate = taskCreator.currentData ?? currentDayCheck();
    this.state = taskCreator.state ?? `active`;
    this.timeStamp = taskCreator.timeStamp ?? Date.now();
  }

  toSave() {
    return {
      name: this.name,
      description: this.description,
      category: this.category,
      deadline: this.deadline,
      dateOfDeadline: this.dateOfDeadline,
      importance: this.importance,
      currentDate: this.currentDate,
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
      dateOfDeadline: this.dateOfDeadline,
      importance: this.importance,
    };
  }
}
