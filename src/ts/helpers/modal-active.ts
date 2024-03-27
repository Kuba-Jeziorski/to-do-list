import { modalBg } from "../constants";

export const modalIsActive = () => {
  return modalBg.classList.contains("active");
};
