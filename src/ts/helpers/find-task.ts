import Task from "../classes/task";
import { taskInstances } from "../task-instances";

export const findTask = (taskId: string): Task | undefined => {
  return taskInstances.find((task: Task) => task.id === taskId);
};
