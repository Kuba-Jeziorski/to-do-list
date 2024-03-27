import { filterModal, filterTabCheckboxes, modalBg } from "../constants";
import { clearModalInputs } from "./clear-modal-inputs";
import { queryDefaultSort } from "./dom-operations";
import { filterModalIsActive } from "./filter-modal-active";
import { hideFilterModal } from "./filter-modal-hide";
import { modalIsActive } from "./modal-active";
import { hideModal } from "./modal-hide";

export const closeModalsByOutsideClick = function (event: any) {
  const target = event.target;
  if (modalIsActive() && target.classList.contains("modal-bg")) {
    hideModal();
    clearModalInputs();
  }

  if (filterModalIsActive() && target.classList.contains("modal-filter")) {
    hideFilterModal();
    filterTabCheckboxes.forEach((singleCheckbox) => {
      (singleCheckbox as HTMLInputElement).checked = false;
    });
    queryDefaultSort().checked = true;
  }
};
