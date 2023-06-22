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

export const taskToggle = function (event: any) {
  const target = event.target;
  const closestSingleTask = target.closest(".single-task");
  closestSingleTask.classList.toggle("open");
};

export const daysRemaining = function (date: any) {
  const futureDateString = date.value;

  const dateComponents = futureDateString.split("-");
  const futureDay = parseInt(dateComponents[0]);
  const futureMonth = parseInt(dateComponents[1]) - 1;
  const futureYear = parseInt(dateComponents[2]);

  const futureDate = new Date(futureDay, futureMonth, futureYear);
  const currentDate = new Date();

  const timeDiff = futureDate.getTime() - currentDate.getTime();
  const daysRemaining = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

  return daysRemaining;
};
