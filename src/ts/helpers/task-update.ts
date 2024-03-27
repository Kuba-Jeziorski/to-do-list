import { updateTask } from "../db";
import { FormPayload } from "../model/create-task";
import { withTask } from "./with-task";

export const taskUpdate = async function (
  editedTaskID: string,
  payload: FormPayload
) {
  return withTask(editedTaskID, (task) => {
    task.update(payload);
    return updateTask(task);
  });
};
