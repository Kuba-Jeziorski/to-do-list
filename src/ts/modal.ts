const modalOpen = document.querySelector(".modal-open");
export const modalBg = document.querySelector(".modal-bg");
const modalClose = document.querySelector(".modal-close");

export const emptyModalInputs = function () {
  const modalInputs = document.querySelectorAll("#form input");
  const modalTextarea = document.querySelector("#desc");
  modalInputs.forEach((input) => {
    if ((input as HTMLInputElement).type === "text") {
      (input as HTMLInputElement).value = "";
    } else if ((input as HTMLInputElement).type === "date") {
      (input as HTMLInputElement).value = "";
    } else {
      console.log(`nothing`);
    }
  });
  (modalTextarea as HTMLTextAreaElement).value = "";
};

modalOpen?.addEventListener("click", function () {
  modalBg?.classList.add("active");
});

modalClose?.addEventListener("click", function () {
  modalBg?.classList.remove("active");
});

document.addEventListener("keydown", function (event) {
  if (modalBg?.classList.contains("active") && event.key === "Escape") {
    modalBg.classList.remove("active");
  }
});
