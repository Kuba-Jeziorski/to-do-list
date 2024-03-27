import { getDocRef } from "../db";
import { updateTaskState } from "../db";
import { withTask } from "./with-task";

export const stateChange = function (event: any) {
  const target = event.target;

  if (target.classList.contains("single-state")) {
    const closestSingleTask = target.closest(".single-task");
    const closestSingleTaskID = closestSingleTask.getAttribute("data-task-id");

    withTask(closestSingleTaskID, (properSingleTask) => {
      const dbId = properSingleTask.id;
      const docRef = getDocRef(dbId);

      if (properSingleTask.state === "active") {
        closestSingleTask.classList.add("finished");
        updateTaskState(docRef, "finished");
      } else {
        closestSingleTask.classList.remove("finished");
        updateTaskState(docRef, "active");
      }
    });
  }
};
