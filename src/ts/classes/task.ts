import { currentDayCheck } from "../helpers/current-day-check";
import { daysRemaining } from "../helpers/days-remaining";
import { FormPayload } from "../model/create-task";
import { assertValidTaskCategory } from "../model/validators/assert-valid-task-category";
import { assertValidTaskDescription } from "../model/validators/assert-valid-task-description";
import { assertValidTaskName } from "../model/validators/assert-valid-task-name";

export type DatabaseTask = {
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

type TaskCreator = {
  id?: string;
  currentDate?: string;
  state?: string;
  timeStamp?: number;
  name: string;
  description: string;
  deadline: number;
  dateOfDeadline: string;
  category: string;
  importance: string;
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

  constructor(taskCreator: TaskCreator) {
    this.name = taskCreator.name;
    this.description = taskCreator.description;
    this.deadline = taskCreator.deadline;
    this.dateOfDeadline = taskCreator.dateOfDeadline;
    this.category = taskCreator.category;
    this.importance = taskCreator.importance;

    this.id = taskCreator.id ?? null;
    this.currentDate = taskCreator.currentDate ?? currentDayCheck();
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

  update({ category, deadline, description, importance, name }: FormPayload) {
    this.name = assertValidTaskName(name);
    this.description = assertValidTaskDescription(description);
    this.category = assertValidTaskCategory(category);
    this.deadline = daysRemaining(deadline);
    this.importance = importance;
    this.dateOfDeadline = deadline;
  }
}
