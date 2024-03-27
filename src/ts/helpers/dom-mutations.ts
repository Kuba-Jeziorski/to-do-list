import {
  filterActiveBtn,
  filterClose,
  filterDefault,
  filterFinishedBtn,
  filterModal,
  filterTab1,
  filterTab2,
  filterTabCheckboxes,
  importanceRange,
  modalClose,
  modalOpen,
  taskCategories,
  taskContainerActive,
  taskContainerFinished,
  taskDescription,
  taskImportance,
  taskImportanceObj,
  validateBtn,
} from "../constants";
import { applyFilter } from "../filtered-array";
import { clearModalInputs } from "./clear-modal-inputs";
import { closeModalsByOutsideClick } from "./close-modal-by-outside-click";
import { queryDefaultSort } from "./dom-operations";
import { dynamicImportanceClass } from "./dynamic-importance-class";
import { filterModalIsActive } from "./filter-modal-active";
import { hideFilterModal } from "./filter-modal-hide";
import { defaultFilterTasksDisplay } from "./filter-remove-display-none";
import { modalIsActive } from "./modal-active";
import { hideModal } from "./modal-hide";
import { modalOpening } from "./modal-opening";
import { modalSubmitValue } from "./modal-submit-value";
import { placeholderDisplayChange } from "./placeholder-display-change";
import { selectedCategory } from "./selected-category";
import { taskContainerFunctions } from "./task-container-functions";
import { hideValidationModal } from "./validation-modal-hide";

export const validationButtonHandler = () => {
  validateBtn.addEventListener("click", function () {
    hideValidationModal();
  });
};

export const taskImportanceHandler = () => {
  taskImportance.addEventListener("change", function () {
    const importanceValue = +taskImportance.value;
    const importanceName =
      taskImportanceObj[importanceValue as keyof typeof taskImportanceObj];

    // prettier-ignore
    importanceRange.textContent = importanceName;

    dynamicImportanceClass(importanceRange, taskImportanceObj);
  });
};

export const filterActiveButtonHandler = () => {
  filterActiveBtn.addEventListener("click", function () {
    applyFilter(`active`);
  });
};

export const filterFinishedButtonHandler = () => {
  filterFinishedBtn.addEventListener("click", function () {
    applyFilter(`finished`);
  });
};

export const filterCloseButtonHandler = () => {
  filterClose.addEventListener("click", function () {
    hideFilterModal();
    filterTabCheckboxes.forEach((singleCheckbox) => {
      (singleCheckbox as HTMLInputElement).checked = false;
    });
    queryDefaultSort().checked = true;
  });
};

export const setFiltersToDefaultHandler = () => {
  filterDefault.addEventListener("click", function () {
    // filter tab
    if (filterTab1.checked) {
      filterTabCheckboxes.forEach((singleCheckbox) => {
        (singleCheckbox as HTMLInputElement).checked = false;
      });

      defaultFilterTasksDisplay();
    }

    // sort tab
    if (filterTab2.checked) {
      queryDefaultSort().checked = true;
    }
  });
};

export const modalOpeningHandler = () => {
  modalOpen.addEventListener("click", () => {
    modalOpening("NEW TASK");
    modalSubmitValue("CREATE");
  });
};

export const modalClosingHandler = () => {
  modalClose.addEventListener("click", function () {
    hideModal();
    clearModalInputs();
  });
};

export const closeModalsWithKeyHandler = () => {
  document.addEventListener("keydown", function (event) {
    //prettier-ignore
    if (modalIsActive() && event.key === "Escape") {
          hideModal();
          clearModalInputs();
        }
    if (filterModalIsActive() && event.key === "Escape") {
      filterTabCheckboxes.forEach((singleCheckbox) => {
        (singleCheckbox as HTMLInputElement).checked = false;
      });
      queryDefaultSort().checked = true;
      hideFilterModal();
    }
  });
};

export const closeModalsWithOutsideClickHandler = () => {
  document.addEventListener("click", closeModalsByOutsideClick);
};

export const setCategoryHandler = () => {
  taskCategories.addEventListener("change", selectedCategory);
};

export const taskDescriptionDisplayHandler = () => {
  taskDescription.addEventListener("input", placeholderDisplayChange);
};

export const taskContainersFunctionsHandler = () => {
  window.addEventListener("load", function () {
    taskContainerActive.addEventListener("click", taskContainerFunctions);
    taskContainerFinished.addEventListener("click", taskContainerFunctions);
  });
};
