import { findTask } from "./find-task";
import Task from "../classes/task";

export type HandleTask<T> = (task: Task) => T;

export const withTask = async <T>(
  taskId: string,
  handleTask: HandleTask<T>
) => {
  const taskInstance = findTask(taskId);

  if (taskInstance === undefined) {
    return;
  } else {
    return handleTask(taskInstance);
  }
};
