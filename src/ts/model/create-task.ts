import Task from "../classes/task";
import { countingDeadline } from "../helpers/counting-deadline";
import { sendTask } from "../db";
import { assertValidTaskCategory } from "./validators/assert-valid-task-category";
import { assertValidTaskDescription } from "./validators/assert-valid-task-description";
import { assertValidTaskName } from "./validators/assert-valid-task-name";

export type FormPayload = {
  category: string;
  deadline: string;
  description: string;
  importance: string;
  name: string;
};

export const createTask = ({
  category,
  deadline,
  description,
  importance,
  name,
}: FormPayload) => {
  const newTask = new Task({
    category: assertValidTaskCategory(category),
    deadline: countingDeadline(deadline),
    dateOfDeadline: deadline,
    description: assertValidTaskDescription(description),
    importance,
    name: assertValidTaskName(name),
  });
  return sendTask(newTask);
};
