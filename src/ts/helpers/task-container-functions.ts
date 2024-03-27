import { stateChange } from "./state-change";
import { openEditModal } from "./open-edit-modal";
import { taskDelete } from "./task-delete";
import { taskToggleDescription } from "./task-toggle-description";

export const taskContainerFunctions = function (event: any) {
  taskDelete(event);
  taskToggleDescription(event);
  stateChange(event);
  openEditModal(event);
};
