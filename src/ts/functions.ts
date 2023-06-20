export const taskDelete = function (event: any) {
  const target = event.target;
  if (!target.classList.contains("btn")) return;
  console.log(target);
  const parent = target.closest(".single-task");
  parent.remove();
  const btnNode = document.querySelectorAll(".btn");
  console.log(`Items left: ${btnNode.length}`);
};
