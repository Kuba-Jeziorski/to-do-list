import { deleteModal, deleteModalButtons } from "../constants";
import { removeTask } from "../db";

export const taskDelete = function (event: any) {
  const target = event.target;
  if (!target.classList.contains("single-btn")) return;
  const parent = target.closest(".single-task");
  const parentId = parent.getAttribute("data-task-id");

  deleteModal?.classList.add("active");

  deleteModalButtons?.addEventListener("click", function (event: any) {
    const target = event.target;

    if (target.id === "delete-yes") removeTask(parentId);
    deleteModal?.classList.remove("active");
  });
};
