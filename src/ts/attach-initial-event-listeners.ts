import {
  taskDescription,
  taskImportance,
  filterSubmit,
  filterTab1,
  filterTab2,
  taskSubmit,
  taskDeadline,
  taskName,
} from "./constants";
import Task from "./classes/task";
import { selectedCategory } from "./helpers/selected-category";
import { clearModalInputs } from "./helpers/clear-modal-inputs";
import { colRef } from "./db";
import { taskUpdate } from "./helpers/task-update";
import { onSnapshot } from "firebase/firestore";
import { creatingTask } from "./helpers/creating-task";
import { summaryUpdate } from "./helpers/summary-update";
import { taskInstances } from "./task-instances";
import {
  queryActiveWrapperDiv,
  queryFinishedWrapperDiv,
} from "./helpers/dom-operations";
import { showValidationModal } from "./helpers/validation-modal-show";
import { hideFilterModal } from "./helpers/filter-modal-hide";
import { hideModal } from "./helpers/modal-hide";
import "./handlers/all-handlers-import";
import { FormPayload, createTask } from "./model/create-task";
import { getEditedTaskId } from "./edited-task-id";
import { handleFiltering } from "./handlers/handle-filtering";
import { handleSorting } from "./handlers/handle-sorting";

taskSubmit?.addEventListener("click", async function (event) {
  event.preventDefault();

  const payload: FormPayload = {
    category: selectedCategory(),
    deadline: taskDeadline.value,
    description: taskDescription.value,
    importance: taskImportance.value,
    name: taskName.value,
  };

  const taskId = getEditedTaskId();
  try {
    if (taskId === null) {
      await createTask(payload);
    } else {
      await taskUpdate(taskId, payload);
    }
    clearModalInputs();
    hideModal();
  } catch (error) {
    showValidationModal();
  }
});

filterSubmit.addEventListener("click", function () {
  // filter tab
  if (filterTab1.checked) {
    handleFiltering();
  }

  // sort tab
  if (filterTab2.checked) {
    handleSorting();
  }

  hideFilterModal();
});

onSnapshot(colRef, (snapshot) => {
  queryActiveWrapperDiv().forEach((singleTask) => singleTask.remove());
  queryFinishedWrapperDiv().forEach((singleTask) => singleTask.remove());

  // @ts-expect-error
  taskInstances = snapshot.docs.map((doc) => {
    // doc.data
    return new Task({
      id: doc.id,
      ...doc.data(),
    });
  });

  taskInstances.forEach((task: Task) => {
    creatingTask(task);
  });

  summaryUpdate();
  console.log(`all taskInstances`);
  console.log(taskInstances);
});
