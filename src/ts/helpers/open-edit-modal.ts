import { fillingEditInputs } from "./filling-edit-inputs";
import { updatedEditedTaskId } from "../edited-task-id";
import { modalSubmitValue } from "./modal-submit-value";
import { modalOpening } from "./modal-opening";
import { withTask } from "./with-task";

export const openEditModal = function (event: any) {
  const target = event.target;
  if (target.classList.contains("single-edit")) {
    modalOpening("EDITING TASK");
    modalSubmitValue("UPDATE");

    fillingEditInputs(event);

    const closestSingleTask = target.closest(".single-task");
    const closestSingleTaskID = closestSingleTask.getAttribute("data-task-id");

    //prettier-ignore
    withTask(closestSingleTaskID, (taskInstance) => updatedEditedTaskId(taskInstance.id))
  }
};
