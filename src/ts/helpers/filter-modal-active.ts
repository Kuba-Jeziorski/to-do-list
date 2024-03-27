import { filterModal } from "../constants";

export const filterModalIsActive = () => {
  return filterModal.classList.contains("active");
};
