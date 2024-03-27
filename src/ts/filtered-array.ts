import Task from "./classes/task";
import { filterModal } from "./constants";
import { taskInstances } from "./task-instances";

let filteredArray: Task[] = [];

export const getFilteredArray = () => {
  return filteredArray;
};

export const applyFilter = function (state: string): Task[] {
  getFilteredArray().length = 0;
  filterModal.classList.add("active");
  filterModal.setAttribute("listing-state", state);
  taskInstances.forEach((singleInstance) => {
    if (singleInstance.state === `${state}`) {
      getFilteredArray().push(singleInstance);
    }
  });
  return getFilteredArray();
};

export const getSortedArray = (
  sortType: string,
  sortCategory: AllowedCategory
) => {
  const filteredArrayCopy = [...filteredArray];
  let sortedArray: Task[];
  if (sortType == `1`) {
    sortedArray = filteredArrayCopy.sort((first: Task, last: Task) => {
      //prettier-ignore
      return  last[sortCategory] < first[sortCategory] ? 1 : last[sortCategory] > first[sortCategory] ? -1 : 0
    });
  } else {
    sortedArray = filteredArrayCopy.sort((first, last) =>
      //prettier-ignore
      first[sortCategory] < last[sortCategory] ? 1 : first[sortCategory] > last[sortCategory] ? -1 : 0
    );
  }
  return sortedArray;
};

// prettier-ignore
const allowedCategories = ["deadline", "name", "timeStamp", "importance"] as const;
type AllowedCategory = (typeof allowedCategories)[number];
// type guard
export const isAllowedCategory = (
  category: any
): category is AllowedCategory => {
  return allowedCategories.includes(category);
};
