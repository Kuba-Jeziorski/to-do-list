export const taskDelete = function (event: any) {
  const target = event.target;
  if (!target.classList.contains("single-btn")) return;
  console.log(target);
  const parent = target.closest(".single-task");
  const btnNode = document.querySelectorAll(".single-btn");
  const btnNodeArr = [...btnNode];
  console.log(btnNodeArr);
  const clickedElement = btnNodeArr.indexOf(target);
  console.log(
    `You deleted task[${clickedElement + 1}] of ${btnNodeArr.length}`
  );
  parent.remove();
  console.log(`${btnNodeArr.length - 1} tasks left`);
};
