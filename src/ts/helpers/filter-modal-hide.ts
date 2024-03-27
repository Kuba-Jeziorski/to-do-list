import { filterModal } from "../constants";

export const hideFilterModal = () => {
  filterModal.classList.remove("active");
};
