import { taskImportance } from "../constants";

export const dynamicImportanceClass = function (target: any, forbidden: any) {
  const importanceValue = +taskImportance.value;
  const importanceName = forbidden[importanceValue as keyof typeof forbidden];
  target.textContent = importanceName;

  const forbiddenClasses: string[] = [];
  for (const [_, value] of Object.entries(forbidden)) {
    if (value && typeof value === "string") {
      forbiddenClasses.push(value.toLocaleLowerCase());
    }
  }

  forbiddenClasses.forEach((singleClass) =>
    target.classList.remove(singleClass)
  );
  target.classList.add(importanceName.toLowerCase());
};
