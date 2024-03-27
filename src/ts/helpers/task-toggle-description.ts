export const taskToggleDescription = function (event: any) {
  const target = event.target;
  if (
    !["single-state", "single-edit", "single-btn"].some((className) =>
      target.classList.contains(className)
    )
  ) {
    const closestSingleTask = target.closest(".single-task");
    closestSingleTask.classList.toggle("open");
  }
};
