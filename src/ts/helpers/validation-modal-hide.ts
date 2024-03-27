import { validateModal } from "../constants";

export const hideValidationModal = () => {
  validateModal.classList.remove("active");
};
