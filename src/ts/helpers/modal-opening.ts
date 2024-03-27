import { modalTitle } from "../constants";
import { showModal } from "./modal-show";

export const modalOpening = function (title: string) {
  if (modalTitle) {
    modalTitle.textContent = title;
  }
  showModal();
};
