import {
  importanceRange,
  taskDescription,
  taskName,
  taskCategories,
  taskDeadline,
  textareaPlaceholder,
  taskImportance,
  taskImportanceObj,
} from "../constants";
import { countingDeadline } from "./counting-deadline";
import { dynamicImportanceClass } from "./dynamic-importance-class";
import { withTask } from "./with-task";

export const fillingEditInputs = function (event: any) {
  const target = event.target;

  const closestSingleTask = target.closest(".single-task");
  const closestSingleTaskID = closestSingleTask.getAttribute("data-task-id");

  withTask(closestSingleTaskID, (taskInstance) => {
    if (taskName) {
      taskName.value = taskInstance.name;
    }

    if (taskDescription) {
      taskDescription.value = taskInstance.description;
      if (taskDescription.value == "") {
        textareaPlaceholder.style.display = "block";
      } else {
        textareaPlaceholder.style.display = "none";
      }
    }

    if (taskCategories) {
      const selectOptions = [...taskCategories.options];
      let currentCategory;
      selectOptions.forEach((single, index) => {
        if (single.textContent === taskInstance.category) {
          currentCategory = index;
        }
      });
      if (currentCategory) {
        taskCategories.value = currentCategory;
      }
    }

    if (taskImportance) {
      taskImportance.value = taskInstance.importance;
      const importanceName =
        taskImportanceObj[
          +taskImportance.value as keyof typeof taskImportanceObj
        ];
      importanceRange.textContent = importanceName;

      dynamicImportanceClass(importanceRange, taskImportanceObj);
    }

    if (taskDeadline) {
      countingDeadline(taskDeadline.value);
      taskDeadline.value = taskInstance.dateOfDeadline;
    }
  });
};
